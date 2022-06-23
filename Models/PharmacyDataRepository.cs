using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.models
{
    public class PharmacyDataRepository
    {
        private OracleConnection conn;

        public PharmacyDataRepository()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAA;Data Source = orcl_medium");
            conn.Open();
        }

        ~PharmacyDataRepository()
        {
            conn.Close();
        }

        public List<PharmacyData> AllList()
        {
            //[0] Item을 저장할 목록 객체를 생성 
            List<PharmacyData> list = new List<PharmacyData>();

            //[1] Command 객체 생성
            OracleCommand cmd = new OracleCommand();

            //[2] Connection 객체 연결
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            //[3] SQL 생성 및 실행 
            cmd.CommandText = $"select * from pharmacy";
            OracleDataReader dataReader = cmd.ExecuteReader();

            //[4] 자료를 읽어 객체화 하여 목록 객체에 추가
            while(dataReader.Read())
            {
                //[5] Item 객체를 생성
                PharmacyData Item = new PharmacyData();

                //[6] Item 객체의 속성에 값을 설정
                Item.이름 = dataReader.GetString(0);
                Item.시도코드 = dataReader.GetInt32(1);
                Item.시도코드명 = dataReader.GetString(2);
                Item.시군구코드 = dataReader.GetInt32(3);
                Item.시군구코드명 = dataReader.GetString(4);
                Item.읍면동 = dataReader.GetString(5);
                Item.우편번호 = dataReader.GetInt32(6);
                Item.주소 = dataReader.GetString(7);
                Item.전화번호 = dataReader.GetString(8);
                Item.개설일자 = dataReader.GetDateTime(9);
                Item.X좌표 = dataReader.GetDouble(10);
                Item.Y좌표 = dataReader.GetDouble(11);

                //[7] 리턴할 목록 객체에 TodoItem 객체를 추가한다
                list.Add(Item);
            }

            //[8] DB 작업한 것을 정리한다 
            dataReader.Close();
            cmd.Dispose();

            //[9] 목록 객체를 리턴한다
            return list;
        }

        /*
        public Dictionary<string, List<Object>> ChartDataXXX()
        {
            Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();

            //[1] Command 객체 생성
            OracleCommand cmd = new OracleCommand();

            //[2] Connection 객체 연결
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            //[3] SQL 생성 및 실행 
            cmd.CommandText = $"select \"state\", 서울 from TB_HEPATITISA_SANATORIUM_LOCATION where to_char(날짜, 'YYYY-MM-DD') = '2017-07-01'";
            OracleDataReader dataReader = cmd.ExecuteReader();

            List<Object> chartLabels = new List<Object>();
            List<Object> chartData = new List<Object>();

            //[4] 자료를 읽어 객체와 해서 목록 객체에 추가한다 
            while (dataReader.Read())
            {
                //[5] TodoItem 객체를 생성한다
                Data todoItem = new Data();

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
        */
    }
}
