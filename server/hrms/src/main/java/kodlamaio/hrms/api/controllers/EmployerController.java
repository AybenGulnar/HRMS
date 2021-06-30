package kodlamaio.hrms.api.controllers;
import kodlamaio.hrms.entities.dtos.UserLoginDto;
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

    @GetMapping("/getById")
    public Result getById(@RequestParam int id){
        return  this.employerService.getById(id);
    }

    @PostMapping("/register")
    public Result register(@RequestBody EmployerDto employerDto){
        return this.employerService.register(employerDto);
    }

    @PostMapping("/login")
    public Result login(@RequestBody UserLoginDto userLoginDto){
        return this.employerService.login(userLoginDto.getEmail(),userLoginDto.getPassword());
    }

    @PostMapping("/confirmemail")
    public Result confirmemail(@RequestBody EmailDto emailDto){
        return this.employerService.MailConfirm(emailDto);
    }
}
