package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class FormationProgramTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(FormationProgram.class);
        FormationProgram formationProgram1 = new FormationProgram();
        formationProgram1.setId(1L);
        FormationProgram formationProgram2 = new FormationProgram();
        formationProgram2.setId(formationProgram1.getId());
        assertThat(formationProgram1).isEqualTo(formationProgram2);
        formationProgram2.setId(2L);
        assertThat(formationProgram1).isNotEqualTo(formationProgram2);
        formationProgram1.setId(null);
        assertThat(formationProgram1).isNotEqualTo(formationProgram2);
    }
}
