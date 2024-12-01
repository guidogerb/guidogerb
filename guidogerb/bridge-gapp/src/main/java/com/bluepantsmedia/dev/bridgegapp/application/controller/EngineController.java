package com.bluepantsmedia.dev.bridgegapp.application.controller;

import com.bluepantsmedia.dev.bridgegapp.application.service.RunnerService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;

import javax.annotation.Nonnull;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class EngineController {

	@Autowired
	private RunnerService runnerService;

	/**
	 * main menu
	 *
	 * @return string of main menu
	 */
	private String menuMain() {
		final List<String> options = new ArrayList<>();

		options.add("A.  Run All");
		options.addAll(runnerService.getMenuItems().stream()
			.map(menuItem -> menuItem.getMenuKey() + ".  " + menuItem.getMenuName())
			.collect(Collectors.toList())
		);
		options.add("Q.  Quit");

		return StringUtils.join(options, "\n");
	}

	/**
	 * show a menu and get a selection from the user (or auto choose an answer from args)
	 *
	 * @param menu the menu to show
	 * @return the menu item selected by user or command line
	 */
	private String readMenuItem(String menu) {
		System.out.println("\n" + menu);
		try {
			return new BufferedReader(new InputStreamReader(System.in)).readLine();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	public void run(@Nonnull final List<String> args) {
		String selection;
		if (CollectionUtils.isEmpty(args)) {
			selection = readMenuItem(menuMain());
		} else {
			selection = StringUtils.join(args.get(0), "");
		}
		runnerService.runFromMenuSelection(selection);
	}
}
