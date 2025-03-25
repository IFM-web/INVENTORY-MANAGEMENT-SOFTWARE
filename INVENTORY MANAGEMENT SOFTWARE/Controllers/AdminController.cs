using INVENTORY_MANAGEMENT_SOFTWARE;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using System.Data;
using System.Data.SqlClient;


namespace INVENTORY_MANAGEMENT_SOFTWARE.Controllers
{
   
    public class AdminController : Controller
    {

       Utility util = new Utility();
        ClsUtility utility = new ClsUtility();
        public IActionResult Login()
        {


            return View();
        }
        public IActionResult QuantityMaster()
        {
            ViewBag.Equipmentlist = util.PopulateDropDown("SELECT DISTINCT  EquipmentList, EquipmentList FROM EquipmentDropDown", util.cs, "");
            return View();
        }
        public IActionResult MaterialIn()
        {
          
            ViewBag.points = util.PopulateDropDown("SELECT CenterPoint, CenterPoint FROM CenterDropDown", util.cs, "");
            ViewBag.Equipmentlist = util.PopulateDropDown("SELECT DISTINCT  EquipmentList, EquipmentList FROM EquipmentDropDown", util.cs,"");
            return View();
        }
        public IActionResult MaterialOut()
        {
          
            ViewBag.point = util.PopulateDropDown("SELECT CenterPoint, CenterPoint FROM CenterDropDown ", util.cs, "");
            ViewBag.hub = util.PopulateDropDown("SELECT HubMaster_Name ,HubMaster_Name FROM HubMaster", util.cs, "");
         
            ViewBag.Client = util.PopulateDropDown("SELECT DISTINCT Client_Name ,Client_Name FROM ClientMaster", util.cs, "");
             ViewBag.Equipmentlist = util.PopulateDropDown("SELECT DISTINCT  EquipmentList, EquipmentList FROM EquipmentDropDown", util.cs,"");
            return View();
        }
        public JsonResult BindBranchDetail(string brcodeid,string centerclientid)
        {
            string sqlquery = "SELECT Branch_Name, Branch_Address FROM ClientMaster where Client_Name='"+ centerclientid + "' AND Br_Code  ='" + brcodeid + "'";
            DataSet ds = util.Fill(sqlquery, util.cs);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }


        public JsonResult BindEquipment(string equipmentid)
        {
            string sqlquery = "select Quantity from EquipmentDropDown where EquipmentList  ='" + equipmentid + "'";
            DataSet ds = util.Fill(sqlquery, util.cs);
            var dt = ds.Tables[0];
            var data = JsonConvert.SerializeObject(dt);
            return Json(data);
        }
        public JsonResult InsertMaterialOut()
        {
            var recordsJson = Request.Form["data"].ToString();
            DataTable dataa = (DataTable)JsonConvert.DeserializeObject(recordsJson, (typeof(DataTable)));
            try


            {
                //string EquipmentList = "";
                using (SqlConnection conn = new SqlConnection(util.cs))
                {
                    conn.Open();
                    foreach (DataRow roc in dataa.Rows)
                    {
                        string query = "INSERT INTO MaterialOut(CenterPoint,Date,Hub,Client,BRCode,BranchName,BranchAddress,MaterialName,QtyTransfer,Remarks,Status) VALUES (@CenterPoint,@Date,@Hub,@Client,@BRCode,@BranchName,@BranchAddress,@MaterialName,@QtyTransfer,@Remarks,@Status)";
                        using (SqlCommand cmd = new SqlCommand(query, conn))
                        {
                            cmd.Parameters.AddWithValue("@CenterPoint", roc["CenterPoint"]);
                            cmd.Parameters.AddWithValue("@Date", roc["Date"]);
                            cmd.Parameters.AddWithValue("@Hub", roc["Hub"]);
                            cmd.Parameters.AddWithValue("@Client", roc["Client"]);
                            cmd.Parameters.AddWithValue("@BRCode", roc["BRCode"]);
                            cmd.Parameters.AddWithValue("@BranchName", roc["BranchName"]);
                            cmd.Parameters.AddWithValue("@BranchAddress", roc["BranchAddress"]);
                            cmd.Parameters.AddWithValue("@MaterialName", roc["MaterialName"]);
                            cmd.Parameters.AddWithValue("@QtyTransfer", roc["QtyTransfer"]);
                            cmd.Parameters.AddWithValue("@Remarks", roc["Remarks"]);
                            cmd.Parameters.AddWithValue("@Status", "Request Sent For Approval");

                  
                            // cmd.Parameters.AddWithValue("@Availablestock", roc["Availablestock"]);
                            int i = cmd.ExecuteNonQuery();
                            if (i == 1)
                            {
                                //EquipmentList = roc["EquipmentList"].ToString();

                                //DataSet ds = util.Fill("select Quantity from EquipmentDropDown  where EquipmentList = '" + roc["EquipmentList"] + "'", util.cs);
                                //int previousqty = Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());

                                //int qty = Convert.ToInt32(roc["QtyReceived"]) + previousqty;

                                //util.Fill("UPDATE EquipmentDropDown SET Quantity='" + qty + "' where   EquipmentList = '" + roc["EquipmentList"] + "'", util.cs);
                            }
                        }
                    }

                    //util.Fill("UPDATE MaterialIn SET CenterPoint=@CenterPoint, QuantityReceived = @QuantityReceived, Remarks = @Remarks,Date=@Date WHERE EquipmentList = @EquipmentList", util.cs);

                }
                return Json(new { message = "Request sent for approval !" });
            }
            catch (Exception ex)
            {
                return Json(new { message = "Error: " + ex.Message });
            }
        }






        public JsonResult InsertInventory()
        {
            var recordsJson = Request.Form["data"].ToString();
            DataTable dataa = (DataTable)JsonConvert.DeserializeObject(recordsJson, (typeof(DataTable)));
            try
            {
                string EquipmentList = "";
                using (SqlConnection conn = new SqlConnection(util.cs))
                {
                    conn.Open();
                    foreach (DataRow roc in dataa.Rows)
                    {
                        string query = "INSERT INTO MaterialIn(CenterPoint,EquipmentList,QuantityReceived,Remarks,Date) VALUES (@CenterPoint,@EquipmentList,@QuantityReceived,@Remarks,@Date)";
                        using (SqlCommand cmd = new SqlCommand(query, conn))
                        {
                            cmd.Parameters.AddWithValue("@CenterPoint", roc["CenterPoint"]);
                            cmd.Parameters.AddWithValue("@EquipmentList", roc["EquipmentList"]);
                            cmd.Parameters.AddWithValue("@QuantityReceived", roc["QuantityReceived"]);
                            cmd.Parameters.AddWithValue("@Remarks", roc["Remarks"]);
                            cmd.Parameters.AddWithValue("@Date", roc["Date"]);
                           // cmd.Parameters.AddWithValue("@Availablestock", roc["Availablestock"]);
                            int i = cmd.ExecuteNonQuery();
                            if (i == 1)
                            {
                                EquipmentList = roc["EquipmentList"].ToString();
                               
                                                  DataSet ds = util.Fill("select Quantity from EquipmentDropDown  where EquipmentList = '" + roc["EquipmentList"] + "'", util.cs);
                                int previousqty = Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());

                                int qty = Convert.ToInt32(roc["QuantityReceived"]) + previousqty;

                                util.Fill("UPDATE EquipmentDropDown SET Quantity='"+ qty  + "' where   EquipmentList = '" + roc["EquipmentList"] + "'", util.cs);
                            }
                        }
                    }
      
                    util.Fill("UPDATE MaterialIn SET CenterPoint=@CenterPoint, QuantityReceived = @QuantityReceived, Remarks = @Remarks,Date=@Date WHERE EquipmentList = @EquipmentList", util.cs);

                }
                return Json(new { message = "Inventory Inserted Successfully!" });
            }
            catch (Exception ex)
            {
                return Json(new { message = "Error: " + ex.Message });
            }
        }

        [HttpPost]

        public ActionResult InsertAvailableStock(string equipmentid, int quantityid)
        {
               
                string sqlquery = "INSERT INTO Availablestock (Availablestock_Name, Quantity) VALUES ('"+equipmentid+ "','"+ quantityid +"')";
                string msg = util.ExecQuery(sqlquery, util.cs);
                var data = JsonConvert.SerializeObject(msg);
                return Json(data);
        }


    }
}
