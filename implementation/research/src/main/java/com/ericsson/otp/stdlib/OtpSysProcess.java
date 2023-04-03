package com.ericsson.otp.stdlib;

import com.ericsson.otp.erlang.*;

import java.util.logging.Logger;

/**
 * @author Fernando Benavides <elbrujohalcon@inaka.net>
 */
public abstract class OtpSysProcess {
    private static final Logger jlog = Logger.getLogger(OtpSysProcess.class
            .getName());
    private OtpMbox mbox;
    private OtpNode host;
    private String name;

    /**
     * Default anonymous constructor
     *
     * @param host Node where the process will live
     */
    protected OtpSysProcess(OtpNode host) {
        this.host = host;
        this.name = null;
    }

    /**
     * Default named constructor
     *
     * @param host Node where the process will live
     * @param name Name to which the process will be registered
     */
    protected OtpSysProcess(OtpNode host, String name) {
        this.host = host;
        this.name = name;
    }

    protected final String getName() {
        return name;
    }

    protected final OtpErlangPid getSelf() {
        return mbox.self();
    }

    protected final OtpNode getHost() {
        return host;
    }

    protected final OtpMbox getMbox() {
        return this.mbox;
    }

    /**
     * Gets the process running
     *
     * @throws OtpAlreadyStartedException if a process with this name is already running
     * @throws OtpErlangExit              if this process can't be linked to the caller
     */
    public final void start() throws OtpAlreadyStartedException, OtpErlangExit {
        start(null);
    }

    /**
     * Gets the process running and links it to the caller
     *
     * @param caller Process that starts this one
     * @throws OtpErlangExit              if this process can't be linked to the caller
     * @throws OtpAlreadyStartedException if a process with the same name is already running
     */
    public final void startLink(OtpErlangPid caller) throws OtpErlangExit,
            OtpAlreadyStartedException {
        start(caller);
    }

    private void start(final OtpErlangPid caller)
            throws OtpAlreadyStartedException, OtpErlangExit {
        final OtpMbox mbox;
        if (this.name == null) {
            mbox = this.host.createMbox();
        } else if (this.host.whereis(this.name) == null) {
            mbox = this.host.createMbox(this.name);
        } else {
            throw new OtpAlreadyStartedException(this.name);
        }
        this.mbox = mbox;
        if (caller != null)
            mbox.link(caller);
        new Thread(this.name) {
            @Override
            public void run() {
                loop();
                jlog.fine("...leaving");
                mbox.close();
            }
        }.start();
    }

    protected void handleSystemMessage(OtpErlangObject req, OtpErlangTuple from)
            throws OtpErlangException {
        if (req instanceof OtpErlangAtom) {
            String cmd = ((OtpErlangAtom) req).atomValue();
            if (cmd.equals("suspend")) {
                ok(from);
                suspendedLoop();
            } else if (cmd.equals("resume")) {
                ok(from);
            } else if (cmd.equals("get_status")) {
                reply(from, getStatus(true));
            } else {
                unknownSystemMsg(from, req);
            }
        } else {
            jlog.info("Ignored system message: " + req);
            unknownSystemMsg(from, req);
        }
    }

    private void suspendedLoop() throws OtpErlangException {
        boolean running = true;
        while (running) {
            OtpErlangObject message = mbox.receive();
            if (message instanceof OtpErlangTuple) {
                OtpErlangTuple msg = (OtpErlangTuple) message;
                OtpErlangAtom kind = (OtpErlangAtom) msg.elementAt(0);
                if (kind.atomValue().equals("system") && msg.arity() == 3) {
                    OtpErlangTuple from = (OtpErlangTuple) msg.elementAt(1);
                    OtpErlangObject req = msg.elementAt(2);
                    running = handleSuspendedSystemMessage(req, from);
                } else {
                    running = true;
                }
            }
        }
    }

    private boolean handleSuspendedSystemMessage(OtpErlangObject req,
                                                 OtpErlangTuple from) {
        if (req instanceof OtpErlangAtom) {
            String cmd = ((OtpErlangAtom) req).atomValue();
            if (cmd.equals("suspend")) {
                ok(from);
            } else if (cmd.equals("resume")) {
                ok(from);
                return false;
            } else if (cmd.equals("get_status")) {
                reply(from, getStatus(false));
            } else {
                unknownSystemMsg(from, req);
            }
        } else {
            jlog.info("Ignored system message in suspended mode: " + req);
            unknownSystemMsg(from, req);
        }
        return true;
    }

    private OtpErlangObject getStatus(boolean running) {
        OtpErlangList internals = new OtpErlangList(new OtpErlangObject[]{
                new OtpErlangList(), // Process dictionary
                new OtpErlangAtom(running ? "running" : "suspended"),
                new OtpErlangAtom("undefined"), new OtpErlangList(),
                getMiscStatus()});
        OtpErlangTuple status = new OtpErlangTuple(new OtpErlangObject[]{
                new OtpErlangAtom("status"),
                getSelf(),
                new OtpErlangTuple(new OtpErlangObject[]{
                        new OtpErlangAtom("class"),
                        new OtpErlangAtom(this.getClass().getSimpleName())}),
                internals});
        return status;
    }

    protected OtpErlangList getMiscStatus() {
        return new OtpErlangList();
    }

    private void unknownSystemMsg(OtpErlangTuple from, OtpErlangObject req) {
        reply(from, new OtpErlangTuple(new OtpErlangObject[]{
                new OtpErlangAtom("error"),
                new OtpErlangTuple(new OtpErlangObject[]{
                        new OtpErlangAtom("unknown_system_msg"), req})}));
    }

    private void ok(OtpErlangTuple from) {
        reply(from, new OtpErlangAtom("ok"));
    }

    /**
     * Returns a reply to the calling process
     *
     * @param from  The calling process reference
     * @param reply Response to send
     */
    protected void reply(OtpErlangTuple from, OtpErlangObject reply) {
        OtpErlangPid to = (OtpErlangPid) from.elementAt(0);
        OtpErlangRef tag = (OtpErlangRef) from.elementAt(1);
        OtpErlangTuple tuple = new OtpErlangTuple((new OtpErlangObject[]{tag,
                reply}));
        getMbox().send(to, tuple);
    }

    ;

    /**********************************************************************************************/

    /**
     * To be overrided by OtpGen... processes
     */
    protected abstract void loop();

    /**
     * Override this function if you want to trap exits
     *
     * @param oee Exit reason
     * @throws OtpErlangExit    If you want to re-throw the exception
     * @throws OtpStopException If you want to stop the server
     */
    protected void handleExit(OtpErlangExit oee) throws OtpErlangExit,
            OtpStopException {
        if (oee.reason() instanceof OtpErlangAtom) {
            if (((OtpErlangAtom) oee.reason()).atomValue() == "normal") {
                return;
            }
        }
        throw oee;
    }
}