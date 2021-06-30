package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.SkillService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.SkillDao;
import kodlamaio.hrms.entities.concretes.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
}
