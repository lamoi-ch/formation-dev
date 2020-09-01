package net.komportementalist.service.mapper;


import net.komportementalist.domain.*;
import net.komportementalist.service.dto.DocumentCategory1DTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link DocumentCategory1} and its DTO {@link DocumentCategory1DTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DocumentCategory1Mapper extends EntityMapper<DocumentCategory1DTO, DocumentCategory1> {


    @Mapping(target = "documents", ignore = true)
    @Mapping(target = "removeDocuments", ignore = true)
    DocumentCategory1 toEntity(DocumentCategory1DTO documentCategory1DTO);

    default DocumentCategory1 fromId(Long id) {
        if (id == null) {
            return null;
        }
        DocumentCategory1 documentCategory1 = new DocumentCategory1();
        documentCategory1.setId(id);
        return documentCategory1;
    }
}
