package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.DocumentCategory;
import net.komportementalist.repository.DocumentCategoryRepository;
import net.komportementalist.repository.search.DocumentCategorySearchRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.elasticsearch.index.query.QueryBuilders.queryStringQuery;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link DocumentCategoryResource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class DocumentCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DocumentCategoryRepository documentCategoryRepository;

    /**
     * This repository is mocked in the net.komportementalist.repository.search test package.
     *
     * @see net.komportementalist.repository.search.DocumentCategorySearchRepositoryMockConfiguration
     */
    @Autowired
    private DocumentCategorySearchRepository mockDocumentCategorySearchRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDocumentCategoryMockMvc;

    private DocumentCategory documentCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentCategory createEntity(EntityManager em) {
        DocumentCategory documentCategory = new DocumentCategory()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return documentCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentCategory createUpdatedEntity(EntityManager em) {
        DocumentCategory documentCategory = new DocumentCategory()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return documentCategory;
    }

    @BeforeEach
    public void initTest() {
        documentCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentCategory() throws Exception {
        int databaseSizeBeforeCreate = documentCategoryRepository.findAll().size();
        // Create the DocumentCategory
        restDocumentCategoryMockMvc.perform(post("/api/document-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory)))
            .andExpect(status().isCreated());

        // Validate the DocumentCategory in the database
        List<DocumentCategory> documentCategoryList = documentCategoryRepository.findAll();
        assertThat(documentCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        DocumentCategory testDocumentCategory = documentCategoryList.get(documentCategoryList.size() - 1);
        assertThat(testDocumentCategory.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDocumentCategory.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the DocumentCategory in Elasticsearch
        verify(mockDocumentCategorySearchRepository, times(1)).save(testDocumentCategory);
    }

    @Test
    @Transactional
    public void createDocumentCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentCategoryRepository.findAll().size();

        // Create the DocumentCategory with an existing ID
        documentCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentCategoryMockMvc.perform(post("/api/document-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentCategory in the database
        List<DocumentCategory> documentCategoryList = documentCategoryRepository.findAll();
        assertThat(documentCategoryList).hasSize(databaseSizeBeforeCreate);

        // Validate the DocumentCategory in Elasticsearch
        verify(mockDocumentCategorySearchRepository, times(0)).save(documentCategory);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentCategoryRepository.findAll().size();
        // set the field null
        documentCategory.setName(null);

        // Create the DocumentCategory, which fails.


        restDocumentCategoryMockMvc.perform(post("/api/document-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory)))
            .andExpect(status().isBadRequest());

        List<DocumentCategory> documentCategoryList = documentCategoryRepository.findAll();
        assertThat(documentCategoryList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDocumentCategories() throws Exception {
        // Initialize the database
        documentCategoryRepository.saveAndFlush(documentCategory);

        // Get all the documentCategoryList
        restDocumentCategoryMockMvc.perform(get("/api/document-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getDocumentCategory() throws Exception {
        // Initialize the database
        documentCategoryRepository.saveAndFlush(documentCategory);

        // Get the documentCategory
        restDocumentCategoryMockMvc.perform(get("/api/document-categories/{id}", documentCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(documentCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingDocumentCategory() throws Exception {
        // Get the documentCategory
        restDocumentCategoryMockMvc.perform(get("/api/document-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentCategory() throws Exception {
        // Initialize the database
        documentCategoryRepository.saveAndFlush(documentCategory);

        int databaseSizeBeforeUpdate = documentCategoryRepository.findAll().size();

        // Update the documentCategory
        DocumentCategory updatedDocumentCategory = documentCategoryRepository.findById(documentCategory.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentCategory are not directly saved in db
        em.detach(updatedDocumentCategory);
        updatedDocumentCategory
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restDocumentCategoryMockMvc.perform(put("/api/document-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocumentCategory)))
            .andExpect(status().isOk());

        // Validate the DocumentCategory in the database
        List<DocumentCategory> documentCategoryList = documentCategoryRepository.findAll();
        assertThat(documentCategoryList).hasSize(databaseSizeBeforeUpdate);
        DocumentCategory testDocumentCategory = documentCategoryList.get(documentCategoryList.size() - 1);
        assertThat(testDocumentCategory.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDocumentCategory.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the DocumentCategory in Elasticsearch
        verify(mockDocumentCategorySearchRepository, times(1)).save(testDocumentCategory);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentCategory() throws Exception {
        int databaseSizeBeforeUpdate = documentCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentCategoryMockMvc.perform(put("/api/document-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentCategory in the database
        List<DocumentCategory> documentCategoryList = documentCategoryRepository.findAll();
        assertThat(documentCategoryList).hasSize(databaseSizeBeforeUpdate);

        // Validate the DocumentCategory in Elasticsearch
        verify(mockDocumentCategorySearchRepository, times(0)).save(documentCategory);
    }

    @Test
    @Transactional
    public void deleteDocumentCategory() throws Exception {
        // Initialize the database
        documentCategoryRepository.saveAndFlush(documentCategory);

        int databaseSizeBeforeDelete = documentCategoryRepository.findAll().size();

        // Delete the documentCategory
        restDocumentCategoryMockMvc.perform(delete("/api/document-categories/{id}", documentCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DocumentCategory> documentCategoryList = documentCategoryRepository.findAll();
        assertThat(documentCategoryList).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DocumentCategory in Elasticsearch
        verify(mockDocumentCategorySearchRepository, times(1)).deleteById(documentCategory.getId());
    }

    @Test
    @Transactional
    public void searchDocumentCategory() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        documentCategoryRepository.saveAndFlush(documentCategory);
        when(mockDocumentCategorySearchRepository.search(queryStringQuery("id:" + documentCategory.getId())))
            .thenReturn(Collections.singletonList(documentCategory));

        // Search the documentCategory
        restDocumentCategoryMockMvc.perform(get("/api/_search/document-categories?query=id:" + documentCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
}
