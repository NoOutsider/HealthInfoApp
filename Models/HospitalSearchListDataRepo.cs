using Oracle.ManagedDataAccess.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.models
{
    public class HospitalSearchListDataRepo
    {
        private OracleConnection conn;

        public HospitalSearchListDataRepo()
        {
            conn = new OracleConnection("User Id = admin;Password = 1q2w3e4r5tAAA;Data Source = orcl_medium");
            //conn = new OracleConnection("User Id = user1;Password = passwd!@;Data Source = xe_db");
            //conn = new OracleConnection("User Id = user1;Password = passwd;Data Source = xe");
            conn.Open();
        }

        ~HospitalSearchListDataRepo()
        {
            conn.Close();
        }

        public List<string> MedicalSubjectList()
        {
            List<string> list = new List<string>();

            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"SELECT DISTINCT 진료과목코드명 FROM hospital_subject";
            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                list.Add(dataReader.GetString(0));
            }

            dataReader.Close();
            cmd.Dispose();

            return list;
        }

        public List<string> SpecialHospitalList()
        {
            List<string> list = new List<string>();

            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"SELECT DISTINCT 검색코드명 FROM hospital_special";
            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                list.Add(dataReader.GetString(0));
            }

            dataReader.Close();
            cmd.Dispose();

            return list;
        }

        public List<string> EquipmentList()
        {
            List<string> list = new List<string>();

            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"SELECT DISTINCT 장비코드명 FROM hospital_equipment";
            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                list.Add(dataReader.GetString(0));
            }

            dataReader.Close();
            cmd.Dispose();

            return list;
        }

        public List<string> SpecialTreatmentList()
        {
            List<string> list = new List<string>();
            OracleCommand cmd = new OracleCommand();

            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"SELECT DISTINCT 검색코드명 FROM hospital_special_treatment";
            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                list.Add(dataReader.GetString(0));
            }

            dataReader.Close();
            cmd.Dispose();

            return list;
        }
    }
}