package com.bluepantsmedia.dev.bridgegapp.application.service.util;

public interface TimerService {

	/**
	 * start a timer
	 * @param timerName name of the timer to start; throws exception if previous timer of this name wasn't stopped
	 */
	void startTimer(String timerName);

	/**
	 * stop a timer
	 * @param timerName name of the timer to stop; throws exception if timer not already started
	 */
	void stopTimer(String timerName);

	/**
	 * show information about a timer: start/stop, started, not started
	 * @param timerName name of timer to show
	 */
	void showTimer(String timerName);

	/**
	 * show all timers
	 */
	void showTimers();

	/**
	 * clear all timer information; clean slate; individual importers shouldn't call this because it would clear all previous importer information if running all importers
	 */
	void reset();

	/**
	 * determine how much time is left based on current timer progress
	 * @param timerName the name of the timer tracking performance
	 * @param currentStep the current step in the total records the timer is tracking
	 * @param totalSteps the total number of steps until the timer is done
	 * @return how many seconds are left until all the steps are done
	 */
	void timeRemaining(String timerName, long currentStep, long totalSteps);
}
