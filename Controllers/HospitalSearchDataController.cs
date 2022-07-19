using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthInfoApp.Models;

namespace HealthInfoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalSearchListDataController : ControllerBase
    {
        [HttpPost]
        [Route("Get")]
        public JsonResult Get([FromBody] HospitalSubjectData searchParam)
        {
            return new JsonResult(searchParam);
        }

        [HttpPost]
        [Route("xyPosition")]
        public JsonResult xyPositionData([FromBody] HospitalSubjectData Data)
        {
            HospitalSubjectDataRepo dataRepository = new HospitalSubjectDataRepo();
            return new JsonResult(dataRepository.xyPositionData(Data));
        }

    }
}
