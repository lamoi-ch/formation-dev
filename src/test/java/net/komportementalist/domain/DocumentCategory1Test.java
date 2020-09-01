package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class DocumentCategory1Test {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentCategory1.class);
        DocumentCategory1 documentCategory11 = new DocumentCategory1();
        documentCategory11.setId(1L);
        DocumentCategory1 documentCategory12 = new DocumentCategory1();
        documentCategory12.setId(documentCategory11.getId());
        assertThat(documentCategory11).isEqualTo(documentCategory12);
        documentCategory12.setId(2L);
        assertThat(documentCategory11).isNotEqualTo(documentCategory12);
        documentCategory11.setId(null);
        assertThat(documentCategory11).isNotEqualTo(documentCategory12);
    }
}
