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
            //conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            conn = new OracleConnection("User Id = user1;Password = passwd!@;Data Source = xe_db");
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
            Console.WriteLine("Data.진료과목코드명 >>>>>> ", Data.진료과목코드명);
            if (!(Data.진료과목코드명).Equals("none"))
            {
                cmd.CommandText = $" SELECT total.x좌표, total.y좌표" +
                                  $" FROM(SELECT * FROM hospital hp" +
                                  $" FULL OUTER JOIN hospital_subject hp_child" +
                                  $" ON hp.암호화요양기호 = hp_child.암호화요양기호) total" +
                                  $" WHERE total.x좌표 IS NOT NULL" +
                                  $" AND total.진료과목코드명 IS NOT NULL" +
                                  $" AND total.진료과목코드명 = '{Data.진료과목코드명}'" +
                                  $" AND rownum <= 100";
            }
            else if (Data.특수병원검색코드명 != null)
            {
                cmd.CommandText = $" SELECT hp.x좌표, hp.y좌표" +
                                  $" FROM hospital hp JOIN hospital_special hp_special" +
                                  $" ON hp.암호화요양기호 = hp_special.암호화요양기호" +
                                  $" WHERE hp_special.검색코드명 = '{Data.특수병원검색코드명}'";
            }
            else if (Data.장비코드명 != null)
            {
                cmd.CommandText = $" SELECT hp.x좌표, hp.y좌표" +
                                  $" FROM hospital hp JOIN hospital_equipment hp_eq" +
                                  $" ON hp.암호화요양기호 = hp_eq.암호화요양기호" +
                                  $" WHERE hp_eq.장비코드명 = '{Data.장비코드명}'" +
                                  $" AND rownum <= 100";
            }
            else if (!(Data.특수진료검색코드명).Equals("none"))
            {
                cmd.CommandText = $" SELECT hp.x좌표, hp.y좌표" +
                                  $" FROM hospital hp JOIN hospital_special_treatment hp_spe_treat" +
                                  $" ON hp.암호화요양기호 = hp_spe_treat.암호화요양기호" +
                                  $" WHERE hp_spe_treat.검색코드명 = '{Data.특수진료검색코드명}'";
            }
            else
            {
                cmd.CommandText = $" SELECT DISTINCT hp_join_sub_spe_tre.x좌표, hp_join_sub_spe_tre.y좌표 " +
                                  $" FROM hospital_special_treatment hp_spe_treat JOIN " +
                                  $" (SELECT DISTINCT hp_eq.암호화요양기호, hp_join_sub_spe.x좌표, hp_join_sub_spe.y좌표 " +
                                  $" FROM hospital_equipment hp_eq JOIN" +
                                  $" (SELECT DISTINCT hp_spe.암호화요양기호, hp_join_sub.x좌표, hp_join_sub.y좌표" +
                                  $" FROM hospital_special hp_spe JOIN" +
                                  $" (SELECT DISTINCT hp.암호화요양기호, hp.x좌표, hp.y좌표" +
                                  $" FROM hospital hp JOIN" +
                                  $" hospital_subject hp_sub ON hp.암호화요양기호 = hp_sub.암호화요양기호" +
                                  $" WHERE hp_sub.진료과목코드명 = '{Data.진료과목코드명}') hp_join_sub" +
                                  $" ON hp_spe.암호화요양기호 = hp_join_sub.암호화요양기호" +
                                  $" WHERE hp_spe.검색코드명 = '{Data.특수병원검색코드명}') hp_join_sub_spe" +
                                  $" ON hp_eq.암호화요양기호 = hp_join_sub_spe.암호화요양기호" +
                                  $" WHERE hp_eq.장비코드명 = '{Data.장비코드명}') hp_join_sub_spe_tre" +
                                  $" ON hp_spe_treat.암호화요양기호 = hp_join_sub_spe_tre.암호화요양기호" +
                                  $" WHERE hp_spe_treat.검색코드명 = '{Data.특수진료검색코드명}'";
            }


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
