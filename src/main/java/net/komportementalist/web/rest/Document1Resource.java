package net.komportementalist.web.rest;

import net.komportementalist.domain.Document1;
import net.komportementalist.repository.Document1Repository;
import net.komportementalist.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link net.komportementalist.domain.Document1}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class Document1Resource {

    private final Logger log = LoggerFactory.getLogger(Document1Resource.class);

    private static final String ENTITY_NAME = "document1";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final Document1Repository document1Repository;

    public Document1Resource(Document1Repository document1Repository) {
        this.document1Repository = document1Repository;
    }

    /**
     * {@code POST  /document-1-s} : Create a new document1.
     *
     * @param document1 the document1 to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new document1, or with status {@code 400 (Bad Request)} if the document1 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/document-1-s")
    public ResponseEntity<Document1> createDocument1(@Valid @RequestBody Document1 document1) throws URISyntaxException {
        log.debug("REST request to save Document1 : {}", document1);
        if (document1.getId() != null) {
            throw new BadRequestAlertException("A new document1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Document1 result = document1Repository.save(document1);
        return ResponseEntity.created(new URI("/api/document-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /document-1-s} : Updates an existing document1.
     *
     * @param document1 the document1 to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated document1,
     * or with status {@code 400 (Bad Request)} if the document1 is not valid,
     * or with status {@code 500 (Internal Server Error)} if the document1 couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/document-1-s")
    public ResponseEntity<Document1> updateDocument1(@Valid @RequestBody Document1 document1) throws URISyntaxException {
        log.debug("REST request to update Document1 : {}", document1);
        if (document1.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Document1 result = document1Repository.save(document1);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, document1.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /document-1-s} : get all the document1s.
     *
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of document1s in body.
     */
    @GetMapping("/document-1-s")
    public List<Document1> getAllDocument1s(@RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get all Document1s");
        return document1Repository.findAllWithEagerRelationships();
    }

    /**
     * {@code GET  /document-1-s/:id} : get the "id" document1.
     *
     * @param id the id of the document1 to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the document1, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/document-1-s/{id}")
    public ResponseEntity<Document1> getDocument1(@PathVariable Long id) {
        log.debug("REST request to get Document1 : {}", id);
        Optional<Document1> document1 = document1Repository.findOneWithEagerRelationships(id);
        return ResponseUtil.wrapOrNotFound(document1);
    }

    /**
     * {@code DELETE  /document-1-s/:id} : delete the "id" document1.
     *
     * @param id the id of the document1 to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/document-1-s/{id}")
    public ResponseEntity<Void> deleteDocument1(@PathVariable Long id) {
        log.debug("REST request to delete Document1 : {}", id);

        document1Repository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
