package net.komportementalist.service;

import java.util.List;

import javax.persistence.criteria.JoinType;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.jhipster.service.QueryService;

import net.komportementalist.domain.DocumentCategory1;
import net.komportementalist.domain.*; // for static metamodels
import net.komportementalist.repository.DocumentCategory1Repository;
import net.komportementalist.repository.search.DocumentCategory1SearchRepository;
import net.komportementalist.service.dto.DocumentCategory1Criteria;
import net.komportementalist.service.dto.DocumentCategory1DTO;
import net.komportementalist.service.mapper.DocumentCategory1Mapper;

/**
 * Service for executing complex queries for {@link DocumentCategory1} entities in the database.
 * The main input is a {@link DocumentCategory1Criteria} which gets converted to {@link Specification},
 * in a way that all the filters must apply.
 * It returns a {@link List} of {@link DocumentCategory1DTO} or a {@link Page} of {@link DocumentCategory1DTO} which fulfills the criteria.
 */
@Service
@Transactional(readOnly = true)
public class DocumentCategory1QueryService extends QueryService<DocumentCategory1> {

    private final Logger log = LoggerFactory.getLogger(DocumentCategory1QueryService.class);

    private final DocumentCategory1Repository documentCategory1Repository;

    private final DocumentCategory1Mapper documentCategory1Mapper;

    private final DocumentCategory1SearchRepository documentCategory1SearchRepository;

    public DocumentCategory1QueryService(DocumentCategory1Repository documentCategory1Repository, DocumentCategory1Mapper documentCategory1Mapper, DocumentCategory1SearchRepository documentCategory1SearchRepository) {
        this.documentCategory1Repository = documentCategory1Repository;
        this.documentCategory1Mapper = documentCategory1Mapper;
        this.documentCategory1SearchRepository = documentCategory1SearchRepository;
    }

    /**
     * Return a {@link List} of {@link DocumentCategory1DTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public List<DocumentCategory1DTO> findByCriteria(DocumentCategory1Criteria criteria) {
        log.debug("find by criteria : {}", criteria);
        final Specification<DocumentCategory1> specification = createSpecification(criteria);
        return documentCategory1Mapper.toDto(documentCategory1Repository.findAll(specification));
    }

    /**
     * Return a {@link Page} of {@link DocumentCategory1DTO} which matches the criteria from the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @param page The page, which should be returned.
     * @return the matching entities.
     */
    @Transactional(readOnly = true)
    public Page<DocumentCategory1DTO> findByCriteria(DocumentCategory1Criteria criteria, Pageable page) {
        log.debug("find by criteria : {}, page: {}", criteria, page);
        final Specification<DocumentCategory1> specification = createSpecification(criteria);
        return documentCategory1Repository.findAll(specification, page)
            .map(documentCategory1Mapper::toDto);
    }

    /**
     * Return the number of matching entities in the database.
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the number of matching entities.
     */
    @Transactional(readOnly = true)
    public long countByCriteria(DocumentCategory1Criteria criteria) {
        log.debug("count by criteria : {}", criteria);
        final Specification<DocumentCategory1> specification = createSpecification(criteria);
        return documentCategory1Repository.count(specification);
    }

    /**
     * Function to convert {@link DocumentCategory1Criteria} to a {@link Specification}
     * @param criteria The object which holds all the filters, which the entities should match.
     * @return the matching {@link Specification} of the entity.
     */
    protected Specification<DocumentCategory1> createSpecification(DocumentCategory1Criteria criteria) {
        Specification<DocumentCategory1> specification = Specification.where(null);
        if (criteria != null) {
            if (criteria.getId() != null) {
                specification = specification.and(buildRangeSpecification(criteria.getId(), DocumentCategory1_.id));
            }
            if (criteria.getName() != null) {
                specification = specification.and(buildStringSpecification(criteria.getName(), DocumentCategory1_.name));
            }
            if (criteria.getDescription() != null) {
                specification = specification.and(buildStringSpecification(criteria.getDescription(), DocumentCategory1_.description));
            }
            if (criteria.getDocumentsId() != null) {
                specification = specification.and(buildSpecification(criteria.getDocumentsId(),
                    root -> root.join(DocumentCategory1_.documents, JoinType.LEFT).get(Document1_.id)));
            }
        }
        return specification;
    }
}
