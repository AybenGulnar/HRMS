package kodlamaio.hrms.api.controllers;

import kodlamaio.hrms.business.abstracts.ExperienceService;
import kodlamaio.hrms.business.abstracts.SchoolService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Experience;
import kodlamaio.hrms.entities.concretes.School;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ResponseBody
@RestController
@RequestMapping("/api/schools")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SchoolController {

    private SchoolService schoolService;

    @Autowired
    public SchoolController(SchoolService schoolService){
        super();
        this.schoolService = schoolService;
    }

    @GetMapping("/getByJobSeeker")
    public Result getByJobSeeker(@RequestParam int id){
        return this.schoolService.getByJobSeeker_id(id);
    }

    @PostMapping("/updateSchool")
    public Result updateSchool(@RequestParam int id, @RequestParam String schoolName, @RequestParam String department, @RequestParam int startYear, @RequestParam String graduatedYear){
        return this.schoolService.updateSchool(id,schoolName,department,startYear,graduatedYear);
    }

    @PostMapping("/add")
    public Result add(@RequestBody School school){
        return this.schoolService.add(school);
    }

    @PostMapping("/deleteSchool")
    public Result deleteSchool(@RequestParam int id){
        return this.schoolService.deleteSchool(id);
    }
}
