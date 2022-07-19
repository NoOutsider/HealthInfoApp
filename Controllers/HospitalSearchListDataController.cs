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
    public class HospitalSearchListDataController : ControllerBase
    {
        [HttpGet]
        [Route("AllList")]
        public JsonResult AllList()
        {
            HospitalSearchListDataRepo dataRepository = new HospitalSearchListDataRepo();

            List<List<string>> list = new List<List<string>>();
            list.Add(dataRepository.MedicalSubjectList());
            list.Add(dataRepository.SpecialHospitalList());
            list.Add(dataRepository.EquipmentList());
            list.Add(dataRepository.SpecialTreatmentList());

            return new JsonResult(list);
        }

    }
}