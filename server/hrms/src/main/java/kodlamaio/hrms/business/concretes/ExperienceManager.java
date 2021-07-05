package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.ExperienceService;
import kodlamaio.hrms.core.utilities.results.ErrorResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.ExperienceDao;
import kodlamaio.hrms.entities.concretes.Experience;
import kodlamaio.hrms.entities.concretes.School;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ExperienceManager implements ExperienceService {

    private ExperienceDao experienceDao;

    @Autowired
    public ExperienceManager(ExperienceDao experienceDao) {
        super();
        this.experienceDao = experienceDao;
    }

    @Override
    public Result add(Experience experience) {
        this.experienceDao.save(experience);

        return new SuccessDataResult<Experience>(experience,"Basarili");
    }

    @Override
    public Result getByJobSeeker_id(int id) {
        return new SuccessDataResult<List<Experience>>(this.experienceDao.getByJobSeeker_id(id),"Basarili");
    }

    @Override
    public Result updateExperience(int id, String companyName, String position, int startYear, String leaveYear) {
        Experience experience;
        experience = this.experienceDao.getById(id);

        if(!Objects.isNull(experience)){
            experience.setCompanyName(companyName);
            experience.setPosition(position);
            experience.setStartYear(startYear);
            experience.setLeaveYear(leaveYear);
            this.experienceDao.save(experience);

            return new SuccessDataResult<Experience>(experience,"Basarili");

        }
        return new ErrorResult("Hata");
    }

    @Override
    public Result deleteExperience(int id) {
        Experience experience;
        experience = this.experienceDao.getById(id);

        if(!Objects.isNull(experience)){
            this.experienceDao.delete(experience);

            return new SuccessDataResult<Experience>(experience,"Basarili");

        }
        return new ErrorResult("Hata");
    }
}
