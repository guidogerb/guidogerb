package com.bluepantsmedia.dev.bridgegapp.application.enums;

import lombok.Getter;

/**
 * these are the possible things to reset; the delete from table query checks against these flags to see which tables to
 * remove
 */
@Getter
@SuppressWarnings("PMD.UnusedPrivateField")
public enum DestinationEnvironment {
	LOCALHOST, HRIS_DEV, PROD;

	final public static DestinationEnvironment CURRENT_ENVIRONMENT = LOCALHOST;
}
