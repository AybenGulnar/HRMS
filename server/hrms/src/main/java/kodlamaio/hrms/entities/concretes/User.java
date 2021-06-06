package kodlamaio.hrms.entities.concretes;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Table(name="users")
@NoArgsConstructor
@AllArgsConstructor
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="first_name")
	private String firstName;
	
	@Column(name="last_name")
	private String lastName;
	
	@Column(name="e_posta")
	private String ePosta;
	
	@Column(name="identity_no")
	private int identityNo;
	
	@Column(name="year_of_birth")
	private int yearOfBirth;
	
	@Column(name="password")
	private String password;
	
	@Column(name="is_actived")
	private boolean isActived;

}
