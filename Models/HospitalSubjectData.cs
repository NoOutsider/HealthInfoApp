using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.models
{
    public class HospitalSubjectData
    {
        public string 암호화요양기호 { get; set; }
        public string 요양기관명 { get; set; }
        public int 진료과목코드 { get; set; }
        public string 진료과목코드명 { get; set; }
        public int 과목별전문의수 { get; set; }
    }
}
