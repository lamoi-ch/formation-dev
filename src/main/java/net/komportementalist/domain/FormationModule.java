package net.komportementalist.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A group of FormationTypes
 */
@ApiModel(description = "A group of FormationTypes")
@Entity
@Table(name = "formation_module")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FormationModule implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "code")
    private String code;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "formation_module_formation_types",
               joinColumns = @JoinColumn(name = "formation_module_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "formation_types_id", referencedColumnName = "id"))
    private Set<FormationType> formationTypes = new HashSet<>();

    @ManyToMany(mappedBy = "formationModules")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnore
    private Set<FormationProgram> formationPrograms = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public FormationModule code(String code) {
        this.code = code;
        return this;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public FormationModule name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public FormationModule description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<FormationType> getFormationTypes() {
        return formationTypes;
    }

    public FormationModule formationTypes(Set<FormationType> formationTypes) {
        this.formationTypes = formationTypes;
        return this;
    }

    public FormationModule addFormationTypes(FormationType formationType) {
        this.formationTypes.add(formationType);
        formationType.getFormationModules().add(this);
        return this;
    }

    public FormationModule removeFormationTypes(FormationType formationType) {
        this.formationTypes.remove(formationType);
        formationType.getFormationModules().remove(this);
        return this;
    }

    public void setFormationTypes(Set<FormationType> formationTypes) {
        this.formationTypes = formationTypes;
    }

    public Set<FormationProgram> getFormationPrograms() {
        return formationPrograms;
    }

    public FormationModule formationPrograms(Set<FormationProgram> formationPrograms) {
        this.formationPrograms = formationPrograms;
        return this;
    }

    public FormationModule addFormationPrograms(FormationProgram formationProgram) {
        this.formationPrograms.add(formationProgram);
        formationProgram.getFormationModules().add(this);
        return this;
    }

    public FormationModule removeFormationPrograms(FormationProgram formationProgram) {
        this.formationPrograms.remove(formationProgram);
        formationProgram.getFormationModules().remove(this);
        return this;
    }

    public void setFormationPrograms(Set<FormationProgram> formationPrograms) {
        this.formationPrograms = formationPrograms;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof FormationModule)) {
            return false;
        }
        return id != null && id.equals(((FormationModule) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FormationModule{" +
            "id=" + getId() +
            ", code='" + getCode() + "'" +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
