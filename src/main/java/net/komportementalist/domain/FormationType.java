package net.komportementalist.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A part of a FormationModule from a sort of DocumentType
 */
@ApiModel(description = "A part of a FormationModule from a sort of DocumentType")
@Entity
@Table(name = "formation_type")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FormationType implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "duration")
    private Integer duration;

    @ManyToOne
    @JsonIgnoreProperties(value = "formationTypes", allowSetters = true)
    private DocumentType documentType;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "formation_type_documents",
               joinColumns = @JoinColumn(name = "formation_type_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "documents_id", referencedColumnName = "id"))
    private Set<Document> documents = new HashSet<>();

    @ManyToMany(mappedBy = "formationTypes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<FormationModule> formationModules = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public FormationType description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDuration() {
        return duration;
    }

    public FormationType duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public FormationType documentType(DocumentType documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public Set<Document> getDocuments() {
        return documents;
    }

    public FormationType documents(Set<Document> documents) {
        this.documents = documents;
        return this;
    }

    public FormationType addDocuments(Document document) {
        this.documents.add(document);
        document.getFormationTypes().add(this);
        return this;
    }

    public FormationType removeDocuments(Document document) {
        this.documents.remove(document);
        document.getFormationTypes().remove(this);
        return this;
    }

    public void setDocuments(Set<Document> documents) {
        this.documents = documents;
    }

    public Set<FormationModule> getFormationModules() {
        return formationModules;
    }

    public FormationType formationModules(Set<FormationModule> formationModules) {
        this.formationModules = formationModules;
        return this;
    }

    public FormationType addFormationModules(FormationModule formationModule) {
        this.formationModules.add(formationModule);
        formationModule.getFormationTypes().add(this);
        return this;
    }

    public FormationType removeFormationModules(FormationModule formationModule) {
        this.formationModules.remove(formationModule);
        formationModule.getFormationTypes().remove(this);
        return this;
    }

    public void setFormationModules(Set<FormationModule> formationModules) {
        this.formationModules = formationModules;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FormationType)) {
            return false;
        }
        return id != null && id.equals(((FormationType) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FormationType{" +
            "id=" + getId() +
            ", description='" + getDescription() + "'" +
            ", duration=" + getDuration() +
            "}";
    }
}
