package kodlamaio.hrms.api.controllers;

import kodlamaio.hrms.business.abstracts.JobAdvertService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.dtos.JobAdvertDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ResponseBody
@RestController
@RequestMapping("/api/jobadverts")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JobAdvertController {

    private JobAdvertService jobAdvertService;

    @Autowired
    public JobAdvertController(JobAdvertService jobAdvertService){
        super();
        this.jobAdvertService = jobAdvertService;
    }

    @GetMapping("/getall")
    public Result getall(){
        return this.jobAdvertService.getall();
    }

    @GetMapping("/getById")
    public Result getById(@RequestParam int id){
        return this.jobAdvertService.getById(id);
    }

    @PostMapping("/add")
    public Result add(@RequestBody JobAdvertDto jobAdvert){
        return this.jobAdvertService.add(jobAdvert);
    }

    @PostMapping("/deleteById")
    public Result deleteById(@RequestParam int id){
        return this.jobAdvertService.deleteById(id);
    }

    @PostMapping("/changeActive")
    public Result changeActive(@RequestParam int id,@RequestParam boolean active){
        return this.jobAdvertService.changeActive(id,active);
    }

    @GetMapping("/getbyactived")
    public Result getByActived(@RequestParam boolean active){
        return this.jobAdvertService.getByActived(active);
    }

    @GetMapping("/getbydate")
    public Result getByDate(){
        return this.jobAdvertService.getByDate();
    }

    @GetMapping("/getbyactiveandemployer")
    public Result getByActiveAndEmployer(@RequestParam boolean active,@RequestParam int id){
        return this.jobAdvertService.getByActiveAndEmployer(active,id);
    }

    @GetMapping("/getbyemployer")
    public Result getByActiveAndEmployer(@RequestParam int id){
        return this.jobAdvertService.getByEmployer(id);
    }
}
