package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import lombok.NonNull;
import org.springframework.stereotype.Service;

@Service
public interface VersionService {

	@NonNull
	String getVersion();
}
