package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@SuppressWarnings("unused")
public class ErrorLog {
	private Long errorLogPk;
	private LocalDateTime createDate;
	private String message;
}
