package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class FormationTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormationType.class);
        FormationType formationType1 = new FormationType();
        formationType1.setId(1L);
        FormationType formationType2 = new FormationType();
        formationType2.setId(formationType1.getId());
        assertThat(formationType1).isEqualTo(formationType2);
        formationType2.setId(2L);
        assertThat(formationType1).isNotEqualTo(formationType2);
        formationType1.setId(null);
        assertThat(formationType1).isNotEqualTo(formationType2);
    }
}
