package net.komportementalist.repository;

import net.komportementalist.domain.FormationModule;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FormationModule entity.
 */
@Repository
public interface FormationModuleRepository extends JpaRepository<FormationModule, Long> {

    @Query(value = "select distinct formationModule from FormationModule formationModule left join fetch formationModule.formationTypes",
        countQuery = "select count(distinct formationModule) from FormationModule formationModule")
    Page<FormationModule> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct formationModule from FormationModule formationModule left join fetch formationModule.formationTypes")
    List<FormationModule> findAllWithEagerRelationships();

    @Query("select formationModule from FormationModule formationModule left join fetch formationModule.formationTypes where formationModule.id =:id")
    Optional<FormationModule> findOneWithEagerRelationships(@Param("id") Long id);
}
