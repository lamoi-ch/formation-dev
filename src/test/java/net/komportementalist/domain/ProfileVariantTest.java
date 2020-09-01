package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class ProfileVariantTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProfileVariant.class);
        ProfileVariant profileVariant1 = new ProfileVariant();
        profileVariant1.setId(1L);
        ProfileVariant profileVariant2 = new ProfileVariant();
        profileVariant2.setId(profileVariant1.getId());
        assertThat(profileVariant1).isEqualTo(profileVariant2);
        profileVariant2.setId(2L);
        assertThat(profileVariant1).isNotEqualTo(profileVariant2);
        profileVariant1.setId(null);
        assertThat(profileVariant1).isNotEqualTo(profileVariant2);
    }
}
