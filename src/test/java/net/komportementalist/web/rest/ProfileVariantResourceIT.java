package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.ProfileVariant;
import net.komportementalist.repository.ProfileVariantRepository;

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
 * Integration tests for the {@link ProfileVariantResource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ProfileVariantResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private ProfileVariantRepository profileVariantRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restProfileVariantMockMvc;

    private ProfileVariant profileVariant;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfileVariant createEntity(EntityManager em) {
        ProfileVariant profileVariant = new ProfileVariant()
            .name(DEFAULT_NAME);
        return profileVariant;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static ProfileVariant createUpdatedEntity(EntityManager em) {
        ProfileVariant profileVariant = new ProfileVariant()
            .name(UPDATED_NAME);
        return profileVariant;
    }

    @BeforeEach
    public void initTest() {
        profileVariant = createEntity(em);
    }

    @Test
    @Transactional
    public void createProfileVariant() throws Exception {
        int databaseSizeBeforeCreate = profileVariantRepository.findAll().size();
        // Create the ProfileVariant
        restProfileVariantMockMvc.perform(post("/api/profile-variants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profileVariant)))
            .andExpect(status().isCreated());

        // Validate the ProfileVariant in the database
        List<ProfileVariant> profileVariantList = profileVariantRepository.findAll();
        assertThat(profileVariantList).hasSize(databaseSizeBeforeCreate + 1);
        ProfileVariant testProfileVariant = profileVariantList.get(profileVariantList.size() - 1);
        assertThat(testProfileVariant.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createProfileVariantWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = profileVariantRepository.findAll().size();

        // Create the ProfileVariant with an existing ID
        profileVariant.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restProfileVariantMockMvc.perform(post("/api/profile-variants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profileVariant)))
            .andExpect(status().isBadRequest());

        // Validate the ProfileVariant in the database
        List<ProfileVariant> profileVariantList = profileVariantRepository.findAll();
        assertThat(profileVariantList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllProfileVariants() throws Exception {
        // Initialize the database
        profileVariantRepository.saveAndFlush(profileVariant);

        // Get all the profileVariantList
        restProfileVariantMockMvc.perform(get("/api/profile-variants?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(profileVariant.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getProfileVariant() throws Exception {
        // Initialize the database
        profileVariantRepository.saveAndFlush(profileVariant);

        // Get the profileVariant
        restProfileVariantMockMvc.perform(get("/api/profile-variants/{id}", profileVariant.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(profileVariant.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingProfileVariant() throws Exception {
        // Get the profileVariant
        restProfileVariantMockMvc.perform(get("/api/profile-variants/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateProfileVariant() throws Exception {
        // Initialize the database
        profileVariantRepository.saveAndFlush(profileVariant);

        int databaseSizeBeforeUpdate = profileVariantRepository.findAll().size();

        // Update the profileVariant
        ProfileVariant updatedProfileVariant = profileVariantRepository.findById(profileVariant.getId()).get();
        // Disconnect from session so that the updates on updatedProfileVariant are not directly saved in db
        em.detach(updatedProfileVariant);
        updatedProfileVariant
            .name(UPDATED_NAME);

        restProfileVariantMockMvc.perform(put("/api/profile-variants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedProfileVariant)))
            .andExpect(status().isOk());

        // Validate the ProfileVariant in the database
        List<ProfileVariant> profileVariantList = profileVariantRepository.findAll();
        assertThat(profileVariantList).hasSize(databaseSizeBeforeUpdate);
        ProfileVariant testProfileVariant = profileVariantList.get(profileVariantList.size() - 1);
        assertThat(testProfileVariant.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingProfileVariant() throws Exception {
        int databaseSizeBeforeUpdate = profileVariantRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restProfileVariantMockMvc.perform(put("/api/profile-variants")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(profileVariant)))
            .andExpect(status().isBadRequest());

        // Validate the ProfileVariant in the database
        List<ProfileVariant> profileVariantList = profileVariantRepository.findAll();
        assertThat(profileVariantList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteProfileVariant() throws Exception {
        // Initialize the database
        profileVariantRepository.saveAndFlush(profileVariant);

        int databaseSizeBeforeDelete = profileVariantRepository.findAll().size();

        // Delete the profileVariant
        restProfileVariantMockMvc.perform(delete("/api/profile-variants/{id}", profileVariant.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<ProfileVariant> profileVariantList = profileVariantRepository.findAll();
        assertThat(profileVariantList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
