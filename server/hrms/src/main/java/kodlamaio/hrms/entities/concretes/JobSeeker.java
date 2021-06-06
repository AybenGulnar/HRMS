package kodlamaio.hrms.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@EqualsAndHashCode(callSuper = false)
@Data
@Entity
@Table(name="job_seekers")
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "schools","experiences","foreignLanguages","skills"})
public class JobSeeker extends User{

    @OneToMany(mappedBy = "jobSeeker")
    private List<School> schools;

    @OneToMany(mappedBy = "jobSeeker")
    private List<Experience> experiences;

    @OneToMany(mappedBy = "jobSeeker")
    private List<ForeignLanguage> foreignLanguages;

    @OneToMany(mappedBy = "jobSeeker")
    private List<Skill> skills;

    @Column(name="image_url")
    private String imageUrl;

    @Column(name="github")
    private String github;

    @Column(name="linkedin")
    private String linkedin;


    @Column(name="introducingText")
    private String introducingText;


}
