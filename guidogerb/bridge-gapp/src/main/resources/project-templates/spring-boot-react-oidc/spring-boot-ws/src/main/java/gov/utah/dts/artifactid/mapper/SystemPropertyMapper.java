package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper;

import lombok.NonNull;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface SystemPropertyMapper {

	String ENVIRONMENT = "environment";

	String ENVIRONMENT_UNITTEST = "unittest";
	String ENVIRONMENT_DEVELOPMENT = "development";
	String ENVIRONMENT_TEST = "test";
	String ENVIRONMENT_PRODUCTION = "production";

	@NonNull
	@Select("SELECT property FROM system_property WHERE name = #{name}")
	String selectSystemProperty(@Param("name") @NonNull final String name);
}
