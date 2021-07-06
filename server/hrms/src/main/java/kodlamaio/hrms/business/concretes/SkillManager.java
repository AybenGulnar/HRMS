package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.SkillService;
import kodlamaio.hrms.core.utilities.results.ErrorResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.SkillDao;
import kodlamaio.hrms.entities.concretes.ForeignLanguage;
import kodlamaio.hrms.entities.concretes.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class SkillManager implements SkillService {

    private SkillDao skillDao;

    @Autowired
    public SkillManager(SkillDao skillDao) {
        super();
        this.skillDao = skillDao;
    }

    @Override
    public Result getAll() {
        return new SuccessDataResult<List<Skill>>(this.skillDao.findAll(),"Basarili");
    }

    @Override
    public Result add(Skill skill) {
        this.skillDao.save(skill);

        return new SuccessDataResult<Skill>(skill,"Basarili");
    }

    @Override
    public Result updateSkill(int id, String name) {
        Skill skill;
        skill = this.skillDao.getById(id);

        if(!Objects.isNull(skill)){
            skill.setName(name);
            this.skillDao.save(skill);

            return new SuccessDataResult<Skill>(skill,"Basarili");

        }
        return new ErrorResult("Hata");
    }

    @Override
    public Result deleteSkill(int id) {
        Skill skill;
        skill = this.skillDao.getById(id);

        if(!Objects.isNull(skill)){
            this.skillDao.delete(skill);

            return new SuccessDataResult<Skill>(skill,"Basarili");

        }
        return new ErrorResult("Hata");
    }
}
