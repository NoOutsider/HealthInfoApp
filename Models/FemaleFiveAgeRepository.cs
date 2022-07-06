using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
    public class FemaleFiveAgeRepository
    {
        private OracleConnection conn;

        public FemaleFiveAgeRepository()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            //conn = new OracleConnection("User Id = user1;Password = passwd!@;Data Source = xe_db");
            conn.Open();
        }
        ~FemaleFiveAgeRepository()
        {
            conn.Close();
        }

        public List<FemaleFiveAge> allFemaleFiveAgeDataList()
        {
            List<FemaleFiveAge> femaleFiveAges = new List<FemaleFiveAge>();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandType =System.Data.CommandType.Text;

            cmd.CommandText = $"select * from TB_NIKOTIN_FEMALE_FIVE_YEARS";

            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                FemaleFiveAge femaleFiveAge = new FemaleFiveAge();
                femaleFiveAge.id = dataReader.GetInt32(0);
                femaleFiveAge.진료년월 = dataReader.GetString(0);
                femaleFiveAge.state = dataReader.GetString(1);
                femaleFiveAge.소계 = dataReader.GetInt32(2);
                femaleFiveAge.나이5세미만 = dataReader.GetInt32(3);
                femaleFiveAge.나이5세이상 = dataReader.GetInt32(4);
                femaleFiveAge.나이10대초중반 = dataReader.GetInt32(5);
                femaleFiveAge.나이10대중후반 = dataReader.GetInt32(6);
                femaleFiveAge.나이20대초중반 = dataReader.GetInt32(7);
                femaleFiveAge.나이20대중후반 = dataReader.GetInt32(8);
                femaleFiveAge.나이30대초중반 = dataReader.GetInt32(9);
                femaleFiveAge.나이30대중후반=dataReader.GetInt32(10); 
	            femaleFiveAge.나이40대초중반=dataReader.GetInt32(11); 
	            femaleFiveAge.나이40대중후반=dataReader.GetInt32(12); 
	            femaleFiveAge.나이50대초중반=dataReader.GetInt32(13); 
	            femaleFiveAge.나이50대중후반=dataReader.GetInt32(14); 
	            femaleFiveAge.나이60대초중반=dataReader.GetInt32(15); 
	            femaleFiveAge.나이60대중후반=dataReader.GetInt32(16); 
	            femaleFiveAge.나이70대초중반=dataReader.GetInt32(17); 
	            femaleFiveAge.나이70대중후반 = dataReader.GetInt32(18);
                femaleFiveAge.나이80세이상 = dataReader.GetInt32(19);

                femaleFiveAges.Add(femaleFiveAge);
            }
            dataReader.Close();
            cmd.Dispose();

            return femaleFiveAges;
        }

    }
}
