package kodlamaio.hrms.api.controllers;

import kodlamaio.hrms.business.abstracts.ExperienceService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Experience;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ResponseBody
@RestController
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ExperienceController {

    private ExperienceService experienceService;

    @Autowired
    public ExperienceController(ExperienceService experienceService){
        super();
        this.experienceService = experienceService;
    }

    @GetMapping("/getByJobSeeker")
    public Result getByJobSeeker(@RequestParam int id){
        return this.experienceService.getByJobSeeker_id(id);
    }


    @PostMapping("/add")
    public Result add(@RequestBody Experience experience){
        return this.experienceService.add(experience);
    }
}
