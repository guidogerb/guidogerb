package com.bluepantsmedia.dev.bridgegapp.application.service.util;

import org.springframework.stereotype.Service;

import java.lang.reflect.InvocationTargetException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MapUtilImpl implements MapUtil {

	@Override
	public Map<String, Object> mapFromKeyValueParams(Object... params) {
		Map<String, Object> resultMap = new HashMap<>();

		for (int i = 0; i < params.length; i += 2) {
			resultMap.put(params[i].toString(), params[i + 1]);
		}

		return resultMap;
	}

	@Override
	public Map<String, ?> createMap(List<?> objectList, String methodNameForKey) {
		if(objectList == null || methodNameForKey == null){
			return null;
		}

		Map<String, Object> map = new HashMap<>();

		try {
			for (Object object : objectList) {
				map.put(object.getClass().getMethod(methodNameForKey).invoke(object).toString(), object);
			}
		} catch (NoSuchMethodException | InvocationTargetException | IllegalAccessException e){
			throw new HappySonarRuntimeException(e.getMessage());
		}

		return map;
	}
}
