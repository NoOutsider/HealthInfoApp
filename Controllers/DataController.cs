using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ADHD.models;
using System.Text.Json;

namespace ADHD.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DataController : ControllerBase
    {
        [HttpGet]
        [Route("AllList")]
        public List<Data> AllList()
        {
            DataRepository dataRepository = new DataRepository();
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
            DataRepository dataRepository = new DataRepository();

            return new JsonResult(dataRepository.ChartDataXXX());
        }
    }
}
