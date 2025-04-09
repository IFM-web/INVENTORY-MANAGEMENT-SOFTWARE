
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
            $("#tbody").empty();
            var data = JSON.parse(data);
            var row = '';
            console.log(data);
            for (var e of data) {
                row += `
                <tr>
                <td  id='MaterialId' class='d-none'>${e.MaterialId}</td>
                <td> <input id="MaterialName" class='form-control' value="${e.EquipmentList}"/></td>
                <td> <input id="qty" class='form-control'  value="${e.QuantityReceived}"/></td>
                <td> <input id="Remark" class='form-control'  value="${e.Remarks}"/></td>
                </tr>
                
                `
            }

            $("#tbody").append(row);
            

        },
        error: (err) => {
            alert(err);
        }



    });
}


function Update() {

    var itemsArray = [];

    $("#tbody TR").each(function (index, row) {
        var Items = {};
        
        Items.matrialitemid = $(row).find("#MaterialId").text();
        Items.MaterialName = $(row).find('#MaterialName').val();
        Items.Qty = $(row).find('#qty').val();
        Items.remark = $(row).find('#Remark').val();
           
            itemsArray.push(Items);
        

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