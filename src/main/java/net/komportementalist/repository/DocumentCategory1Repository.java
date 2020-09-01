package net.komportementalist.repository;

import net.komportementalist.domain.DocumentCategory1;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DocumentCategory1 entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentCategory1Repository extends JpaRepository<DocumentCategory1, Long>, JpaSpecificationExecutor<DocumentCategory1> {
}
