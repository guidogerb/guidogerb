package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.SecurityRole;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.SystemPropertyMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.UserMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.Email;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.security.SecurityService;
import lombok.NonNull;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import javax.activation.DataHandler;
import javax.mail.BodyPart;
import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Properties;

@Service
public class EmailServiceImpl implements EmailService {
	private static final Logger logger = LogManager.getContext().getLogger(EmailServiceImpl.class.getName());

	private static final String SUPPORT_EMAIL = "#{support.email}";

	@Autowired
	private UserMapper userMapper;
	@Autowired
	private SystemPropertyMapper systemPropertyMapper;
	@Autowired
	private SecurityService securityService;

	// use loadSession() instead of using session directly
	private Session session;


	@Override
	public void emailByRole(@NonNull final SecurityRole role, @NonNull final Email email) {
		sendEmail(userMapper.selectUserEmailByRole(role.getRole()), null, email, false);
	}


	/**
	 * session is created once, and then reused
	 *
	 * @return created session
	 */
	private Session loadSession() {
		if (session == null) {
			final Properties emailProperties = new Properties();
			emailProperties.setProperty("mail.transport.protocol", "smtp");
			emailProperties.setProperty("mail.host", "");
			emailProperties.setProperty("mail.smtp.port", "25");
			emailProperties.setProperty("mail.smtp.host", "");
			// have to do this so server will send emails instead of getting 501 error
			emailProperties.setProperty("mail.smtp.localhost", "bluepantsmedia.com");
			emailProperties.setProperty("mail.from", "#{sent.from.email.address}");
			session = Session.getDefaultInstance(emailProperties, null);
		}

		return session;
	}

	@Override
	public void sendEmail(@Nullable final List<String> recipients, @Nullable final List<String> ccRecipients, @NonNull final Email email, final boolean isSupportMessage) {
		final String intendedFor = "<BR/><BR/>Intended For: ";

		// update message with information about the user
		List<String> toRecipients = new ArrayList<>();
		List<String> toCCRecipients = null;

		if (email.getFrom() == null) {
			email.setFrom("#{sent.from.email.address}");
		}

		// mangle email recipients if in test
		switch (StringUtils.defaultString(systemPropertyMapper.selectSystemProperty(SystemPropertyMapper.ENVIRONMENT))) {
			case SystemPropertyMapper.ENVIRONMENT_TEST:
				if (isSupportMessage) {
					toRecipients = Arrays.asList("#{support.email}", "garygerber@bluepantsmedia.com");
				} else {
					toRecipients = Arrays.asList("");
				}
				email.setMessage(email.getMessage() + intendedFor + StringUtils.defaultIfEmpty(StringUtils.join(recipients, ", "), "") + " cc:" + StringUtils.join(ccRecipients, ", "));
				break;
			case SystemPropertyMapper.ENVIRONMENT_TRAIN:
				if (isSupportMessage) {
					toRecipients = Arrays.asList("#{support.email}");
					email.setFrom("");
				} else {
					toRecipients = Arrays.asList("");
				}
				email.setMessage(email.getMessage() + intendedFor + StringUtils.defaultIfEmpty(StringUtils.join(recipients, ", "), "") + " cc:" + StringUtils.join(ccRecipients, ", "));
				break;

			case SystemPropertyMapper.ENVIRONMENT_PRODUCTION:
				if (isSupportMessage) {
					toRecipients = Arrays.asList("#{support.email}");
					email.setMessage(email.getMessage() + intendedFor + StringUtils.defaultIfEmpty(StringUtils.join(recipients, ", "), "") + " cc:" + StringUtils.join(ccRecipients, ", "));
				} else {
					// leave the recipients as it is
					toRecipients = recipients;
					toCCRecipients = ccRecipients;
				}
				break;

			case SystemPropertyMapper.ENVIRONMENT_UNITTEST:
				break;
			case SystemPropertyMapper.ENVIRONMENT_DEVELOPMENT:
				toRecipients = Arrays.asList(securityService.getActiveUser().getEmail());
				break;

			default:
				throw new RuntimeException("Unknown environment: " + systemPropertyMapper.selectSystemProperty(SystemPropertyMapper.ENVIRONMENT));
		}

		if (isSupportMessage) {
			email.setSubject("Batch Change (" + systemPropertyMapper.selectSystemProperty(SystemPropertyMapper.ENVIRONMENT).toUpperCase() + "). " + email.getSubject());
		}
		sendMessage(toRecipients, toCCRecipients, email);
	}

	/**
	 * add email address to email and handle invalid email addresses
	 *
	 * @param mimeMessage the mime email message
	 * @param recipientType to/cc
	 * @param recipient email address
	 */
	private void addMimeRecipient(@NonNull final MimeMessage mimeMessage, @NonNull final RecipientType recipientType, @Nullable final String recipient) {
		if (!StringUtils.isBlank(recipient)) {
			try {
				mimeMessage.addRecipient(recipientType, new InternetAddress(recipient));
			} catch (MessagingException e) {
				logger.debug("Invalid email address: '" + recipient + "'");
			}
		}
	}

	/**
	 * send the email message
	 *
	 * @param toRecipients tos
	 * @param toCCRecipients ccs
	 * @param email email
	 */
	private void sendMessage(@NonNull final List<String> toRecipients, @Nullable final List<String> toCCRecipients, @NonNull final Email email) {
		// do the actual sending
		if (!CollectionUtils.isEmpty(toRecipients)) {
			try {
				// send the message
				final MimeMessage mimeMessage = new MimeMessage(loadSession());

				for (String recipient : toRecipients) {
					addMimeRecipient(mimeMessage, RecipientType.TO, recipient);
				}

				for (String recipient : CollectionUtils.emptyIfNull(toCCRecipients)) {
					addMimeRecipient(mimeMessage, RecipientType.CC, recipient);
				}

				mimeMessage.setSubject(email.getSubject());
				mimeMessage.setFrom(new InternetAddress(email.getFrom()));

				// Create a multi-part content
				final MimeMultipart multipart = new MimeMultipart("related");

				// Add the message html to the multi-part content
				BodyPart messageBodyPart = new MimeBodyPart();
				final String messageBody = email.toHtml();
				messageBodyPart.setContent(messageBody, "text/html");
				multipart.addBodyPart(messageBodyPart);
				if (email.getHeaderImage() != null) {
					// Add the image to the multi-part content
					messageBodyPart = new MimeBodyPart();
					messageBodyPart.setDataHandler(new DataHandler(email.getHeaderImage()));
					messageBodyPart.setHeader("Content-ID", "<headerImage>");
					multipart.addBodyPart(messageBodyPart);
				}

				// Add Attachments
				for (InputStream inputStream : CollectionUtils.emptyIfNull(email.getAttachments())) {
					multipart.addBodyPart(new MimeBodyPart(inputStream));
				}

				// Add the multi-part content to message
				mimeMessage.setContent(multipart);
				mimeMessage.saveChanges();

				// !!!! stupid untestable static calls !!!!!
				Transport.send(mimeMessage);
			} catch (MessagingException e) {
				// if getting error sending support message, don't infinite loop
				logger.error("Email not sendable: " + email.toString());
			}
		}
	}

}
