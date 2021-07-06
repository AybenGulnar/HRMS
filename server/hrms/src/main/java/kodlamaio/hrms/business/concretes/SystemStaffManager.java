package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.SystemStaffService;
import kodlamaio.hrms.core.utilities.results.ErrorResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.SystemStaffDao;
import kodlamaio.hrms.entities.concretes.Employer;
import kodlamaio.hrms.entities.concretes.SystemStaff;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class SystemStaffManager implements SystemStaffService {

    private SystemStaffDao systemStaffDao;

    @Autowired
    public SystemStaffManager(SystemStaffDao systemStaffDao) {
        super();
        this.systemStaffDao = systemStaffDao;
    }

    @Override
    public Result add(SystemStaff systemStaff) {

        this.systemStaffDao.save(systemStaff);

        return new SuccessDataResult<SystemStaff>(systemStaff,"Başarılı");
    }

    @Override
    public Result login(String email, String password) {
        SystemStaff systemStaff;
        systemStaff = this.systemStaffDao.getByePosta(email);

        if(!Objects.isNull(systemStaff)){
            if(password.equals(systemStaff.getPassword())){
                return new SuccessDataResult<SystemStaff>(systemStaff,"Girş Başarılı");
            }
        }

        return new ErrorResult("Kullanıcı adı veya şifre yanlış");
    }

    @Override
    public Result getById(int id) {
        SystemStaff systemStaff;
        systemStaff = this.systemStaffDao.getById(id);

        if(!Objects.isNull(systemStaff)){
            return new SuccessDataResult<SystemStaff>(systemStaff);
        }

        return new ErrorResult("Kullanıcı Bulunamadı");
    }

    @Override
    public Result updateSystemStaff(int id, String firstName, String lastName, int yearOfBirth) {
        SystemStaff systemStaff;
        systemStaff = this.systemStaffDao.getById(id);

        if(!Objects.isNull(systemStaff)){
            systemStaff.setFirstName(firstName);
            systemStaff.setLastName(lastName);
            systemStaff.setYearOfBirth(yearOfBirth);

            this.systemStaffDao.save(systemStaff);
            return new SuccessDataResult<SystemStaff>(systemStaff);
        }

        return new ErrorResult("Hata");
    }
}
