using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.models
{
    public class HospitalData
    {
        public string 암호화요양기호 { get; set; }
        public string 요양기관명 { get; set; }
        public int 종별코드 { get; set; }
        public string 종별코드명 { get; set; }
        public string 시도코드 { get; set; }
        public string 시도코드명 { get; set; }
        public string 시군구코드 { get; set; }
        public string 시군구코드명 { get; set; }
        public string 주소 { get; set; }
        public string 전화번호 { get; set; }
        public string 병원URL { get; set; }
        public string 개설일자 { get; set; }
        public string 총의사수 { get; set; }
        public double X좌표 { get; set; }
        public double Y좌표 { get; set; }

    }
}
