package kodlamaio.hrms.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name="schools")
public class School {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    @NotNull
    @NotBlank
    private String schoolName;

    @Column(name="department")
    @NotNull
    @NotBlank
    private String department;

    @Column(name="start_year")
    @NotNull
    @NotBlank
    private int startYear;

    @Column(name="graduated_year")
    private String graduatedYear;

    @ManyToOne()
    @JoinColumn(name="job_seeker_id")
    private JobSeeker jobSeeker;



}
