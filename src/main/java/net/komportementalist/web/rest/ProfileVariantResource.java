package net.komportementalist.web.rest;

import net.komportementalist.domain.ProfileVariant;
import net.komportementalist.repository.ProfileVariantRepository;
import net.komportementalist.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link net.komportementalist.domain.ProfileVariant}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfileVariantResource {

    private final Logger log = LoggerFactory.getLogger(ProfileVariantResource.class);

    private static final String ENTITY_NAME = "profileVariant";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfileVariantRepository profileVariantRepository;

    public ProfileVariantResource(ProfileVariantRepository profileVariantRepository) {
        this.profileVariantRepository = profileVariantRepository;
    }

    /**
     * {@code POST  /profile-variants} : Create a new profileVariant.
     *
     * @param profileVariant the profileVariant to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profileVariant, or with status {@code 400 (Bad Request)} if the profileVariant has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profile-variants")
    public ResponseEntity<ProfileVariant> createProfileVariant(@RequestBody ProfileVariant profileVariant) throws URISyntaxException {
        log.debug("REST request to save ProfileVariant : {}", profileVariant);
        if (profileVariant.getId() != null) {
            throw new BadRequestAlertException("A new profileVariant cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProfileVariant result = profileVariantRepository.save(profileVariant);
        return ResponseEntity.created(new URI("/api/profile-variants/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profile-variants} : Updates an existing profileVariant.
     *
     * @param profileVariant the profileVariant to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profileVariant,
     * or with status {@code 400 (Bad Request)} if the profileVariant is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profileVariant couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profile-variants")
    public ResponseEntity<ProfileVariant> updateProfileVariant(@RequestBody ProfileVariant profileVariant) throws URISyntaxException {
        log.debug("REST request to update ProfileVariant : {}", profileVariant);
        if (profileVariant.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProfileVariant result = profileVariantRepository.save(profileVariant);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, profileVariant.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profile-variants} : get all the profileVariants.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profileVariants in body.
     */
    @GetMapping("/profile-variants")
    public List<ProfileVariant> getAllProfileVariants() {
        log.debug("REST request to get all ProfileVariants");
        return profileVariantRepository.findAll();
    }

    /**
     * {@code GET  /profile-variants/:id} : get the "id" profileVariant.
     *
     * @param id the id of the profileVariant to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profileVariant, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profile-variants/{id}")
    public ResponseEntity<ProfileVariant> getProfileVariant(@PathVariable Long id) {
        log.debug("REST request to get ProfileVariant : {}", id);
        Optional<ProfileVariant> profileVariant = profileVariantRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profileVariant);
    }

    /**
     * {@code DELETE  /profile-variants/:id} : delete the "id" profileVariant.
     *
     * @param id the id of the profileVariant to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profile-variants/{id}")
    public ResponseEntity<Void> deleteProfileVariant(@PathVariable Long id) {
        log.debug("REST request to delete ProfileVariant : {}", id);

        profileVariantRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
