using INVENTORY_MANAGEMENT_SOFTWARE.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Data;
using System.Diagnostics;

namespace INVENTORY_MANAGEMENT_SOFTWARE.Controllers
{
    public class HomeController : Controller
    {
        Utility util = new Utility();
        ClsUtility utility = new ClsUtility();
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Login()
        {

            return View();
        }
        [HttpPost]
        public IActionResult Login(Admin_User loginModel)
        {
            if (ModelState.IsValid)
            {


                //  string cnpwd = EncryptionHelper.Encrypt(loginModel.password);
                var ds = util.Fill("exec LoginValidate @username='" + loginModel.uname.ToLower() + "',@password='" + loginModel.pwd + "' ", util.cs);

                //  var userid = ds.Tables[0].Rows[0][0];
                string errmsg = ds.Tables[0].Rows[0][1].ToString();
                if (errmsg != "Incorrect Password")
                {
                    if (errmsg != "Invalid Username")
                    {
                        HttpContext.Session.SetString("UserId", ds.Tables[0].Rows[0]["UserId"].ToString());

                        HttpContext.Session.SetString("UserName", ds.Tables[0].Rows[0]["UserName"].ToString());
                        return RedirectToAction("MaterialIn", "Admin");
                    }
                    else
                        ViewBag.msg = errmsg;

                }
                else if (errmsg == "Incorrect Password")
                {
                    ViewBag.msg = errmsg;
                }



            }

            return View(loginModel);
        }

        public IActionResult Logout()
        {
            //HttpContext.Session.Clear();
            return RedirectToAction("Login", "Home");
        }

        public IActionResult Privacy()
        {
            return View();
        }
        public IActionResult Dashboard()
        {
                string sqlQuery = "SELECT* FROM EquipmentDropDown";
                DataSet ds = util.Fill(sqlQuery, util.cs); 
                var dataTable = ds.Tables[0];
                ViewBag.dt = dataTable;
                return View();
        }

        public IActionResult InvoiceDashboard()
        {
            ViewBag.Material = util.PopulateDropDown("exec Usp_DDL 'MaterialName'", util.cs);
            ViewBag.state = util.PopulateDropDown("exec Usp_DDL 'State'", util.cs);

            
            return View();
        }

        //public JsonResult Bindstate(string Id)
        //{
        //    var ds = util.Fill("exec Usp_DDL @action='State',@id='" + Id + "'", util.cs);
        //    return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        //}

        public JsonResult Binddistrict(string Id,string marrialname)
        {
            var ds = util.Fill("exec Usp_DDL 'District',@id='" + Id + "',@id2='"+marrialname+"'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        public JsonResult getInvoiceDashboard(string materialName,string State,string District,string formdate,string todate)
        {
            var ds = util.Fill(@$"exec InvoiceDashboard @materialName='{materialName}',@State='{State}',@District='{District}',@formdate='{formdate}',@todate='{todate}'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        public JsonResult GetDetailsItems(string materialName)
        {
            var ds = util.Fill(@$"exec Usp_GetDetailsItems @materialname='" +materialName+"'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }
        public JsonResult stockdashboard(string fromdate, string todate)
        {
            var ds = util.Fill(@$"exec Usp_stockdashboard @formdate='" +fromdate+ "',@todate='"+todate+"'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
        }


        public IActionResult AvailabeStockNew()
        {
            return View();
        }



        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }












    }




}
