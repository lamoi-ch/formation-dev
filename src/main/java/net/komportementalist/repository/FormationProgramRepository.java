package net.komportementalist.repository;

import net.komportementalist.domain.FormationProgram;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FormationProgram entity.
 */
@Repository
public interface FormationProgramRepository extends JpaRepository<FormationProgram, Long> {

    @Query(value = "select distinct formationProgram from FormationProgram formationProgram left join fetch formationProgram.formationModules",
        countQuery = "select count(distinct formationProgram) from FormationProgram formationProgram")
    Page<FormationProgram> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct formationProgram from FormationProgram formationProgram left join fetch formationProgram.formationModules")
    List<FormationProgram> findAllWithEagerRelationships();

    @Query("select formationProgram from FormationProgram formationProgram left join fetch formationProgram.formationModules where formationProgram.id =:id")
    Optional<FormationProgram> findOneWithEagerRelationships(@Param("id") Long id);
}
