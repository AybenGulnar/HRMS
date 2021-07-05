package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Skill;

public interface SkillService {
    Result getAll();
    Result add(Skill skill);
    Result updateSkill(int id,String name);
    Result deleteSkill(int id);
}
