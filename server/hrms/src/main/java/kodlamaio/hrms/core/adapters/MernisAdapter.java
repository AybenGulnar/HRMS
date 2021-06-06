package kodlamaio.hrms.core.adapters;

import kodlamaio.hrms.entities.concretes.User;
//import kodlamaio.hrms.services.MernisService.TSKKPSPublicSoap;

public class MernisAdapter {

    //TSKKPSPublicSoap tskkpsPublicSoap = new TSKKPSPublicSoap();

    public boolean checkPerson(int tc){


        try {
            if(tc != 111){ // Mernisde sıkıntı yaşadım.
                return true;
            }
            else{
                return false;
            }
            //tskkpsPublicSoap.TCKimlikNoDogrula(tc,user.getFirstName(),user.getLastName(), user.getYearOfBirth());
        } catch (Exception e) {
            return false;
        }
    }

}
