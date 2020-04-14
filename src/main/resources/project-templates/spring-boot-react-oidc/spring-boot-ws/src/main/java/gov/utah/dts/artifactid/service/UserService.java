package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import lombok.NonNull;

public interface UserService {
	/**
	 * Used by SecurityUserDetailService so no security
	 * @param uid ID from umd/openam
	 * @return UserInfo object
	 */
	SecurityUser findByUid(@NonNull final String uid);
}
