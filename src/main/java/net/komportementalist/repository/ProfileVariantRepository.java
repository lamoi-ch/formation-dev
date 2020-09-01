package net.komportementalist.repository;

import net.komportementalist.domain.ProfileVariant;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProfileVariant entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProfileVariantRepository extends JpaRepository<ProfileVariant, Long> {
}
