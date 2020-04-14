package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.BaseConfigTest;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.ErrorLog;
import org.junit.Assert;
import org.junit.Test;

import java.time.LocalDateTime;

public class ErrorLogMapperTest extends BaseConfigTest {
	@Test
	public void systemPropertySelect() {
		final ErrorLog errorLog = new ErrorLog();
		errorLog.setCreateDate(LocalDateTime.now());
		errorLog.setMessage("message");
		errorLogMapper.insertErrorLog(errorLog);
		Assert.assertNotNull(errorLog.getErrorLogPk());
	}
}
