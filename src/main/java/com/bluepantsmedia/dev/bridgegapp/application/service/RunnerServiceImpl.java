package com.bluepantsmedia.dev.bridgegapp.application.service;

import com.bluepantsmedia.dev.bridgegapp.application.mappers.DictionaryMapper;
import com.bluepantsmedia.dev.bridgegapp.application.importer.CreateDictionaryRunner;
import com.bluepantsmedia.dev.bridgegapp.application.importer.TestDBConnectionRunner;
import com.bluepantsmedia.dev.bridgegapp.application.model.MenuItem;
import com.bluepantsmedia.dev.bridgegapp.application.service.util.MapUtil;
import com.bluepantsmedia.dev.bridgegapp.application.service.util.TimerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Nonnull;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RunnerServiceImpl implements RunnerService {

	@Autowired
	private TestDBConnectionRunner testDBConnectionRunner;
	@Autowired
	private CreateDictionaryRunner createDictionaryRunner;
	@Autowired
	protected MapUtil mapUtil;
	@Autowired
	private TimerService timerService;
	@Autowired
	private DictionaryMapper dictionaryMapper;


	@Override
	public List<MenuItem> getMenuItems() {
		return Arrays.asList(
			new MenuItem("T", "Testing DB connection...", testDBConnectionRunner),
		    new MenuItem("D", "Create Dictionary", createDictionaryRunner)
		);
	}

	@Override
	public void runFromMenuSelection(@Nonnull final String menuSelection) {
		timerService.startTimer("Running...");

		final List<String> menuSelections = Arrays.stream(menuSelection.split("")).map(String::toUpperCase).collect(Collectors.toList());

		getMenuItems().stream()
				.filter(menuItem -> "A".equals(menuSelection) || menuSelections.contains(menuItem.getMenuKey()))
				.map(MenuItem::getRunner)
				.forEach(runner -> {
					System.out.println("Running: " + runner.getClass().getName());
					runner.run();
					timerService.showTimers();
				});

		timerService.stopTimer("Running...");
		timerService.showTimers();
	}
	@Override
	public void testDB() {
        try {
        	// test the connection
			System.out.println("Select 1 from dual returned: " + dictionaryMapper.doTest());
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	@Override
	public void createDictionary() {

	}
}
