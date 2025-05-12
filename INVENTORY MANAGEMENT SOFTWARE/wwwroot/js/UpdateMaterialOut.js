
function getURL() {
    const hostname = window.location.hostname;
    if (hostname == "localhost") {
        return '';
    }
    else {
        return '/Inventory';
    }

};

myurl = getURL();
//const formattedDate = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0];
//document.getElementById('fromdate').value = formattedDate;
//const toDate = new Date(Date.now()).toISOString().split('T')[0];
//document.getElementById('Todate').value = toDate;
function Binddistricttoother(){
    $.ajax({
        url: myurl + '/Admin/Binddistricttoother',
        type: 'Post',
        data: {
            Material: $('#Material').val(),
            fromdate: $('#fromdate').val(),
            Todate: $('#Todate').val(),
         
        },
        success: (data1) => {
          
            var data1 = JSON.parse(data1);
            console.log(data1);
            $("#District").empty();
            $("#District").append('<option value="All">Select</option');
            for (var e of data1) {
                $("#District").append(`<option value="${e.Id}">${e.Name}</option`);
            }
       


        },
        error: (err) => {
            alert(err);
        }



    });
}
function getUpdatedetails() {
    Binddistricttoother()
    getUpdatedetails1()
}
function getUpdatedetaildistict() {
 
    getUpdatedetails1()
}


function getUpdatedetails1() {
  
    $.ajax({
        url: myurl+'/Admin/getOutUpdatedetails',
        type: 'Post',
        data: {
            Material: $('#Material').val(),
 fromdate: $('#fromdate').val(),
            Todate: $('#Todate').val(),
            District: $('#District').val()

        },
        success: (data) => {
            $("#tbody").empty();
            var data = JSON.parse(data);
            var row = '';
            console.log(data);
            CreateTableFromArray(data, 'printdiv');
            

        },
        error: (err) => {
            alert(err);
        }



    });
}


function Update() {

    var itemsArray = [];

    $("#printdiv tbody TR").each(function (index, row) {
        var Items = {};
        var isChecked = $(row).find('.Checkeded').is(':checked');
        if (isChecked) {
            Items.matrialitemid = $(row).find(".Hid_Id").text();
            Items.Qty = $(row).find('.trQty').val();
            Items.date = $(row).find('#Date').val();
            Items.MaterialName = $(row).find('.MaterialName').text();
            Items.PreviousQTY = $(row).find('.PreviousQTY').text();

            itemsArray.push(Items);
        }
      
      
      
           
        

    });
    console.log(itemsArray);
    if (itemsArray.length > 0) {


        $.ajax({

            url: myurl + '/Admin/UpdateMaterialOut',
          
            data: { data: JSON.stringify(itemsArray) },
            type: 'post',
           
            success: function (data) {
                var data = JSON.parse(data)
                if (data == 'Successfull') {
                    alert('MaterialIn Update Successfull');
                    window.location.reload();
                }
               

            },
            error: function (err) {
                console.log("Error:", err);
                alert(err);
            }
        });
    } else {
        alert("Please Checked to Update Qty");
    }



}