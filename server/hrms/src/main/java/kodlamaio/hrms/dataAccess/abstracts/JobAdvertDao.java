package kodlamaio.hrms.dataAccess.abstracts;

import org.springframework.data.domain.Sort;
import kodlamaio.hrms.entities.concretes.JobAdvert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobAdvertDao extends JpaRepository<JobAdvert, Integer> {

    List<JobAdvert> getByIsActived(boolean isActived);
    List<JobAdvert> getByIsActivedAndEmployer_id(boolean isActived,int id);
    JobAdvert getByJobAdvertId(int JobAdvertId);
}
