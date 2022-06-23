using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.models
{
    public class PharmacyData
    {
        public string 이름 { get; set; }
        public int 시도코드 { get; set; }
        public string 시도코드명 { get; set; }
        public int 시군구코드 { get; set; }
        public string 시군구코드명 { get; set; }
        public string 읍면동 { get; set; }
        public int 우편번호 { get; set; }
        public string 주소 { get; set; }
        public string 전화번호 { get; set; }
        public DateTime 개설일자 { get; set; }
        public double X좌표 { get; set; }
        public double Y좌표 { get; set; }
    }
}
