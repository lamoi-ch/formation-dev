package net.komportementalist.service.dto;

import java.io.Serializable;

/**
 * A DTO for the {@link net.komportementalist.domain.UserExtra} entity.
 */
public class UserExtraDTO implements Serializable {
    
    private Long id;

    private String name;


    private Long userCategoryId;

    private String userCategoryName;
    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getUserCategoryId() {
        return userCategoryId;
    }

    public void setUserCategoryId(Long userCategoryId) {
        this.userCategoryId = userCategoryId;
    }

    public String getUserCategoryName() {
        return userCategoryName;
    }

    public void setUserCategoryName(String userCategoryName) {
        this.userCategoryName = userCategoryName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserExtraDTO)) {
            return false;
        }

        return id != null && id.equals(((UserExtraDTO) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserExtraDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", userCategoryId=" + getUserCategoryId() +
            ", userCategoryName='" + getUserCategoryName() + "'" +
            "}";
    }
}
