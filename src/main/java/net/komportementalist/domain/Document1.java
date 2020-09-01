package net.komportementalist.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Document1.
 */
@Entity
@Table(name = "document_1")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Document1 implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @NotNull
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @NotNull
    @JoinTable(name = "document_1_document_categories",
               joinColumns = @JoinColumn(name = "document1_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "document_categories_id", referencedColumnName = "id"))
    private Set<DocumentCategory1> documentCategories = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public Document1 name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<DocumentCategory1> getDocumentCategories() {
        return documentCategories;
    }

    public Document1 documentCategories(Set<DocumentCategory1> documentCategory1s) {
        this.documentCategories = documentCategory1s;
        return this;
    }

    public Document1 addDocumentCategories(DocumentCategory1 documentCategory1) {
        this.documentCategories.add(documentCategory1);
        documentCategory1.getDocuments().add(this);
        return this;
    }

    public Document1 removeDocumentCategories(DocumentCategory1 documentCategory1) {
        this.documentCategories.remove(documentCategory1);
        documentCategory1.getDocuments().remove(this);
        return this;
    }

    public void setDocumentCategories(Set<DocumentCategory1> documentCategory1s) {
        this.documentCategories = documentCategory1s;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document1)) {
            return false;
        }
        return id != null && id.equals(((Document1) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Document1{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
