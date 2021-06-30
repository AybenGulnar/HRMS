package kodlamaio.hrms.api.controllers;

import kodlamaio.hrms.business.abstracts.ForeignLanguageService;
import kodlamaio.hrms.business.abstracts.SkillService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.ForeignLanguage;
import kodlamaio.hrms.entities.concretes.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ResponseBody
@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SkillController {

    private SkillService skillService;

    @Autowired
    public SkillController(SkillService skillService){
        super();
        this.skillService = skillService;
    }

    @GetMapping("/getall")
    public Result getall(){
        return this.skillService.getAll();
    }

    @PostMapping("/add")
    public Result add(@RequestBody Skill skill){
        return this.skillService.add(skill);
    }
}
