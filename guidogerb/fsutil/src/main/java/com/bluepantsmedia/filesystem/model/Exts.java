package com.bluepantsmedia.filesystem.model;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
@Table(name = "exts")
public class Exts {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    @Column(unique=true)
    private String ext;

    private String description;

    public Exts(String ext, String description) {
        this.ext = ext;
        this.description = description;
    }

    public Exts() {}

}
