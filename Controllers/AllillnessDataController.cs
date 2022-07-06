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
    public class AllillnessDataController : Controller
    {
        [HttpPost]
        [Route("searchData")]
        public JsonResult Get([FromBody] AllillnessDataParam searchParam)
        {
            return new JsonResult(searchParam);
        }
    }
}
