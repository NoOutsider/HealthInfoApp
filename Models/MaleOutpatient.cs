using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class MaleOutpatient
    {
        public string 진료년월 {get;set;}
        public string state { get; set; }
        public int 소계 { get; set; }
        public int 외래 { get; set; }
        public int 입원 { get; set; }
    }
}
