package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.controller;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.EnumTypes;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.EnumTypesConverter;
import lombok.NonNull;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.*;

@RequestMapping("enum")
@RestController
@CrossOrigin
public class PathVariableEnumController {

/*
	private final SomeService someService;

	PathVariableEnumController(SomeService someService) {
		this.someService = someService;
	}
*/
	PathVariableEnumController() {
	}

	@GetMapping("get/{enumType}")
	public EnumTypes getEnumItem(@PathVariable(value="enumType") @NonNull final EnumTypes enumType) {
		return itemType;
	}

	@InitBinder
	public void initBinder(final WebDataBinder webdataBinder) {
		webdataBinder.registerCustomEditor(EnumTypes.class, new EnumTypesConverter());
	}

}
