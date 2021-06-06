package kodlamaio.hrms.entities.concretes;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="job_adverts")
public class JobAdvert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="job_advert_id")
    private int JobAdvertId;

    @ManyToOne()
    @JoinColumn(name="job_id")
    private Job job;

    @Column(name="description")
    private String description;

    @ManyToOne()
    @JoinColumn(name="city_id")
    private City city;

    @Column(name = "salary_min")
    private int salaryMin;

    @Column(name = "salary_max")
    private int salaryMax;

    @Column(name = "open_position_count")
    private int openPositionCount;

    @Column(name = "deadline")
    private Date deadline;

    @Column(name = "publishing_date")
    private Date publishingDate;

    @Column(name="is_actived")
    private boolean isActived;

    @ManyToOne()
    @JoinColumn(name="user_id")
    private Employer employer;

}
