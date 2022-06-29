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
        }

    }
}
