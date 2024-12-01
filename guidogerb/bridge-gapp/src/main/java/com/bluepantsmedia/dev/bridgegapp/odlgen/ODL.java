package com.bluepantsmedia.dev.bridgegapp.odlgen;

import java.util.Arrays;
import java.util.List;

public enum ODL {
    STRING(Constants.STRING, 1)
    , INTEGER(Constants.INTEGER, 2)
    ;

    public String getColumn() {
        return column;
    }

    public Integer getId() {
        return id;
    }

    private final String column;

    private final Integer id;

    ODL(String column, Integer id) {
        this.column = column;
        this.id = id;
    }

    public static List<ODL> allColumns() {
        return Arrays.asList(values());
    }

    public static ODL columnFormName(String name) {
        return allColumns().stream().filter(r -> name.equals(r.getColumn())).findFirst().orElse(null);
    }

    public static class Constants {
        private static final String STRING = "VARCHAR";
        private static final String INTEGER = "NUMBER";
        private Constants() {
            throw new RuntimeException("Constants are not allowed!");
        }
    }

}
