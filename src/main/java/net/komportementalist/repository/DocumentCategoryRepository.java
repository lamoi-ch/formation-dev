package net.komportementalist.repository;

import net.komportementalist.domain.DocumentCategory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the DocumentCategory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface DocumentCategoryRepository extends JpaRepository<DocumentCategory, Long> {
}
