package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class ProgramTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ProgramType.class);
        ProgramType programType1 = new ProgramType();
        programType1.setId(1L);
        ProgramType programType2 = new ProgramType();
        programType2.setId(programType1.getId());
        assertThat(programType1).isEqualTo(programType2);
        programType2.setId(2L);
        assertThat(programType1).isNotEqualTo(programType2);
        programType1.setId(null);
        assertThat(programType1).isNotEqualTo(programType2);
    }
}
