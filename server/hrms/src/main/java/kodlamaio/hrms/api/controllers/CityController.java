package kodlamaio.hrms.api.controllers;

import kodlamaio.hrms.business.abstracts.CityService;
import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.entities.concretes.City;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@ResponseBody
@RestController
@RequestMapping("/api/cities")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class CityController {

    private CityService cityService;

    @Autowired
    public CityController(CityService cityService){
        super();
        this.cityService = cityService;
    }

    @GetMapping("/getall")
    public Result getall(){
        return this.cityService.getall();
    }

    @PostMapping("/add")
    public Result add(@RequestBody City city){
        return this.cityService.add(city);
    }
}
