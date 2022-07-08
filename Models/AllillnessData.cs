using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class AllillnessData
    {  
        //public string visible { get; set; }
        public string illnessName { get; set; } = "흡연";
        public string menuName   {get;set;} = "TB_ALLILLNESS_NURSINGHOME_LOCATION";
        public string startDate  {get;set;} = "2017-07-01";
        public string endDate    {get;set;} = "2021-10-01";
        public string item       {get;set;}
        public string gender     {get;set;}
        public string age        {get;set;}
        public string ioPatient  {get;set;}
        public string nursingHome { get; set; }
        public string location { get; set; } = "서울";
    }
}
