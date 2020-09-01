package net.komportementalist.web.rest;

import net.komportementalist.service.DocumentCategory1Service;
import net.komportementalist.web.rest.errors.BadRequestAlertException;
import net.komportementalist.service.dto.DocumentCategory1DTO;
import net.komportementalist.service.dto.DocumentCategory1Criteria;
import net.komportementalist.service.DocumentCategory1QueryService;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * REST controller for managing {@link net.komportementalist.domain.DocumentCategory1}.
 */
@RestController
@RequestMapping("/api")
public class DocumentCategory1Resource {

    private final Logger log = LoggerFactory.getLogger(DocumentCategory1Resource.class);

    private static final String ENTITY_NAME = "documentCategory1";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final DocumentCategory1Service documentCategory1Service;

    private final DocumentCategory1QueryService documentCategory1QueryService;

    public DocumentCategory1Resource(DocumentCategory1Service documentCategory1Service, DocumentCategory1QueryService documentCategory1QueryService) {
        this.documentCategory1Service = documentCategory1Service;
        this.documentCategory1QueryService = documentCategory1QueryService;
    }

    /**
     * {@code POST  /document-category-1-s} : Create a new documentCategory1.
     *
     * @param documentCategory1DTO the documentCategory1DTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new documentCategory1DTO, or with status {@code 400 (Bad Request)} if the documentCategory1 has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/document-category-1-s")
    public ResponseEntity<DocumentCategory1DTO> createDocumentCategory1(@Valid @RequestBody DocumentCategory1DTO documentCategory1DTO) throws URISyntaxException {
        log.debug("REST request to save DocumentCategory1 : {}", documentCategory1DTO);
        if (documentCategory1DTO.getId() != null) {
            throw new BadRequestAlertException("A new documentCategory1 cannot already have an ID", ENTITY_NAME, "idexists");
        }
        DocumentCategory1DTO result = documentCategory1Service.save(documentCategory1DTO);
        return ResponseEntity.created(new URI("/api/document-category-1-s/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /document-category-1-s} : Updates an existing documentCategory1.
     *
     * @param documentCategory1DTO the documentCategory1DTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated documentCategory1DTO,
     * or with status {@code 400 (Bad Request)} if the documentCategory1DTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the documentCategory1DTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/document-category-1-s")
    public ResponseEntity<DocumentCategory1DTO> updateDocumentCategory1(@Valid @RequestBody DocumentCategory1DTO documentCategory1DTO) throws URISyntaxException {
        log.debug("REST request to update DocumentCategory1 : {}", documentCategory1DTO);
        if (documentCategory1DTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        DocumentCategory1DTO result = documentCategory1Service.save(documentCategory1DTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, documentCategory1DTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /document-category-1-s} : get all the documentCategory1s.
     *
     * @param pageable the pagination information.
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of documentCategory1s in body.
     */
    @GetMapping("/document-category-1-s")
    public ResponseEntity<List<DocumentCategory1DTO>> getAllDocumentCategory1s(DocumentCategory1Criteria criteria, Pageable pageable) {
        log.debug("REST request to get DocumentCategory1s by criteria: {}", criteria);
        Page<DocumentCategory1DTO> page = documentCategory1QueryService.findByCriteria(criteria, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /document-category-1-s/count} : count all the documentCategory1s.
     *
     * @param criteria the criteria which the requested entities should match.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the count in body.
     */
    @GetMapping("/document-category-1-s/count")
    public ResponseEntity<Long> countDocumentCategory1s(DocumentCategory1Criteria criteria) {
        log.debug("REST request to count DocumentCategory1s by criteria: {}", criteria);
        return ResponseEntity.ok().body(documentCategory1QueryService.countByCriteria(criteria));
    }

    /**
     * {@code GET  /document-category-1-s/:id} : get the "id" documentCategory1.
     *
     * @param id the id of the documentCategory1DTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the documentCategory1DTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/document-category-1-s/{id}")
    public ResponseEntity<DocumentCategory1DTO> getDocumentCategory1(@PathVariable Long id) {
        log.debug("REST request to get DocumentCategory1 : {}", id);
        Optional<DocumentCategory1DTO> documentCategory1DTO = documentCategory1Service.findOne(id);
        return ResponseUtil.wrapOrNotFound(documentCategory1DTO);
    }

    /**
     * {@code DELETE  /document-category-1-s/:id} : delete the "id" documentCategory1.
     *
     * @param id the id of the documentCategory1DTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/document-category-1-s/{id}")
    public ResponseEntity<Void> deleteDocumentCategory1(@PathVariable Long id) {
        log.debug("REST request to delete DocumentCategory1 : {}", id);

        documentCategory1Service.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }

    /**
     * {@code SEARCH  /_search/document-category-1-s?query=:query} : search for the documentCategory1 corresponding
     * to the query.
     *
     * @param query the query of the documentCategory1 search.
     * @param pageable the pagination information.
     * @return the result of the search.
     */
    @GetMapping("/_search/document-category-1-s")
    public ResponseEntity<List<DocumentCategory1DTO>> searchDocumentCategory1s(@RequestParam String query, Pageable pageable) {
        log.debug("REST request to search for a page of DocumentCategory1s for query {}", query);
        Page<DocumentCategory1DTO> page = documentCategory1Service.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
}
