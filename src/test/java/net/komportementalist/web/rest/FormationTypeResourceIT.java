package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.FormationType;
import net.komportementalist.repository.FormationTypeRepository;

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
 * Integration tests for the {@link FormationTypeResource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class FormationTypeResourceIT {

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final Integer DEFAULT_DURATION = 1;
    private static final Integer UPDATED_DURATION = 2;

    @Autowired
    private FormationTypeRepository formationTypeRepository;

    @Mock
    private FormationTypeRepository formationTypeRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFormationTypeMockMvc;

    private FormationType formationType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormationType createEntity(EntityManager em) {
        FormationType formationType = new FormationType()
            .description(DEFAULT_DESCRIPTION)
            .duration(DEFAULT_DURATION);
        return formationType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormationType createUpdatedEntity(EntityManager em) {
        FormationType formationType = new FormationType()
            .description(UPDATED_DESCRIPTION)
            .duration(UPDATED_DURATION);
        return formationType;
    }

    @BeforeEach
    public void initTest() {
        formationType = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormationType() throws Exception {
        int databaseSizeBeforeCreate = formationTypeRepository.findAll().size();
        // Create the FormationType
        restFormationTypeMockMvc.perform(post("/api/formation-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationType)))
            .andExpect(status().isCreated());

        // Validate the FormationType in the database
        List<FormationType> formationTypeList = formationTypeRepository.findAll();
        assertThat(formationTypeList).hasSize(databaseSizeBeforeCreate + 1);
        FormationType testFormationType = formationTypeList.get(formationTypeList.size() - 1);
        assertThat(testFormationType.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testFormationType.getDuration()).isEqualTo(DEFAULT_DURATION);
    }

    @Test
    @Transactional
    public void createFormationTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formationTypeRepository.findAll().size();

        // Create the FormationType with an existing ID
        formationType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormationTypeMockMvc.perform(post("/api/formation-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationType)))
            .andExpect(status().isBadRequest());

        // Validate the FormationType in the database
        List<FormationType> formationTypeList = formationTypeRepository.findAll();
        assertThat(formationTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFormationTypes() throws Exception {
        // Initialize the database
        formationTypeRepository.saveAndFlush(formationType);

        // Get all the formationTypeList
        restFormationTypeMockMvc.perform(get("/api/formation-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formationType.getId().intValue())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllFormationTypesWithEagerRelationshipsIsEnabled() throws Exception {
        when(formationTypeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFormationTypeMockMvc.perform(get("/api/formation-types?eagerload=true"))
            .andExpect(status().isOk());

        verify(formationTypeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllFormationTypesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(formationTypeRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFormationTypeMockMvc.perform(get("/api/formation-types?eagerload=true"))
            .andExpect(status().isOk());

        verify(formationTypeRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFormationType() throws Exception {
        // Initialize the database
        formationTypeRepository.saveAndFlush(formationType);

        // Get the formationType
        restFormationTypeMockMvc.perform(get("/api/formation-types/{id}", formationType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(formationType.getId().intValue()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION));
    }
    @Test
    @Transactional
    public void getNonExistingFormationType() throws Exception {
        // Get the formationType
        restFormationTypeMockMvc.perform(get("/api/formation-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormationType() throws Exception {
        // Initialize the database
        formationTypeRepository.saveAndFlush(formationType);

        int databaseSizeBeforeUpdate = formationTypeRepository.findAll().size();

        // Update the formationType
        FormationType updatedFormationType = formationTypeRepository.findById(formationType.getId()).get();
        // Disconnect from session so that the updates on updatedFormationType are not directly saved in db
        em.detach(updatedFormationType);
        updatedFormationType
            .description(UPDATED_DESCRIPTION)
            .duration(UPDATED_DURATION);

        restFormationTypeMockMvc.perform(put("/api/formation-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormationType)))
            .andExpect(status().isOk());

        // Validate the FormationType in the database
        List<FormationType> formationTypeList = formationTypeRepository.findAll();
        assertThat(formationTypeList).hasSize(databaseSizeBeforeUpdate);
        FormationType testFormationType = formationTypeList.get(formationTypeList.size() - 1);
        assertThat(testFormationType.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testFormationType.getDuration()).isEqualTo(UPDATED_DURATION);
    }

    @Test
    @Transactional
    public void updateNonExistingFormationType() throws Exception {
        int databaseSizeBeforeUpdate = formationTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormationTypeMockMvc.perform(put("/api/formation-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationType)))
            .andExpect(status().isBadRequest());

        // Validate the FormationType in the database
        List<FormationType> formationTypeList = formationTypeRepository.findAll();
        assertThat(formationTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFormationType() throws Exception {
        // Initialize the database
        formationTypeRepository.saveAndFlush(formationType);

        int databaseSizeBeforeDelete = formationTypeRepository.findAll().size();

        // Delete the formationType
        restFormationTypeMockMvc.perform(delete("/api/formation-types/{id}", formationType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FormationType> formationTypeList = formationTypeRepository.findAll();
        assertThat(formationTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
