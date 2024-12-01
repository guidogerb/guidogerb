package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.security;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

// a role is an action is a thing that someone can do like edit position or view ssn or run a report
@Getter
@Setter
@SuppressWarnings("unused")
public class Role implements Serializable {
	private static final long serialVersionUID = 6955398607172486917L;
	private Integer rolePk;
	private String name;
	private String description;

}
