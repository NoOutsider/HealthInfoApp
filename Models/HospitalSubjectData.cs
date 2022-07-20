using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class HospitalSubjectData
    {
        public string 진료과목코드명 { get; set; } = "신경외과";
        public string 특수병원검색코드명 { get; set; } = "관절";
        public string 장비코드명 { get; set; } = "골밀도검사기";
        public string 특수진료검색코드명 { get; set; } = "혈액투석";
    }
}
