package net.komportementalist.web.rest;

import net.komportementalist.KomportementalistApp;
import net.komportementalist.domain.UserCategory;
import net.komportementalist.repository.UserCategoryRepository;

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
 * Integration tests for the {@link UserCategoryResource} REST controller.
 */
@SpringBootTest(classes = KomportementalistApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class UserCategoryResourceIT {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    @Autowired
    private UserCategoryRepository userCategoryRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUserCategoryMockMvc;

    private UserCategory userCategory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCategory createEntity(EntityManager em) {
        UserCategory userCategory = new UserCategory()
            .name(DEFAULT_NAME);
        return userCategory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserCategory createUpdatedEntity(EntityManager em) {
        UserCategory userCategory = new UserCategory()
            .name(UPDATED_NAME);
        return userCategory;
    }

    @BeforeEach
    public void initTest() {
        userCategory = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserCategory() throws Exception {
        int databaseSizeBeforeCreate = userCategoryRepository.findAll().size();
        // Create the UserCategory
        restUserCategoryMockMvc.perform(post("/api/user-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCategory)))
            .andExpect(status().isCreated());

        // Validate the UserCategory in the database
        List<UserCategory> userCategoryList = userCategoryRepository.findAll();
        assertThat(userCategoryList).hasSize(databaseSizeBeforeCreate + 1);
        UserCategory testUserCategory = userCategoryList.get(userCategoryList.size() - 1);
        assertThat(testUserCategory.getName()).isEqualTo(DEFAULT_NAME);
    }

    @Test
    @Transactional
    public void createUserCategoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userCategoryRepository.findAll().size();

        // Create the UserCategory with an existing ID
        userCategory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserCategoryMockMvc.perform(post("/api/user-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCategory)))
            .andExpect(status().isBadRequest());

        // Validate the UserCategory in the database
        List<UserCategory> userCategoryList = userCategoryRepository.findAll();
        assertThat(userCategoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUserCategories() throws Exception {
        // Initialize the database
        userCategoryRepository.saveAndFlush(userCategory);

        // Get all the userCategoryList
        restUserCategoryMockMvc.perform(get("/api/user-categories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userCategory.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME)));
    }
    
    @Test
    @Transactional
    public void getUserCategory() throws Exception {
        // Initialize the database
        userCategoryRepository.saveAndFlush(userCategory);

        // Get the userCategory
        restUserCategoryMockMvc.perform(get("/api/user-categories/{id}", userCategory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(userCategory.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME));
    }
    @Test
    @Transactional
    public void getNonExistingUserCategory() throws Exception {
        // Get the userCategory
        restUserCategoryMockMvc.perform(get("/api/user-categories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserCategory() throws Exception {
        // Initialize the database
        userCategoryRepository.saveAndFlush(userCategory);

        int databaseSizeBeforeUpdate = userCategoryRepository.findAll().size();

        // Update the userCategory
        UserCategory updatedUserCategory = userCategoryRepository.findById(userCategory.getId()).get();
        // Disconnect from session so that the updates on updatedUserCategory are not directly saved in db
        em.detach(updatedUserCategory);
        updatedUserCategory
            .name(UPDATED_NAME);

        restUserCategoryMockMvc.perform(put("/api/user-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedUserCategory)))
            .andExpect(status().isOk());

        // Validate the UserCategory in the database
        List<UserCategory> userCategoryList = userCategoryRepository.findAll();
        assertThat(userCategoryList).hasSize(databaseSizeBeforeUpdate);
        UserCategory testUserCategory = userCategoryList.get(userCategoryList.size() - 1);
        assertThat(testUserCategory.getName()).isEqualTo(UPDATED_NAME);
    }

    @Test
    @Transactional
    public void updateNonExistingUserCategory() throws Exception {
        int databaseSizeBeforeUpdate = userCategoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUserCategoryMockMvc.perform(put("/api/user-categories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(userCategory)))
            .andExpect(status().isBadRequest());

        // Validate the UserCategory in the database
        List<UserCategory> userCategoryList = userCategoryRepository.findAll();
        assertThat(userCategoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUserCategory() throws Exception {
        // Initialize the database
        userCategoryRepository.saveAndFlush(userCategory);

        int databaseSizeBeforeDelete = userCategoryRepository.findAll().size();

        // Delete the userCategory
        restUserCategoryMockMvc.perform(delete("/api/user-categories/{id}", userCategory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UserCategory> userCategoryList = userCategoryRepository.findAll();
        assertThat(userCategoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
