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
    public class FemaleFiveAgeController : Controller
    {
        [HttpGet]
        [Route("AllList5")]
        public List<FemaleFiveAge> AllList5()
        {
            FemaleFiveAgeRepository femaleFiveAgeRepository = new FemaleFiveAgeRepository();
            return femaleFiveAgeRepository.allFemaleFiveAgeDataList();
        }

    }
}
