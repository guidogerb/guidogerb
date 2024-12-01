package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.canary.listener;

import com.bluepantsmedia.dev.bridgegappcanary.catapult.CatapultScheduleTask;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import java.util.Timer;
import java.util.TimerTask;
import java.util.logging.Level;
import java.util.logging.Logger;

@WebListener
public class CatapultListener implements ServletContextListener {
	private Timer timer = new Timer();

	@Override
	public void contextInitialized(ServletContextEvent ce) {
		Logger.getLogger(CatapultListener.class.getName()).log(Level.INFO, "CanaryListener ServletContextListener started");
		ServletContext context = ce.getServletContext();
		TimerTask task = new CatapultScheduleTask(context);
		/** Catapults data about this application and its environment to an endpoint, set start time for an hour to reduce the amount of local instances reporting **/
		timer.schedule(task, CatapultScheduleTask.ONE_HOUR, CatapultScheduleTask.ONE_DAY);

	}

	@Override
	public void contextDestroyed(ServletContextEvent ce) {
		timer.cancel();
		Logger.getLogger(CatapultListener.class.getName()).log(Level.INFO, "CanaryListener ServletContextListener destroyed");
	}

}
