package com.bluepantsmedia.dev.bridgegapp.#{artifact-id};

import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.DataListMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.ErrorLogMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.SystemPropertyMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.UnitTestMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.RoleMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.mapper.security.UserMapper;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.*;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.security.SecurityService;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.security.SecurityServiceImpl;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util.EmailService;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.service.util.EmailServiceImpl;
import com.bluepantsmedia.dev.bridgegapp.#{artifact-id}.util.ObjectCreationHelper;
import org.easymock.EasyMock;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Transactional
public abstract class BaseConfigTest {


    @Autowired
    protected ObjectCreationHelper objectCreationHelper;
    @Autowired
    protected UnitTestMapper unitTestMapper;
    @Autowired
    protected DataListMapper dataListMapper;
    @Autowired
    protected RoleMapper roleMapper;
    @Autowired
    protected SystemPropertyMapper systemPropertyMapper;
    @Autowired
    protected UserMapper userMapper;
	@Autowired
	protected ErrorLogMapper errorLogMapper;

    protected DataListServiceImpl dataListService;
    protected EmailServiceImpl emailService;
    protected UserServiceImpl userService;
    protected VersionServiceImpl versionService;
    protected SecurityServiceImpl securityService;


    protected final MockTracker mockTracker;

    protected final EmailService emailServiceMock;
    protected final SecurityService securityServiceMock;


    protected BaseConfigTest() {
        emailServiceMock = EasyMock.mock(EmailService.class);
        securityServiceMock = EasyMock.mock(SecurityService.class);

        mockTracker = new MockTracker();
        mockTracker.addMock(emailServiceMock);
        mockTracker.addMock(securityServiceMock);
    }

    @PostConstruct
    private void postConstruct() {
        // wire services together with mocks as appropriate; there's probably a better way?
        securityService = new SecurityServiceImpl(userMapper);
        dataListService = new DataListServiceImpl(dataListMapper);
        emailService = new EmailServiceImpl();
        userService = new UserServiceImpl(userMapper);
        versionService = new VersionServiceImpl();
    }
}
