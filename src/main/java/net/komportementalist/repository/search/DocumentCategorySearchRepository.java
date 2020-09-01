package net.komportementalist.repository.search;

import net.komportementalist.domain.DocumentCategory;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;


/**
 * Spring Data Elasticsearch repository for the {@link DocumentCategory} entity.
 */
public interface DocumentCategorySearchRepository extends ElasticsearchRepository<DocumentCategory, Long> {
}
