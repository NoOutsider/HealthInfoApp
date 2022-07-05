using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;


namespace HealthInfoApp.Models
{
    public class MaleOutpatientRepository
    {
        private OracleConnection conn;
        public MaleOutpatientRepository()
        {
            conn = new OracleConnection("User Id=user1;Password=passwd!@;Data Source=xe_db;");
            conn.Open();
        }
        ~MaleOutpatientRepository()
        {
            conn.Close();
        }

        public List<MaleOutpatient> allMaleOutpatientDataList()
        {
            List<MaleOutpatient> maleOutpatients = new List<MaleOutpatient>();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = $"select * from TB_NIKOTIN_MALE_OUTPATIENT";

            OracleDataReader dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                MaleOutpatient maleOutpatient = new MaleOutpatient();
                maleOutpatient.id = dataReader.GetInt32(0);
                maleOutpatient.진료년월 = dataReader.GetString(1);
                maleOutpatient.state = dataReader.GetString(2);
                maleOutpatient.소계 = dataReader.GetInt32(3);
                maleOutpatient.외래 = dataReader.GetInt32(4);
                maleOutpatient.입원 = dataReader.GetInt32(5);

                maleOutpatients.Add(maleOutpatient);
            }

            dataReader.Close();
            cmd.Dispose();

            return maleOutpatients;
        }
    }
}
