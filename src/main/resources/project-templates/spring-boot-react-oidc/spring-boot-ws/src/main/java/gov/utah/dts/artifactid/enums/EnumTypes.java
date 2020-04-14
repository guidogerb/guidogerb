package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums;

import lombok.Getter;

import java.util.Arrays;
import java.util.List;

public enum EnumTypes {
    ONE(Constants.TYPE_ONE),
    TWO(Constants.TYPE_TWO);

    @Getter
    private final String value;

    EnumTypes(String type) {
        this.value = type;
    }

    public static List<EnumTypes> allTypes() {
        return Arrays.asList(values());
    }

    public static EnumTypes typeForName(String name) {
        return allTypes().stream().filter(t -> name.equals(t.getValue())).findFirst().orElse(null);
    }

    public static EnumTypes fromValue(String value) {
        for (EnumTypes typeValue : values()) {
            if (typeValue.value.equalsIgnoreCase(value)) {
                return typeValue;
            }
        }
        throw new IllegalArgumentException(
                "Unknown enum type " + value + ", Allowed enumTypes values are " + Arrays.toString(values()));
    }

    public static class Constants {
        private static final String TYPE_ONE = "Type 1 example";
        private static final String TYPE_TWO = "Type 2 example";
    }
}