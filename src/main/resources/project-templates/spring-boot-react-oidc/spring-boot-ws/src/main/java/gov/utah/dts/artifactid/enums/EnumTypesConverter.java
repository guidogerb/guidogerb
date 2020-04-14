package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums;
import java.beans.PropertyEditorSupport;

public class EnumTypesConverter extends PropertyEditorSupport{
    public void setAsText(final String text) throws IllegalArgumentException {
        setValue(EnumTypes.fromValue(text));
    }
}