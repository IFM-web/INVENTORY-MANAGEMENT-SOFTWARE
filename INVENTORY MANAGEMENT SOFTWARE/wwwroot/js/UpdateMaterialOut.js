
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

function getUpdatedetails() {
    $.ajax({
        url: myurl+'/Admin/getOutUpdatedetails',
        type: 'Post',
        data: { Material: $('#Material').val() },
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
                alert("Something went wrong!");
            }
        });
    } else {
        alert("Please Checked to Update Qty");
    }



}