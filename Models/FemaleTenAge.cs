using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class FemaleTenAge
	{
		public int id { get; set; }
        public string 진료년월 { get; set; } 
		public string state { get; set; }
		public int 소계 { get; set; } 
		public int 나이10대미만 { get; set; }
		public int 나이10대{get;set;} 
		public int 나이20대{get;set;} 
		public int 나이30대{get;set;} 
		public int 나이40대{get;set;} 
		public int 나이50대{get;set;} 
		public int 나이60대{get;set;} 
		public int 나이70대 { get; set; } 
		public int 나이80대이상 { get; set; }

	}
}
