package net.komportementalist.web.rest;

import net.komportementalist.domain.UserCategory;
import net.komportementalist.repository.UserCategoryRepository;
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
 * REST controller for managing {@link net.komportementalist.domain.UserCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class UserCategoryResource {

    private final Logger log = LoggerFactory.getLogger(UserCategoryResource.class);

    private static final String ENTITY_NAME = "userCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UserCategoryRepository userCategoryRepository;

    public UserCategoryResource(UserCategoryRepository userCategoryRepository) {
        this.userCategoryRepository = userCategoryRepository;
    }

    /**
     * {@code POST  /user-categories} : Create a new userCategory.
     *
     * @param userCategory the userCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new userCategory, or with status {@code 400 (Bad Request)} if the userCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/user-categories")
    public ResponseEntity<UserCategory> createUserCategory(@RequestBody UserCategory userCategory) throws URISyntaxException {
        log.debug("REST request to save UserCategory : {}", userCategory);
        if (userCategory.getId() != null) {
            throw new BadRequestAlertException("A new userCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UserCategory result = userCategoryRepository.save(userCategory);
        return ResponseEntity.created(new URI("/api/user-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /user-categories} : Updates an existing userCategory.
     *
     * @param userCategory the userCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated userCategory,
     * or with status {@code 400 (Bad Request)} if the userCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the userCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/user-categories")
    public ResponseEntity<UserCategory> updateUserCategory(@RequestBody UserCategory userCategory) throws URISyntaxException {
        log.debug("REST request to update UserCategory : {}", userCategory);
        if (userCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UserCategory result = userCategoryRepository.save(userCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, userCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /user-categories} : get all the userCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of userCategories in body.
     */
    @GetMapping("/user-categories")
    public List<UserCategory> getAllUserCategories() {
        log.debug("REST request to get all UserCategories");
        return userCategoryRepository.findAll();
    }

    /**
     * {@code GET  /user-categories/:id} : get the "id" userCategory.
     *
     * @param id the id of the userCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the userCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/user-categories/{id}")
    public ResponseEntity<UserCategory> getUserCategory(@PathVariable Long id) {
        log.debug("REST request to get UserCategory : {}", id);
        Optional<UserCategory> userCategory = userCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(userCategory);
    }

    /**
     * {@code DELETE  /user-categories/:id} : delete the "id" userCategory.
     *
     * @param id the id of the userCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/user-categories/{id}")
    public ResponseEntity<Void> deleteUserCategory(@PathVariable Long id) {
        log.debug("REST request to delete UserCategory : {}", id);

        userCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
