using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
    public class NursingHomeLocationRepository
    {
        private OracleConnection conn;

        public NursingHomeLocationRepository()
        {
            conn = new OracleConnection("User Id=user1;Password=passwd!@;Data Source=xe_db;");
            conn.Open();
        }

        ~NursingHomeLocationRepository()
        {
            conn.Close();
        }

        public List<NursingHomeLocation> allNursingHomeLocationDataList() {
            List<NursingHomeLocation> nursingHomeLocations = new List<NursingHomeLocation>();

            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = $"select * from TB_NIKOTIN_NURSINGHOME_LOCATION";

            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                NursingHomeLocation nursingHomeLocation = new NursingHomeLocation();
                nursingHomeLocation.진료년월 = dataReader.GetString(0);
                nursingHomeLocation.state = dataReader.GetString(1);
                nursingHomeLocation.계 = dataReader.GetInt32(2);
                nursingHomeLocation.서울 = dataReader.GetString(3);
                nursingHomeLocation.부산 = dataReader.GetString(4);
                nursingHomeLocation.인천 = dataReader.GetString(5);
                nursingHomeLocation.대구 = dataReader.GetString(6);
                nursingHomeLocation.광주 = dataReader.GetString(7);
                nursingHomeLocation.대전 = dataReader.GetString(8);
                nursingHomeLocation.울산 = dataReader.GetString(9);
                nursingHomeLocation.경기 = dataReader.GetString(10);
                nursingHomeLocation.강원 = dataReader.GetString(11);
                nursingHomeLocation.충북 = dataReader.GetString(12);
                nursingHomeLocation.충남 = dataReader.GetString(13);
                nursingHomeLocation.전북 = dataReader.GetString(14);
                nursingHomeLocation.전남 = dataReader.GetString(15);
                nursingHomeLocation.경북 = dataReader.GetString(16);
                nursingHomeLocation.경남 = dataReader.GetString(17);
                nursingHomeLocation.제주 = dataReader.GetString(18);
                nursingHomeLocation.세종 = dataReader.GetString(19);
                nursingHomeLocations.Add(nursingHomeLocation);
            }
            dataReader.Close();
            cmd.Dispose();

            return nursingHomeLocations;
        }
    }
}
