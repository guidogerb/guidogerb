package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model;

import lombok.Data;

import java.util.List;

@Data
@SuppressWarnings("unused")
public class DataListItems {

    private List<DataListItem> someCollectionOfDataListItems;
    private List<DataListItem> anotherCollectionOfDataListItems;

}
