package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.controller;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.DataListItems;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.DataListService;
import lombok.NonNull;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("data")
@RestController
@CrossOrigin
public class DataListController {

	private final DataListService dataListService;

	DataListController(@NonNull final DataListService dataListService) {
		this.dataListService = dataListService;
	}

	@GetMapping("getListItems")
	public DataListItems getListItems() {
		return dataListService.getDataListItems();
	}
}
