package net.komportementalist.service.dto;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import net.komportementalist.web.rest.TestUtil;

public class DocumentCategory1DTOTest {

    @Test
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(DocumentCategory1DTO.class);
        DocumentCategory1DTO documentCategory1DTO1 = new DocumentCategory1DTO();
        documentCategory1DTO1.setId(1L);
        DocumentCategory1DTO documentCategory1DTO2 = new DocumentCategory1DTO();
        assertThat(documentCategory1DTO1).isNotEqualTo(documentCategory1DTO2);
        documentCategory1DTO2.setId(documentCategory1DTO1.getId());
        assertThat(documentCategory1DTO1).isEqualTo(documentCategory1DTO2);
        documentCategory1DTO2.setId(2L);
        assertThat(documentCategory1DTO1).isNotEqualTo(documentCategory1DTO2);
        documentCategory1DTO1.setId(null);
        assertThat(documentCategory1DTO1).isNotEqualTo(documentCategory1DTO2);
    }
}
