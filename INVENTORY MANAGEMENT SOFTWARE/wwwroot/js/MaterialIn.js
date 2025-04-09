

function getURL() {
    const hostname = window.location.hostname;
    if (hostname == "localhost") {
        return '';
    }
    else {
        return '/Inventory';
    }

};
$(document).ready(function () {
    document.getElementById('dateid').value = new Date().toISOString().substring(0, 10);

})

var myurl = getURL();

var allitem = [];
function Validation() {
    var msg = "";
    var charregex = /^[a-zA-Z\s]+$/;
    var intregex = /^[0-9]+$/;
    var charintregex = /^[a-zA-Z0-9\s]+$/;
    $(".mandatory").each(function () {
        if ($(this).val() == "" || $(this).val() == "0") {
            var name = $(this).attr('name')

            msg += "" + name + "  Required !! <br/>";
        }
    });

    $(".checktaxes").each(function () {
        if ($(this).val() == "") {
            var name = $(this).attr('name')
            console.log($(this).val());
            msg += "" + name + "  Required !!\n";
        }
    });
    $(".chkint").each(function () {
        if (!intregex.test($(this).val())) {
            var name = $(this).attr('name')
            msg += "Enter Valid " + name + "!!\n";
        }
    });
    $(".chkcharint").each(function () {
        if (!charintregex.test($(this).val())) {
            var name = $(this).attr('name')
            msg += "Enter Valid " + name + "!!\n";
        }
    });
    $(".chkchar").each(function () {
        if (!charregex.test($(this).val())) {
            var name = $(this).attr('name')
            msg += "Enter Valid " + name + "!!\n";
        }
    });
    return msg;
}
function Addtolist() {
    // Retrieve form values
    var CenterPoint = $('#centerpointid').val();
    var Date = $('#dateid').val(); 
    var EquipmentList = $('#equipmentid').val(); 
    var QuantityReceived = $('#quantityid').val(); 
    var Remarks = $('#remarksid').val();

    $('#centerpointid').prop('disabled', false) 
    $('#dateid').prop('disabled', false) 
    $('#equipmentid').prop('disabled', false) 
    var availabestock = $('#availabestockid').text();  
   
    // Validation check
    var msg = Validation();
    if (msg === '') {
            availabestock = parseFloat(availabestock);
            var items = {
                CenterPoint: $("#centerpointid").val(),
                Date: $("#dateid").val(),
                EquipmentList: $("#equipmentid").val(),
                Vendor: $("#VendorName").val(),
                QuantityReceived: $("#quantityid").val(),
                Remarks: $("#remarksid").val(),
                availabestock: $('#availabestockid').text(),

        } 
        
        if (!/^(?!0+$)\d+$/.test(QuantityReceived)) {
            Swal.fire({
                title: "Error!",
                text: "Quantity must be more than 0.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;  // Exit function if validation fails
        }
       
            allitem.push(items);
            console.log(allitem);
            Swal.fire({
                title: "Success!",
                text: "Material added successfully!",
                icon: "success"
            });
            //$('#centerpointid').prop('disabled', true)
        //$('#dateid').prop('disabled', true)

        $('#quantityid').val('');

        $('#remarksid').val('');
  
        $('#equipmentid').val(0);
        $('#equipmentid').trigger('change');
        $('#centerpointid').prop('disabled', true)
        $('#dateid').prop('disabled', true)
      
        var availabestock = $('#availabestockid').text();  
           
 
        $("#availabestockid").text('Please Select Material');
            $("#btnaddid").text('Add To List');// Reset Available Stock

           
            showTable(allitem);
      
        
    } else {
       
        Swal.fire({
            title: "Error!",
            html: msg, 
            icon: "error"
        });
    }
}
function showTable(allitem) {
    if (allitem.length > 0) {
        $("#table-body-id").empty();
        var row = '';
        for (var i = 0; i < allitem.length; i++) {
            row += `
                <tr>

                    <td>${i + 1}</td>
                    <td style="display:none" >${allitem[i].CenterPoint}</td>   
                    <td style="display:none">${allitem[i].Date}</td>  
                    <td>${allitem[i].EquipmentList}</td> 
                    <td style="display:none">${allitem[i].availabestock}</td>
                    <td>${allitem[i].QuantityReceived}</td> 
                    <td>${allitem[i].Remarks}</td> 
                   
                    <td>
                        <button class='btn btn-danger' onclick="deleteRow('${i}')">
                            Remove
                        </button>
                          <button class="btn btn-primary editrow" onclick="EditRow(${i})">Edit</button>
                   
                          
                    </td>
                </tr>
            `;
        }
        $("#table-body-id").append(row); 
    } else {
        $("#table-body-id").empty();
    }
}
function deleteRow(index) {
    // Remove the item from the array
    allitem.splice(index, 1);

    // Update the table with remaining items
    showTable(allitem);

    // If there are still items, disable the dropdowns
    if (allitem.length > 0) {
        $('#centerpointid').prop('disabled', true);
        $('#dateid').prop('disabled', true);
    }
    // If no items are left, clear the fields and enable the dropdowns
    else {
        $('#quantityid').val('');
        $('#remarksid').val('');
        $('#equipmentid').val(0);
        $('#centerpointid').prop('disabled', false);
        $('#dateid').prop('disabled', false);
    }
}

function EditRow(index) {
    var arr = allitem[index];
    $("#centerpointid").val(arr.CenterPoint);
    $("#dateid").val(arr.Date);
    $("#equipmentid").val(arr.EquipmentList);
    $("#quantityid").val(arr.QuantityReceived);
    $("#remarksid").val(arr.Remarks);
    $("#availabestockid").text(arr.availabestock);
    $('#centerpointid').prop('disabled', true)
    $('#dateid').prop('disabled', true)
    $('#equipmentid').prop('disabled', true)
    $("#btnaddid").text('Update Material List');
    allitem.splice(index, 1);
    showTable(allitem);
    $('#equipmentid').trigger('change');
}

function addEquipment(equipmentid) {
    // Ensure equipmentid is valid before making the request
    if (!equipmentid || equipmentid <= 0) {
        console.log("Invalid Material ID");
        return;  // Exit the function if the equipment ID is not valid
    }

    $.ajax({
        url: myurl + '/Admin/BindEquipment',
        type: 'post',
        data: {
            equipmentid: equipmentid
        },
        success: function (data) {
            try {
                var data = JSON.parse(data);

                // Check if data is valid and contains the expected field
                if (data && Array.isArray(data) && data.length > 0 && data[0].Quantity !== undefined) {
                    $('#availabestockid').html(data[0].Quantity);
                } else {
                    console.log("Invalid data or Quantity field is missing");
                    $('#availabestockid').html("No data available");
                }
            } catch (e) {
                console.log("Error parsing response:", e);
            }
        },
        error: function (error) {
            console.log('Error loading equipment data:', error);
        }
    }); 
}



function validateNoMultipleZeros(input) {
   
    for (let i = 1; i < input.length; i++) {
       
        if (input[i] === '' && input[i - 1] === '') {
          
            document.getElementById('quantityid').value = '';
            Swal.fire({
                title: "Error!",
                text: "Quantity must not contain multiple consecutive zeros.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return; 
        }
    }
}

function SaveData() {
   

    // Check if allitem is not empty
    if (allitem.length === 0) {
        Swal.fire({
            title: 'Error!',
            text: 'No Material To Save!',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return; // Stop execution if allitem is empty
    }

    var newdata = JSON.stringify(allitem);

    // Send the data to the server
    $.ajax({
        url: myurl + '/Admin/InsertInventory',
        data: { data: newdata, InvoiceNo: $("#Invoiceno").val() },
        type: 'post',

        success: function (data) {
            Swal.fire({
                title: data.error == 'success' ? 'Success!' : 'Error',
                text: data.message,
                icon: data.error == 'success' ? 'success' : 'error',

                confirmButtonText: 'OK'
            }).then(function () {
                // Clear the allitem array
                if (data.error == "success") {

                
                allitem = [];

                // Clear the table
                showTable(allitem);

                // Reload the page
                    location.reload();
                }
            });
        },

        error: function (xhr, status, error) {
            Swal.fire({
                title: 'Error!',
                text: status,
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    });
}











