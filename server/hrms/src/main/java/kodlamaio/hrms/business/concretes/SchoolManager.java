package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.SchoolService;
import kodlamaio.hrms.core.utilities.results.ErrorResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.SchoolDao;
import kodlamaio.hrms.entities.concretes.JobSeeker;
import kodlamaio.hrms.entities.concretes.School;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SchoolManager implements SchoolService {

    private SchoolDao schoolDao;

    @Autowired
    public SchoolManager(SchoolDao schoolDao) {
        super();
        this.schoolDao = schoolDao;
    }

    @Override
    public Result add(School school) {
        this.schoolDao.save(school);

        return new SuccessDataResult<School>(school,"Basarili");
    }

    @Override
    public Result getByJobSeeker_id(int id) {
        return new SuccessDataResult<List<School>>(this.schoolDao.getByJobSeeker_id(id),"Basarili");
    }

    @Override
    public Result updateSchool(int id, String schoolName, String department, int startYear, String graduatedYear) {

        School school;
        school = this.schoolDao.getById(id);

        if(!Objects.isNull(school)){
            school.setSchoolName(schoolName);
            school.setDepartment(department);
            school.setStartYear(startYear);
            school.setGraduatedYear(graduatedYear);
            this.schoolDao.save(school);

            return new SuccessDataResult<School>(school,"Basarili");

        }
        return new ErrorResult("Hata");
    }

    @Override
    public Result deleteSchool(int id) {
        School school;
        school = this.schoolDao.getById(id);

        if(!Objects.isNull(school)){
            this.schoolDao.delete(school);

            return new SuccessDataResult<School>(school,"Basarili");

        }
        return new ErrorResult("Hata");
    }
}
