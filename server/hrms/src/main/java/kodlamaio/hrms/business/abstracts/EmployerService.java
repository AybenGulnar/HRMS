package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.Employer;
import kodlamaio.hrms.entities.dtos.EmailDto;
import kodlamaio.hrms.entities.dtos.EmployerDto;

import java.util.List;

public interface EmployerService {
    List<Employer> getall();
    Result register(EmployerDto employerDto);
    Result MailConfirm(EmailDto emailDto);
}
