package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class FormationModuleTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormationModule.class);
        FormationModule formationModule1 = new FormationModule();
        formationModule1.setId(1L);
        FormationModule formationModule2 = new FormationModule();
        formationModule2.setId(formationModule1.getId());
        assertThat(formationModule1).isEqualTo(formationModule2);
        formationModule2.setId(2L);
        assertThat(formationModule1).isNotEqualTo(formationModule2);
        formationModule1.setId(null);
        assertThat(formationModule1).isNotEqualTo(formationModule2);
    }
}
