package org.communique.data.endpoint;

import com.vaadin.flow.server.auth.AnonymousAllowed;
import dev.hilla.Endpoint;
import java.util.Optional;

import jakarta.annotation.security.RolesAllowed;
import org.communique.data.entity.User;
import org.communique.security.AuthenticatedUser;
import org.springframework.beans.factory.annotation.Autowired;

@Endpoint
@RolesAllowed({"USER", "ADMIN"})
public class UserEndpoint {

    @Autowired
    private AuthenticatedUser authenticatedUser;

    public Optional<User> getAuthenticatedUser() {
        return authenticatedUser.get();
    }
}
