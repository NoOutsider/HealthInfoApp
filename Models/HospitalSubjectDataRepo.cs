using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.models
{
    public class HospitalSubjectDataRepo
    {
        private OracleConnection conn;

        public HospitalSubjectDataRepo()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            //conn = new OracleConnection("User Id = user1;Password = passwd!@;Data Source = xe_db");
            conn.Open();
        }

        ~HospitalSubjectDataRepo()
        {
            conn.Close();
        }

        public List<HospitalSubjectData> AllList()
        {
            List<HospitalSubjectData> list = new List<HospitalSubjectData>();

            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"select * from HOSPITAL_SUBJECT where rownum <= 100";
            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                HospitalSubjectData HPSubData = new HospitalSubjectData();

                HPSubData.암호화요양기호 = dataReader.GetString(0);
                HPSubData.요양기관명 = dataReader.GetString(1);
                HPSubData.진료과목코드 = dataReader.GetInt32(2);
                HPSubData.진료과목코드명 = dataReader.GetString(3);
                HPSubData.과목별전문의수 = dataReader.GetInt32(4);

                list.Add(HPSubData);
            }

            dataReader.Close();
            cmd.Dispose();

            return list;
        }
    }
}
