using INVENTORY_MANAGEMENT_SOFTWARE;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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
            ViewBag.hub = util.PopulateDropDown("SELECT DISTINCT state ,state FROM statemaster", util.cs, "");
         
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
                        string query = "INSERT INTO MaterialOut(CenterPoint,Date,state,Hub,Client,BRCode,BranchName,BranchAddress,MaterialName,QtyTransfer,Remarks,Status) VALUES (@CenterPoint,@Date,@Hub,@state,@Client,@BRCode,@BranchName,@BranchAddress,@MaterialName,@QtyTransfer,@Remarks,@Status)";
                        using (SqlCommand cmd = new SqlCommand(query, conn))
                        {
                            cmd.Parameters.AddWithValue("@CenterPoint", roc["CenterPoint"]);
                            cmd.Parameters.AddWithValue("@Date", roc["Date"]);
                            cmd.Parameters.AddWithValue("@state", roc["Hub"]);
                            cmd.Parameters.AddWithValue("@Hub", roc["state"]);
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
                                util.ExecQuery(@$"Insert into logs_table(MaterialName,Qty,Date,Status)values('{roc["MaterialName"]}','{roc["QtyTransfer"]}',getdate(),'StockOut')", util.cs);
                               

                                DataSet ds = util.Fill("select Quantity from EquipmentDropDown  where EquipmentList = '" + roc["MaterialName"] + "'", util.cs);
                                int previousqty = Convert.ToInt32(ds.Tables[0].Rows[0][0].ToString());

                                int qty =  previousqty- Convert.ToInt32(roc["QtyTransfer"]);

                                util.Fill("UPDATE EquipmentDropDown SET Quantity='" + qty + "' where   EquipmentList = '" + roc["MaterialName"] + "'", util.cs);
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
            string? message;
            string? status;
            var recordsJson = Request.Form["data"].ToString();
            string InvoiceNo = Request.Form["InvoiceNo"];
            DataTable dataa = (DataTable)JsonConvert.DeserializeObject(recordsJson, (typeof(DataTable)));
            try
            {
                string EquipmentList = "";

                var ds1 = util.Fill("select count(*) from MaterialIn where InvoiceNo='" + InvoiceNo + "'", util.cs);
                int count = Convert.ToInt32(ds1.Tables[0].Rows[0][0].ToString());
                if (count == 0)
                {


                      using (SqlConnection conn = new SqlConnection(util.cs))
                      {
                          conn.Open();
                          foreach (DataRow roc in dataa.Rows)
                          {
                              string query = "INSERT INTO MaterialIn(CenterPoint,EquipmentList,QuantityReceived,Remarks,Date,vendorname,InvoiceNo) VALUES (@CenterPoint,@EquipmentList,@QuantityReceived,@Remarks,@Date,@vendorname,@InvoiceNo)";
                              using (SqlCommand cmd = new SqlCommand(query, conn))
                              {
                                  cmd.Parameters.AddWithValue("@CenterPoint", roc["CenterPoint"]);
                                  cmd.Parameters.AddWithValue("@EquipmentList", roc["EquipmentList"]);
                                  cmd.Parameters.AddWithValue("@QuantityReceived", roc["QuantityReceived"]);
                                  cmd.Parameters.AddWithValue("@Remarks", roc["Remarks"]);
                                  cmd.Parameters.AddWithValue("@Date", roc["Date"]);
                                  cmd.Parameters.AddWithValue("@vendorname", roc["Vendor"]);
                                  cmd.Parameters.AddWithValue("@InvoiceNo", InvoiceNo);
                                 // cmd.Parameters.AddWithValue("@Availablestock", roc["Availablestock"]);
                                  int i = cmd.ExecuteNonQuery();
                                  if (i == 1)
                                  {
                                    util.ExecQuery(@$"Insert into logs_table(MaterialName,Qty,Date,Status)values('{roc["EquipmentList"]}','{roc["QuantityReceived"]}',getdate(),'StockIn')",util.cs);
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

                    message = "Inventory Inserted Successfully!";
                    status = "success";


                }
                else
                {
                    message = "Invoice No Already Exist " + InvoiceNo;
                    status="error";
                }
                return Json(new { message= message,error=status });
            }
            catch (Exception ex)
            {
                return Json(new { message = "Error: " + ex.Message });
            }
        }

        public IActionResult UpdateMaterialIn()
        {
            ViewBag.InvoiceNo = util.PopulateDropDown("select distinct InvoiceNo,InvoiceNo from MaterialIn where InvoiceNo <> '' ", util.cs);
            return View();
        }




        [HttpPost]

        public ActionResult InsertAvailableStock(string equipmentid, int quantityid)
        {
               
                string sqlquery = "INSERT INTO Availablestock (Availablestock_Name, Quantity) VALUES ('"+equipmentid+ "','"+ quantityid +"')";
                string msg = util.ExecQuery(sqlquery, util.cs);
                var data = JsonConvert.SerializeObject(msg);
                return Json(data);
        }
        [HttpPost]


        [HttpPost]

        public ActionResult BindState(string Id)
        {

            string sqlquery = "select district as state from statemaster where state='" + Id+"' ";
            var ds = util.Fill(sqlquery, util.cs);
            var data = JsonConvert.SerializeObject(ds.Tables[0]);
            return Json(data);
        }
        [HttpPost]

        public ActionResult getUpdatedetails(string Invoice)
        {
               
                string sqlquery = "select MaterialId,EquipmentList,QuantityReceived,Remarks from MaterialIn where InvoiceNo ='" + Invoice+"'";
                var ds = util.Fill(sqlquery, util.cs);
                var data = JsonConvert.SerializeObject(ds.Tables[0]);
                return Json(data);
        }

        [HttpPost]
        public JsonResult UpdateMaterialInInvoice()
        {
            var recordsJson = Request.Form["data"].ToString();

            var Arr = JArray.Parse(recordsJson);
            string  msg="";
            foreach (var e in Arr)
            {
                 msg = util.ExecQuery($@"update MaterialIn set EquipmentList='{e["MaterialName"]}',QuantityReceived='{e["Qty"]}',Remarks='{e["remark"]}' where MaterialId= '{e["matrialitemid"]}' ",util.cs);

            }

            return Json(JsonConvert.SerializeObject(msg));
        }

    }
}
