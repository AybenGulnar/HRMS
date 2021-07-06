package kodlamaio.hrms.entities.concretes;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Entity
@Table(name="employers")
@NoArgsConstructor
@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "jobAdverts"})
public class Employer extends User{
	
	@Column(name="company_name")
	private String companyName;
	
	@Column(name="phone_number")
	private String phoneNumber;
	
	@Column(name="website")
	private String website;

	@Column(name="ufirst_name")
	private String ufirstName;

	@Column(name="ulast_name")
	private String ulastName;

	@Column(name="uyear_of_birth")
	private int uyearOfBirth;

	@Column(name="ucompany_name")
	private String ucompanyName;

	@Column(name="uphone_number")
	private String uphoneNumber;

	@Column(name="uwebsite")
	private String uwebsite;

	@Column(name="is_updated")
	private boolean isUpdated;

	@OneToMany(mappedBy = "employer")
	private List<JobAdvert> jobAdverts;

}

