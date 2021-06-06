package kodlamaio.hrms.entities.concretes;

import lombok.*;

import javax.persistence.*;

@Data
@Entity
@Table(name="system_staff")
@NoArgsConstructor
//@AllArgsConstructor
@PrimaryKeyJoinColumn(name = "id")
public class SystemStaff extends User {

}
