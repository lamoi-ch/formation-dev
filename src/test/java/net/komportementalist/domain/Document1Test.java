package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class Document1Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Document1.class);
        Document1 document11 = new Document1();
        document11.setId(1L);
        Document1 document12 = new Document1();
        document12.setId(document11.getId());
        assertThat(document11).isEqualTo(document12);
        document12.setId(2L);
        assertThat(document11).isNotEqualTo(document12);
        document11.setId(null);
        assertThat(document11).isNotEqualTo(document12);
    }
}
