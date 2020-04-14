package com.bluepantsmedia.dev.bridgegapp.#{artifact-id};

import org.assertj.core.util.Arrays;
import org.easymock.EasyMock;
import org.springframework.lang.NonNull;
import org.springframework.lang.Nullable;

import java.util.ArrayList;
import java.util.List;

public class MockTracker {

	final private List<Object> mocks = new ArrayList<>();

	@NonNull
	private List<Object> allMocks(@Nullable final Object... params) {
		final List<Object> allMocks = params == null ? new ArrayList<>() : Arrays.asList(params);
		allMocks.addAll(mocks);
		return allMocks;
	}

	public void replay(@Nullable final Object... params) {
		allMocks(params).forEach(EasyMock::replay);
	}

	public void reset(@Nullable final Object... params) {
		allMocks(params).forEach(EasyMock::reset);
	}

	public void verify(@Nullable final Object... params) {
		allMocks(params).forEach(EasyMock::verify);
	}

	public void addMock(@NonNull final Object mock) {
		mocks.add(mock);
	}

	public void removeMock(@NonNull final Object mock) {
		mocks.remove(mock);
	}
}
