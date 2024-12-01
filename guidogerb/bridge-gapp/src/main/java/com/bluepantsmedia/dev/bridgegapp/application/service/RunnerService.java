package com.bluepantsmedia.dev.bridgegapp.application.service;

import com.bluepantsmedia.dev.bridgegapp.application.model.MenuItem;

import java.util.List;

public interface RunnerService {

	/**
	 * get the menu items
	 *
	 * @return list of menu item information
	 */
	List<MenuItem> getMenuItems();

	/**
	 * run menu items based on what was selected
	 *
	 * @param menuSelection menu item entered
	 */
	void runFromMenuSelection(String menuSelection);

	void testDB();

	void createDictionary();


}
