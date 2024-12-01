package com.bluepantsmedia.dev.bridgegapp.application.importer;

import com.google.gson.Gson;
import com.bluepantsmedia.dev.bridgegapp.application.service.util.TimerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public abstract class BaseRunner {
	@Autowired
	protected TimerService timerService;
	@Autowired
	protected Gson gson;

	public abstract void run();
}
