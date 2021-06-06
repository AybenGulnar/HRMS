package kodlamaio.hrms.api.controllers;
import org.springframework.web.bind.annotation.CrossOrigin;
import kodlamaio.hrms.business.abstracts.EmployerService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Employer;
import kodlamaio.hrms.entities.dtos.EmailDto;
import kodlamaio.hrms.entities.dtos.EmployerDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@ResponseBody
@RestController
@RequestMapping("/api/employers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class EmployerController {

    private EmployerService employerService;

    @Autowired
    public EmployerController(EmployerService employerService){
        super();
        this.employerService = employerService;
    }

    @GetMapping("/getall")
    public List<Employer> getall(){
        return  this.employerService.getall();
    }

    @PostMapping("/register")
    public Result register(@RequestBody EmployerDto employerDto){
        return this.employerService.register(employerDto);
    }

    @PostMapping("/confirmemail")
    public Result confirmemail(@RequestBody EmailDto emailDto){
        return this.employerService.MailConfirm(emailDto);
    }
}
