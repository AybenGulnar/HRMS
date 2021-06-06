package kodlamaio.hrms.entities.concretes;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Column;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;

@Data
@Entity
@Table(name="experiences")
@AllArgsConstructor
@NoArgsConstructor
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="company_name")
    @NotNull
    @NotBlank
    private String companyName;

    @Column(name="position")
    @NotNull
    @NotBlank
    private String position;

    @Column(name="start_year")
    @NotNull
    @NotBlank
    private int startYear;

    @Column(name="leave_year")
    private String leaveYear;

    @ManyToOne()
    @JoinColumn(name="job_seeker_id")
    private JobSeeker jobSeeker;
}
