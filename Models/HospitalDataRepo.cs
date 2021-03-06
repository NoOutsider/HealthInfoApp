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
            //conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            conn = new OracleConnection("User Id = user1;Password = passwd!@;Data Source = xe_db");
            //conn = new OracleConnection("User Id = user1;Password = passwd;Data Source = xe");
            conn.Open();
        }

        ~HospitalDataRepo()
        {
            conn.Close();
        }

        public List<HospitalData> AllList()
        {
            //[0] hospital을 저장할 목록 객체를 생성한다 
            List<HospitalData> list = new List<HospitalData>();

            //[1] Command 객체 생성
            OracleCommand cmd = new OracleCommand();

            //[2] Connection 객체 연결
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            //[3] SQL 생성 및 실행 
            cmd.CommandText = $"select * from HOSPITAL where rownum <= 100";
            OracleDataReader dataReader = cmd.ExecuteReader();
            //[4] 자료를 읽어 객체와 해서 목록 객체에 추가한다 
            while(dataReader.Read())
            {
                //[5] hospital 객체를 생성한다
                HospitalData hospital = new HospitalData();

                //[6] hospital 객체의 속성에 값을 설정한다 
                hospital.암호화요양기호 = dataReader.GetString(0);
                hospital.요양기관명   = dataReader.GetString(1);
                hospital.종별코드     = dataReader.GetInt32(2);
                hospital.종별코드명   = dataReader.GetString(3);
                hospital.시도코드     = dataReader.GetString(4);
                hospital.시도코드명   = dataReader.GetString(5);
                hospital.시군구코드   = dataReader.GetString(6);
                hospital.시군구코드명  = dataReader.GetString(7);
                hospital.주소       = dataReader.GetString(8);
                hospital.전화번호     = dataReader.GetString(9);
                hospital.병원URL    = dataReader.GetString(10);
                hospital.개설일자     = dataReader.GetString(11);
                hospital.총의사수     = dataReader.GetString(12);
                hospital.X좌표      = dataReader.GetDouble(13);
                hospital.Y좌표 = dataReader.GetDouble(14);

                //[7] 리턴할 목록 객체에 hospital 객체를 추가한다
                list.Add(hospital);
            }

            //[8] DB 작업한 것을 정리한다 
            dataReader.Close();
            cmd.Dispose();

            //[9] 목록 객체를 리턴한다
            return list;
        }
    }
}
