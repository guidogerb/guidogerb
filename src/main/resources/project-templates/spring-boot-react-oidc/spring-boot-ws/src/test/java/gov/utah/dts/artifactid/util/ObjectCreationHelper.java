package com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.util;

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.enums.SecurityRole;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.model.SecurityUser;
import lombok.NonNull;
import org.springframework.lang.Nullable;

import java.util.List;

public interface ObjectCreationHelper {
	SecurityUser createSecurityUser();
}
