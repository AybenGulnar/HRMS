package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.JobSeekerService;
import kodlamaio.hrms.core.adapters.MailConfirmAdapter;
import kodlamaio.hrms.core.adapters.MernisAdapter;
import kodlamaio.hrms.core.utilities.results.ErrorResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.JobSeekerDao;
import kodlamaio.hrms.entities.concretes.Experience;
import kodlamaio.hrms.entities.concretes.JobSeeker;
import kodlamaio.hrms.entities.concretes.School;
import kodlamaio.hrms.entities.dtos.EmailDto;
import kodlamaio.hrms.entities.dtos.JobSeekerRegisterDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
public class JobSeekerManager implements JobSeekerService {

    MernisAdapter mernisAdapter = new MernisAdapter();
    
    MailConfirmAdapter mailConfirmAdapter = new MailConfirmAdapter();

    private JobSeekerDao jobSeekerDao;

    @Autowired
    public JobSeekerManager(JobSeekerDao jobSeekerDao) {
        super();
        this.jobSeekerDao = jobSeekerDao;
    }

    @Override
    public List<JobSeeker> getall() {
        return this.jobSeekerDao.findAll();
    }

    @Override
    public Result register(JobSeekerRegisterDto jobSeekerRegisterDto) {

        if(!jobSeekerRegisterDto.getPassword().equals(jobSeekerRegisterDto.getPasswordConfirm())){
            return new ErrorResult("Şifreler uyuşmuyor");
        }

        if(!mernisAdapter.checkPerson(jobSeekerRegisterDto.getIdentityNo())){
            return new ErrorResult("Tc no bulunamadı");
        }
        JobSeeker jobSeeker = new JobSeeker();

        try {
            jobSeeker.setFirstName(jobSeekerRegisterDto.getFirstName());
            jobSeeker.setLastName(jobSeekerRegisterDto.getLastName());
            jobSeeker.setIdentityNo(jobSeekerRegisterDto.getIdentityNo());
            jobSeeker.setYearOfBirth(jobSeekerRegisterDto.getBirthYear());
            jobSeeker.setPassword(jobSeekerRegisterDto.getPassword());
            jobSeeker.setActived(false);
            jobSeeker.setEPosta(jobSeekerRegisterDto.getEmail());


            this.jobSeekerDao.save(jobSeeker);
        }
        catch (Exception e){
            return new ErrorResult("Tc veya Eposta Kayitli.");
        }

        return new SuccessDataResult<JobSeeker>(jobSeeker,"İş arayan eklendi.");
    }

    @Override
    public Result MailConfirm(EmailDto emailDto) {

        JobSeeker seeker;


        try {
            seeker = this.jobSeekerDao.getOne(emailDto.getId());
        }catch (Exception e){
            return new ErrorResult("İş arayan bulunmadı");
        }

        if(seeker.isActived()){
            return new ErrorResult("İş arayan epostası zaten doğrulanmış");
        }

        seeker.setActived(true);

        try {
            this.jobSeekerDao.save(seeker);
        }
        catch (Exception e){
            return new ErrorResult("İş arayan epostası doğrulanamadı");
        }



        return mailConfirmAdapter.confirmMail(seeker.getEPosta());

    }

    @Override
    public Result add(JobSeeker jobSeeker) {

        this.jobSeekerDao.save(jobSeeker);

        return new SuccessDataResult<JobSeeker>(jobSeeker,"Başarılı");
    }

    @Override
    public Result uploadImage(int id, String imgUrl) {

        JobSeeker jobSeeker = this.jobSeekerDao.getById(id);

        jobSeeker.setImageUrl(imgUrl);

        return new SuccessDataResult<JobSeeker>(jobSeeker,"Başarılı");
    }

    @Override
    public List<School> getSchoolsByUserId(int id) {

        JobSeeker jobSeeker = jobSeekerDao.getById(id);

        List<School> schools = jobSeeker.getSchools();

        for (School item : schools)
        {
            if(item.getGraduatedYear() == null || item.getGraduatedYear().equals("") ||item.getGraduatedYear().equals("string")){
                item.setGraduatedYear("9999");
            }
        }

        Collections.sort(schools, new Comparator<School>() {
            @Override
            public int compare(School o1, School o2) {
                return o2.getGraduatedYear().compareTo(o1.getGraduatedYear());
            }
        });

        for (School item : schools)
        {
            if(item.getGraduatedYear().equals("9999")){
                item.setGraduatedYear("Devam Ediyor");
            }
        }

        return schools;
    }

    @Override
    public List<Experience> getExperiencesByUserId(int id) {
        JobSeeker jobSeeker = jobSeekerDao.getById(id);

        List<Experience> experiences = jobSeeker.getExperiences();

        for (Experience item : experiences)
        {
            if(item.getLeaveYear() == null || item.getLeaveYear().equals("") ||item.getLeaveYear().equals("string")){
                item.setLeaveYear("9999");
            }
        }


        Collections.sort(experiences, new Comparator<Experience>() {
            @Override
            public int compare(Experience o1, Experience o2) {
                return o2.getLeaveYear().compareTo(o1.getLeaveYear());
            }
        });

        for (Experience item : experiences)
        {
            if(item.getLeaveYear().equals("9999")){
                item.setLeaveYear("Devam Ediyor");
            }
        }

        return experiences;
    }

}
