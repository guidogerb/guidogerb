package com.bluepantsmedia.dev.bridgegapp.odlgen;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@JsonIgnoreProperties(ignoreUnknown = true)
@Setter
@SuppressWarnings("unused")
public class ColumnMetaData {

	private final String tableName;
	private final String columnName;
	private final int sqlType;
	private final String info;
	private final Integer length;
	private final Integer size;

	public ColumnMetaData(@NonNull final String tableName, @NonNull final String columnName, int sqlType,
						  String info, Integer length, Integer size) {

		this.tableName = tableName;
		this.columnName = columnName;
		this.sqlType = sqlType;
		this.info = info;
		this.length = length;
		this.size = size;
	}

}
