package com.bluepantsmedia.dev.bridgegapp.application.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
@SuppressWarnings("unused")
public class DictAscii {
    int id;
    String value;
    int versionFk;
}
