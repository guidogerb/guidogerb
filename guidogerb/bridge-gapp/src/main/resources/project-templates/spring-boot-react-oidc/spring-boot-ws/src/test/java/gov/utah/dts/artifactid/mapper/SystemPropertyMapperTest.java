package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.BaseConfigTest;
import org.junit.Assert;
import org.junit.Test;

public class SystemPropertyMapperTest extends BaseConfigTest {
	@Test
	public void systemPropertySelect() {
		Assert.assertEquals(SystemPropertyMapper.ENVIRONMENT_UNITTEST, systemPropertyMapper.selectSystemProperty("environment"));
	}
}
