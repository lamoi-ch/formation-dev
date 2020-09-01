package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class UserCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserCategory.class);
        UserCategory userCategory1 = new UserCategory();
        userCategory1.setId(1L);
        UserCategory userCategory2 = new UserCategory();
        userCategory2.setId(userCategory1.getId());
        assertThat(userCategory1).isEqualTo(userCategory2);
        userCategory2.setId(2L);
        assertThat(userCategory1).isNotEqualTo(userCategory2);
        userCategory1.setId(null);
        assertThat(userCategory1).isNotEqualTo(userCategory2);
    }
}
