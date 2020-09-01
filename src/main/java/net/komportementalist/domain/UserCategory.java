package net.komportementalist.domain;

import io.swagger.annotations.ApiModel;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * 6 types of documents : Fondamental, Outil, Quizz, Podcast, Vidéo, Article
 */
@ApiModel(description = "6 types of documents : Fondamental, Outil, Quizz, Podcast, Vidéo, Article")
@Entity
@Table(name = "user_category")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class UserCategory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    private Long id;

    @Column(name = "name")
    private String name;

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

    public UserCategory name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UserCategory)) {
            return false;
        }
        return id != null && id.equals(((UserCategory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UserCategory{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            "}";
    }
}
