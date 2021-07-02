package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.dtos.JobAdvertDto;

public interface JobAdvertService {
    Result getall();
    Result getById(int id);
    Result add(JobAdvertDto jobAdvert);
    Result getByActived(boolean isActived);
    Result getByDate();
    Result getByActiveAndEmployer(boolean active,int id);
    Result getByEmployer(int id);
    Result deleteById(int id);
    Result changeActive(int id,boolean active);
}
