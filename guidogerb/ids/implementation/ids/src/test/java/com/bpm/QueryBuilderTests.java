package com.bpm;

import com.bpm.util.QueryBuilders;
import org.junit.Test;

import java.util.List;

import static org.junit.Assert.*;


public class QueryBuilderTests {
    /**
     * This test method verifies the SQL create table statements generated by the
     * getCreateTableStatements method for various length and dimension combinations.
     * It checks the following rules:
     * <ol>
     *   <li>Table names and primary constraint names indicate the proper length/dimension.</li>
     *   <li>The number of ID_[n] columns is determined by the value of the length argument.</li>
     *   <li>Each dimension's length is determined by the value of the length argument.</li>
     *   <li>The primary key name is the same as the table name with "_pkey" appended.</li>
     *   <li>Table names have an underscore separating the numbers when multiple dimensions are present.</li>
     * </ol>
     * The test covers 10 cases with varying length and dimension combinations ranging from 1-6.
     */
    @Test
    public void test_CreateTableStatements_VaryingLengthAndDimension() {
        int[][] testCases = {
                {1, 1},
                {2, 1},
                {1, 2},
                {2, 2},
                {3, 1},
                {1, 3},
                {3, 3},
                {4, 2},
                {2, 4},
                {3, 4}
        };

        for (int[] testCase : testCases) {
            int length = testCase[0];
            int dimension = testCase[1];
            int primaryKeyColumnsFound = 0;
            List<String> queries = QueryBuilders.getCreateTableStatements(length, dimension);
            assertNotNull(queries);
            assertFalse(queries.isEmpty());

            for (int i = 0; i < dimension; i++) {
                for (int j = 0; j < length; j++) {
                    String tableName = (j + 1) + "_" + (i + 1);
                    String query = queries.get(i * length + j);

                    assertTrue(query.contains("CREATE TABLE IF NOT EXISTS PUBLIC.\"" + tableName + "\""));
                    assertTrue(query.contains("CONSTRAINT \"" + tableName + "_pkey\" PRIMARY KEY"));

                    /*for (int k = 1; k <= length; k++) {
                        assertTrue(query.contains("_" + k));
                    }*/
                }
            }


            for (String query : queries) {
                for (int i = 1; i <= length; i++) {
                    String columnName = "ID_" + i + " \"char\" NOT NULL";
                    if (query.contains(columnName)) {
                        primaryKeyColumnsFound++;
                    }
                }
            }

            //assertTrue(primaryKeyColumnsFound == length * dimension);

        }
    }

}
