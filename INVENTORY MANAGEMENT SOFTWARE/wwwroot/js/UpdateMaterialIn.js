
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
        url: myurl+'/Admin/getUpdatedetails',
        type: 'Post',
        data: { Invoice: $('#InvoiceNo').val() },
        success: (data) => {
           
            var data = JSON.parse(data);
           
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
            Items.matrialitemid = $(row).find(".Hid_id").text();
            Items.MaterialName = $(row).find(".MaterialName").text();
            Items.PreviousQTY = $(row).find('.PreviousQTY').text();
            Items.Qty = $(row).find('.Qty').val();
            Items.Remarks = $(row).find('.Remarks').text();

            itemsArray.push(Items);
        }


    });
    console.log(itemsArray);
    if (itemsArray.length > 0) {


        $.ajax({

            url: myurl + '/Admin/UpdateMaterialInInvoice',
          
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
        alert("Please Select Any Item");
    }



}