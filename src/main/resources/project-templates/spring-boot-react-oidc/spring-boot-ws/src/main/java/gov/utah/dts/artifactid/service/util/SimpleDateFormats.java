package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util;

import lombok.Getter;
import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.springframework.lang.Nullable;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.chrono.ChronoLocalDate;
import java.time.chrono.ChronoLocalDateTime;
import java.time.format.DateTimeFormatter;

public enum SimpleDateFormats {
	DB_DATE("MM/dd/yyyy"),
	YYYYMMDD("yyyyMMdd"),
	YYYYYMMDD_HHMMSS("yyyyMMdd HH:mm:ss")
	;

	@Getter
	private final SimpleDateFormat simpleDateFormat;

	// patterns are MM which requires two digit month. This is ok for outputting but kills parsing so relax formats for parsing
	@Getter
	private final SimpleDateFormat simpleDateFormatRelaxed;
	private final String format;

	SimpleDateFormats(String format) {
		this.format = format;
		simpleDateFormat = new SimpleDateFormat(format);
		simpleDateFormatRelaxed = new SimpleDateFormat(relaxFormat(format));
	}

	/**
	 * make MM M and dd d so that parsing is a little more lenient
	 *
	 * @param format the full format
	 * @return the format lowered to more lenient levels
	 */
	@NonNull
	private String relaxFormat(@NonNull final String format) {
		return format
			.replaceAll("MM", "M")
			.replaceAll("dd", "d")
			.replaceAll("HH", "H")
			.replaceAll("hh", "h")
			.replaceAll("mm", "m")
			.replaceAll("ss", "s");
	}

	/**
	 * check if the string is not blank and not MM/DD/YYYY
	 *
	 * @param dateString string to test
	 * @return true if plausibly a date
	 */
	private boolean isPlausibleDateString(@Nullable final String dateString) {
		return
			dateString != null
			&& !StringUtils.isBlank(StringUtils.defaultIfBlank(dateString, "").replaceAll("\"", ""))
			&& !dateString.equalsIgnoreCase("MM/DD/YYYY");
	}

	/**
	 * parse a date to a local date time
	 *
	 * @param dateString the string to parse
	 * @return localdatetime representing the date
	 */
	public LocalDateTime parseLocalDateTime(final String dateString) {
		return isPlausibleDateString(dateString) ? LocalDateTime.parse(dateString, DateTimeFormatter.ofPattern(simpleDateFormatRelaxed.toPattern())) : null;
	}

	/**
	 * parse a date without time, gives exception on date parses that don't have a time
	 *
	 * @param dateString the string to parse
	 * @return a date
	 */
	@Nullable
	public LocalDate parseLocalDate(final String dateString) {
		final String parseDateString = format.contains(" ") ? dateString : stripTime(dateString);
		return isPlausibleDateString(dateString) ? LocalDate.parse(parseDateString, DateTimeFormatter.ofPattern(simpleDateFormatRelaxed.toPattern())) : null;
	}

	/**
	 * strip the time off a date string if it has it so that the parser doesn't choke... there has to be an easier way...
	 * assumes the time is the 2nd part of the string separated by a space from the date
	 *
	 * @param dateString the date string that may have a time component on it
	 * @return date string without time
	 */
	@NonNull
	private String stripTime(@NonNull final String dateString) {
		return StringUtils.isEmpty(dateString) ? dateString : StringUtils.split(dateString, ' ')[0];
	}

	/**
	 * format a localdatetime
	 *
	 * @param localDateTime the date/time to format
	 * @return formatted date string
	 */
	@NonNull
	public String format(ChronoLocalDateTime localDateTime) {
		return localDateTime == null ? "" : localDateTime.format(dateTimeFormatter());
	}

	/**
	 * format a localdatetime
	 *
	 * @param localDate the date to format
	 * @return formatted date string
	 */
	@NonNull
	public String format(ChronoLocalDate localDate) {
		return localDate == null ? "" : localDate.format(dateTimeFormatter());
	}

	/**
	 * started using LocalDateTime after simpledateformats, so jury rigging localdatetime into simple date format
	 * assumes date formats are the same between DateTimeFormatter and SimpleDateFormat
	 *
	 * @return DateTimeFormatter for the SimpleDateFormatter
	 */
	@NonNull
	public DateTimeFormatter dateTimeFormatter() {
		return DateTimeFormatter.ofPattern(simpleDateFormat.toPattern());
	}

	/**
	 * use relaxed version of formatter with MM => M and dd => d so that parsing is more lenient
	 *
	 * @return more lenient form of the pattern
	 */
	@NonNull
	public DateTimeFormatter dateTimeFormatterRelaxed() {
		return DateTimeFormatter.ofPattern(simpleDateFormatRelaxed.toPattern());
	}

	@NonNull
	public String addTime(@Nullable final String dateString) {
		// here is an example the correct format: 12/11/2013 12:00:00 AM
		// Add default time 12:00:00 AM only if input parameter contains at least valid date: the length >= 10 and < 22
		final String useDateString = StringUtils.defaultString(dateString);
		return (dateString != null && (dateString.length() >=8) && (dateString.length() <11)) ? useDateString + " 12:00:00 AM" : useDateString;
	}
}
