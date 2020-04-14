package com.bluepantsmedia.dev.bridgegapp.application.model;

import com.bluepantsmedia.dev.bridgegapp.application.importer.BaseRunner;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@SuppressWarnings("PMD.UnusedPrivateField")
public class MenuItem {
	private String menuKey;
	private String menuName;
	private BaseRunner runner;
}
