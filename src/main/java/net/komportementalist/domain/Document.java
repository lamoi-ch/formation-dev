package net.komportementalist.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * All documents and links
 */
@ApiModel(description = "All documents and links")
@Entity
@Table(name = "document")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Document implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "url")
    private String url;

    @Column(name = "duration")
    private Integer duration;

    @Column(name = "creation_date")
    private Instant creationDate;

    @Column(name = "user_creation")
    private String userCreation;

    @Column(name = "download_date")
    private Instant downloadDate;

    @Column(name = "user_download")
    private String userDownload;

    @ManyToOne
    @JsonIgnoreProperties(value = "documents", allowSetters = true)
    private DocumentCategory documentCategory;

    @ManyToOne
    @JsonIgnoreProperties(value = "documents", allowSetters = true)
    private DocumentType documentType;

    @ManyToMany(mappedBy = "documents")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<FormationType> formationTypes = new HashSet<>();

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

    public Document name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public Document description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getUrl() {
        return url;
    }

    public Document url(String url) {
        this.url = url;
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Integer getDuration() {
        return duration;
    }

    public Document duration(Integer duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Instant getCreationDate() {
        return creationDate;
    }

    public Document creationDate(Instant creationDate) {
        this.creationDate = creationDate;
        return this;
    }

    public void setCreationDate(Instant creationDate) {
        this.creationDate = creationDate;
    }

    public String getUserCreation() {
        return userCreation;
    }

    public Document userCreation(String userCreation) {
        this.userCreation = userCreation;
        return this;
    }

    public void setUserCreation(String userCreation) {
        this.userCreation = userCreation;
    }

    public Instant getDownloadDate() {
        return downloadDate;
    }

    public Document downloadDate(Instant downloadDate) {
        this.downloadDate = downloadDate;
        return this;
    }

    public void setDownloadDate(Instant downloadDate) {
        this.downloadDate = downloadDate;
    }

    public String getUserDownload() {
        return userDownload;
    }

    public Document userDownload(String userDownload) {
        this.userDownload = userDownload;
        return this;
    }

    public void setUserDownload(String userDownload) {
        this.userDownload = userDownload;
    }

    public DocumentCategory getDocumentCategory() {
        return documentCategory;
    }

    public Document documentCategory(DocumentCategory documentCategory) {
        this.documentCategory = documentCategory;
        return this;
    }

    public void setDocumentCategory(DocumentCategory documentCategory) {
        this.documentCategory = documentCategory;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public Document documentType(DocumentType documentType) {
        this.documentType = documentType;
        return this;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public Set<FormationType> getFormationTypes() {
        return formationTypes;
    }

    public Document formationTypes(Set<FormationType> formationTypes) {
        this.formationTypes = formationTypes;
        return this;
    }

    public Document addFormationTypes(FormationType formationType) {
        this.formationTypes.add(formationType);
        formationType.getDocuments().add(this);
        return this;
    }

    public Document removeFormationTypes(FormationType formationType) {
        this.formationTypes.remove(formationType);
        formationType.getDocuments().remove(this);
        return this;
    }

    public void setFormationTypes(Set<FormationType> formationTypes) {
        this.formationTypes = formationTypes;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Document)) {
            return false;
        }
        return id != null && id.equals(((Document) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Document{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            ", url='" + getUrl() + "'" +
            ", duration=" + getDuration() +
            ", creationDate='" + getCreationDate() + "'" +
            ", userCreation='" + getUserCreation() + "'" +
            ", downloadDate='" + getDownloadDate() + "'" +
            ", userDownload='" + getUserDownload() + "'" +
            "}";
    }
}
