package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model;

import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

// sonar complains that a list of Map<String, Object> isn't serializable. now it is. kind of...
public class MapSerializable extends HashMap<String, Object> implements Serializable {

	public static MapSerializable convertMap(Map<String, Object> map) {
		MapSerializable mapSerializable = new MapSerializable();
		mapSerializable.putAll(map);
		return mapSerializable;
	}
}
