package net.komportementalist.web.rest;

import net.komportementalist.domain.FormationType;
import net.komportementalist.repository.FormationTypeRepository;
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
 * REST controller for managing {@link net.komportementalist.domain.FormationType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FormationTypeResource {

    private final Logger log = LoggerFactory.getLogger(FormationTypeResource.class);

    private static final String ENTITY_NAME = "formationType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FormationTypeRepository formationTypeRepository;

    public FormationTypeResource(FormationTypeRepository formationTypeRepository) {
        this.formationTypeRepository = formationTypeRepository;
    }

    /**
     * {@code POST  /formation-types} : Create a new formationType.
     *
     * @param formationType the formationType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formationType, or with status {@code 400 (Bad Request)} if the formationType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/formation-types")
    public ResponseEntity<FormationType> createFormationType(@RequestBody FormationType formationType) throws URISyntaxException {
        log.debug("REST request to save FormationType : {}", formationType);
        if (formationType.getId() != null) {
            throw new BadRequestAlertException("A new formationType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormationType result = formationTypeRepository.save(formationType);
        return ResponseEntity.created(new URI("/api/formation-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /formation-types} : Updates an existing formationType.
     *
     * @param formationType the formationType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated formationType,
     * or with status {@code 400 (Bad Request)} if the formationType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the formationType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/formation-types")
    public ResponseEntity<FormationType> updateFormationType(@RequestBody FormationType formationType) throws URISyntaxException {
        log.debug("REST request to update FormationType : {}", formationType);
        if (formationType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FormationType result = formationTypeRepository.save(formationType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, formationType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /formation-types} : get all the formationTypes.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of formationTypes in body.
     */
    @GetMapping("/formation-types")
    public List<FormationType> getAllFormationTypes(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all FormationTypes");
        return formationTypeRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /formation-types/:id} : get the "id" formationType.
     *
     * @param id the id of the formationType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the formationType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/formation-types/{id}")
    public ResponseEntity<FormationType> getFormationType(@PathVariable Long id) {
        log.debug("REST request to get FormationType : {}", id);
        Optional<FormationType> formationType = formationTypeRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(formationType);
    }

    /**
     * {@code DELETE  /formation-types/:id} : delete the "id" formationType.
     *
     * @param id the id of the formationType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/formation-types/{id}")
    public ResponseEntity<Void> deleteFormationType(@PathVariable Long id) {
        log.debug("REST request to delete FormationType : {}", id);

        formationTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
