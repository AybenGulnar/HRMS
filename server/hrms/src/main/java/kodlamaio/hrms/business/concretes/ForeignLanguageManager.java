package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.ForeignLanguageService;
import kodlamaio.hrms.core.utilities.results.ErrorResult;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.ForeignLanguageDao;
import kodlamaio.hrms.entities.concretes.Experience;
import kodlamaio.hrms.entities.concretes.ForeignLanguage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class ForeignLanguageManager implements ForeignLanguageService {

    private ForeignLanguageDao foreignLanguageDao;

    @Autowired
    public ForeignLanguageManager(ForeignLanguageDao foreignLanguageDao) {
        super();
        this.foreignLanguageDao = foreignLanguageDao;
    }

    @Override
    public Result getAll() {
        return new SuccessDataResult<List<ForeignLanguage>>(this.foreignLanguageDao.findAll());
    }

    @Override
    public Result add(ForeignLanguage foreignLanguage) {
        this.foreignLanguageDao.save(foreignLanguage);

        return new SuccessDataResult<ForeignLanguage>(foreignLanguage,"Basarili");
    }

    @Override
    public Result updateForeignLanguage(int id, String name, int level) {
        ForeignLanguage foreignLanguage;
        foreignLanguage = this.foreignLanguageDao.getById(id);

        if(!Objects.isNull(foreignLanguage)){
            foreignLanguage.setName(name);
            foreignLanguage.setLevel(level);
            this.foreignLanguageDao.save(foreignLanguage);

            return new SuccessDataResult<ForeignLanguage>(foreignLanguage,"Basarili");

        }
        return new ErrorResult("Hata");
    }

    @Override
    public Result deleteForeignLanguage(int id) {
        ForeignLanguage foreignLanguage;
        foreignLanguage = this.foreignLanguageDao.getById(id);

        if(!Objects.isNull(foreignLanguage)){
            this.foreignLanguageDao.delete(foreignLanguage);

            return new SuccessDataResult<ForeignLanguage>(foreignLanguage,"Basarili");

        }
        return new ErrorResult("Hata");
    }


}
