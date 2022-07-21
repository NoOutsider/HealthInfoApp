using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Pharmacy.models
{
    public class PharmacyDataRepository
    {
        private OracleConnection conn;

        public PharmacyDataRepository()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            //conn = new OracleConnection("User Id = user1;Password = passwd!@;Data Source = xe_db");
            //conn = new OracleConnection("User Id = user1;Password = passwd;Data Source = xe");
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
            cmd.CommandText = $"select * from PHARMACY where rownum <= 100";
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

                //[7] 리턴할 목록 객체에 TodoItem 객체를 추가
                list.Add(Item);
            }

            //[8] DB 작업한 것을 정리 
            dataReader.Close();
            cmd.Dispose();

            //[9] 목록 객체를 리턴
            return list;
        }

    }
}
