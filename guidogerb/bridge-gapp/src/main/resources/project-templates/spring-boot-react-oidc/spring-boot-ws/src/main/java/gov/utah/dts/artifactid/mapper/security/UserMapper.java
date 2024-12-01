package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import lombok.NonNull;
import org.apache.ibatis.annotations.*;
import org.springframework.lang.Nullable;

import java.util.List;

@Mapper
public interface UserMapper {

	@Nullable
	@Select(
		"SELECT '#{uid}' from dual"
	)
	SecurityUser selectUserByUid(@Param("uid") @NonNull final String uid);

}
