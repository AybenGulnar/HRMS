package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.EmployerService;
import kodlamaio.hrms.core.adapters.MailConfirmAdapter;
import kodlamaio.hrms.core.adapters.MernisAdapter;
import kodlamaio.hrms.core.utilities.results.ErrorResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.EmployerDao;
import kodlamaio.hrms.entities.concretes.Employer;
import kodlamaio.hrms.entities.dtos.EmailDto;
import kodlamaio.hrms.entities.dtos.EmployerDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployerManager implements EmployerService {

    MernisAdapter mernisAdapter = new MernisAdapter();

    MailConfirmAdapter mailConfirmAdapter = new MailConfirmAdapter();

    private EmployerDao employerDao;

    @Autowired
    public EmployerManager(EmployerDao employerDao) {
        super();
        this.employerDao = employerDao;
    }


    @Override
    public List<Employer> getall() {
        return this.employerDao.findAll();
    }

    @Override
    public Result register(EmployerDto employerDto) {

        if(!employerDto.getPassword().equals(employerDto.getPasswordConfirm())){
            return new ErrorResult("Şifreler uyuşmuyor");
        }

        if(!mernisAdapter.checkPerson(employerDto.getIdentityNo())){
            return new ErrorResult("Tc no bulunamadı");
        }

        Employer employer = new Employer();
        employer.setFirstName(employerDto.getFirstName());
        employer.setLastName(employerDto.getLastName());
        employer.setIdentityNo(employerDto.getIdentityNo());
        employer.setYearOfBirth(employerDto.getBirthYear());
        employer.setPassword(employerDto.getPassword());
        employer.setActived(false);
        employer.setEPosta(employerDto.getEmail());
        employer.setCompanyName(employerDto.getCompanyName());
        employer.setWebsite(employerDto.getWebsite());
        employer.setPhoneNumber(employerDto.getPhoneNumber());

        try {
            this.employerDao.save(employer);
        }
        catch (Exception e){
            return new ErrorResult("Tc veya Eposta Kayitli.");
        }

        return new SuccessDataResult<Employer>(employer,"İş veren eklendi.");
    }

    public Result login(String eposta,String password){
        Employer employer = new Employer();
        employer = this.employerDao.getByePosta(eposta);

        if(!employer.getEPosta().isEmpty()){
            if(password.equals(employer.getPassword())){
                return new SuccessDataResult<Employer>(employer,"Girş Başarılı");
            }
        }

        return new ErrorResult("Kullanıcı adı veya şifre yanlış");

    }

    @Override
    public Result MailConfirm(EmailDto emailDto) {

        Employer employer;


        try {
            employer = this.employerDao.getOne(emailDto.getId());
        }catch (Exception e){
            return new ErrorResult("İş veren bulunmadı");
        }

        if(employer.isActived()){
            return new ErrorResult("İş veren epostası zaten doğrulanmış");
        }

        employer.setActived(true);

        try {
            this.employerDao.save(employer);
        }
        catch (Exception e){
            return new ErrorResult("İş veren epostası doğrulanamadı");
        }



        return mailConfirmAdapter.confirmMail(employer.getEPosta());
    }
}
