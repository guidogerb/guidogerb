package com.bluepantsmedia.filesystem.model;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Data;

import javax.persistence.*;
import java.nio.file.attribute.FileTime;
import java.sql.Time;
import java.util.Date;

@Data
@Entity
public class FileInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String fileName;

    @Column(unique=true)
    private String movedToFileLocation;

    @Column(unique = true)
    private String originalLinuxFileLocation;

    @Column(unique = true)
    private String originalWindowsFileLocation;

    private String shaHash;
    private Long fileSize;
    private Date created;
    private Date modified;
    private Date accessed;

    @OneToOne
    private Exts ext;

    @Override
    public String toString() {
        ObjectMapper mapper = new ObjectMapper();
        String result = "";
        try {
            result = mapper.writeValueAsString(this);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            result = e.toString();
        }
        return result;
    }
}
