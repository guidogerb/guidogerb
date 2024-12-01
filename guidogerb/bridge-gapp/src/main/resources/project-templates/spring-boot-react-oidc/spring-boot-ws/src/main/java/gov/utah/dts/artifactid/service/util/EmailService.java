package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.SecurityRole;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.Email;
import lombok.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;

public interface EmailService {

	/**
	 * this does the actual physical sending.
	 *
	 * @param recipients list of emails to receives this email
	 * @param ccRecipients list of emails to receives this email
	 * @param email      email object holding email information
	 * @param isSupportMessage if true then email goes to support staff, if false then goes to real people (environment also effects target)
	 */
	void sendEmail(@NonNull final List<String> recipients, @Nullable final List<String> ccRecipients, @NonNull final Email email, final boolean isSupportMessage);


	/**
	 * send email through sendEmail to everyone with any of the roles
	 *
	 * @param role anyone with these -- AT LEAST ONE -- of these roles will receive the email
	 */
	void emailByRole(@NonNull final SecurityRole role, @NonNull final Email email);
}
