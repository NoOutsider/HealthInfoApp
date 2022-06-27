using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
    public class NikotinDataRepository
    {
        private OracleConnection conn;

        public NikotinDataRepository()
        {
            conn = new OracleConnection("User Id=user1;Password=passwd;Data Source=xe;");
            conn.Open();
        }

        ~NikotinDataRepository()
        {
            conn.Close();
        }

        public List<NikotinData> allNikotinDataList() {
            List<NikotinData> nikotinDatas = new List<NikotinData>();

            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = $"select * from TB_NIKOTIN_NURSINGHOME_LOCATION";

            OracleDataReader dataReader = cmd.ExecuteReader();
            while (dataReader.Read())
            {
                NikotinData nikotinData = new NikotinData();
                nikotinData.진료년월 = dataReader.GetString(0);
                nikotinData.state = dataReader.GetString(1);
                nikotinData.계 = dataReader.GetInt32(2);
                nikotinData.서울 = dataReader.GetString(3);
                nikotinData.부산 = dataReader.GetString(4);
                nikotinData.인천 = dataReader.GetString(5);
                nikotinData.대구 = dataReader.GetString(6);
                nikotinData.광주 = dataReader.GetString(7);
                nikotinData.대전 = dataReader.GetString(8);
                nikotinData.울산 = dataReader.GetString(9);
                nikotinData.경기 = dataReader.GetString(10);
                nikotinData.강원 = dataReader.GetString(11);
                nikotinData.충북 = dataReader.GetString(12);
                nikotinData.충남 = dataReader.GetString(13);
                nikotinData.전북 = dataReader.GetString(14);
                nikotinData.전남 = dataReader.GetString(15);
                nikotinData.경북 = dataReader.GetString(16);
                nikotinData.경남 = dataReader.GetString(17);
                nikotinData.제주 = dataReader.GetString(18);
                nikotinData.세종 = dataReader.GetString(19);
                nikotinDatas.Add(nikotinData);
            }
            dataReader.Close();
            cmd.Dispose();

            return nikotinDatas;
        }
    }
}
