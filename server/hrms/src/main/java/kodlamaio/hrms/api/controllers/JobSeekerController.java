package kodlamaio.hrms.api.controllers;

import kodlamaio.hrms.entities.concretes.*;
import kodlamaio.hrms.entities.dtos.UserLoginDto;
import org.springframework.http.ResponseEntity;
import kodlamaio.hrms.core.services.CloudinaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import kodlamaio.hrms.business.abstracts.JobSeekerService;
import kodlamaio.hrms.core.utilities.results.ErrorDataResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.dtos.EmailDto;
import kodlamaio.hrms.entities.dtos.JobSeekerRegisterDto;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import javax.imageio.ImageIO;
import javax.validation.Valid;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@ResponseBody
@RestController
@RequestMapping("/api/jobsekkers")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class JobSeekerController {

    private JobSeekerService jobSeekerService;
    private CloudinaryService cloudinaryService;

    @Autowired
    public JobSeekerController(JobSeekerService jobSeekerService,CloudinaryService cloudinaryService){
        super();
        this.jobSeekerService = jobSeekerService;
        this.cloudinaryService = cloudinaryService;
    }

    @GetMapping("/getall")
    public List<JobSeeker> getall(){
        return this.jobSeekerService.getall();
    }

    @GetMapping("/getById")
    public Result getbyId(@RequestParam int id){
        return this.jobSeekerService.getById(id);
    }

    @PostMapping("/register")
    public Result register(@RequestBody JobSeekerRegisterDto jobSeekerRegisterDto){
        return this.jobSeekerService.register(jobSeekerRegisterDto);
    }

    @PostMapping("/login")
    public Result login(@RequestBody UserLoginDto userLoginDto){
        return this.jobSeekerService.login(userLoginDto.getEmail(),userLoginDto.getPassword());
    }

    @PostMapping("/add")
    public Result add(@Valid @RequestBody JobSeeker jobSeeker){
        return this.jobSeekerService.add(jobSeeker);
    }

    @PostMapping("/confirmemail")
    public Result confirmemail(@RequestBody EmailDto emailDto){
        return this.jobSeekerService.MailConfirm(emailDto);
    }

    @PostMapping("/updateMainInfo")
    public Result updateMainInfo(@RequestParam int id,@RequestParam String firstName, @RequestParam String lastName, @RequestParam int yearOfBirth, @RequestParam String introducingText){
        return this.jobSeekerService.updateMainInfo(id,firstName,lastName,yearOfBirth,introducingText);
    }

    @PostMapping("/updateSocialMedia")
    public Result updateSocialMedia(@RequestParam int id,@RequestParam String github, @RequestParam String linkedin){
        return this.jobSeekerService.updateSocialMedia(id,github,linkedin);
    }

    @GetMapping("/getSchoolsByUserId")
    public List<School> getSchoolsByUserId(@RequestParam int id){
        return this.jobSeekerService.getSchoolsByUserId(id);
    }

    @GetMapping("/getExperiencesByUserId")
    public List<Experience> getExperiencesByUserId(@RequestParam int id){
        return this.jobSeekerService.getExperiencesByUserId(id);
    }

    @GetMapping("/getForeignLanguagesByUserId")
    public List<ForeignLanguage> getForeignLanguagesByUserId(@RequestParam int id){
        return this.jobSeekerService.getForeignLanguagesByUserId(id);
    }

    @GetMapping("/getSkillsByUserId")
    public List<Skill> getSkillsByUserId(@RequestParam int id){
        return this.jobSeekerService.getSkillsByUserId(id);
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<?> upload(@RequestParam int id,@RequestParam MultipartFile multipartFile) throws IOException {

        BufferedImage bufferedImage = ImageIO.read(multipartFile.getInputStream());
        if(bufferedImage == null) {

            return new ResponseEntity("Resim validasyonu başarısız.", HttpStatus.BAD_REQUEST);
        }

        Map result = cloudinaryService.upload(multipartFile);

        return new ResponseEntity(this.jobSeekerService.uploadImage(id,(String)result.get("url")), HttpStatus.OK);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorDataResult<Object> handleValidationException(MethodArgumentNotValidException exceptions){
        Map<String, String> validationErrors = new HashMap<String,String>();
        for (FieldError fieldError : exceptions.getBindingResult().getFieldErrors()) {
            validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
        }

        ErrorDataResult<Object> errors = new ErrorDataResult<Object>(validationErrors,"Doğrulama hataları");

        return errors;


    }
}
