package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Experience;

public interface ExperienceService {
    Result add(Experience experience);
    Result getByJobSeeker_id(int id);
    Result updateExperience(int id,String companyName,String position,int startYear,String leaveYear);
    Result deleteExperience(int id);
}
