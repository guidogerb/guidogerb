package com.bluepantsmedia.dev.bridgegapp.application.mappers;

import com.bluepantsmedia.dev.bridgegapp.application.model.DictAscii;
import lombok.NonNull;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface DictionaryMapper {

    @NonNull
    @Select("SELECT 1 from dual")
    int doTest();

    @Insert("INSERT INTO dict_ascii (id, value, version_fk) values (dict_ascii_seq.nextval,'adam',1)")
    int insertDictAscii(@NonNull final DictAscii val);
}
