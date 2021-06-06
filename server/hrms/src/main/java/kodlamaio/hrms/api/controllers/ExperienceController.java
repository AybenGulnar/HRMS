package kodlamaio.hrms.api.controllers;

import kodlamaio.hrms.business.abstracts.ExperienceService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Experience;
import kodlamaio.hrms.entities.concretes.School;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ResponseBody
@RestController
@RequestMapping("/api/experiences")
public class ExperienceController {

    private ExperienceService experienceService;

    @Autowired
    public ExperienceController(ExperienceService experienceService){
        super();
        this.experienceService = experienceService;
    }


    @PostMapping("/add")
    public Result add(@RequestBody Experience experience){
        return this.experienceService.add(experience);
    }
}
