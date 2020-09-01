package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.FormationProgram;
import net.komportementalist.repository.FormationProgramRepository;

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
 * Integration tests for the {@link FormationProgramResource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
public class FormationProgramResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    @Autowired
    private FormationProgramRepository formationProgramRepository;

    @Mock
    private FormationProgramRepository formationProgramRepositoryMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFormationProgramMockMvc;

    private FormationProgram formationProgram;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormationProgram createEntity(EntityManager em) {
        FormationProgram formationProgram = new FormationProgram()
            .name(DEFAULT_NAME)
            .description(DEFAULT_DESCRIPTION);
        return formationProgram;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FormationProgram createUpdatedEntity(EntityManager em) {
        FormationProgram formationProgram = new FormationProgram()
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);
        return formationProgram;
    }

    @BeforeEach
    public void initTest() {
        formationProgram = createEntity(em);
    }

    @Test
    @Transactional
    public void createFormationProgram() throws Exception {
        int databaseSizeBeforeCreate = formationProgramRepository.findAll().size();
        // Create the FormationProgram
        restFormationProgramMockMvc.perform(post("/api/formation-programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationProgram)))
            .andExpect(status().isCreated());

        // Validate the FormationProgram in the database
        List<FormationProgram> formationProgramList = formationProgramRepository.findAll();
        assertThat(formationProgramList).hasSize(databaseSizeBeforeCreate + 1);
        FormationProgram testFormationProgram = formationProgramList.get(formationProgramList.size() - 1);
        assertThat(testFormationProgram.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testFormationProgram.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
    }

    @Test
    @Transactional
    public void createFormationProgramWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = formationProgramRepository.findAll().size();

        // Create the FormationProgram with an existing ID
        formationProgram.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFormationProgramMockMvc.perform(post("/api/formation-programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationProgram)))
            .andExpect(status().isBadRequest());

        // Validate the FormationProgram in the database
        List<FormationProgram> formationProgramList = formationProgramRepository.findAll();
        assertThat(formationProgramList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFormationPrograms() throws Exception {
        // Initialize the database
        formationProgramRepository.saveAndFlush(formationProgram);

        // Get all the formationProgramList
        restFormationProgramMockMvc.perform(get("/api/formation-programs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(formationProgram.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)));
    }
    
    @SuppressWarnings({"unchecked"})
    public void getAllFormationProgramsWithEagerRelationshipsIsEnabled() throws Exception {
        when(formationProgramRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFormationProgramMockMvc.perform(get("/api/formation-programs?eagerload=true"))
            .andExpect(status().isOk());

        verify(formationProgramRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({"unchecked"})
    public void getAllFormationProgramsWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(formationProgramRepositoryMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restFormationProgramMockMvc.perform(get("/api/formation-programs?eagerload=true"))
            .andExpect(status().isOk());

        verify(formationProgramRepositoryMock, times(1)).findAllWithEagerRelationships(any());
    }

    @Test
    @Transactional
    public void getFormationProgram() throws Exception {
        // Initialize the database
        formationProgramRepository.saveAndFlush(formationProgram);

        // Get the formationProgram
        restFormationProgramMockMvc.perform(get("/api/formation-programs/{id}", formationProgram.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(formationProgram.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION));
    }
    @Test
    @Transactional
    public void getNonExistingFormationProgram() throws Exception {
        // Get the formationProgram
        restFormationProgramMockMvc.perform(get("/api/formation-programs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFormationProgram() throws Exception {
        // Initialize the database
        formationProgramRepository.saveAndFlush(formationProgram);

        int databaseSizeBeforeUpdate = formationProgramRepository.findAll().size();

        // Update the formationProgram
        FormationProgram updatedFormationProgram = formationProgramRepository.findById(formationProgram.getId()).get();
        // Disconnect from session so that the updates on updatedFormationProgram are not directly saved in db
        em.detach(updatedFormationProgram);
        updatedFormationProgram
            .name(UPDATED_NAME)
            .description(UPDATED_DESCRIPTION);

        restFormationProgramMockMvc.perform(put("/api/formation-programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFormationProgram)))
            .andExpect(status().isOk());

        // Validate the FormationProgram in the database
        List<FormationProgram> formationProgramList = formationProgramRepository.findAll();
        assertThat(formationProgramList).hasSize(databaseSizeBeforeUpdate);
        FormationProgram testFormationProgram = formationProgramList.get(formationProgramList.size() - 1);
        assertThat(testFormationProgram.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testFormationProgram.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
    }

    @Test
    @Transactional
    public void updateNonExistingFormationProgram() throws Exception {
        int databaseSizeBeforeUpdate = formationProgramRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFormationProgramMockMvc.perform(put("/api/formation-programs")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(formationProgram)))
            .andExpect(status().isBadRequest());

        // Validate the FormationProgram in the database
        List<FormationProgram> formationProgramList = formationProgramRepository.findAll();
        assertThat(formationProgramList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFormationProgram() throws Exception {
        // Initialize the database
        formationProgramRepository.saveAndFlush(formationProgram);

        int databaseSizeBeforeDelete = formationProgramRepository.findAll().size();

        // Delete the formationProgram
        restFormationProgramMockMvc.perform(delete("/api/formation-programs/{id}", formationProgram.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FormationProgram> formationProgramList = formationProgramRepository.findAll();
        assertThat(formationProgramList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
