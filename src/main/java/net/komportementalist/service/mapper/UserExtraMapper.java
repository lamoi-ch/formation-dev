package net.komportementalist.service.mapper;


import net.komportementalist.domain.*;
import net.komportementalist.service.dto.UserExtraDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link UserExtra} and its DTO {@link UserExtraDTO}.
 */
@Mapper(componentModel = "spring", uses = {UserCategoryMapper.class})
public interface UserExtraMapper extends EntityMapper<UserExtraDTO, UserExtra> {

    @Mapping(source = "userCategory.id", target = "userCategoryId")
    @Mapping(source = "userCategory.name", target = "userCategoryName")
    UserExtraDTO toDto(UserExtra userExtra);

    @Mapping(source = "userCategoryId", target = "userCategory")
    UserExtra toEntity(UserExtraDTO userExtraDTO);

    default UserExtra fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserExtra userExtra = new UserExtra();
        userExtra.setId(id);
        return userExtra;
    }
}
