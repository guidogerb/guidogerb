package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.BaseConfigTest;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.DataListItem;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.DataListItems;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.WebserviceResponse;
import org.junit.Assert;
import org.junit.Test;

import java.util.List;
import java.util.Map;

public class DataListServiceTest extends BaseConfigTest {
	@Test
	public void dataLists() {
		DataListItems items = dataListService.getDataListItems();
		Assert.assertNotNull(items);

	}
}
