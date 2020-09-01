package net.komportementalist.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of {@link DocumentCategory1SearchRepository} to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DocumentCategory1SearchRepositoryMockConfiguration {

    @MockBean
    private DocumentCategory1SearchRepository mockDocumentCategory1SearchRepository;

}
