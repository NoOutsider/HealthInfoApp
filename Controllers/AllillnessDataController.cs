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
            return new JsonResult(dataRepository.MountChartData());
        }


        [HttpPost]
        [Route("resetChartData")]
        public JsonResult resetChartData([FromBody] AllillnessData allillnessData)
        {
            AllillnessDataRepository dataRepository = new AllillnessDataRepository();
         
            return new JsonResult(dataRepository.UpdateChartData(allillnessData));
        }

    }
}
