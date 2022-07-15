using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
    public class AllillnessDataRepository
    {
        private OracleConnection conn;

        public AllillnessDataRepository()
        {
            conn = new OracleConnection("User Id=user1;Password=passwd!@;Data Source=xe_db;");
            conn.Open();
        }

        ~AllillnessDataRepository()
        {
            conn.Close();
        }

        //public SetTableData()
        //{
        //    OracleCommand cmd = new OracleCommand();

        //    //[2] Connection 객체 연결
        //    cmd.Connection = conn;
        //    cmd.CommandType = System.Data.CommandType.Text;


        //    cmd.CommandText = $"select 진료년월, 서울 from  tb_allillness_nursinghome_location where 진료년월 between to_date('2017/01/01','yyyy/mm/dd') and to_date('2021/10/01','yyyy/mm//dd') and state = '환자수' and 질병명 = '흡연' order by 진료년월";

        //    OracleDataReader dataReader = cmd.ExecuteReader();
        //    while (dataReader.Read())
        //    {

        //    }
        //}

        public static string SafeGetString(OracleDataReader reader, int colIndex)
        {
            if (!reader.IsDBNull(colIndex))
                return reader.GetString(colIndex);
            return string.Empty;
        }


        public List<AllillnessData> SetSidebar()
        {
            List<AllillnessData> result = new List<AllillnessData>();


            //[1] Command 객체 생성
            OracleCommand cmd = new OracleCommand();

            //[2] Connection 객체 연결
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;
               
           

            cmd.CommandText = $"select LOCATION,ILLNESS,MENU,ITEM,GENDER,AGE,IOPATIENT,NURSINGHOME from tb_selectitemname";

            OracleDataReader dataReader = cmd.ExecuteReader();                
                
            while (dataReader.Read())
            {
                
                
                AllillnessData allillnessData = new AllillnessData();
                
                allillnessData.location = SafeGetString(dataReader, 0);                
                allillnessData.illnessName = SafeGetString(dataReader, 1);
                allillnessData.menuName = SafeGetString(dataReader, 2);
                allillnessData.item = SafeGetString(dataReader, 3);
                allillnessData.gender = SafeGetString(dataReader, 4);
                allillnessData.age = SafeGetString(dataReader, 5);
                allillnessData.ioPatient = SafeGetString(dataReader, 6);
                allillnessData.nursingHome = SafeGetString(dataReader, 7);

                result.Add(allillnessData);
            }
          
            dataReader.Close();            
            cmd.Dispose();
           

            return result;
        }

        public Dictionary<string, List<Object>> SetChartData()
        {
            Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();
            

            //[1] Command 객체 생성
            OracleCommand cmd = new OracleCommand();

            //[2] Connection 객체 연결
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

            cmd.CommandText = $"select 진료년월, 부산 from  tb_allillness_nursinghome_location where 진료년월 between to_date('2017/01/01','yyyy/mm/dd') and to_date('2021/10/01','yyyy/mm//dd') and state = '환자수' and 질병명 = '흡연' order by 진료년월";

            OracleDataReader dataReader = cmd.ExecuteReader();

            List<Object> chartLabels = new List<Object>();
            List<Object> chartData = new List<Object>();

            //[4] 자료를 읽어 객체와 해서 목록 객체에 추가한다 
            while (dataReader.Read())
            {                
                //[6] TodoItem 객체의 속성에 값을 설정한다 
                chartLabels.Add(dataReader.GetString(0));
                chartData.Add(dataReader.GetString(1));

            }

            //[8] DB 작업한 것을 정리한다
            dataReader.Close();
            cmd.Dispose();

            result.Add("chartLabels", chartLabels);
            result.Add("chartData", chartData);

            return result;
        }



    }
}
