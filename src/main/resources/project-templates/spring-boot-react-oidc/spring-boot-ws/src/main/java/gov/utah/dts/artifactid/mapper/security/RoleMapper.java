package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.security.Role;
import lombok.NonNull;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface RoleMapper {

	@NonNull
	@Select(
		"SELECT '#{umdPersonPk}' from dual"
	)
	List<Role> selectRolesForUserPk(@Param("umdPersonPk") @NonNull final Integer umdPersonPk);

}
