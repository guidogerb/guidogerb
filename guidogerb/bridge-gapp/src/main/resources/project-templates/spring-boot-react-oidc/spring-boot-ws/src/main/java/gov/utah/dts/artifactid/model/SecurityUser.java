package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model;

import lombok.Data;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Data
public final class SecurityUser implements Serializable {

	private String uid;
	private String firstName;
	private String lastName;
	private String email;
	private String phone;
	private String lastModifiedDate;

	private List<String> roles = new ArrayList<>();
}
