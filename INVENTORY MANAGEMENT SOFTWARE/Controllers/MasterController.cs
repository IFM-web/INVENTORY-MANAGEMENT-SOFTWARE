using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace INVENTORY_MANAGEMENT_SOFTWARE.Controllers
{
    public class MasterController : Controller
    {
        Utility util=new Utility();
      
        public IActionResult Client()
        {
            return View();
        }
    
      
       

       

        public JsonResult showClint()
        {
            var ds = util.Fill("exec Usp_Client 'Select'",util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
          
        }


      

        [HttpPost]
        public JsonResult SaveClint(string Id,string Cliet,string BrCode, string BranchName, string BranchAddress,string State, string District)
        {
            var ds = util.Fill(@$"exec Usp_Client 'Insert',@id='{Id}',@Client='{Cliet}',@BrCode='{BrCode}', @BranchName='{BranchName}', @BranchAddress='{BranchAddress}', @State='{State}', @District='{District}'   ", util.cs);      

            return Json(JsonConvert.SerializeObject(ds.Tables[0]));
          
        }

        [HttpPost]
        public JsonResult DeleteClient(string Id,string Client)
        {
            var ds = util.Fill(@$"exec Usp_Client 'Delete',@id='{Id}',@Client='{Client}' ", util.cs);

            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }

        #region Item Master

        public IActionResult Item()
        {
            return View();
        }
        public JsonResult showItem()
        {
            var ds = util.Fill("exec Usp_MasterItem 'Select'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }

        [HttpPost]
        public JsonResult SaveItem(string Id, string Item)
        {
            var ds = util.Fill(@$"exec Usp_MasterItem 'Insert',@id='{Id}',@ItemName='{Item}' ", util.cs);

            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }


        [HttpPost]
        public JsonResult DeleteItem(string Id,string ItemName)
        {
            var ds = util.Fill(@$"exec Usp_MasterItem 'Delete',@id='{Id}', @ItemName='{ItemName}'", util.cs);

            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }

        #endregion



        #region User Master
        public IActionResult User()
        {
            return View();
        }


        public JsonResult showUser()
        {
            var ds = util.Fill("exec Usp_UserMaster 'Select'", util.cs);
            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }

        [HttpPost]
        public JsonResult SaveUser(string Id, string UserId,string UserName,string Password)
        {
            var ds = util.Fill(@$"exec Usp_UserMaster 'Insert',@id='{Id}',@UserId='{UserId}',@UserName='{UserName}',@Password='{Password}' ", util.cs);

            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        [HttpPost]
        public JsonResult DeleteUser(string Id)
        {
            var ds = util.Fill(@$"exec Usp_UserMaster 'Delete',@id='{Id}' ", util.cs);

            return Json(JsonConvert.SerializeObject(ds.Tables[0]));

        }
        #endregion
    }
}
