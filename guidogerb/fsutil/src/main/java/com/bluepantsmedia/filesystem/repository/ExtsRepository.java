package com.bluepantsmedia.filesystem.repository;

import com.bluepantsmedia.filesystem.model.Exts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExtsRepository extends JpaRepository<Exts, Long> {

    Exts findByExt(String ext);
}
