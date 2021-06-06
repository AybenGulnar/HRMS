package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Experience;
import kodlamaio.hrms.entities.concretes.JobSeeker;
import kodlamaio.hrms.entities.concretes.School;
import kodlamaio.hrms.entities.dtos.EmailDto;
import kodlamaio.hrms.entities.dtos.JobSeekerRegisterDto;

import java.util.List;

public interface JobSeekerService {
    List<JobSeeker> getall();
    Result register(JobSeekerRegisterDto jobSeekerRegisterDto);
    Result MailConfirm(EmailDto emailDto);

    Result add(JobSeeker jobSeeker);

    Result uploadImage(int id,String imgUrl);

    List<School> getSchoolsByUserId(int id);

    List<Experience> getExperiencesByUserId(int id);
}
