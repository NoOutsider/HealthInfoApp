using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using HealthInfoApp.Models;
using Microsoft.Extensions.Configuration;


namespace HealthInfoApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MaleOutpatientController : ControllerBase
    {
        [HttpGet]
        [Route("AllList2")]
        public List<MaleOutpatient> AllList2()
        {
            MaleOutpatientRepository maleOutpatientRepository = new MaleOutpatientRepository();
            return maleOutpatientRepository.allMaleOutpatientDataList();
        }
   }  
}
