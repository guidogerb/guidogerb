package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model;

import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import javax.activation.DataSource;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@SuppressWarnings("unused")
public class Email {

	private String subject;
	private String header;
	private String salutation;
	private String message;
	private boolean footer;
	private DataSource headerImage;
	private String headerUrl;
	private String from;

	private List<InputStream> attachments = new ArrayList<>();

	public Email() {
		// no-args, do-nothing, constructor
	}

	public Email(@NonNull final String subject, @NonNull final String message) {
		this.subject = subject;
		this.message = message;
	}

	public String toHtml() {
		StringBuilder sb = new StringBuilder();
		sb.append("<html>");
		sb.append("<head><meta http-equiv=\"Content-Type\" content=\"text/html; charset=us-ascii\" /></head>");
		sb.append("<body style=\"margin: 4px 8px 1px; font: 12pt Calibri\">");
		//Make sonar happy
		sb.append(top());
		sb.append(bottom());

		sb.append("</table>");
		sb.append("</body>");
		sb.append("</html>");
		return sb.toString();
	}


	public StringBuilder top() {
		StringBuilder sb = new StringBuilder();
		if (headerImage != null) {
			sb.append("<h1>");
			if (headerUrl != null && !"".equals(headerUrl)) {
				sb.append("<a href=\"").append(headerUrl).append("\" style=\"border:0px;\">");
			}
			sb.append("<img src=\"cid:headerImage\" title=\"HRIS\" style=\"border:0px;\">");
			if (headerUrl != null && !"".equals(headerUrl)) {
				sb.append("</a>");
			}
			sb.append("</h1>");
		}

		// Add the email header
		if (header != null) {
			sb.append("<h2 style=\"text-align:center;\">").append(header).append("</h2>");
		}

		sb.append("<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" style=\"margin-top:10px;\">");
		return sb;
	}

	public StringBuilder bottom() {
		StringBuilder sb = new StringBuilder();
		// Add the salutation
		if (salutation != null && !"".equals(salutation)) {
			sb.append("<tr><td style=\"padding-bottom:15px;\">");
			sb.append(salutation);
			sb.append("</td></tr>");
		}

		// Add the email message
		if (message != null && !"".equals(message)) {
			sb.append("<tr><td>");
			sb.append(message);
			sb.append("</td></tr>");
		}
		return sb;
	}
}


