package net.komportementalist.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * Groups of FormationModules for ProfilVariants and UserCategory
 */
@ApiModel(description = "Groups of FormationModules for ProfilVariants and UserCategory")
@Entity
@Table(name = "formation_program")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class FormationProgram implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @ManyToOne
    @JsonIgnoreProperties(value = "formationPrograms", allowSetters = true)
    private UserCategory userCategories;

    @ManyToOne
    @JsonIgnoreProperties(value = "formationPrograms", allowSetters = true)
    private ProgramType programType;

    @ManyToOne
    @JsonIgnoreProperties(value = "formationPrograms", allowSetters = true)
    private ProfileVariant profileVariant;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JoinTable(name = "formation_program_formation_modules",
               joinColumns = @JoinColumn(name = "formation_program_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "formation_modules_id", referencedColumnName = "id"))
    private Set<FormationModule> formationModules = new HashSet<>();

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

    public FormationProgram name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public FormationProgram description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public UserCategory getUserCategories() {
        return userCategories;
    }

    public FormationProgram userCategories(UserCategory userCategory) {
        this.userCategories = userCategory;
        return this;
    }

    public void setUserCategories(UserCategory userCategory) {
        this.userCategories = userCategory;
    }

    public ProgramType getProgramType() {
        return programType;
    }

    public FormationProgram programType(ProgramType programType) {
        this.programType = programType;
        return this;
    }

    public void setProgramType(ProgramType programType) {
        this.programType = programType;
    }

    public ProfileVariant getProfileVariant() {
        return profileVariant;
    }

    public FormationProgram profileVariant(ProfileVariant profileVariant) {
        this.profileVariant = profileVariant;
        return this;
    }

    public void setProfileVariant(ProfileVariant profileVariant) {
        this.profileVariant = profileVariant;
    }

    public Set<FormationModule> getFormationModules() {
        return formationModules;
    }

    public FormationProgram formationModules(Set<FormationModule> formationModules) {
        this.formationModules = formationModules;
        return this;
    }

    public FormationProgram addFormationModules(FormationModule formationModule) {
        this.formationModules.add(formationModule);
        formationModule.getFormationPrograms().add(this);
        return this;
    }

    public FormationProgram removeFormationModules(FormationModule formationModule) {
        this.formationModules.remove(formationModule);
        formationModule.getFormationPrograms().remove(this);
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
        if (!(o instanceof FormationProgram)) {
            return false;
        }
        return id != null && id.equals(((FormationProgram) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "FormationProgram{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
