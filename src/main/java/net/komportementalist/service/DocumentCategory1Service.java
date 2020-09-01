package net.komportementalist.service;

import net.komportementalist.domain.DocumentCategory1;
import net.komportementalist.repository.DocumentCategory1Repository;
import net.komportementalist.repository.search.DocumentCategory1SearchRepository;
import net.komportementalist.service.dto.DocumentCategory1DTO;
import net.komportementalist.service.mapper.DocumentCategory1Mapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing {@link DocumentCategory1}.
 */
@Service
@Transactional
public class DocumentCategory1Service {

    private final Logger log = LoggerFactory.getLogger(DocumentCategory1Service.class);

    private final DocumentCategory1Repository documentCategory1Repository;

    private final DocumentCategory1Mapper documentCategory1Mapper;

    private final DocumentCategory1SearchRepository documentCategory1SearchRepository;

    public DocumentCategory1Service(DocumentCategory1Repository documentCategory1Repository, DocumentCategory1Mapper documentCategory1Mapper, DocumentCategory1SearchRepository documentCategory1SearchRepository) {
        this.documentCategory1Repository = documentCategory1Repository;
        this.documentCategory1Mapper = documentCategory1Mapper;
        this.documentCategory1SearchRepository = documentCategory1SearchRepository;
    }

    /**
     * Save a documentCategory1.
     *
     * @param documentCategory1DTO the entity to save.
     * @return the persisted entity.
     */
    public DocumentCategory1DTO save(DocumentCategory1DTO documentCategory1DTO) {
        log.debug("Request to save DocumentCategory1 : {}", documentCategory1DTO);
        DocumentCategory1 documentCategory1 = documentCategory1Mapper.toEntity(documentCategory1DTO);
        documentCategory1 = documentCategory1Repository.save(documentCategory1);
        DocumentCategory1DTO result = documentCategory1Mapper.toDto(documentCategory1);
        documentCategory1SearchRepository.save(documentCategory1);
        return result;
    }

    /**
     * Get all the documentCategory1s.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<DocumentCategory1DTO> findAll(Pageable pageable) {
        log.debug("Request to get all DocumentCategory1s");
        return documentCategory1Repository.findAll(pageable)
            .map(documentCategory1Mapper::toDto);
    }


    /**
     * Get one documentCategory1 by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<DocumentCategory1DTO> findOne(Long id) {
        log.debug("Request to get DocumentCategory1 : {}", id);
        return documentCategory1Repository.findById(id)
            .map(documentCategory1Mapper::toDto);
    }

    /**
     * Delete the documentCategory1 by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete DocumentCategory1 : {}", id);

        documentCategory1Repository.deleteById(id);
        documentCategory1SearchRepository.deleteById(id);
    }

    /**
     * Search for the documentCategory1 corresponding to the query.
     *
     * @param query the query of the search.
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public Page<DocumentCategory1DTO> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of DocumentCategory1s for query {}", query);
        return documentCategory1SearchRepository.search(queryStringQuery(query), pageable)
            .map(documentCategory1Mapper::toDto);
    }
}
