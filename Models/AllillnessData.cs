using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class AllillnessData
    {  
        public string visible { get; set; }
        public string illnessName{get;set;}
        public string menuName   {get;set;} = "STATE";
        public string startDate  {get;set;}
        public string endDate    {get;set;}
        public string item       {get;set;}
        public string gender     {get;set;}
        public string age        {get;set;}
        public string ioPatient  {get;set;}
        public string nursingHome { get; set; }
    }
}
