package kodlamaio.hrms.entities.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JobAdvertDto {

    private int userId;
    private int jobId;
    private int cityId;
    private String description;
    private int salaryMin;
    private int salaryMax;
    private int openPositionCount;
    private Date deadline;
    private boolean isFullTime;
    private boolean isRemote;
    private boolean isActived;
}
