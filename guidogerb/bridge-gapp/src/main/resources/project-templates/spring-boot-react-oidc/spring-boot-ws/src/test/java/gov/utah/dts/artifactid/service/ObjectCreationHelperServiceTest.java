package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.BaseConfigTest;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.batchchange.BatchChange;
import org.easymock.EasyMock;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.security.access.AccessDeniedException;

import java.time.LocalDateTime;
import java.util.List;

public class ObjectCreationHelperServiceTest extends BaseConfigTest {

	@Test
	public void objectCreateHelperForBatchChangeTest() {

		// Verify that if only one Batch Change is created it is not applied batch change.
		List<Integer> batchChangePks = objectCreationHelper.createBatchChange(1);
		Assert.assertEquals(1,batchChangePks.size());
		List<BatchChange> batchChanges = batchChangeMapper.selectAllBatchChanges();
		Assert.assertEquals(1,batchChanges.size());
		BatchChange batchChange = batchChanges.get(0);
		Assert.assertNull(batchChange.getAppliedUmdPersonFk());
		Assert.assertNull(batchChange.getStartDate());
		Assert.assertNull(batchChange.getEndDate());
		Assert.assertEquals(1,batchChangeMapper.deleteBatchChange(batchChangePks.get(0)));

		// Verify that if more than one batch change was created the only last one is the current (not applied), all other are applied
		batchChangePks = objectCreationHelper.createBatchChange(3);
		Assert.assertEquals(3,batchChangePks.size());
		batchChanges = batchChangeMapper.selectAllBatchChanges();
		Assert.assertEquals(3,batchChanges.size());

		batchChange = batchChanges.get(0);
		Assert.assertNotNull(batchChange.getAppliedUmdPersonFk());
		Assert.assertNotNull(batchChange.getStartDate());
		Assert.assertNotNull(batchChange.getEndDate());

		batchChange = batchChanges.get(1);
		Assert.assertNotNull(batchChange.getAppliedUmdPersonFk());
		Assert.assertNotNull(batchChange.getStartDate());
		Assert.assertNotNull(batchChange.getEndDate());

		batchChange = batchChanges.get(2);
		Assert.assertNull(batchChange.getAppliedUmdPersonFk());
		Assert.assertNull(batchChange.getStartDate());
		Assert.assertNull(batchChange.getEndDate());
	}

	@Test
	public void objectCreateHelperForBatchChangeItemTest() {
        // Employee Item

		// Verify that Batch Change Item was creaated

		// Job Item

		// Verify that Batch Change Item was creaated
	}


}
