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
    public class SearchDataController : Controller
    {
        [HttpGet]
        [Route("AllList6")]
        public List<SearchData> AllList6()
        {
            SearchDataRepository searchDataRepository = new SearchDataRepository();
            return searchDataRepository.searchCondition();
        }
    }
}
