package kodlamaio.hrms.dataAccess.abstracts;

import kodlamaio.hrms.entities.concretes.SystemStaff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SystemStaffDao extends JpaRepository<SystemStaff, Integer> {
}
