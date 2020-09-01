package net.komportementalist.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class DocumentCategoryTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentCategory.class);
        DocumentCategory documentCategory1 = new DocumentCategory();
        documentCategory1.setId(1L);
        DocumentCategory documentCategory2 = new DocumentCategory();
        documentCategory2.setId(documentCategory1.getId());
        assertThat(documentCategory1).isEqualTo(documentCategory2);
        documentCategory2.setId(2L);
        assertThat(documentCategory1).isNotEqualTo(documentCategory2);
        documentCategory1.setId(null);
        assertThat(documentCategory1).isNotEqualTo(documentCategory2);
    }
}
