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

        
        //[HttpGet]
        //[Route("loadChartData")]
        //public JsonResult loadChartData()
        //{
        //    Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();
        //    Object[] chartLabels = { "January", "February", "March", "April", "May", "June", "July" };
        //    Object[] chartData = { 10, 20, 50, 40, 30, 700, 38 };

        //    result.Add("chartLabels", new List<Object>(chartLabels));
        //    result.Add("chartData", new List<Object>(chartData));

        //    return new JsonResult(result);
        //}

        //[HttpGet]
        //[Route("loadChartDataXXX")]
        //public JsonResult loadChartDataXXX()
        //{
        //    DataRepository dataRepository = new DataRepository();

        //    return new JsonResult(dataRepository.ChartDataXXX());
        //}
    }
}
