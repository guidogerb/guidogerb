package com.bluepantsmedia.dev.bridgegapp.application.service.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
class TimerServiceImpl implements TimerService {

	private static String secondsToPartsString(double totalSeconds) {
		int hours = (int) Math.floor(totalSeconds / 3600);
		int minutes = (int) Math.floor(totalSeconds - hours * 3600) / 60;
		int seconds = (int) (totalSeconds - hours * 3600 - minutes * 60);
		return StringUtils.leftPad("" + hours, 2, "0") + ":" + StringUtils.leftPad("" + minutes, 2, "0") + ":" + StringUtils.leftPad("" + seconds, 2, "0");
	}

	class Timer {
		// name of the timer (also key of map => timer)
		String name;

		// what was the last timerrange entry that was applied to the average?
		int lastAveragedEntry = 0;

		// the average as of the last time averaged
		double currentAverage;

		// what did you think it would be when it first started?
		double initialEstimate = -1.0;

		List<TimerRange> timerRanges = new ArrayList<>();

		/**
		 * start a new timer range for this timer
		 */
		void startRange() {
			timerRanges.add(new TimerRange());
		}

		/**
		 * get the current timer range being ran
		 * @return timer range
		 */
		TimerRange currentRange() {
			// getting an error here means you are ending a timer that hasn't been created yet (probably a misspelled timer name)
			return timerRanges.get(timerRanges.size() - 1);
		}

		/**
		 * stop the current timer range
		 */
		void stopRange() {
			TimerRange timerRange = currentRange();
			if (timerRange.endNanoTime != 0) {
				throw new RuntimeException("timer already stopped: " + name);
			}
			timerRange.stop();
		}

		/**
		 * show information about this timer
		 */
		void show() {
			StringBuilder stringBuilder = new StringBuilder();

			stringBuilder.append(" -- ").append(name).append(" -- \n");
			if (timerRanges.isEmpty()) {
				stringBuilder.append("not started");
			} else if (timerRanges.size() == 1) {
				timerRanges.get(0).addToString(stringBuilder);
			} else {
				double min = -1;
				double max = 0;
				double total = 0;
				double time;
				int invalidCount = 0;
				// show max/min/average
				for (TimerRange range : timerRanges) {
					if (range.isValid()) {
						time = range.time();
						max = Math.max(time, max);
						if (min == -1) {
							min = time;
						} else {
							min = Math.min(time, min);
						}
						total += time;
					} else {
						invalidCount++;
					}
				}
				stringBuilder.append("total: ")
						.append(TimerServiceImpl.secondsToPartsString(total))
						.append("max: ").append(max)
						.append("; min: ").append(min)
						.append("; average: ").append(total / timerRanges.size())
						.append("; invalid: ").append(invalidCount)
						.append("; Initial Est: ").append(TimerServiceImpl.secondsToPartsString(initialEstimate))
				;
			}
			System.out.println(stringBuilder);
		}

		/**
		 * use a rolling average to determine how much longer this timer expects to run
		 * @param currentStep current item being processed
		 * @param totalSteps total number of items to process
		 * @return a string describing how much time is left
		 */
		String timeRemaining(long currentStep, long totalSteps) {
			String result;
			if (timerRanges.isEmpty()) {
				result = "N/A : timer not started";
			} else {
				// don't tally all time ranges every time, just the new ones
				double total = currentAverage * (double) (lastAveragedEntry + 1);
				for (; lastAveragedEntry < timerRanges.size() && timerRanges.get(lastAveragedEntry).isValid(); lastAveragedEntry++) {
					total += timerRanges.get(lastAveragedEntry).time();
				}

				// how much time on average is left for the remaining steps
				currentAverage = (total / (double) (lastAveragedEntry + 1));
				double secondsRemaining = currentAverage * (double) (totalSteps - currentStep);

				// convert to hours:minutes:seconds
				result = TimerServiceImpl.secondsToPartsString(secondsRemaining) + "; seconds per item=" + currentAverage;

				// remember what you thought it would be
				if (initialEstimate < 0) {
					initialEstimate = secondsRemaining;
				}
			}


			return result + " (" + currentStep + "/" + totalSteps + ")";
		}

	}

	private class TimerRange {
		// for showing begin/end date/time (not nano level)
		Date startDateTime;
		Date endDateTime;

		// nano time is offset, so it'll show time taken but not the actual current time
		long startNanoTime;
		long endNanoTime;


		/**
		 * start a timer
		 */
		TimerRange() {
			startDateTime = new Date();
			endDateTime = null;
			startNanoTime = System.nanoTime();
			endNanoTime = 0;
		}

		/**
		 * end timer by recording its stop time
		 */
		void stop() {
			endNanoTime = System.nanoTime();
			endDateTime = new Date();
		}

		void addToString(StringBuilder stringBuilder) {
			stringBuilder.append("started: ").append(startDateTime).append("; ended: ").append(endDateTime).append("\n");
			if (endNanoTime == 0) {
				stringBuilder.append("not ended\n");
			} else {
				stringBuilder.append("total time: ").append(TimerServiceImpl.secondsToPartsString(time())).append("\n");
			}
		}

		public double time() {
			return (endNanoTime - startNanoTime) / 1000000000.0;
		}

		boolean isValid() {
			return endNanoTime != 0;
		}

	}

	private class BigAverage {
		double max = 0;
		double average = 0;
		double min = 0;
		double count = 0;

		/**
		 * add a number to the averages
		 *
		 * @param number the number to add
		 */
		void addNumber(double number) {
			if (count == 0) {
				max = number;
				min = number;
				average = number;
			} else {
				max = Math.max(max, number);
				min = Math.min(min, number);
				average = (average * count + number) / (count + 1);
			}
			count++;
		}

		/**
		 * show the averages information
		 *
		 * @param units the measurement units for the values (or empty string or null for blank)
		 * @return string of average information
		 */
		String show(String units) {
			return "Memory: average = " + average + StringUtils.defaultString(units, "")
					+ ", max = " + max + StringUtils.defaultString(units, "")
					+ ", min = " + min + StringUtils.defaultString(units, "")
					+ ", count = " + count;
		}
	}

	private Map<String, Timer> timers = new HashMap<>();
	private int count = 0;
	private BigAverage memoryAverage = new BigAverage();


	/**
	 * gets a timer by name or creates a new one if missing
	 * @param timerName the name of the timer
	 * @return a timer for the timer name
	 */
	private Timer getTimer(String timerName) {
		Timer timer = timers.get(timerName);
		if (timer == null) {
			timer = new Timer();
			timer.name = timerName;
			timers.put(timerName, timer);
		}
		return timer;
	}
	public void startTimer(String timerName) {
		getTimer(timerName).startRange();
	}

	public void stopTimer(String timerName) {
		getTimer(timerName).stopRange();
	}

	public void showTimer(String timerName) {
		getTimer(timerName).show();
	}

	public void showTimers() {
		for (String key : timers.keySet()) {
			showTimer(key);
		}
		System.out.println(showMemory());
	}

	/**
	 * convert memory to MB for easier reading
	 * @param bytes how many bytes
	 * @return string of resulting value
	 */
	private double convertMemory(long bytes) {
		// convert to MegaBytes
		return (bytes / 1048576.0);
	}

	/**
	 * show memory stats for the current state of the JVM
	 * @return string of the memory usage
	 */
	private String showMemory() {
		String memoryString = "";
		Runtime instance = Runtime.getRuntime();

		// show memory usage but not every time; post add so that it shows it the first time
		final int SHOW_MEMORY_MOD = 100;
		if (count++ % SHOW_MEMORY_MOD == 0) {
			long usedMemory = (instance.totalMemory() - instance.freeMemory());
			memoryAverage.addNumber(convertMemory(usedMemory));
			memoryString = System.lineSeparator()
					+ "Memory: total = " + convertMemory(instance.totalMemory()) + "MB"
					+ ", max = " + convertMemory(instance.maxMemory()) + "MB"
					+ ", free = " + convertMemory(instance.freeMemory()) + "MB"
					+ ", used = " + convertMemory(usedMemory) + "MB"
					+ ", " + memoryAverage.show("MB");
		}

		return memoryString;
	}

	@Override
	public void reset() {
		timers.clear();
	}

	@Override
	public void timeRemaining(String timerName, long currentStep, long totalSteps) {
		System.out.println("Time Remaining: " + getTimer(timerName).timeRemaining(currentStep, totalSteps) + showMemory());
	}
}
