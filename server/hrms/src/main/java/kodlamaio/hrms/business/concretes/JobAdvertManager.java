package kodlamaio.hrms.business.concretes;

import org.springframework.data.domain.Sort;
import kodlamaio.hrms.business.abstracts.JobAdvertService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.JobAdvertDao;
import kodlamaio.hrms.entities.concretes.City;
import kodlamaio.hrms.entities.concretes.Employer;
import kodlamaio.hrms.entities.concretes.Job;
import kodlamaio.hrms.entities.concretes.JobAdvert;
import kodlamaio.hrms.entities.dtos.JobAdvertDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class JobAdvertManager implements JobAdvertService {

    private JobAdvertDao jobAdvertDao;

    @Autowired
    public JobAdvertManager(JobAdvertDao jobAdvertDao) {
        super();
        this.jobAdvertDao = jobAdvertDao;
    }

    @Override
    public Result getall() {
        return new SuccessDataResult<List<JobAdvert>>(this.jobAdvertDao.findAll(),"Basarili");
    }

    @Override
    public Result add(JobAdvertDto jobAdvertDto) {

        JobAdvert jobAdvert = new JobAdvert();

        Employer employer = new Employer();
        employer.setId(jobAdvertDto.getUserId());
        jobAdvert.setEmployer(employer);

        City city = new City();
        city.setCityId(jobAdvertDto.getCityId());
        jobAdvert.setCity(city);

        Job job = new Job();
        job.setJobId(jobAdvertDto.getJobId());
        jobAdvert.setJob(job);

        jobAdvert.setActived(jobAdvertDto.isActived());
        jobAdvert.setDeadline(jobAdvertDto.getDeadline());
        jobAdvert.setDescription(jobAdvertDto.getDescription());
        jobAdvert.setSalaryMax(jobAdvertDto.getSalaryMax());
        jobAdvert.setSalaryMin(jobAdvertDto.getSalaryMin());
        jobAdvert.setOpenPositionCount(jobAdvertDto.getOpenPositionCount());
        jobAdvert.setPublishingDate(new Date());

        this.jobAdvertDao.save(jobAdvert);

        return new SuccessDataResult<JobAdvertDto>(jobAdvertDto,"Basarili");
    }

    @Override
    public Result getByActived(boolean active) {
        return new SuccessDataResult<List<JobAdvert>>(this.jobAdvertDao.getByIsActived(active),"Basarili");
    }

    @Override
    public Result getByDate() {

        Sort sort = Sort.by(Sort.Direction.DESC,"deadline");


        return new SuccessDataResult<List<JobAdvert>>(this.jobAdvertDao.findAll(sort),"Basarili");
    }

    @Override
    public Result getByActiveAndEmployer(boolean active,int id) {
        return new SuccessDataResult<List<JobAdvert>>(this.jobAdvertDao.getByIsActivedAndEmployer_id(active,id),"Basarili");
    }
}
