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
    public class FemaleOutpatientController : ControllerBase
    {
        [HttpGet]
        [Route("AllList3")]
        public List<FemaleOutpatient> AllList3()
        {
            FemaleOutpatientRepository femaleOutpatientRepository = new FemaleOutpatientRepository();
            return femaleOutpatientRepository.allFemaleOutpatientDataList();
        }
    }
}
