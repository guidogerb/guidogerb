package org.bpm.model;
// Generated May 13, 2023, 9:40:18 AM by Hibernate Tools 5.4.30.Final


import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Version;

/**
 * ApplicationUser generated by hbm2java
 */
@Entity
@Table(name="application_user"
    ,schema="public"
)
public class ApplicationUser  implements java.io.Serializable {


     private long id;
     private int version;
     private String hashedPassword;
     private String name;
     private String username;
     private Set<UserRoles> userRoleses = new HashSet<UserRoles>(0);

    public ApplicationUser() {
    }

	
    public ApplicationUser(long id) {
        this.id = id;
    }
    public ApplicationUser(long id, String hashedPassword, String name, String username, Set<UserRoles> userRoleses) {
       this.id = id;
       this.hashedPassword = hashedPassword;
       this.name = name;
       this.username = username;
       this.userRoleses = userRoleses;
    }
   
     @Id 

    
    @Column(name="id", unique=true, nullable=false)
    public long getId() {
        return this.id;
    }
    
    public void setId(long id) {
        this.id = id;
    }

    @Version
    @Column(name="version", nullable=false)
    public int getVersion() {
        return this.version;
    }
    
    public void setVersion(int version) {
        this.version = version;
    }

    
    @Column(name="hashed_password")
    public String getHashedPassword() {
        return this.hashedPassword;
    }
    
    public void setHashedPassword(String hashedPassword) {
        this.hashedPassword = hashedPassword;
    }

    
    @Column(name="name")
    public String getName() {
        return this.name;
    }
    
    public void setName(String name) {
        this.name = name;
    }

    
    @Column(name="username")
    public String getUsername() {
        return this.username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }

@OneToMany(fetch=FetchType.LAZY, mappedBy="applicationUser")
    public Set<UserRoles> getUserRoleses() {
        return this.userRoleses;
    }
    
    public void setUserRoleses(Set<UserRoles> userRoleses) {
        this.userRoleses = userRoleses;
    }




}

