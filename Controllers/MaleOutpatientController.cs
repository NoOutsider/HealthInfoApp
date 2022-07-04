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
    public class MaleOutpatientController : ControllerBase
    {
        [HttpGet]
        [Route("AllList2")]
        public List<MaleOutpatient> AllList2()
        {
            MaleOutpatientRepository maleOutpatientRepository = new MaleOutpatientRepository();
            return maleOutpatientRepository.allMaleOutpatientDataList();
        }

        [HttpPost]
        [Route("Test")]
        //호출시 : TodoItem/UpdateTodoItem 
        //테스트 하는것은 postman 을 사용하면 됨 
        public JsonResult setQuery([FromBody] MaleOutpatient maleOutpatient)
        {
            MaleOutpatientRepository maleOutpatientRepository = new MaleOutpatientRepository();
            string setQuery= maleOutpatientRepository.selectQuery(maleOutpatient);

            return new JsonResult("{setQuery : " + setQuery + "}");
            //return new JsonResult(todoItem);
        }
    }  
}
