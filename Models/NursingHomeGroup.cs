using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class NursingHomeGroup
    {
        public int id { get; set; }
        public string 진료년월 { get; set; }
        public string state { get; set; }
        public int 계 { get; set; }
        public int 상급종합병원 { get; set; }
        public int 종합병원 { get; set; }
        public int 병원급 { get; set; }
        public int 의원급 { get; set; }
        public int 보건기관등 { get; set; }
    }
}
