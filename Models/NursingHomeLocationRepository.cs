using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
    public class NursingHomeLocationRepository
    {
        private OracleConnection conn;

        public NursingHomeLocationRepository()
        {
            conn = new OracleConnection("User Id=user1;Password=passwd!@;Data Source=xe_db;");
            conn.Open();
        }

        ~NursingHomeLocationRepository()
        {
            conn.Close();
        }

        public List<NursingHomeLocation> allNursingHomeLocationDataList() {
            List<NursingHomeLocation> nursingHomeLocations = new List<NursingHomeLocation>();

            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = $"select * from TB_NIKOTIN_NURSINGHOME_LOCATION order by 진료년월";

            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                NursingHomeLocation nursingHomeLocation = new NursingHomeLocation();
                nursingHomeLocation.진료년월 = dataReader.GetString(0);
                nursingHomeLocation.state = dataReader.GetString(1);
                nursingHomeLocation.계 = dataReader.GetInt32(2);
                nursingHomeLocation.서울 = dataReader.GetString(3);
                nursingHomeLocation.부산 = dataReader.GetString(4);
                nursingHomeLocation.인천 = dataReader.GetString(5);
                nursingHomeLocation.대구 = dataReader.GetString(6);
                nursingHomeLocation.광주 = dataReader.GetString(7);
                nursingHomeLocation.대전 = dataReader.GetString(8);
                nursingHomeLocation.울산 = dataReader.GetString(9);
                nursingHomeLocation.경기 = dataReader.GetString(10);
                nursingHomeLocation.강원 = dataReader.GetString(11);
                nursingHomeLocation.충북 = dataReader.GetString(12);
                nursingHomeLocation.충남 = dataReader.GetString(13);
                nursingHomeLocation.전북 = dataReader.GetString(14);
                nursingHomeLocation.전남 = dataReader.GetString(15);
                nursingHomeLocation.경북 = dataReader.GetString(16);
                nursingHomeLocation.경남 = dataReader.GetString(17);
                nursingHomeLocation.제주 = dataReader.GetString(18);
                nursingHomeLocation.세종 = dataReader.GetString(19);
                nursingHomeLocations.Add(nursingHomeLocation);
            }
            dataReader.Close();
            cmd.Dispose();

            return nursingHomeLocations;
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
