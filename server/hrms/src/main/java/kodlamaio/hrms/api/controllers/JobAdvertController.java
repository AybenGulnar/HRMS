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

    @PostMapping("/add")
    public Result add(@RequestBody JobAdvertDto jobAdvert){
        return this.jobAdvertService.add(jobAdvert);
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
}
