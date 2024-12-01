package com.bluepantsmedia.dev.bridgegapp.genutils;

import lombok.NonNull;

public class NamingUtils {
	
	public static String toModelName(@NonNull final String tableName){
		String[] tokens = tableName.split("_");
		String result = "";
		
		for(String item: tokens){
			result += item.substring(0, 1).toUpperCase() + item.substring(1).toLowerCase();
		}
		return result;
	}

	
	public static String toVarName(@NonNull final String input){
		String result = toModelName(input);
		result = result.substring(0, 1).toLowerCase() + result.substring(1);
		
		return result;
	}
	
	
	public static String toSqlAlias(@NonNull final String tableName){
		String[] tokens = tableName.split("_");
		String result = "";
		
		for(String item: tokens){
			result += item.substring(0, 1).toLowerCase();
		}
		return result;
	}
	
}
