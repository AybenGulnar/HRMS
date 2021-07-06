package kodlamaio.hrms.business.abstracts;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.ForeignLanguage;

public interface ForeignLanguageService {
    Result getAll();
    Result add(ForeignLanguage foreignLanguage);
    Result updateForeignLanguage(int id,String name,int level);
    Result deleteForeignLanguage(int id);
}
