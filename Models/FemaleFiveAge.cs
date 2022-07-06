using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class FemaleFiveAge
    {
        public int id { get; set; }
        public string 진료년월 { get; set; }
        public string state { get; set; }
        public int 소계 { get; set; }
        public int 나이5세미만 { get; set; }
        public int 나이5세이상 { get; set; }
        public int 나이10대초중반{get;set;}
        public int 나이10대중후반{get;set;}
        public int 나이20대초중반{get;set;}
        public int 나이20대중후반{get;set;}
        public int 나이30대초중반{get;set;}
        public int 나이30대중후반{get;set;}
        public int 나이40대초중반{get;set;}
        public int 나이40대중후반{get;set;}
        public int 나이50대초중반{get;set;}
        public int 나이50대중후반{get;set;}
        public int 나이60대초중반{get;set;}
        public int 나이60대중후반{get;set;}
        public int 나이70대초중반{get;set;}
        public int 나이70대중후반 { get; set; }
        public int 나이80세이상 { get; set; }
    }
}
