using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
   
    public class FemaleTenAgeRepository
    {
        private OracleConnection conn;
        public FemaleTenAgeRepository()
        {
            conn = new OracleConnection("User Id=user1;Password=passwd!@;Data Source=xe_db;");
            conn.Open();
        }

        ~FemaleTenAgeRepository()
        {
            conn.Close();
        }

        public List<FemaleTenAge> allFemaleTenAgeDataList()
        {
            List<FemaleTenAge> femaleTenAges = new List<FemaleTenAge>();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"select * from TB_NIKOTIN_FEMALE_TEN_YEARS";
            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                FemaleTenAge femaleTenAge = new FemaleTenAge();
                femaleTenAge.진료년월 = dataReader.GetString(0);
                femaleTenAge.state = dataReader.GetString(1);
                femaleTenAge.소계 = dataReader.GetInt32(2);
                femaleTenAge.나이10대미만 = dataReader.GetInt32(3);
                femaleTenAge.나이10대 = dataReader.GetInt32(4);
                femaleTenAge.나이20대 = dataReader.GetInt32(5);
                femaleTenAge.나이30대 = dataReader.GetInt32(6);
                femaleTenAge.나이40대 = dataReader.GetInt32(7);
                femaleTenAge.나이50대 = dataReader.GetInt32(8);
                femaleTenAge.나이60대 = dataReader.GetInt32(9);
                femaleTenAge.나이70대 = dataReader.GetInt32(10);
                femaleTenAge.나이80대이상 = dataReader.GetInt32(11);

                femaleTenAges.Add(femaleTenAge);
            }
            dataReader.Close();
            cmd.Dispose();


            return femaleTenAges;
        }

    }
}
