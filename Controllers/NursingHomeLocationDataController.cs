using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;


namespace HealthInfoApp.Models
{
    [ApiController]
    [Route("[controller]")]
    public class NursingHomeLocationDataController : ControllerBase
    {
        [HttpGet]
        [Route("AllList")]
        public List<NursingHomeLocation> AllList()
        {
            NursingHomeLocationRepository nikotinDataRepository = new NursingHomeLocationRepository();
            return nikotinDataRepository.allNursingHomeLocationDataList();
        }


        [HttpGet]
        [Route("loadChartData")]
        public JsonResult loadChartData()
        {
            NursingHomeLocationRepository dataRepository = new NursingHomeLocationRepository();

            return new JsonResult(dataRepository.NursingHomeLocationChartData());
        }
    }
}
