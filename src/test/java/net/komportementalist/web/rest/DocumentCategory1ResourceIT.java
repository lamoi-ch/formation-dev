package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.DocumentCategory1;
import net.komportementalist.domain.Document1;
import net.komportementalist.repository.DocumentCategory1Repository;
import net.komportementalist.repository.search.DocumentCategory1SearchRepository;
import net.komportementalist.service.DocumentCategory1Service;
import net.komportementalist.service.dto.DocumentCategory1DTO;
import net.komportementalist.service.mapper.DocumentCategory1Mapper;
import net.komportementalist.service.dto.DocumentCategory1Criteria;
import net.komportementalist.service.DocumentCategory1QueryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
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
 * Integration tests for the {@link DocumentCategory1Resource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class DocumentCategory1ResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private DocumentCategory1Repository documentCategory1Repository;

    @Autowired
    private DocumentCategory1Mapper documentCategory1Mapper;

    @Autowired
    private DocumentCategory1Service documentCategory1Service;

    /**
     * This repository is mocked in the net.komportementalist.repository.search test package.
     *
     * @see net.komportementalist.repository.search.DocumentCategory1SearchRepositoryMockConfiguration
     */
    @Autowired
    private DocumentCategory1SearchRepository mockDocumentCategory1SearchRepository;

    @Autowired
    private DocumentCategory1QueryService documentCategory1QueryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDocumentCategory1MockMvc;

    private DocumentCategory1 documentCategory1;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentCategory1 createEntity(EntityManager em) {
        DocumentCategory1 documentCategory1 = new DocumentCategory1()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return documentCategory1;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static DocumentCategory1 createUpdatedEntity(EntityManager em) {
        DocumentCategory1 documentCategory1 = new DocumentCategory1()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return documentCategory1;
    }

    @BeforeEach
    public void initTest() {
        documentCategory1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocumentCategory1() throws Exception {
        int databaseSizeBeforeCreate = documentCategory1Repository.findAll().size();
        // Create the DocumentCategory1
        DocumentCategory1DTO documentCategory1DTO = documentCategory1Mapper.toDto(documentCategory1);
        restDocumentCategory1MockMvc.perform(post("/api/document-category-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory1DTO)))
            .andExpect(status().isCreated());

        // Validate the DocumentCategory1 in the database
        List<DocumentCategory1> documentCategory1List = documentCategory1Repository.findAll();
        assertThat(documentCategory1List).hasSize(databaseSizeBeforeCreate + 1);
        DocumentCategory1 testDocumentCategory1 = documentCategory1List.get(documentCategory1List.size() - 1);
        assertThat(testDocumentCategory1.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testDocumentCategory1.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);

        // Validate the DocumentCategory1 in Elasticsearch
        verify(mockDocumentCategory1SearchRepository, times(1)).save(testDocumentCategory1);
    }

    @Test
    @Transactional
    public void createDocumentCategory1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = documentCategory1Repository.findAll().size();

        // Create the DocumentCategory1 with an existing ID
        documentCategory1.setId(1L);
        DocumentCategory1DTO documentCategory1DTO = documentCategory1Mapper.toDto(documentCategory1);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocumentCategory1MockMvc.perform(post("/api/document-category-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory1DTO)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentCategory1 in the database
        List<DocumentCategory1> documentCategory1List = documentCategory1Repository.findAll();
        assertThat(documentCategory1List).hasSize(databaseSizeBeforeCreate);

        // Validate the DocumentCategory1 in Elasticsearch
        verify(mockDocumentCategory1SearchRepository, times(0)).save(documentCategory1);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = documentCategory1Repository.findAll().size();
        // set the field null
        documentCategory1.setName(null);

        // Create the DocumentCategory1, which fails.
        DocumentCategory1DTO documentCategory1DTO = documentCategory1Mapper.toDto(documentCategory1);


        restDocumentCategory1MockMvc.perform(post("/api/document-category-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory1DTO)))
            .andExpect(status().isBadRequest());

        List<DocumentCategory1> documentCategory1List = documentCategory1Repository.findAll();
        assertThat(documentCategory1List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1s() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List
        restDocumentCategory1MockMvc.perform(get("/api/document-category-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentCategory1.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @Test
    @Transactional
    public void getDocumentCategory1() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get the documentCategory1
        restDocumentCategory1MockMvc.perform(get("/api/document-category-1-s/{id}", documentCategory1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(documentCategory1.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }


    @Test
    @Transactional
    public void getDocumentCategory1sByIdFiltering() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        Long id = documentCategory1.getId();

        defaultDocumentCategory1ShouldBeFound("id.equals=" + id);
        defaultDocumentCategory1ShouldNotBeFound("id.notEquals=" + id);

        defaultDocumentCategory1ShouldBeFound("id.greaterThanOrEqual=" + id);
        defaultDocumentCategory1ShouldNotBeFound("id.greaterThan=" + id);

        defaultDocumentCategory1ShouldBeFound("id.lessThanOrEqual=" + id);
        defaultDocumentCategory1ShouldNotBeFound("id.lessThan=" + id);
    }


    @Test
    @Transactional
    public void getAllDocumentCategory1sByNameIsEqualToSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where name equals to DEFAULT_NAME
        defaultDocumentCategory1ShouldBeFound("name.equals=" + DEFAULT_NAME);

        // Get all the documentCategory1List where name equals to UPDATED_NAME
        defaultDocumentCategory1ShouldNotBeFound("name.equals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1sByNameIsNotEqualToSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where name not equals to DEFAULT_NAME
        defaultDocumentCategory1ShouldNotBeFound("name.notEquals=" + DEFAULT_NAME);

        // Get all the documentCategory1List where name not equals to UPDATED_NAME
        defaultDocumentCategory1ShouldBeFound("name.notEquals=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1sByNameIsInShouldWork() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where name in DEFAULT_NAME or UPDATED_NAME
        defaultDocumentCategory1ShouldBeFound("name.in=" + DEFAULT_NAME + "," + UPDATED_NAME);

        // Get all the documentCategory1List where name equals to UPDATED_NAME
        defaultDocumentCategory1ShouldNotBeFound("name.in=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1sByNameIsNullOrNotNull() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where name is not null
        defaultDocumentCategory1ShouldBeFound("name.specified=true");

        // Get all the documentCategory1List where name is null
        defaultDocumentCategory1ShouldNotBeFound("name.specified=false");
    }
                @Test
    @Transactional
    public void getAllDocumentCategory1sByNameContainsSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where name contains DEFAULT_NAME
        defaultDocumentCategory1ShouldBeFound("name.contains=" + DEFAULT_NAME);

        // Get all the documentCategory1List where name contains UPDATED_NAME
        defaultDocumentCategory1ShouldNotBeFound("name.contains=" + UPDATED_NAME);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1sByNameNotContainsSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where name does not contain DEFAULT_NAME
        defaultDocumentCategory1ShouldNotBeFound("name.doesNotContain=" + DEFAULT_NAME);

        // Get all the documentCategory1List where name does not contain UPDATED_NAME
        defaultDocumentCategory1ShouldBeFound("name.doesNotContain=" + UPDATED_NAME);
    }


    @Test
    @Transactional
    public void getAllDocumentCategory1sByDescriptionIsEqualToSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where description equals to DEFAULT_DESCRIPTION
        defaultDocumentCategory1ShouldBeFound("description.equals=" + DEFAULT_DESCRIPTION);

        // Get all the documentCategory1List where description equals to UPDATED_DESCRIPTION
        defaultDocumentCategory1ShouldNotBeFound("description.equals=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1sByDescriptionIsNotEqualToSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where description not equals to DEFAULT_DESCRIPTION
        defaultDocumentCategory1ShouldNotBeFound("description.notEquals=" + DEFAULT_DESCRIPTION);

        // Get all the documentCategory1List where description not equals to UPDATED_DESCRIPTION
        defaultDocumentCategory1ShouldBeFound("description.notEquals=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1sByDescriptionIsInShouldWork() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where description in DEFAULT_DESCRIPTION or UPDATED_DESCRIPTION
        defaultDocumentCategory1ShouldBeFound("description.in=" + DEFAULT_DESCRIPTION + "," + UPDATED_DESCRIPTION);

        // Get all the documentCategory1List where description equals to UPDATED_DESCRIPTION
        defaultDocumentCategory1ShouldNotBeFound("description.in=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1sByDescriptionIsNullOrNotNull() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where description is not null
        defaultDocumentCategory1ShouldBeFound("description.specified=true");

        // Get all the documentCategory1List where description is null
        defaultDocumentCategory1ShouldNotBeFound("description.specified=false");
    }
                @Test
    @Transactional
    public void getAllDocumentCategory1sByDescriptionContainsSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where description contains DEFAULT_DESCRIPTION
        defaultDocumentCategory1ShouldBeFound("description.contains=" + DEFAULT_DESCRIPTION);

        // Get all the documentCategory1List where description contains UPDATED_DESCRIPTION
        defaultDocumentCategory1ShouldNotBeFound("description.contains=" + UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void getAllDocumentCategory1sByDescriptionNotContainsSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        // Get all the documentCategory1List where description does not contain DEFAULT_DESCRIPTION
        defaultDocumentCategory1ShouldNotBeFound("description.doesNotContain=" + DEFAULT_DESCRIPTION);

        // Get all the documentCategory1List where description does not contain UPDATED_DESCRIPTION
        defaultDocumentCategory1ShouldBeFound("description.doesNotContain=" + UPDATED_DESCRIPTION);
    }


    @Test
    @Transactional
    public void getAllDocumentCategory1sByDocumentsIsEqualToSomething() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);
        Document1 documents = Document1ResourceIT.createEntity(em);
        em.persist(documents);
        em.flush();
        documentCategory1.addDocuments(documents);
        documentCategory1Repository.saveAndFlush(documentCategory1);
        Long documentsId = documents.getId();

        // Get all the documentCategory1List where documents equals to documentsId
        defaultDocumentCategory1ShouldBeFound("documentsId.equals=" + documentsId);

        // Get all the documentCategory1List where documents equals to documentsId + 1
        defaultDocumentCategory1ShouldNotBeFound("documentsId.equals=" + (documentsId + 1));
    }

    /**
     * Executes the search, and checks that the default entity is returned.
     */
    private void defaultDocumentCategory1ShouldBeFound(String filter) throws Exception {
        restDocumentCategory1MockMvc.perform(get("/api/document-category-1-s?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentCategory1.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));

        // Check, that the count call also returns 1
        restDocumentCategory1MockMvc.perform(get("/api/document-category-1-s/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("1"));
    }

    /**
     * Executes the search, and checks that the default entity is not returned.
     */
    private void defaultDocumentCategory1ShouldNotBeFound(String filter) throws Exception {
        restDocumentCategory1MockMvc.perform(get("/api/document-category-1-s?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$").isArray())
            .andExpect(jsonPath("$").isEmpty());

        // Check, that the count call also returns 0
        restDocumentCategory1MockMvc.perform(get("/api/document-category-1-s/count?sort=id,desc&" + filter))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(content().string("0"));
    }

    @Test
    @Transactional
    public void getNonExistingDocumentCategory1() throws Exception {
        // Get the documentCategory1
        restDocumentCategory1MockMvc.perform(get("/api/document-category-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocumentCategory1() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        int databaseSizeBeforeUpdate = documentCategory1Repository.findAll().size();

        // Update the documentCategory1
        DocumentCategory1 updatedDocumentCategory1 = documentCategory1Repository.findById(documentCategory1.getId()).get();
        // Disconnect from session so that the updates on updatedDocumentCategory1 are not directly saved in db
        em.detach(updatedDocumentCategory1);
        updatedDocumentCategory1
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        DocumentCategory1DTO documentCategory1DTO = documentCategory1Mapper.toDto(updatedDocumentCategory1);

        restDocumentCategory1MockMvc.perform(put("/api/document-category-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory1DTO)))
            .andExpect(status().isOk());

        // Validate the DocumentCategory1 in the database
        List<DocumentCategory1> documentCategory1List = documentCategory1Repository.findAll();
        assertThat(documentCategory1List).hasSize(databaseSizeBeforeUpdate);
        DocumentCategory1 testDocumentCategory1 = documentCategory1List.get(documentCategory1List.size() - 1);
        assertThat(testDocumentCategory1.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testDocumentCategory1.getDescription()).isEqualTo(UPDATED_DESCRIPTION);

        // Validate the DocumentCategory1 in Elasticsearch
        verify(mockDocumentCategory1SearchRepository, times(1)).save(testDocumentCategory1);
    }

    @Test
    @Transactional
    public void updateNonExistingDocumentCategory1() throws Exception {
        int databaseSizeBeforeUpdate = documentCategory1Repository.findAll().size();

        // Create the DocumentCategory1
        DocumentCategory1DTO documentCategory1DTO = documentCategory1Mapper.toDto(documentCategory1);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocumentCategory1MockMvc.perform(put("/api/document-category-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(documentCategory1DTO)))
            .andExpect(status().isBadRequest());

        // Validate the DocumentCategory1 in the database
        List<DocumentCategory1> documentCategory1List = documentCategory1Repository.findAll();
        assertThat(documentCategory1List).hasSize(databaseSizeBeforeUpdate);

        // Validate the DocumentCategory1 in Elasticsearch
        verify(mockDocumentCategory1SearchRepository, times(0)).save(documentCategory1);
    }

    @Test
    @Transactional
    public void deleteDocumentCategory1() throws Exception {
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);

        int databaseSizeBeforeDelete = documentCategory1Repository.findAll().size();

        // Delete the documentCategory1
        restDocumentCategory1MockMvc.perform(delete("/api/document-category-1-s/{id}", documentCategory1.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<DocumentCategory1> documentCategory1List = documentCategory1Repository.findAll();
        assertThat(documentCategory1List).hasSize(databaseSizeBeforeDelete - 1);

        // Validate the DocumentCategory1 in Elasticsearch
        verify(mockDocumentCategory1SearchRepository, times(1)).deleteById(documentCategory1.getId());
    }

    @Test
    @Transactional
    public void searchDocumentCategory1() throws Exception {
        // Configure the mock search repository
        // Initialize the database
        documentCategory1Repository.saveAndFlush(documentCategory1);
        when(mockDocumentCategory1SearchRepository.search(queryStringQuery("id:" + documentCategory1.getId()), PageRequest.of(0, 20)))
            .thenReturn(new PageImpl<>(Collections.singletonList(documentCategory1), PageRequest.of(0, 1), 1));

        // Search the documentCategory1
        restDocumentCategory1MockMvc.perform(get("/api/_search/document-category-1-s?query=id:" + documentCategory1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(documentCategory1.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
}
