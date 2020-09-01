package net.komportementalist.repository.search;

import net.komportementalist.domain.DocumentType;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link DocumentType} entity.
 */
public interface DocumentTypeSearchRepository extends ElasticsearchRepository<DocumentType, Long> {
}
