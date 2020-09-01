package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.Document1;
import net.komportementalist.domain.DocumentCategory1;
import net.komportementalist.repository.Document1Repository;

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
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link Document1Resource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class Document1ResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private Document1Repository document1Repository;

    @Mock
    private Document1Repository document1RepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restDocument1MockMvc;

    private Document1 document1;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Document1 createEntity(EntityManager em) {
        Document1 document1 = new Document1()
            .name(DEFAULT_NAME);
        // Add required entity
        DocumentCategory1 documentCategory1;
        if (TestUtil.findAll(em, DocumentCategory1.class).isEmpty()) {
            documentCategory1 = DocumentCategory1ResourceIT.createEntity(em);
            em.persist(documentCategory1);
            em.flush();
        } else {
            documentCategory1 = TestUtil.findAll(em, DocumentCategory1.class).get(0);
        }
        document1.getDocumentCategories().add(documentCategory1);
        return document1;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Document1 createUpdatedEntity(EntityManager em) {
        Document1 document1 = new Document1()
            .name(UPDATED_NAME);
        // Add required entity
        DocumentCategory1 documentCategory1;
        if (TestUtil.findAll(em, DocumentCategory1.class).isEmpty()) {
            documentCategory1 = DocumentCategory1ResourceIT.createUpdatedEntity(em);
            em.persist(documentCategory1);
            em.flush();
        } else {
            documentCategory1 = TestUtil.findAll(em, DocumentCategory1.class).get(0);
        }
        document1.getDocumentCategories().add(documentCategory1);
        return document1;
    }

    @BeforeEach
    public void initTest() {
        document1 = createEntity(em);
    }

    @Test
    @Transactional
    public void createDocument1() throws Exception {
        int databaseSizeBeforeCreate = document1Repository.findAll().size();
        // Create the Document1
        restDocument1MockMvc.perform(post("/api/document-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(document1)))
            .andExpect(status().isCreated());

        // Validate the Document1 in the database
        List<Document1> document1List = document1Repository.findAll();
        assertThat(document1List).hasSize(databaseSizeBeforeCreate + 1);
        Document1 testDocument1 = document1List.get(document1List.size() - 1);
        assertThat(testDocument1.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createDocument1WithExistingId() throws Exception {
        int databaseSizeBeforeCreate = document1Repository.findAll().size();

        // Create the Document1 with an existing ID
        document1.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restDocument1MockMvc.perform(post("/api/document-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(document1)))
            .andExpect(status().isBadRequest());

        // Validate the Document1 in the database
        List<Document1> document1List = document1Repository.findAll();
        assertThat(document1List).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = document1Repository.findAll().size();
        // set the field null
        document1.setName(null);

        // Create the Document1, which fails.


        restDocument1MockMvc.perform(post("/api/document-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(document1)))
            .andExpect(status().isBadRequest());

        List<Document1> document1List = document1Repository.findAll();
        assertThat(document1List).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllDocument1s() throws Exception {
        // Initialize the database
        document1Repository.saveAndFlush(document1);

        // Get all the document1List
        restDocument1MockMvc.perform(get("/api/document-1-s?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(document1.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllDocument1sWithEagerRelationshipsIsEnabled() throws Exception {
        when(document1RepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDocument1MockMvc.perform(get("/api/document-1-s?eagerload=true"))
            .andExpect(status().isOk());

        verify(document1RepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllDocument1sWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(document1RepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restDocument1MockMvc.perform(get("/api/document-1-s?eagerload=true"))
            .andExpect(status().isOk());

        verify(document1RepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getDocument1() throws Exception {
        // Initialize the database
        document1Repository.saveAndFlush(document1);

        // Get the document1
        restDocument1MockMvc.perform(get("/api/document-1-s/{id}", document1.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(document1.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingDocument1() throws Exception {
        // Get the document1
        restDocument1MockMvc.perform(get("/api/document-1-s/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateDocument1() throws Exception {
        // Initialize the database
        document1Repository.saveAndFlush(document1);

        int databaseSizeBeforeUpdate = document1Repository.findAll().size();

        // Update the document1
        Document1 updatedDocument1 = document1Repository.findById(document1.getId()).get();
        // Disconnect from session so that the updates on updatedDocument1 are not directly saved in db
        em.detach(updatedDocument1);
        updatedDocument1
            .name(UPDATED_NAME);

        restDocument1MockMvc.perform(put("/api/document-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedDocument1)))
            .andExpect(status().isOk());

        // Validate the Document1 in the database
        List<Document1> document1List = document1Repository.findAll();
        assertThat(document1List).hasSize(databaseSizeBeforeUpdate);
        Document1 testDocument1 = document1List.get(document1List.size() - 1);
        assertThat(testDocument1.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingDocument1() throws Exception {
        int databaseSizeBeforeUpdate = document1Repository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restDocument1MockMvc.perform(put("/api/document-1-s")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(document1)))
            .andExpect(status().isBadRequest());

        // Validate the Document1 in the database
        List<Document1> document1List = document1Repository.findAll();
        assertThat(document1List).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteDocument1() throws Exception {
        // Initialize the database
        document1Repository.saveAndFlush(document1);

        int databaseSizeBeforeDelete = document1Repository.findAll().size();

        // Delete the document1
        restDocument1MockMvc.perform(delete("/api/document-1-s/{id}", document1.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Document1> document1List = document1Repository.findAll();
        assertThat(document1List).hasSize(databaseSizeBeforeDelete - 1);
    }
}
