using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class SearchData
    {
        public int ID { get; set; }
        public string illnessName    {get;set;}
        public string menu      {get;set;}
        public string item      {get;set;}
        public string gender      {get;set;}
        public string decade {get;set;}
        public string ioPatient{get;set;}
        public string nursingHome  {get;set;}
        public string location      {get;set;}
        public string date  {get;set;}
        public string halfDecade{ get; set; }
    }
}
