package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.FormationModule;
import net.komportementalist.repository.FormationModuleRepository;

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
 * Integration tests for the {@link FormationModuleResource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class FormationModuleResourceIT {

    private static final String DEFAULT_CODE = "AAAAAAAAAA";
    private static final String UPDATED_CODE = "BBBBBBBBBB";

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private FormationModuleRepository formationModuleRepository;

    @Mock
    private FormationModuleRepository formationModuleRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFormationModuleMockMvc;

    private FormationModule formationModule;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormationModule createEntity(EntityManager em) {
        FormationModule formationModule = new FormationModule()
            .code(DEFAULT_CODE)
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return formationModule;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormationModule createUpdatedEntity(EntityManager em) {
        FormationModule formationModule = new FormationModule()
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return formationModule;
    }

    @BeforeEach
    public void initTest() {
        formationModule = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormationModule() throws Exception {
        int databaseSizeBeforeCreate = formationModuleRepository.findAll().size();
        // Create the FormationModule
        restFormationModuleMockMvc.perform(post("/api/formation-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationModule)))
            .andExpect(status().isCreated());

        // Validate the FormationModule in the database
        List<FormationModule> formationModuleList = formationModuleRepository.findAll();
        assertThat(formationModuleList).hasSize(databaseSizeBeforeCreate + 1);
        FormationModule testFormationModule = formationModuleList.get(formationModuleList.size() - 1);
        assertThat(testFormationModule.getCode()).isEqualTo(DEFAULT_CODE);
        assertThat(testFormationModule.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFormationModule.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createFormationModuleWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formationModuleRepository.findAll().size();

        // Create the FormationModule with an existing ID
        formationModule.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormationModuleMockMvc.perform(post("/api/formation-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationModule)))
            .andExpect(status().isBadRequest());

        // Validate the FormationModule in the database
        List<FormationModule> formationModuleList = formationModuleRepository.findAll();
        assertThat(formationModuleList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFormationModules() throws Exception {
        // Initialize the database
        formationModuleRepository.saveAndFlush(formationModule);

        // Get all the formationModuleList
        restFormationModuleMockMvc.perform(get("/api/formation-modules?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formationModule.getId().intValue())))
            .andExpect(jsonPath("$.[*].code").value(hasItem(DEFAULT_CODE)))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllFormationModulesWithEagerRelationshipsIsEnabled() throws Exception {
        when(formationModuleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFormationModuleMockMvc.perform(get("/api/formation-modules?eagerload=true"))
            .andExpect(status().isOk());

        verify(formationModuleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllFormationModulesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(formationModuleRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFormationModuleMockMvc.perform(get("/api/formation-modules?eagerload=true"))
            .andExpect(status().isOk());

        verify(formationModuleRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFormationModule() throws Exception {
        // Initialize the database
        formationModuleRepository.saveAndFlush(formationModule);

        // Get the formationModule
        restFormationModuleMockMvc.perform(get("/api/formation-modules/{id}", formationModule.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(formationModule.getId().intValue()))
            .andExpect(jsonPath("$.code").value(DEFAULT_CODE))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingFormationModule() throws Exception {
        // Get the formationModule
        restFormationModuleMockMvc.perform(get("/api/formation-modules/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormationModule() throws Exception {
        // Initialize the database
        formationModuleRepository.saveAndFlush(formationModule);

        int databaseSizeBeforeUpdate = formationModuleRepository.findAll().size();

        // Update the formationModule
        FormationModule updatedFormationModule = formationModuleRepository.findById(formationModule.getId()).get();
        // Disconnect from session so that the updates on updatedFormationModule are not directly saved in db
        em.detach(updatedFormationModule);
        updatedFormationModule
            .code(UPDATED_CODE)
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restFormationModuleMockMvc.perform(put("/api/formation-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormationModule)))
            .andExpect(status().isOk());

        // Validate the FormationModule in the database
        List<FormationModule> formationModuleList = formationModuleRepository.findAll();
        assertThat(formationModuleList).hasSize(databaseSizeBeforeUpdate);
        FormationModule testFormationModule = formationModuleList.get(formationModuleList.size() - 1);
        assertThat(testFormationModule.getCode()).isEqualTo(UPDATED_CODE);
        assertThat(testFormationModule.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFormationModule.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingFormationModule() throws Exception {
        int databaseSizeBeforeUpdate = formationModuleRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormationModuleMockMvc.perform(put("/api/formation-modules")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationModule)))
            .andExpect(status().isBadRequest());

        // Validate the FormationModule in the database
        List<FormationModule> formationModuleList = formationModuleRepository.findAll();
        assertThat(formationModuleList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFormationModule() throws Exception {
        // Initialize the database
        formationModuleRepository.saveAndFlush(formationModule);

        int databaseSizeBeforeDelete = formationModuleRepository.findAll().size();

        // Delete the formationModule
        restFormationModuleMockMvc.perform(delete("/api/formation-modules/{id}", formationModule.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FormationModule> formationModuleList = formationModuleRepository.findAll();
        assertThat(formationModuleList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
