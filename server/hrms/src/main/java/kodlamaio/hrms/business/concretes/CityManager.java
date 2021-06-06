package kodlamaio.hrms.business.concretes;

import kodlamaio.hrms.business.abstracts.CityService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.dataAccess.abstracts.CityDao;
import kodlamaio.hrms.entities.concretes.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CityManager implements CityService {

    private CityDao cityDao;

    @Autowired
    public CityManager(CityDao cityDao) {
        super();
        this.cityDao = cityDao;
    }

    @Override
    public Result getall() {
        return new SuccessDataResult<List<City>>(this.cityDao.findAll(),"Basarili");
    }

    @Override
    public Result add(City city) {

        this.cityDao.save(city);

        return new SuccessDataResult<City>(city,"Basarili");
    }
}
