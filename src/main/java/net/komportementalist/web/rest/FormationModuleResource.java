package net.komportementalist.web.rest;

import net.komportementalist.domain.FormationModule;
import net.komportementalist.repository.FormationModuleRepository;
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
 * REST controller for managing {@link net.komportementalist.domain.FormationModule}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FormationModuleResource {

    private final Logger log = LoggerFactory.getLogger(FormationModuleResource.class);

    private static final String ENTITY_NAME = "formationModule";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FormationModuleRepository formationModuleRepository;

    public FormationModuleResource(FormationModuleRepository formationModuleRepository) {
        this.formationModuleRepository = formationModuleRepository;
    }

    /**
     * {@code POST  /formation-modules} : Create a new formationModule.
     *
     * @param formationModule the formationModule to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formationModule, or with status {@code 400 (Bad Request)} if the formationModule has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/formation-modules")
    public ResponseEntity<FormationModule> createFormationModule(@RequestBody FormationModule formationModule) throws URISyntaxException {
        log.debug("REST request to save FormationModule : {}", formationModule);
        if (formationModule.getId() != null) {
            throw new BadRequestAlertException("A new formationModule cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormationModule result = formationModuleRepository.save(formationModule);
        return ResponseEntity.created(new URI("/api/formation-modules/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /formation-modules} : Updates an existing formationModule.
     *
     * @param formationModule the formationModule to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated formationModule,
     * or with status {@code 400 (Bad Request)} if the formationModule is not valid,
     * or with status {@code 500 (Internal Server Error)} if the formationModule couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/formation-modules")
    public ResponseEntity<FormationModule> updateFormationModule(@RequestBody FormationModule formationModule) throws URISyntaxException {
        log.debug("REST request to update FormationModule : {}", formationModule);
        if (formationModule.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FormationModule result = formationModuleRepository.save(formationModule);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, formationModule.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /formation-modules} : get all the formationModules.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of formationModules in body.
     */
    @GetMapping("/formation-modules")
    public List<FormationModule> getAllFormationModules(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all FormationModules");
        return formationModuleRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /formation-modules/:id} : get the "id" formationModule.
     *
     * @param id the id of the formationModule to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the formationModule, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/formation-modules/{id}")
    public ResponseEntity<FormationModule> getFormationModule(@PathVariable Long id) {
        log.debug("REST request to get FormationModule : {}", id);
        Optional<FormationModule> formationModule = formationModuleRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(formationModule);
    }

    /**
     * {@code DELETE  /formation-modules/:id} : delete the "id" formationModule.
     *
     * @param id the id of the formationModule to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/formation-modules/{id}")
    public ResponseEntity<Void> deleteFormationModule(@PathVariable Long id) {
        log.debug("REST request to delete FormationModule : {}", id);

        formationModuleRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
