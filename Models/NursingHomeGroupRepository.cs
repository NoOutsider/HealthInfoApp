using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Oracle.ManagedDataAccess.Client;

namespace HealthInfoApp.Models
{
    public class NursingHomeGroupRepository
    {
        OracleConnection conn;
        public NursingHomeGroupRepository()
        {
            conn = new OracleConnection("User Id=user1;Password=passwd!@;Data Source=xe_db;");
            conn.Open();
        }

        ~NursingHomeGroupRepository()
        {
            conn.Close();
        }

        public List<NursingHomeGroup> allNursingHomeGroupDataList()
        {
            List<NursingHomeGroup> nursingHomeGroup = new List<NursingHomeGroup>();

            OracleCommand cmd = new OracleCommand();
            cmd.Connection = conn;
            cmd.CommandText = $"select * from TB_NIKOTIN_NURSINGHOME_GROUP";

            OracleDataReader dataReader = cmd.ExecuteReader();

            while (dataReader.Read())
            {
                NursingHomeGroup nursingHomegroup = new NursingHomeGroup();

                nursingHomegroup.진료년월 = dataReader.GetString(0);
                nursingHomegroup.state = dataReader.GetString(1);
                nursingHomegroup.계 = dataReader.GetInt32(2);
                nursingHomegroup.상급종합병원 = dataReader.GetInt32(3);
                nursingHomegroup.종합병원 = dataReader.GetInt32(4);
                nursingHomegroup.병원급 = dataReader.GetInt32(5);
                nursingHomegroup.의원급 = dataReader.GetInt32(6);
                nursingHomegroup.보건기관등 = dataReader.GetInt32(7);

                nursingHomeGroup.Add(nursingHomegroup);
            }
            dataReader.Close();
            cmd.Dispose();

            return nursingHomeGroup;
        }
    }
}
