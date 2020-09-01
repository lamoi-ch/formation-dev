package net.komportementalist.web.rest;

import net.komportementalist.domain.ProgramType;
import net.komportementalist.repository.ProgramTypeRepository;
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
 * REST controller for managing {@link net.komportementalist.domain.ProgramType}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProgramTypeResource {

    private final Logger log = LoggerFactory.getLogger(ProgramTypeResource.class);

    private static final String ENTITY_NAME = "programType";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProgramTypeRepository programTypeRepository;

    public ProgramTypeResource(ProgramTypeRepository programTypeRepository) {
        this.programTypeRepository = programTypeRepository;
    }

    /**
     * {@code POST  /program-types} : Create a new programType.
     *
     * @param programType the programType to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new programType, or with status {@code 400 (Bad Request)} if the programType has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/program-types")
    public ResponseEntity<ProgramType> createProgramType(@RequestBody ProgramType programType) throws URISyntaxException {
        log.debug("REST request to save ProgramType : {}", programType);
        if (programType.getId() != null) {
            throw new BadRequestAlertException("A new programType cannot already have an ID", ENTITY_NAME, "idexists");
        }
        ProgramType result = programTypeRepository.save(programType);
        return ResponseEntity.created(new URI("/api/program-types/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /program-types} : Updates an existing programType.
     *
     * @param programType the programType to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated programType,
     * or with status {@code 400 (Bad Request)} if the programType is not valid,
     * or with status {@code 500 (Internal Server Error)} if the programType couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/program-types")
    public ResponseEntity<ProgramType> updateProgramType(@RequestBody ProgramType programType) throws URISyntaxException {
        log.debug("REST request to update ProgramType : {}", programType);
        if (programType.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ProgramType result = programTypeRepository.save(programType);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, programType.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /program-types} : get all the programTypes.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of programTypes in body.
     */
    @GetMapping("/program-types")
    public List<ProgramType> getAllProgramTypes() {
        log.debug("REST request to get all ProgramTypes");
        return programTypeRepository.findAll();
    }

    /**
     * {@code GET  /program-types/:id} : get the "id" programType.
     *
     * @param id the id of the programType to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the programType, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/program-types/{id}")
    public ResponseEntity<ProgramType> getProgramType(@PathVariable Long id) {
        log.debug("REST request to get ProgramType : {}", id);
        Optional<ProgramType> programType = programTypeRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(programType);
    }

    /**
     * {@code DELETE  /program-types/:id} : delete the "id" programType.
     *
     * @param id the id of the programType to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/program-types/{id}")
    public ResponseEntity<Void> deleteProgramType(@PathVariable Long id) {
        log.debug("REST request to delete ProgramType : {}", id);

        programTypeRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
