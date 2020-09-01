package net.komportementalist.web.rest;

import net.komportementalist.domain.DocumentCategory;
import net.komportementalist.repository.DocumentCategoryRepository;
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
 * REST controller for managing {@link net.komportementalist.domain.DocumentCategory}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class DocumentCategoryResource {

    private final Logger log = LoggerFactory.getLogger(DocumentCategoryResource.class);

    private static final String ENTITY_NAME = "documentCategory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentCategoryRepository documentCategoryRepository;

    public DocumentCategoryResource(DocumentCategoryRepository documentCategoryRepository) {
        this.documentCategoryRepository = documentCategoryRepository;
    }

    /**
     * {@code POST  /document-categories} : Create a new documentCategory.
     *
     * @param documentCategory the documentCategory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentCategory, or with status {@code 400 (Bad Request)} if the documentCategory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/document-categories")
    public ResponseEntity<DocumentCategory> createDocumentCategory(@RequestBody DocumentCategory documentCategory) throws URISyntaxException {
        log.debug("REST request to save DocumentCategory : {}", documentCategory);
        if (documentCategory.getId() != null) {
            throw new BadRequestAlertException("A new documentCategory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentCategory result = documentCategoryRepository.save(documentCategory);
        return ResponseEntity.created(new URI("/api/document-categories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /document-categories} : Updates an existing documentCategory.
     *
     * @param documentCategory the documentCategory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentCategory,
     * or with status {@code 400 (Bad Request)} if the documentCategory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentCategory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/document-categories")
    public ResponseEntity<DocumentCategory> updateDocumentCategory(@RequestBody DocumentCategory documentCategory) throws URISyntaxException {
        log.debug("REST request to update DocumentCategory : {}", documentCategory);
        if (documentCategory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentCategory result = documentCategoryRepository.save(documentCategory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, documentCategory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /document-categories} : get all the documentCategories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentCategories in body.
     */
    @GetMapping("/document-categories")
    public List<DocumentCategory> getAllDocumentCategories() {
        log.debug("REST request to get all DocumentCategories");
        return documentCategoryRepository.findAll();
    }

    /**
     * {@code GET  /document-categories/:id} : get the "id" documentCategory.
     *
     * @param id the id of the documentCategory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentCategory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/document-categories/{id}")
    public ResponseEntity<DocumentCategory> getDocumentCategory(@PathVariable Long id) {
        log.debug("REST request to get DocumentCategory : {}", id);
        Optional<DocumentCategory> documentCategory = documentCategoryRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(documentCategory);
    }

    /**
     * {@code DELETE  /document-categories/:id} : delete the "id" documentCategory.
     *
     * @param id the id of the documentCategory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/document-categories/{id}")
    public ResponseEntity<Void> deleteDocumentCategory(@PathVariable Long id) {
        log.debug("REST request to delete DocumentCategory : {}", id);

        documentCategoryRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
