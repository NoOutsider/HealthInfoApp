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
    public class FemaleTenAgeController : Controller
    {
        [HttpGet]
        [Route("AllList4")]
        public List<FemaleTenAge> AllList4()
        {
            FemaleTenAgeRepository femaleTenAgeRepository = new FemaleTenAgeRepository();
            return femaleTenAgeRepository.allFemaleTenAgeDataList();
        }

    }
}
