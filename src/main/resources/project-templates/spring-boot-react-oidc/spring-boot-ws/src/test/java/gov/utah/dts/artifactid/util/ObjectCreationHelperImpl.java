package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.util;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.SecurityRole;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.DataListMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.UnitTestMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import lombok.NonNull;
import org.apache.commons.lang3.StringUtils;
import org.junit.Assert;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Service
public class ObjectCreationHelperImpl implements ObjectCreationHelper {

	private final DataListMapper dataListMapper;
	private final UnitTestMapper unitTestMapper;

    public ObjectCreationHelperImpl(
            @NonNull final UnitTestMapper unitTestMapper,
            @NonNull final DataListMapper dataListMapper
	) {
        this.unitTestMapper = unitTestMapper;
        this.dataListMapper = dataListMapper;
    }

	@NonNull
    @Override
    public SecurityUser createSecurityUser() {
/*
        final Integer umdPersonPk = createUmdPerson(1).get(0);
        final SecurityUser securityUser = new SecurityUser();
        securityUser.setUmdPersonPk(umdPersonPk);
        return securityUser;
*/
        return null;
    }

}
