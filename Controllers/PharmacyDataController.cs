using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthInfoApp.models;
using System.Text.Json;

namespace HealthInfoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PharmacyDataController : ControllerBase
    {
        [HttpGet]
        [Route("AllList")]
        public List<PharmacyData> AllList()
        {
            PharmacyDataRepository dataRepository = new PharmacyDataRepository();
            return dataRepository.AllList();
        }

        [HttpGet]
        [Route("loadChartData")]
        public JsonResult loadChartData()
        {
            Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();
            Object[] chartLabels = { "January", "February", "March", "April", "May", "June", "July" };
            Object[] chartData = { 10, 20, 50, 40, 30, 700, 38 };

            result.Add("chartLabels", new List<Object>(chartLabels));
            result.Add("chartData", new List<Object>(chartData));

            return new JsonResult(result);
        }

        [HttpGet]
        [Route("loadChartDataXXX")]
        public JsonResult loadChartDataXXX()
        {
            PharmacyDataRepository dataRepository = new PharmacyDataRepository();
            //Console.WriteLine("???????????????????????????????????????????????????");
            System.Diagnostics.Debug.WriteLine("????????????????????????????");
            return new JsonResult(dataRepository.ChartDataXXX());
        }
    }
}
