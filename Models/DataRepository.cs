using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ADHD.models
{
    public class DataRepository
    {
        private OracleConnection conn;

        public DataRepository()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAA;Data Source = orcl_medium");
            conn.Open();
        }

        ~DataRepository()
        {
            conn.Close();
        }

        public List<Data> AllList()
        {
            //[0] TodoItem을 저장할 목록 객체를 생성한다 
            List<Data> list = new List<Data>();

            //[1] Command 객체 생성
            OracleCommand cmd = new OracleCommand();

            //[2] Connection 객체 연결
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            //[3] SQL 생성 및 실행 
            cmd.CommandText = $"select * from tb_adhd order by id";
            OracleDataReader dataReader = cmd.ExecuteReader();
            //[4] 자료를 읽어 객체와 해서 목록 객체에 추가한다 
            while(dataReader.Read())
            {
                //[5] TodoItem 객체를 생성한다
                Data todoItem = new Data();

                //[6] TodoItem 객체의 속성에 값을 설정한다 
                todoItem.col01 = dataReader.GetString(0);
                todoItem.col02 = dataReader.GetString(1);
                todoItem.col03 = dataReader.GetString(2);
                todoItem.col04 = dataReader.GetString(3);
                todoItem.col05 = dataReader.GetString(4);
                todoItem.col06 = dataReader.GetString(5);
                todoItem.col07 = dataReader.GetString(6);
                todoItem.col08 = dataReader.GetString(7);
                todoItem.col09 = dataReader.GetString(8);
                todoItem.col10 = dataReader.GetString(9);
                todoItem.col11 = dataReader.GetString(10);
                todoItem.col12 = dataReader.GetString(11);
                todoItem.col13 = dataReader.GetString(12);
                todoItem.col14 = dataReader.GetString(13);
                todoItem.col15 = dataReader.GetString(14);
                todoItem.col16 = dataReader.GetString(15);
                todoItem.col17 = dataReader.GetString(16);
                todoItem.col18 = dataReader.GetString(17);
                todoItem.col19 = dataReader.GetString(18);

                //[7] 리턴할 목록 객체에 TodoItem 객체를 추가한다
                list.Add(todoItem);
            }

            //[8] DB 작업한 것을 정리한다 
            dataReader.Close();
            cmd.Dispose();

            //[9] 목록 객체를 리턴한다
            return list;
        }

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
    }
}
