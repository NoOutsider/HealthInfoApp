using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.models
{
    public class HospitalDataRepo
    {
        private OracleConnection conn;

        public HospitalDataRepo()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            conn.Open();
        }

        ~HospitalDataRepo()
        {
            conn.Close();
        }

        public List<HospitalData> AllList()
        {
            //[0] TodoItem을 저장할 목록 객체를 생성한다 
            List<HospitalData> list = new List<HospitalData>();

            //[1] Command 객체 생성
            OracleCommand cmd = new OracleCommand();

            //[2] Connection 객체 연결
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            //[3] SQL 생성 및 실행 
            cmd.CommandText = $"select * from HOSPITAL where rownum <= 10";
            OracleDataReader dataReader = cmd.ExecuteReader();
            //[4] 자료를 읽어 객체와 해서 목록 객체에 추가한다 
            while(dataReader.Read())
            {
                //[5] TodoItem 객체를 생성한다
                HospitalData todoItem = new HospitalData();

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

                //[7] 리턴할 목록 객체에 TodoItem 객체를 추가한다
                list.Add(todoItem);
            }

            //[8] DB 작업한 것을 정리한다 
            dataReader.Close();
            cmd.Dispose();

            //[9] 목록 객체를 리턴한다
            return list;
        }
    }
}
