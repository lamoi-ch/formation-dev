package net.komportementalist.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link DocumentCategorySearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DocumentCategorySearchRepositoryMockConfiguration {

    @MockBean
    private DocumentCategorySearchRepository mockDocumentCategorySearchRepository;

}
