package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model;

import lombok.Data;
import lombok.NonNull;

@Data
@SuppressWarnings("unused")
public class DataListItem {
	private Integer fk;
	private String name;

	public DataListItem(@NonNull Integer fk, @NonNull String name) {
		this.fk = fk;
		this.name = name;
	}
}
