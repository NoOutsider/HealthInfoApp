using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;
using System.Data;



namespace HealthInfoApp.Models
{
    public class AllillnessDataRepository
    {
        private OracleConnection conn;     
        public AllillnessDataRepository()
        {
            conn = new OracleConnection("User Id=user1;Password=passwd;Data Source=xe;");
            conn.Open();
        }

        ~AllillnessDataRepository()
        {
            conn.Close();
        }

        public static string SafeGetString(OracleDataReader reader, int colIndex)
        {
            if (!reader.IsDBNull(colIndex))
                return reader.GetString(colIndex);

            return string.Empty;
        }


        public List<AllillnessData> SetSidebar()
        {
            List<AllillnessData> result = new List<AllillnessData>();

            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"select * from tb_selectitemname";

            OracleDataReader dataReader = cmd.ExecuteReader();                
                
            while (dataReader.Read())
            {
                AllillnessData allillnessData = new AllillnessData();

                allillnessData.id = SafeGetString(dataReader, 0);
                allillnessData.location = SafeGetString(dataReader, 1);                
                allillnessData.illnessName = SafeGetString(dataReader, 2);
                allillnessData.menuName = SafeGetString(dataReader, 3);
                allillnessData.item = SafeGetString(dataReader, 4);
                allillnessData.gender = SafeGetString(dataReader, 5);
                allillnessData.age = SafeGetString(dataReader, 6);
                allillnessData.ioPatient = SafeGetString(dataReader, 7);
                allillnessData.nursingHome = SafeGetString(dataReader, 8);

                result.Add(allillnessData);
            }
          
            dataReader.Close();            
            cmd.Dispose();           

            return result;
        }

        public Dictionary<string, List<Object>> MountChartData()
        {
            Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();
            AllillnessData allillnessData = new AllillnessData();

            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"select 진료년월, {allillnessData.location} from  tb_allillness_nursinghome_location where 진료년월 between to_date('2017/01/01','yyyy/mm/dd') and to_date('2021/10/01','yyyy/mm//dd') and state = '환자수' and 질병명 = '{allillnessData.illnessName}' order by 진료년월";

            OracleDataReader dataReader = cmd.ExecuteReader();

            List<Object> chartLabels = new List<Object>();
            List<Object> chartData = new List<Object>();

            while (dataReader.Read())
            {
                chartLabels.Add(dataReader.GetString(0));
                chartData.Add(dataReader.GetString(1));
            }
  
            dataReader.Close();
            cmd.Dispose();

            result.Add("chartLabels", chartLabels);
            result.Add("chartData", chartData);

            return result;
        }
       
        public Dictionary<string, List<Object>> UpdateChartData(AllillnessData allillnessData)
        {
            Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();
            
            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            //[3] 선택 메뉴에 따른 SQL 생성 및 실행 
            //if (illness.menuName == "tb_allillness_nursinghome_location")
            //{
            //    cmd.CommandText = $"select 진료년월, {illness.location} from  {illness.menuName} where 진료년월 between to_date('{illness.startDate}','yyyy/mm/dd') and to_date('{illness.endDate}','yyyy/mm//dd') and state = '{illness.item}' and 질병명 = '{illness.illnessName}' order by 진료년월";
            //}
            //else if (illness.menuName == "tb_allillness_nursinghome_group")
            //{
            //    cmd.CommandText = $"select 진료년월, { illness.nursingHome} from { illness.menuName} where 진료년월 between to_date('{illness.startDate}','yyyy/mm/dd') and to_date('{illness.endDate}','yyyy/mm//dd') and state = '{illness.item}' and 질병명 = '{illness.illnessName}' order by 진료년월";
            //}
            //else if (illness.menuName == "tb_allillness_gender_outpatient")
            //{
            //    cmd.CommandText = $"select 진료년월, { illness.ioPatient} from { illness.menuName} where 진료년월 between to_date('{illness.startDate}','yyyy/mm/dd') and to_date('{illness.endDate}','yyyy/mm//dd') and state = '{illness.item}' and 질병명 = '{illness.illnessName}' and 성별 = '{illness.gender}' order by 진료년월";
            //}
            //else
            //{
            //    cmd.CommandText = $"select 진료년월, { illness.age} from { illness.menuName} where 진료년월 between to_date('{illness.startDate}','yyyy/mm/dd') and to_date('{illness.endDate}','yyyy/mm//dd') and state = '{illness.item}' and 질병명 = '{illness.illnessName}' and 성별 = '{illness.gender}' order by 진료년월";
            //}

            cmd.CommandText = $"select 진료년월, \"{allillnessData.location}\" from  tb_allillness_nursinghome_location where 진료년월 between to_date('2017/01/01','yyyy/mm/dd') and to_date('2021/10/01','yyyy/mm//dd') and state = '{allillnessData.item}' and 질병명 = '{allillnessData.illnessName}' order by 진료년월";

            OracleDataReader dataReader = cmd.ExecuteReader();

            List<Object> chartLabels = new List<Object>();
            List<Object> chartData = new List<Object>();

 
            while (dataReader.Read())
            {
                chartLabels.Add(dataReader.GetString(0));
                chartData.Add(dataReader.GetString(1));
            }

            dataReader.Close();
            cmd.Dispose();

            result.Add("chartLabels", chartLabels);
            result.Add("chartData", chartData);

            return result;
        }


    }
}
