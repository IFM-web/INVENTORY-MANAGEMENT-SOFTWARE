
using Microsoft.AspNetCore.Mvc;
using Microsoft.SqlServer.Server;
using Mono.TextTemplating;
using Newtonsoft.Json;
using System.Data;
using System.Diagnostics;

namespace INVENTORY_MANAGEMENT_SOFTWARE.Controllers
{
    public class ReportController : Controller
    {
        Utility util = new Utility();
        ClsUtility utility = new ClsUtility();

        [Route("Report/InReprot")]
        public IActionResult MaterialIn()
        {
            ViewBag.Material = util.PopulateDropDown("exec Usp_DDL 'MaterialName'", util.cs);
            ViewBag.Invoice = util.PopulateDropDown("exec Usp_DDL 'Invoice'", util.cs);
            ViewBag.Vendor = util.PopulateDropDown("exec Usp_DDL 'Vendor'", util.cs);
            return View("MaterialIn");
        }


        public JsonResult GetMaterialInReprot(string materialName, string InvoiceNo, string Vendor, string formdate, string todate)
        {
            var ds = util.Fill(@$"exec Udp_GetMaterialInReprot @MatrialName='{materialName}',@Invoiceno='{InvoiceNo}',@Vendor='{Vendor}',@Fromdate='{formdate}',@Todate='{todate}'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        public JsonResult GetMaterialOutReprot(string materialName, string formdate, string todate)
        {
            var ds = util.Fill(@$"exec Udp_GetMaterialOutReprot @MatrialName='{materialName}',@Fromdate='{formdate}',@Todate='{todate}'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        [Route("Report/OutReport")]
        public IActionResult MaterialOutReport()
        {
            return View();
        }

        public JsonResult BindMaterial(string fromdate,string todate) { 
            var dt=util.PopulateDropDown("exec Usp_DDL 'MaterialNamebydate',@id='"+ fromdate + "',@id2='"+ todate + "'", util.cs);
            return Json(JsonConvert.SerializeObject(dt));
            
            }

        public IActionResult ApproveMaterialReport() {
            return View(); 
        }


        public JsonResult GetApproveMaterialReport(string fromdate, string todate)
        {
            var ds = util.Fill(@$"exec Usp_ApprovedReport @fromdate='{fromdate}',@todate='{todate}'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
    }
}
