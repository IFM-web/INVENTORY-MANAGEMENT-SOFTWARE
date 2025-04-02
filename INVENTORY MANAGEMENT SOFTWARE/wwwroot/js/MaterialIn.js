

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
                QuantityReceived: $("#quantityid").val(),
                Remarks: $("#remarksid").val(),
                availabestock: $('#availabestockid').text(),

        }
        if (!/^\d+$/.test(QuantityReceived)) {
            Swal.fire({
                title: "Error!",
                text: "Quantity must be a valid integer.",
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
    // Run validation before submitting the data
  
    // If validation fails (i.e., validationMessage is not empty), show an error and return early
  

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
        data: { data: newdata },
        type: 'post',

        success: function (data) {
            Swal.fire({
                title: 'Success!',
                text: data.message,
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(function () {
                // Clear the allitem array
                allitem = [];

                // Clear the table
                showTable(allitem);

                // Reload the page
                location.reload();
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










































//function editRow(button) {
//    // Get the row being edited
//    var row = $(button).closest('tr');

//    // Fill the form with the data from the selected row
//    var equipment = row.find("td").eq(1).text();
//    var qty = row.find("td").eq(2).text();
//    var remark = row.find("td").eq(3).text();
//    var centerpoint = row.find("td").eq(4).text();
//    var date = row.find("td").eq(5).text();

//    // Populate the input fields
//    $('#equipmentid').val(equipment);
//    $('#quantityid').val(qty);
//    $('#remarksid').val(remark);
//    $('#centerpointid').val(centerpoint);
//    $('#dateid').val(date);
//    $('#equipmentid').prop('disabled', true);
//    $("#equipmentid").trigger('change'); 

//    // Set the row as the one being edited
//    editingRow = row;

//    // Change the button text to "Update"
//    $("#btnaddid").text("Update to List");

//    $('html, body').animate({
//        scrollTop: $("#form-container").offset().top
//    }, 500);
//}
// Disable the dropdown if needed

// Example usage: Call freezeEquipmentDropdown() when a condition is met

//function Addtolist() {
//    var equipment = $('#equipmentid').val();  // Get Equipment List
//    var qty = $('#quantityid').val();  // Get Quantity
//    var remark = $('#remarksid').val();  // Get Remark (Not validated)
//    var centerPoint = $('#centerpointid').val();  // Get Center Point
//    var date = $('#dateid').val();  // Get Date
//    var availabestock = $('#availabestockid').text();
//    $('#equipmentid').prop('disabled', false)
//    // Get Availablestock Name

//    if (qty === '') {
//        Swal.fire({
//            title: "Error!",
//            text: "Quantity Received is Mandatory.",
//            icon: "error",
//            confirmButtonText: "OK"
//        });
//        return;  // Exit function if validation fails
//    }

//    // Validate if quantity is an integer using regex for only digits
//    if (!/^\d+$/.test(qty)) {
//        Swal.fire({
//            title: "Error!",
//            text: "Quantity must be a valid integer.",
//            icon: "error",
//            confirmButtonText: "OK"
//        });
//        return;  // Exit function if validation fails
//    }


//    if (equipment === '' || equipment === '0') {
//        Swal.fire({
//            title: "Error!",
//            text: "Please select Equipment.",
//            icon: "error",
//            confirmButtonText: "OK"
//        });
//        return;
//    }

//    if (centerPoint === '' || centerPoint === '0') {
//        Swal.fire({
//            title: "Error!",
//            text: "Center Point is mandatory.",
//            icon: "error",
//            confirmButtonText: "OK"
//        });
//        return;
//    }

//    if (date === '') {
//        Swal.fire({
//            title: "Error!",
//            text: "Date is mandatory.",
//            icon: "error",
//            confirmButtonText: "OK"
//        });
//        return;
//    }

//    // If editing an existing row, update it
//    if (editingRow) {
//        // Update existing row
//        editingRow.find("td").eq(1).text(equipment);
//        editingRow.find("td").eq(2).text(qty);
//        editingRow.find("td").eq(3).text(remark);

//        // Update hidden data for Center Point and Date
//        editingRow.data("centerPoint", centerPoint);
//        editingRow.data("date", date);

//        // Reset the editingRow to null after updating
//        editingRow = null;

//        // Change the Add button back to Add to List
//        $("#btnaddid").text("Update to List");

//        // Show success message
//        Swal.fire({
//            title: "Success!",
//            text: "Material Updated Successfully!",
//            icon: "success"
//        });
//    } else {
//        // Add new row
//        var row = `
//            <tr>
//                <td>${$("#table-body-id tr").length + 1}</td> <!-- Automatically increment the row number -->
//                <td>${equipment}</td>
//                <td>${qty}</td>
//                <td>${remark}</td>
//                <td style="display:none">${centerPoint}</td>
//                <td style="display:none">${date}</td>
//                <td style="display:none">${availabestock}</td>
//                <td>
//                    <button class="btn btn-danger deleterow">Remove</button>
//                    <button class="btn btn-primary editrow" onclick="editRow(this)">Edit</button>
//                </td>
//            </tr>
//        `;

//        // Append the new row to the table body
//        var $newRow = $(row);
//        $newRow.data("centerPoint", centerPoint);  // Save Center Point as hidden data
//        $newRow.data("date", date);  // Save Date as hidden data

//        $("#table-body-id").append($newRow);

//        // Show success message
//        Swal.fire({
//            title: "Success!",
//            text: "Material Added Successfully!",
//            icon: "success"
//        });
//    }

//    // Reset input fields after adding/updating
//    $("#quantityid").val('');
//    $("#remarksid").val('');
//    $("#availabestockid").text('Please Select Equipment');
//    $("#equipmentid").val(0); 
//    $("#btnaddid").text('Add To List');
//    //$("#centerpointid").val('');  // Reset center point
//    //$("#dateid").val('');  // Reset date
//}



//function Validation() {
//    var msg = "";
//    var charregex = /^[a-zA-Z\s]+$/;
//    var intregex = /^[0-9]+$/;
//    var charintregex = /^[a-zA-Z0-9\s]+$/;


//    $(".mandatory").each(function () {
//        if ($(this).val() == "" || $(this).val() == "0") {
//            var name = $(this).attr('name')

//            msg += "" + name + "  Required !! <br/>";
//        }
//    });

//    $(".checktaxes").each(function () {
//        if ($(this).val() == "") {
//            var name = $(this).attr('name')
//            console.log($(this).val());
//            msg += "" + name + "  Required !!\n";
//        }
//    });
//    $(".chkint").each(function () {
//        if (!intregex.test($(this).val())) {
//            var name = $(this).attr('name')
//            msg += "Enter Valid " + name + "!!\n";
//        }
//    });
//    $(".chkcharint").each(function () {
//        if (!charintregex.test($(this).val())) {
//            var name = $(this).attr('name')
//            msg += "Enter Valid " + name + "!!\n";
//        }
//    });
//    $(".chkchar").each(function () {
//        if (!charregex.test($(this).val())) {
//            var name = $(this).attr('name')
//            msg += "Enter Valid " + name + "!!\n";
//        }
//    });
//    return msg;
//}





//$(document).on('click', 'button.deleterow', function () {
//    Swal.fire({
//        title: 'Are you sure?',
//        text: "You won't be able to revert this!",
//        icon: 'warning',
//        showCancelButton: true,
//        confirmButtonText: 'Yes, remove it!',
//        cancelButtonText: 'Cancel'
//    }).then((result) => {
//        if (result.isConfirmed) {

//            $(this).parents('tr').remove();
//            return false;
//        }
//    });
//});

//function setsrno() {
//    var i = 0;
//    $("#table-body-id TR").each(function () {
//        i++;
//        var row = $(this);
//        row.find('td:eq(0)').html(i);
//    });
//}








//function SaveData() {
//    var data = new Array();

//    // Check if the table has any rows
//    if ($("#tableid tbody tr").length === 0) {
//        Swal.fire({
//            title: 'Error!',
//            text: 'No data available to save. Please add items to the table.',
//            icon: 'error',
//            confirmButtonText: 'OK'
//        });
//        return; // Stop the function if the table is empty
//    }

//    // Loop through each row in the table to collect the data
//    $("#tableid tbody tr").each(function () {
//        var row = $(this);
//        var item = {};

//        // Extract data from the row
//        item.EquipmentList = row.find('td:eq(1)').html();
//        item.QtyReceived = row.find('td:eq(2)').html();
//        item.Remarks = row.find('td:eq(3)').html();
//        item.centerPoint = row.find('td:eq(4)').html();
//        item.date = row.find('td:eq(5)').html();

//        // Push the item data into the array
//        data.push(item);
//    });

//    // Check if the data array is empty (i.e., no rows to submit)
//    if (data.length === 0) {
//        Swal.fire({
//            title: 'Error!',
//            text: 'No data available to save. Please add items to the table.',
//            icon: 'error',
//            confirmButtonText: 'OK'
//        });
//        return; // Stop further execution if no valid data
//    }

//    // If the table has rows, proceed to save the data
//    var newdata = JSON.stringify(data);
//    $.ajax({
//        url: myurl + '/Admin/InsertInventory',
//        data: { data: newdata },
//        type: 'post',
//        success: function (data) {
//            Swal.fire({
//                title: 'Success!',
//                text: data.message, // Assuming `data.message` contains the success message
//                icon: 'success',
//                confirmButtonText: 'OK'
//            }).then(function () {
//                location.reload(); // Reload the page after the success alert is closed
//            });
//        },
//        error: function (xhr, status, error) {
//            // SweetAlert for error
//            Swal.fire({
//                title: 'Error!',
//                text: 'An error occurred while saving the data. Please try again.',
//                icon: 'error',
//                confirmButtonText: 'Try Again'
//            });
//        },
//    });
//}







