package com.bluepantsmedia.dev.bridgegapp.application.importer;

import com.bluepantsmedia.dev.bridgegapp.application.service.RunnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CreateDictionaryRunner extends BaseRunner {

	@Autowired
	private RunnerService runnerService;

	@Override
	public void run() {

		final String timerName = "Creating Dictionary";

		timerService.startTimer(timerName);
		runnerService.createDictionary();
		timerService.stopTimer(timerName);
	}
}
