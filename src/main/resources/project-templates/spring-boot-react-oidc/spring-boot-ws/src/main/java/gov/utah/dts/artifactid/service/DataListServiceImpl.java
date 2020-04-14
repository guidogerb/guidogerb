package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.ChangeTypes;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.DataListMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.DataListItem;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.DataListItems;
import lombok.NonNull;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DataListServiceImpl implements DataListService {

	private final DataListMapper dataListMapper;

	public DataListServiceImpl(
			@NonNull final DataListMapper dataListMapper
	) {
		this.dataListMapper = dataListMapper;
	}

	@Override
	public DataListItems getDataListItems() {
		DataListItems items = new DataListItems();
		// agencies
		items.setAgencies(dataListMapper.selectAgencyDataList());
		// benchmarkIDs
		items.setBenchmarkIDs(dataListMapper.selectBenchmarkJobDataList());
		// benchmarkFamilies
		items.setBenchmarkFamilies(dataListMapper.selectBenchmarkFamilyDataList());
		// retirementCodes
		items.setRetirementCodes(dataListMapper.selectRetirementCodeDataList());
		// scheduleCodes
		items.setScheduleCodes(dataListMapper.selectScheduleCodeDataList());
		// actionTypes
		items.setActions(dataListMapper.selectActionDataList());
		items.setActionReasons(dataListMapper.selectActionReasonDataList());
		// changeTYpes
		items.setChangeTypes(getChangeTypeDataListItems());

		return items;
	}

	private List<DataListItem> getChangeTypeDataListItems() {
		List<DataListItem> changeTypeItems = new ArrayList<>();
		List<ChangeTypes> changeTypes = ChangeTypes.allChangeTypes();
		changeTypes.stream().forEach(ct -> {
			changeTypeItems.add(new DataListItem(ct.getId(),ct.getName()));
		});
		return changeTypeItems;
	}
}
