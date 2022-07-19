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
            conn.Open();
        }

        ~HospitalSubjectDataRepo()
        {
            conn.Close();
        }

        public Dictionary<string, List<Object>> xyPositionData(HospitalSubjectData Data)
        {
            Dictionary<string, List<Object>> result = new Dictionary<string, List<Object>>();

            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandText = $"SELECT total.x좌표, total.y좌표, total.진료과목코드명" +
                              $"FROM(SELECT * FROM hospital hp" +
                              $"FULL OUTER JOIN hospital_subject hp_child" +
                              $"ON hp.암호화요양기호 = hp_child.암호화요양기호) total" +
                              $"WHERE total.x좌표 IS NOT NULL" +
                              $"AND total.진료과목코드명 IS NOT NULL" +
                              $"AND total.진료과목코드명 = '{Data.진료과목코드명}'";

            //cmd.CommandType = System.Data.CommandType.Text;

            // 선택 메뉴에 따른 SQL 생성 및 실행
            //if (Data.menuName == "요양기관소재지별")
            //{
            //    Data.menuName = "TB_ALLILLNESS_NURSINGHOME_LOCATION";
            //    cmd.CommandText = $"select \"진료년월\", \"{Data.location}\" from" +
            //        $"  \"{Data.menuName}\" where \"진료년월\" between" +
            //        $" to_date('{Data.startDate}','yyyy/mm/dd') and" +
            //        $" to_date('{Data.endDate}','yyyy/mm/dd') and" +
            //        $" \"STATE\" = '{Data.item}' and \"질병명\" = '{Data.illnessName}'" +
            //        $" order by 진료년월";
            //}

            //else if (Data.menuName == "요양기관종별")
            //{
            //    Data.menuName = "TB_ALLILLNESS_NURSINGHOME_GROUP";
            //    cmd.CommandText = $"select \"진료년월\", \"{Data.nursingHome}\"" +
            //    $" from \"{ Data.menuName}\" where \"진료년월\" between" +
            //    $" to_date('{Data.startDate}','yyyy/mm/dd') and" +
            //    $" to_date('{Data.endDate}','yyyy/mm/dd') and" +
            //    $" \"STATE\" = '{Data.item}' and \"질병명\" = '{Data.illnessName}'" +
            //    $" order by 진료년월";
            //}

            //else if (Data.menuName == "입원/외래별")
            //{
            //    Data.menuName = "TB_ALLILLNESS_GENDER_OUTPATIENT";
            //    cmd.CommandText = $"select \"진료년월\", \"{ Data.ioPatient}\"" +
            //      $" from \"{ Data.menuName}\" where \"진료년월\" between" +
            //      $" to_date('{Data.startDate}','yyyy/mm/dd') and" +
            //      $" to_date('{Data.endDate}','yyyy/mm/dd') and" +
            //      $" \"STATE\"= '{Data.item}' and \"질병명\"= '{Data.illnessName}'" +
            //      $" and \"성별\" = '{Data.gender}' order by 진료년월";
            //}
            //else if (Data.menuName == "성별/연령5세구간별")
            //{
            //    Data.menuName = "TB_ALLILLNESS_GENDER_FIVE_YEARS";
            //    cmd.CommandText = $"select \"진료년월\", \"{ Data.age_5}\"" +
            //        $" from \"{ Data.menuName}\" where \"진료년월\" between" +
            //        $" to_date('{Data.startDate}','yyyy/mm/dd') and" +
            //        $" to_date('{Data.endDate}','yyyy/mm/dd') and" +
            //        $" \"STATE\" = '{Data.item}' and \"질병명\" = '{Data.illnessName}'" +
            //        $" and \"성별\" = '{Data.gender}' order by 진료년월";
            //}
            //else
            //{
            //    Data.menuName = "TB_ALLILLNESS_GENDER_TEN_YEARS";
            //    cmd.CommandText = $"select \"진료년월\", \"{ Data.age_10}\"" +
            //        $" from \"{Data.menuName}\" where \"진료년월\" between" +
            //        $" to_date('{Data.startDate}','yyyy/mm/dd') and" +
            //        $" to_date('{Data.endDate}','yyyy/mm/dd') and" +
            //        $" \"STATE\" = '{Data.item}' and \"질병명\" = '{Data.illnessName}'" +
            //        $" and \"성별\" = '{Data.gender}' order by 진료년월";
            //}


            OracleDataReader dataReader = cmd.ExecuteReader();

            List<Object> xPosition = new List<Object>();
            List<Object> yPosition = new List<Object>();


            while (dataReader.Read())
            {
                xPosition.Add(dataReader.GetString(0));
                yPosition.Add(dataReader.GetString(1));
            }

            dataReader.Close();
            cmd.Dispose();

            result.Add("xPosition", xPosition);
            result.Add("yPosition", yPosition);

            return result;
        }
    }
}
