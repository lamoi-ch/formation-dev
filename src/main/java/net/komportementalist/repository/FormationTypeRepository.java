package net.komportementalist.repository;

import net.komportementalist.domain.FormationType;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the FormationType entity.
 */
@Repository
public interface FormationTypeRepository extends JpaRepository<FormationType, Long> {

    @Query(value = "select distinct formationType from FormationType formationType left join fetch formationType.documents",
        countQuery = "select count(distinct formationType) from FormationType formationType")
    Page<FormationType> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct formationType from FormationType formationType left join fetch formationType.documents")
    List<FormationType> findAllWithEagerRelationships();

    @Query("select formationType from FormationType formationType left join fetch formationType.documents where formationType.id =:id")
    Optional<FormationType> findOneWithEagerRelationships(@Param("id") Long id);
}
