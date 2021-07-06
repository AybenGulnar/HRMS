package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.SystemStaff;

public interface SystemStaffService {
    Result add(SystemStaff systemStaff);
    Result login(String email,String password);
    Result getById(int id);
    Result updateSystemStaff(int id,String firstName,String lastName,int yearOfBirth);
}
