using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
    public class FemaleOutpatientRepository
    {
        private OracleConnection conn;
        public FemaleOutpatientRepository()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            //conn = new OracleConnection("User Id = user1;Password = passwd!@;Data Source = xe_db");
            conn.Open();
        }
        ~FemaleOutpatientRepository()
        {
            conn.Close();
        }

        public List<FemaleOutpatient> allFemaleOutpatientDataList()
        {
            List<FemaleOutpatient> femaleOutpatients = new List<FemaleOutpatient>();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = $"select * from TB_NIKOTIN_FEMALE_OUTPATIENT";

            OracleDataReader dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                FemaleOutpatient femaleOutpatient = new FemaleOutpatient();
                femaleOutpatient.id = dataReader.GetInt32(0);
                femaleOutpatient.진료년월 = dataReader.GetString(1);
                femaleOutpatient.state = dataReader.GetString(2);
                femaleOutpatient.소계 = dataReader.GetInt32(3);
                femaleOutpatient.외래 = dataReader.GetInt32(4);
                femaleOutpatient.입원 = dataReader.GetInt32(5);

                femaleOutpatients.Add(femaleOutpatient);
            }

            dataReader.Close();
            cmd.Dispose();

            return femaleOutpatients;
        }
    }
}
