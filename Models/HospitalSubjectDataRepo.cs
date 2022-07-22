using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HealthInfoApp.Models
{
    public class HospitalSubjectDataRepo
    {
        private OracleConnection conn;

        public HospitalSubjectDataRepo()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            //conn = new OracleConnection("User Id = user1;Password = passwd!@;Data Source = xe_db");
            //conn = new OracleConnection("User Id = user1;Password = passwd;Data Source = xe");
            conn.Open();
        }

        ~HospitalSubjectDataRepo()
        {
            conn.Close();
        }

        public List<xyPosition> xyPositionData(HospitalSubjectData Data)
        {
            List<xyPosition> result = new List<xyPosition>();

            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandText = $" SELECT total.x좌표, total.y좌표" +
                              $" FROM(SELECT * FROM hospital hp" +
                              $" FULL OUTER JOIN hospital_subject hp_child" +
                              $" ON hp.암호화요양기호 = hp_child.암호화요양기호) total" +
                              $" WHERE total.x좌표 IS NOT NULL" +
                              $" AND total.진료과목코드명 IS NOT NULL" +
                              $" AND total.진료과목코드명 = '{Data.진료과목코드명}'" +
                              $" AND rownum <= 100";


            OracleDataReader dataReader = cmd.ExecuteReader();


            while (dataReader.Read())
            {
                xyPosition xy = new xyPosition();

                xy.xPosition = dataReader.GetString(0);
                xy.yPosition = dataReader.GetString(1);

                result.Add(xy);
            }

            dataReader.Close();
            cmd.Dispose();


            return result;
        }
    }
}
