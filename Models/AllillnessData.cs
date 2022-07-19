using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class AllillnessData
    {          
        public string id { get; set; }
        public string illnessName { get; set; } = "흡연";
        public string menuName   {get;set; } = "TB_ALLILLNESS_NURSINGHOME_LOCATION";
        public string startDate  {get;set;} = "2017-07-01";
        public string endDate    {get;set;} = "2021-10-01";
        public string item { get; set; } = "환자수";
        public string gender { get; set; } = "여";
        public string age_5 { get; set; } = "나이80대이상";
        public string age_10 { get; set; } = "나이80대이상";
        public string ioPatient { get; set; } = "외래";
        public string nursingHome { get; set; } = "상급종합병원";
        public string location { get; set; } = "서울";
    }
}
