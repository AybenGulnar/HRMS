package kodlamaio.hrms.business.concretes;

import java.util.List;

import kodlamaio.hrms.core.utilities.results.ErrorResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kodlamaio.hrms.business.abstracts.JobService;
import kodlamaio.hrms.dataAccess.abstracts.JobDao;
import kodlamaio.hrms.entities.concretes.Job;

@Service
public class JobManager implements JobService {

	private JobDao jobDao;
	
	@Autowired
	public JobManager(JobDao jobDao) {
		super();
		this.jobDao = jobDao;
	}

	@Override
	public List<Job> getall() {
		
		return this.jobDao.findAll();
	}

	@Override
	public Result add(Job job) {

		try {
			this.jobDao.save(job);
		}
		catch (Exception e){
			return new ErrorResult("Bu iş başlığı eklenmiş.");
		}
		return new SuccessDataResult<Job>(job,"İş başlığı eklendi");
	}

}
