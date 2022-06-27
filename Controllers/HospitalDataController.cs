using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital.models;
using System.Text.Json;

namespace Hospital.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HospitalDataController : ControllerBase
    {
        [HttpGet]
        [Route("AllList")]
        public List<HospitalData> AllList()
        {
            HospitalDataRepo dataRepository = new HospitalDataRepo();
            return dataRepository.AllList();
            //Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();
            //Object[] chartLabels = { "one", "February", "March", "April", "May", "June", "July" };
            //Object[] chartData = { 10, 20, 50, 40, 30, 700, 38 };

            //result.Add("chartLabels", new List<Object>(chartLabels));
            //result.Add("chartData", new List<Object>(chartData));

            //return new JsonResult(result);
        }


        [HttpGet]
        [Route("loadData")]
        public JsonResult loadData()
        {
            Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();
            Object[] chartLabels = { "one", "February", "March", "April", "May", "June", "July" };
            Object[] chartData = { 10, 20, 50, 40, 30, 700, 38 };

            result.Add("chartLabels", new List<Object>(chartLabels));
            result.Add("chartData", new List<Object>(chartData));

            return new JsonResult(result);
        }


    }
}
