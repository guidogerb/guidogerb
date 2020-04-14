package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.ErrorLog;
import lombok.NonNull;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface ErrorLogMapper {

	@Insert("INSERT INTO error_log (create_date, message) VALUES (#{createDate}, #{message})")
	@Options(useGeneratedKeys = true, keyProperty = "errorLogPk", keyColumn = "error_log_pk")
	int insertErrorLog(@NonNull final ErrorLog errorLog);

}
