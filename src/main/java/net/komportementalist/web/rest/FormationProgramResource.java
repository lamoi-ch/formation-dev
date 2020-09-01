package net.komportementalist.web.rest;

import net.komportementalist.domain.FormationProgram;
import net.komportementalist.repository.FormationProgramRepository;
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
 * REST controller for managing {@link net.komportementalist.domain.FormationProgram}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class FormationProgramResource {

    private final Logger log = LoggerFactory.getLogger(FormationProgramResource.class);

    private static final String ENTITY_NAME = "formationProgram";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FormationProgramRepository formationProgramRepository;

    public FormationProgramResource(FormationProgramRepository formationProgramRepository) {
        this.formationProgramRepository = formationProgramRepository;
    }

    /**
     * {@code POST  /formation-programs} : Create a new formationProgram.
     *
     * @param formationProgram the formationProgram to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new formationProgram, or with status {@code 400 (Bad Request)} if the formationProgram has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/formation-programs")
    public ResponseEntity<FormationProgram> createFormationProgram(@RequestBody FormationProgram formationProgram) throws URISyntaxException {
        log.debug("REST request to save FormationProgram : {}", formationProgram);
        if (formationProgram.getId() != null) {
            throw new BadRequestAlertException("A new formationProgram cannot already have an ID", ENTITY_NAME, "idexists");
        }
        FormationProgram result = formationProgramRepository.save(formationProgram);
        return ResponseEntity.created(new URI("/api/formation-programs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /formation-programs} : Updates an existing formationProgram.
     *
     * @param formationProgram the formationProgram to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated formationProgram,
     * or with status {@code 400 (Bad Request)} if the formationProgram is not valid,
     * or with status {@code 500 (Internal Server Error)} if the formationProgram couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/formation-programs")
    public ResponseEntity<FormationProgram> updateFormationProgram(@RequestBody FormationProgram formationProgram) throws URISyntaxException {
        log.debug("REST request to update FormationProgram : {}", formationProgram);
        if (formationProgram.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        FormationProgram result = formationProgramRepository.save(formationProgram);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, formationProgram.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /formation-programs} : get all the formationPrograms.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of formationPrograms in body.
     */
    @GetMapping("/formation-programs")
    public List<FormationProgram> getAllFormationPrograms(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all FormationPrograms");
        return formationProgramRepository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /formation-programs/:id} : get the "id" formationProgram.
     *
     * @param id the id of the formationProgram to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the formationProgram, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/formation-programs/{id}")
    public ResponseEntity<FormationProgram> getFormationProgram(@PathVariable Long id) {
        log.debug("REST request to get FormationProgram : {}", id);
        Optional<FormationProgram> formationProgram = formationProgramRepository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(formationProgram);
    }

    /**
     * {@code DELETE  /formation-programs/:id} : delete the "id" formationProgram.
     *
     * @param id the id of the formationProgram to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/formation-programs/{id}")
    public ResponseEntity<Void> deleteFormationProgram(@PathVariable Long id) {
        log.debug("REST request to delete FormationProgram : {}", id);

        formationProgramRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
