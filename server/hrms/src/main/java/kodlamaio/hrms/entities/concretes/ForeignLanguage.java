package kodlamaio.hrms.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;


@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="foreign_languages")
public class ForeignLanguage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    @NotNull
    @NotBlank
    private String name;

    @Column(name="level")
    @Min(1)
    @Max(5)
    @NotNull
    private int level;

    @ManyToOne()
    @JoinColumn(name="job_seeker_id")
    private JobSeeker jobSeeker;
}
