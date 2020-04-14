package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper;

import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface UnitTestMapper {
	String WHERE =
		"<if test=\"where != null\"> " +
			"<where> " +
				"<foreach index=\"key\" item=\"value\" collection=\"where\" separator=\"AND\"> " +
					"${key} = #{value} " +
				"</foreach> " +
			"</where> " +
		"</if> ";

	/**
	 * generically insert records in to any table. this does not return the PK of the inserted record
	 * !!! do not use this !!! at least, not heavily. this is for testing tables that don't have their own DAO for inserting records.
	 * if you're using this, then the feature you are implementing is probably incomplete or should be refactored.
	 *
	 * @param params map of "table" which is the name of the table, "record" which is the object to insert (uses key/value to know fields to insert and their values)
	 * @return # of inserted records
	 */
	@Insert(
		"<script> " +
			"INSERT INTO ${table} ( " +
				"<foreach index=\"key\" collection=\"record\" separator=\",\"> " +
					"${key} " +
				"</foreach> " +
			") " +
			"VALUES " +
			"( " +
				"<foreach item=\"val\" collection=\"record\" separator=\",\"> " +
					"'${val}' " +
				"</foreach> " +
			") " +
		"</script> "
	)
	int genericInsert(Map<String, Object> params);

	/**
	 * generically updates records in to any table.
	 * !!! do not use this !!! at least, not heavily. this is for testing tables that don't have their own DAO
	 * if you're using this, then the feature you are implementing is probably incomplete or should be refactored.
	 * DO NOT put this in to live production code.
	 *
	 * @param params map => "table": name of table; "record": map of record's fields to update; "where": map of key/field AND where statements (only does = compare)
	 * @return # updated
	 */
	@Update(
		"<script> " +
			"UPDATE ${table} " +
			"<set> " +
				"<foreach index=\"key\" item=\"value\" collection=\"record\" separator=\",\"> " +
					"${key} = #{value} " +
				"</foreach> " +
			"</set> " +
			WHERE +
		"</script> "
	)
	int genericUpdate(Map<String, Object> params);


	/**
	 * generically selects records from any table.
	 * !!! do not use this !!! at least, not heavily. this is for testing tables that don't have their own DAO
	 * if you're using this, then the feature you are implementing is probably incomplete or should be refactored.
	 * DO NOT put this in to live production code.
	 *
	 * @param params map => "table": name of table
	 * @return found records
	 */
	@Select(
		"<script> " +
			"SELECT " +
				"<if test=\"_parameter.containsKey('select')\"> " +
					"<foreach collection=\"select\" separator=\",\" item=\"select\"> " +
						"${select} " +
					"</foreach> " +
				"</if> " +
				"<if test=\"!_parameter.containsKey('select')\"> " +
					"* " +
				"</if> " +
			"FROM ${table} " +
			WHERE +
		"</script> "
	)
	List<Map<String, Object>> genericSelect(Map<String, Object> params);

	/**
	 * generically deletes records from any table.
	 * !!! do not use this !!! at least, not heavily. this is for testing tables that don't have their own DAO
	 * if you're using this, then the feature you are implementing is probably incomplete or should be refactored.
	 * DO NOT put this in to live production code.
	 *
	 * @param params map => "table" : name of table, "where" : map of where exact matches
	 * @return # deleted
	 */
	@Delete(
		"<script> " +
			"DELETE FROM ${table} " +
			WHERE +
		"</script> "
	)
	int genericDelete(Map<String, Object> params);
}
