using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
    public class SearchDataRepository
    {
        private OracleConnection conn;

        public SearchDataRepository()
        {
            conn = new OracleConnection();
            conn.Open();
        }
        ~SearchDataRepository()
        {
            conn.Close();
        }

        public List<SearchData> searchCondition()
        {
            List<SearchData> searchDatas = new List<SearchData>();
            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandType = System.Data.CommandType.Text;

            cmd.CommandText = $"select * from tb_forsearching";
            OracleDataReader dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                SearchData searchData = new SearchData();
                searchData.ID = dataReader.GetInt32(0);
                searchData.illnessName = dataReader.GetString(1);
                searchData.menu = dataReader.GetString(2);
                searchData.item = dataReader.GetString(3);
                searchData.gender = dataReader.GetString(4);
                searchData.decade = dataReader.GetString(5);
                searchData.ioPatient = dataReader.GetString(6);
                searchData.nursingHome = dataReader.GetString(7);
                searchData.location = dataReader.GetString(8);
                searchData.date = dataReader.GetString(9);
                searchData.halfDecade = dataReader.GetString(10);
                searchDatas.Add(searchData);
            }
            dataReader.Close();
            cmd.Dispose();

            return searchDatas;
        }

    }
}
