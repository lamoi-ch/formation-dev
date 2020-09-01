package net.komportementalist.service.mapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;

public class DocumentCategory1MapperTest {

    private DocumentCategory1Mapper documentCategory1Mapper;

    @BeforeEach
    public void setUp() {
        documentCategory1Mapper = new DocumentCategory1MapperImpl();
    }

    @Test
    public void testEntityFromId() {
        Long id = 1L;
        assertThat(documentCategory1Mapper.fromId(id).getId()).isEqualTo(id);
        assertThat(documentCategory1Mapper.fromId(null)).isNull();
    }
}
