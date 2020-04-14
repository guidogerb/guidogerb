package com.bluepantsmedia.dev.bridgegapp.application.service.util;

import java.util.List;
import java.util.Map;

public interface MapUtil {

	/**
	 * send in string parameters to get a map back
	 *
	 * @param params paramter[n] is key [n+1] is value
	 * @return map of key->value
	 */
	Map<String, Object> mapFromKeyValueParams(Object... params);

	/**
	 * create a map of objects with the value found in the methodNameForKey method
	 *
	 * @param objectList list to be converted
	 * @param methodNameForKey this is the name of the method that will be used to retrieve the value that will be used as the key for the map
	 * @return a map of objects
	 */
	Map<String, ?> createMap(List<?> objectList, String methodNameForKey);
}
