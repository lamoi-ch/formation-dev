package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.ProgramType;
import net.komportementalist.repository.ProgramTypeRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ProgramTypeResource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProgramTypeResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProgramTypeRepository programTypeRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProgramTypeMockMvc;

    private ProgramType programType;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProgramType createEntity(EntityManager em) {
        ProgramType programType = new ProgramType()
            .name(DEFAULT_NAME);
        return programType;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProgramType createUpdatedEntity(EntityManager em) {
        ProgramType programType = new ProgramType()
            .name(UPDATED_NAME);
        return programType;
    }

    @BeforeEach
    public void initTest() {
        programType = createEntity(em);
    }

    @Test
    @Transactional
    public void createProgramType() throws Exception {
        int databaseSizeBeforeCreate = programTypeRepository.findAll().size();
        // Create the ProgramType
        restProgramTypeMockMvc.perform(post("/api/program-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programType)))
            .andExpect(status().isCreated());

        // Validate the ProgramType in the database
        List<ProgramType> programTypeList = programTypeRepository.findAll();
        assertThat(programTypeList).hasSize(databaseSizeBeforeCreate + 1);
        ProgramType testProgramType = programTypeList.get(programTypeList.size() - 1);
        assertThat(testProgramType.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProgramTypeWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = programTypeRepository.findAll().size();

        // Create the ProgramType with an existing ID
        programType.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProgramTypeMockMvc.perform(post("/api/program-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programType)))
            .andExpect(status().isBadRequest());

        // Validate the ProgramType in the database
        List<ProgramType> programTypeList = programTypeRepository.findAll();
        assertThat(programTypeList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProgramTypes() throws Exception {
        // Initialize the database
        programTypeRepository.saveAndFlush(programType);

        // Get all the programTypeList
        restProgramTypeMockMvc.perform(get("/api/program-types?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(programType.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getProgramType() throws Exception {
        // Initialize the database
        programTypeRepository.saveAndFlush(programType);

        // Get the programType
        restProgramTypeMockMvc.perform(get("/api/program-types/{id}", programType.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(programType.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingProgramType() throws Exception {
        // Get the programType
        restProgramTypeMockMvc.perform(get("/api/program-types/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProgramType() throws Exception {
        // Initialize the database
        programTypeRepository.saveAndFlush(programType);

        int databaseSizeBeforeUpdate = programTypeRepository.findAll().size();

        // Update the programType
        ProgramType updatedProgramType = programTypeRepository.findById(programType.getId()).get();
        // Disconnect from session so that the updates on updatedProgramType are not directly saved in db
        em.detach(updatedProgramType);
        updatedProgramType
            .name(UPDATED_NAME);

        restProgramTypeMockMvc.perform(put("/api/program-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProgramType)))
            .andExpect(status().isOk());

        // Validate the ProgramType in the database
        List<ProgramType> programTypeList = programTypeRepository.findAll();
        assertThat(programTypeList).hasSize(databaseSizeBeforeUpdate);
        ProgramType testProgramType = programTypeList.get(programTypeList.size() - 1);
        assertThat(testProgramType.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProgramType() throws Exception {
        int databaseSizeBeforeUpdate = programTypeRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProgramTypeMockMvc.perform(put("/api/program-types")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(programType)))
            .andExpect(status().isBadRequest());

        // Validate the ProgramType in the database
        List<ProgramType> programTypeList = programTypeRepository.findAll();
        assertThat(programTypeList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProgramType() throws Exception {
        // Initialize the database
        programTypeRepository.saveAndFlush(programType);

        int databaseSizeBeforeDelete = programTypeRepository.findAll().size();

        // Delete the programType
        restProgramTypeMockMvc.perform(delete("/api/program-types/{id}", programType.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProgramType> programTypeList = programTypeRepository.findAll();
        assertThat(programTypeList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
