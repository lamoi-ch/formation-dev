package net.komportementalist.repository;

import net.komportementalist.domain.ProgramType;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProgramType entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProgramTypeRepository extends JpaRepository<ProgramType, Long> {
}
