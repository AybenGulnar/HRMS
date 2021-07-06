package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.School;

public interface SchoolService {
    Result add(School school);
    Result getByJobSeeker_id(int id);
    Result updateSchool(int id,String schoolName,String department,int startYear,String graduatedYear);
    Result deleteSchool(int id);
}
