package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.DataListItem;
import lombok.NonNull;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DataListMapper {

	@Select("SELECT schedule_pk fk, description name FROM schedule WHERE status = 'A' ORDER BY description ASC")
	List<DataListItem> selectScheduleCodeDataList();

	@NonNull
	@Select("SELECT agency_pk fk, name FROM agency WHERE active = 1 ORDER BY name ASC")
	List<DataListItem> selectAgencyDataList();

}
