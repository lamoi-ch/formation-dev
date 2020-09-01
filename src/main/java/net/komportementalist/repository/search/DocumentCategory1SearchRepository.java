package net.komportementalist.repository.search;

import net.komportementalist.domain.DocumentCategory1;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link DocumentCategory1} entity.
 */
public interface DocumentCategory1SearchRepository extends ElasticsearchRepository<DocumentCategory1, Long> {
}
