package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import lombok.NonNull;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class VersionServiceImpl implements VersionService {

	@Value("${version}")
	protected String version;

	@Override
	@NonNull
	public String getVersion() {
		return version;
	}
}
