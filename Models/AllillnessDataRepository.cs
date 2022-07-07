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

        public Dictionary<string, List<Object>> NursingHomeLocationChartData()
        {
            Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();

            //[1] Command 객체 생성
            OracleCommand cmd = new OracleCommand();

            //[2] Connection 객체 연결
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            //[3] SQL 생성 및 실행 
            cmd.CommandText = $"select 진료년월, 계 from TB_NIKOTIN_NURSINGHOME_LOCATION where \"STATE\"='보험자부담금' order by 진료년월 ";
            OracleDataReader dataReader = cmd.ExecuteReader();

            List<Object> chartLabels = new List<Object>();
            List<Object> chartData = new List<Object>();

            //[4] 자료를 읽어 객체와 해서 목록 객체에 추가한다 
            while (dataReader.Read())
            {
                //[5] TodoItem 객체를 생성한다                
                //NursingHomeLocation nursingHomeLocation = new NursingHomeLocation(); 왜 필요?

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
