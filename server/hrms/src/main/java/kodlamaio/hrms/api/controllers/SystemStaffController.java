package kodlamaio.hrms.api.controllers;

import kodlamaio.hrms.business.abstracts.JobSeekerService;
import kodlamaio.hrms.business.abstracts.SystemStaffService;
import kodlamaio.hrms.core.services.CloudinaryService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.JobSeeker;
import kodlamaio.hrms.entities.concretes.SystemStaff;
import kodlamaio.hrms.entities.dtos.UserLoginDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ResponseBody
@RestController
@RequestMapping("/api/systemstaffs")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class SystemStaffController {

    private SystemStaffService systemStaffService;

    @Autowired
    public SystemStaffController(SystemStaffService systemStaffService){
        super();
        this.systemStaffService = systemStaffService;
    }

    @GetMapping("/getById")
    public Result getbyId(@RequestParam int id){
        return this.systemStaffService.getById(id);
    }

    @PostMapping("/updateSystemStaff")
    public Result updateSystemStaff(@RequestParam int id,@RequestParam String firstName,@RequestParam String lastName,@RequestParam int yearOfBirth){
        return this.systemStaffService.updateSystemStaff(id,firstName,lastName,yearOfBirth);
    }

    @PostMapping("/login")
    public Result login(@RequestParam String name,@RequestParam String pass){
        return this.systemStaffService.login(name,pass);
    }

    @PostMapping("/add")
    public Result add(@RequestBody SystemStaff systemStaff){
        return this.systemStaffService.add(systemStaff);
    }
}
