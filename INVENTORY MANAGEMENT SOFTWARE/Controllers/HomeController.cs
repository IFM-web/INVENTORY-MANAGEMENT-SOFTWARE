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
        public IActionResult Login(Admin_User obj)
        {

            if (obj.uname == "Admin" && obj.pwd == "Admin")
            {
               
                //HttpContext.Session.SetString("Username", obj.uname);
                return RedirectToAction("MaterialIn", "Admin");
            }

            else
            {
                ViewBag.message = "UserName Or Password Invailed";
            }



            return View();
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
            string sqlQuery = "SELECT CenterPoint,convert(varchar,cast(Date as date),103)Date,Hub,Client,BRCode,BranchName ,BranchAddress ,MaterialName,QtyTransfer ,Remarks ,Status     ,L1Approval,L2Approval ,convert(varchar,cast(L1ApprovalDate as date),103)L1ApprovalDate ,convert(varchar,cast(L2ApprovalDate as date),103)L2ApprovalDate  ,InternalStatus FROM MaterialOut";
            DataSet ds = util.Fill(sqlQuery, util.cs);
            var dataTable = ds.Tables[0];
            ViewBag.dt = dataTable;
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }












    }




}
