using Microsoft.AspNetCore.Mvc;
using System;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using HealthInfoApp.Models;

namespace HealthInfoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class NursingHomeGroupController : ControllerBase
    {
        [HttpGet]
        [Route("AllList1")]
        public List<NursingHomeGroup> AllList1()
        {
            NursingHomeGroupRepository nursingHomeGroupRepository = new NursingHomeGroupRepository();
            return nursingHomeGroupRepository.allNursingHomeGroupDataList();
        }
    }
}
