package net.komportementalist.repository;

import net.komportementalist.domain.Document1;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Spring Data  repository for the Document1 entity.
 */
@Repository
public interface Document1Repository extends JpaRepository<Document1, Long> {

    @Query(value = "select distinct document1 from Document1 document1 left join fetch document1.documentCategories",
        countQuery = "select count(distinct document1) from Document1 document1")
    Page<Document1> findAllWithEagerRelationships(Pageable pageable);

    @Query("select distinct document1 from Document1 document1 left join fetch document1.documentCategories")
    List<Document1> findAllWithEagerRelationships();

    @Query("select document1 from Document1 document1 left join fetch document1.documentCategories where document1.id =:id")
    Optional<Document1> findOneWithEagerRelationships(@Param("id") Long id);
}
