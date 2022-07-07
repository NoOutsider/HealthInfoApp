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
    public class AllillnessDataController : ControllerBase
    {
        [HttpPost]
        [Route("Get")]
        public JsonResult Get([FromBody] AllillnessData searchParam)
        {
            return new JsonResult(searchParam);
        }

        [HttpGet]
        [Route("loadChartDataXXA")]
        public JsonResult loadChartDataXXX()
        {
            AllillnessDataRepository dataRepository = new AllillnessDataRepository();

            return new JsonResult(dataRepository.ChartDataXXX());
        }

    }
}
