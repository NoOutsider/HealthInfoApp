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

        //[HttpPost]
        //[Route("loadChart")]
        //public JsonResult loadChart()
        //{
        //    AllillnessDataRepository allillnessDataRepository = new AllillnessDataRepository();
        //    return new JsonResult(allillnessDataRepository.ChartDataXXX());
        //}

        [HttpGet]
        [Route("SetSidebar")]
        public List<AllillnessData> SetSidebar()
        {
            AllillnessDataRepository dataRepository = new AllillnessDataRepository();
            return dataRepository.SetSidebar();
        }
        [HttpPost]
        [Route("loadChartData")]
        public JsonResult loadChartData([FromBody] AllillnessDataRepository dataRepository)
        {
            return new JsonResult(dataRepository.SetChartData());
        }

    }
}
