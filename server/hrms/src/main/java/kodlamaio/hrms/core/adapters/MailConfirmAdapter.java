package kodlamaio.hrms.core.adapters;

import kodlamaio.hrms.core.utilities.results.Result;
import kodlamaio.hrms.core.utilities.results.SuccessDataResult;
import kodlamaio.hrms.core.utilities.results.SuccessResult;
import kodlamaio.hrms.entities.concretes.JobSeeker;

public class MailConfirmAdapter {

    public Result sendMailConfirm(){
        return new SuccessResult("Mail Gönderildi");
    }

    public Result confirmMail(String mail){
        return  new SuccessResult(mail + " Mail Onaylandi");
    }

}
