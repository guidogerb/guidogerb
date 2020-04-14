package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.UserMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import lombok.NonNull;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

	private final UserMapper userMapper;

	public UserServiceImpl(@NonNull final UserMapper userMapper) {
		this.userMapper = userMapper;
	}

	@Override
	public SecurityUser findByUid(@NonNull final String uid) {
		return userMapper.selectUserByUid(uid);
	}
}
