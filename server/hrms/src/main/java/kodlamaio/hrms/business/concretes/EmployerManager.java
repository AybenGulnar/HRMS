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
import java.util.Objects;

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
    public Result getById(int id) {
        Employer employer = new Employer();
        employer = this.employerDao.getById(id);

        if(!Objects.isNull(employer)){
            return new SuccessDataResult<Employer>(employer);
        }

        return new ErrorResult("Kullanıcı Bulunamadı");
    }

    @Override
    public Result register(EmployerDto employerDto) {

        if(!employerDto.getPassword().equals(employerDto.getPasswordConfirm())){
            return new ErrorResult("Şifreler uyuşmuyor");
        }

        if(!mernisAdapter.checkPerson(employerDto.getIdentityNo())){
            return new ErrorResult("Tc no bulunamadı");
        }

        Employer employer;
        employer = this.employerDao.getByePosta(employerDto.getEmail());

        if(!Objects.isNull(employer)){
            return new ErrorResult("Email Sisteme Kayıtlı");
        }

        employer = new Employer();
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
        employer.setUfirstName(employerDto.getFirstName());
        employer.setUlastName(employerDto.getLastName());
        employer.setUyearOfBirth(employerDto.getBirthYear());
        employer.setUcompanyName(employerDto.getCompanyName());
        employer.setUphoneNumber(employerDto.getPhoneNumber());
        employer.setUwebsite(employerDto.getWebsite());
        employer.setUpdated(false);

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

        if(!Objects.isNull(employer)){
            if(password.equals(employer.getPassword())){
                return new SuccessDataResult<Employer>(employer,"Girş Başarılı");
            }
        }

        return new ErrorResult("Kullanıcı adı veya şifre yanlış");

    }

    @Override
    public Result updateEmployer(int id,String firstName, String lastName, int yearOfBirth, String companyName, String phoneNumber, String website) {
        Employer employer;
        employer = this.employerDao.getById(id);

        if(!Objects.isNull(employer)){
            employer.setUfirstName(firstName);
            employer.setUlastName(lastName);
            employer.setUyearOfBirth(yearOfBirth);
            employer.setUcompanyName(companyName);
            employer.setUphoneNumber(phoneNumber);
            employer.setUwebsite(website);
            employer.setUpdated(false);
            this.employerDao.save(employer);
            return new SuccessDataResult<Employer>(employer);
        }

        return new ErrorResult("Hata");
    }

    @Override
    public Result updateEmployerUpdated(int id,boolean isUpdated) {
        Employer employer = new Employer();
        employer = this.employerDao.getById(id);

        if(!Objects.isNull(employer)){
            if(isUpdated){
                employer.setFirstName(employer.getUfirstName());
                employer.setLastName(employer.getUlastName());
                employer.setYearOfBirth(employer.getUyearOfBirth());
                employer.setCompanyName(employer.getUcompanyName());
                employer.setPhoneNumber(employer.getUphoneNumber());
                employer.setWebsite(employer.getUwebsite());
            }

            employer.setUpdated(isUpdated);
            this.employerDao.save(employer);
            return new SuccessDataResult<Employer>(employer);
        }

        return new ErrorResult("Hata");
    }

    @Override
    public Result MailConfirm(int id) {

        Employer employer;


        try {
            employer = this.employerDao.getOne(id);
        }catch (Exception e){
            return new ErrorResult("İş veren bulunmadı");
        }

        if(employer.isActived()){
            return new ErrorResult("İş veren epostası zaten doğrulanmış");
        }

        employer.setActived(true);
        employer.setUpdated(true);

        try {
            this.employerDao.save(employer);
        }
        catch (Exception e){
            return new ErrorResult("İş veren epostası doğrulanamadı");
        }



        return mailConfirmAdapter.confirmMail(employer.getEPosta());
    }
}
