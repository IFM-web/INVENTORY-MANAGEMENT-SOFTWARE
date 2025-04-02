

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






//function Addtolist() {
//    var CenterPoint = $('#centerpointid').val();
//    var Date = $('#dateid').val(); //
//    var Hub = $('#hubid').val(); //
//    var Client = $("#centerclientid").val();
//    var Brcode = $("#brcodeid").val();
//    var BranchName = $("#branchnameid").val();
//    var BranchAddress = $("#branchaddressid").val();
//    var MaterialName = $('#equipmentid').val();  // Get Equipment List
//    var qtyTransfer = $('#qtyid').val();  // Get Quantity
//    var Remarks = $('#remarksid').val();
//    $('#centerpointid').prop('disabled', false)// Get Remark (Not validated)
//    $('#dateid').prop('disabled', false)// Get Remark (Not validated)
//    $('#hubid').prop('disabled', false)// Get Remark (Not validated)
//    $('#centerclientid').prop('disabled', false)// Get Remark (Not validated)
//    $('#brcodeid').prop('disabled', false)// Get Remark (Not validated)
//    $('#branchnameid').prop('disabled', false)// Get Remark (Not validated)
//    $('#branchaddressid').prop('disabled', false)// Get Remark (Not validated)
//    $('#equipmentid').prop('disabled', false)// Get Remark (Not validated)
// // Get Date
//    var availabestock = $('#availabestockid').text();
//    var msg = Validation();
//    if (msg == '') {
//        if (availabestock > qtyTransfer) {
//            var items = {
//                CenterPoint: $("#centerpointid").val(),
//                Date: $("#dateid").val(),
//                Hub: $("#hubid").val(),
//                Client: $("#centerclientid").val(),
//                Brcode: $("#brcodeid").val(),
//                BranchName: $("#branchnameid").val(),
//                BranchAddress: $("#branchaddressid").val(),
//                MaterialName: $("#equipmentid").val(),
//                qtyTransfer: $("#qtyid").val(),
//                Remarks: $("#remarksid").val(),
//                availabestock: $('#availabestockid').text(),
//            }





//            allitem.push(items);
//            console.log(allitem);
//            Swal.fire({
//                title: "Success!",
//                text: "Material added successfully!",
//                icon: "success"
//            });
//        }
//         else {
//            alert('Not enough available stock to transfer')
//        }

//        //$("#centerpointid").val('');
//        //$("#dateid").val('');
//        //$("#hubid").val(0);
//        //$("#centerclientid").val(0);
//        //$("#brcodeid").val('');
//        $("#branchnameid").val('');
//        $("#branchaddressid").val('');
//        $("#equipmentid").val(0);
//        $("#qtyid").val('');
//        $("#remarksid").val('');
  
//        $("#availabestockid").text('Please Select Equipment');
//        showTable(allitem);
//    }
//    else {
//        Swal.fire({
//            title: "Error!",
//            text: msg,
//            icon: "Error"
//        });
//    }
  
           
    
//}
function validateNoMultipleZeros(input) {
    // Iterate through the input string starting from the second character (index 1)
    for (let i = 1; i < input.length; i++) {
        // Check if current character is '0' and the previous character is also '0'
        if (input[i] === '' && input[i - 1] === '') {
            // Clear the input field and show a message if consecutive zeros are found
            document.getElementById('qtyid').value = ''; // Reset the value to empty
            Swal.fire({
                title: "Error!",
                text: "Quantity must not contain multiple consecutive zeros.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return; // Exit the function after clearing the field and showing the message
        }
    }
}

function Addtolist() {
    // Retrieve form values
    var CenterPoint = $('#centerpointid').val();
    var Date = $('#dateid').val(); //
    var Hub = $('#hubid').val(); //
    var Client = $("#centerclientid").val();
    var Brcode = $("#brcodeid").val();
    var BranchName = $("#branchnameid").val();
    var BranchAddress = $("#branchaddressid").val();
    var MaterialName = $('#equipmentid').val();  // Get Equipment List
    var qtyTransfer = $('#qtyid').val();  // Get Quantity
    var Remarks = $('#remarksid').val();
    $('#centerpointid').prop('disabled', false) // Get Remark (Not validated)
    $('#dateid').prop('disabled', false) // Get Remark (Not validated)
    $('#hubid').prop('disabled', false) // Get Remark (Not validated)
    $('#centerclientid').prop('disabled', false) // Get Remark (Not validated)
    $('#brcodeid').prop('disabled', false) // Get Remark (Not validated)
    $('#branchnameid').prop('disabled', false) // Get Remark (Not validated)
    $('#branchaddressid').prop('disabled', false) // Get Remark (Not validated)
    $('#equipmentid').prop('disabled', false) // Get Rema
    var availabestock = $('#availabestockid').text();  // Get Available Stock

    // Validation check
    var msg = Validation();
    if (msg === '') {
        // Ensure availabestock and qtyTransfer are treated as numbers
        availabestock = parseFloat(availabestock);
        qtyTransfer = parseFloat(qtyTransfer);

        if (availabestock >=qtyTransfer) {

            // Construct the item object
            var items = {
                CenterPoint: $("#centerpointid").val(),
                Date: $("#dateid").val(),
                Hub: $("#hubid").val(),
                Client: $("#centerclientid").val(),
                Brcode: $("#brcodeid").val(),
                BranchName: $("#branchnameid").val(),
                BranchAddress: $("#branchaddressid").val(),
                MaterialName: $("#equipmentid").val(),
                qtyTransfer: $("#qtyid").val(),
                Remarks: $("#remarksid").val(),
                availabestock: $('#availabestockid').text(),
            }

            // Push item to the allitem array
            allitem.push(items);

            // Log all items for debugging
            console.log(allitem);

            // Success message
            Swal.fire({
                title: "Success!",
                text: "Material added successfully!",
                icon: "success"
            });
            //$('#centerpointid').prop('disabled', true) // Get Remark (Not validated)
            //$('#dateid').prop('disabled', true) // Get Remark (Not validated)
            //$('#hubid').prop('disabled', true) // Get Remark (Not validated)
            //$('#centerclientid').prop('disabled', true) // Get Remark (Not validated)
            //$('#brcodeid').prop('disabled', true) // Get Remark (Not validated)
            //$('#branchnameid').prop('disabled', true) // Get Remark (Not validated)
            //$('#branchaddressid').prop('disabled', true) // Get Remark (Not validated)
            $('#equipmentid').val(0);
            $('#equipmentid').trigger('change');
            $("#qtyid").val('');
            $("#remarksid").val('');
            $("#availabestockid").text('Please Select Material');
            $('#centerpointid').prop('disabled', true)// Get Remark (Not validated)
            $('#dateid').prop('disabled', true)// Get Remark (Not validated)
            $('#hubid').prop('disabled', true)// Get Remark (Not validated)
            $('#centerclientid').prop('disabled', true)// Get Remark (Not validated)
            $('#brcodeid').prop('disabled', true)// Get Remark (Not validated)
            $('#branchnameid').prop('disabled', true)// Get Remark (Not validated)
            $('#branchaddressid').prop('disabled', true)// Get Remark (Not validated)
          

// Get Rema
            var availabestock = $('#availabestockid').text();  // 
            $("#btnaddid").text('Add To List');// Reset Available Stock
           
            //$("#remarksid").val('');
            //$("#availabestockid").text('Please Select Equipment');
            //$("#btnaddid").text('Add To List');// Reset Available Stock

            // Refresh the table with updated data
            showTable(allitem);
        } else {
            // Error: Insufficient stock
            Swal.fire({
                title: "Error!",
                text: "Not enough available stock to transfer.",
                icon: "error"
            });
        }
    } else {
        // Show validation errors
        Swal.fire({
            title: "Error!",
            html: msg,  // Display multiple error messages
            icon: "error"
        });
    }
}




function showTable(allitem) {
    if (allitem.length > 0) {
        $("#table-body-id").empty(); // Clear existing rows
        var row = '';
        // Loop through all items and create rows
        for (var i = 0; i < allitem.length; i++) {
            row += `
                <tr>
                    <td>${i + 1}</td>
                    <td>${allitem[i].CenterPoint}</td>   
                    <td>${allitem[i].Date}</td>  
                    <td>${allitem[i].Hub}</td> 
                    <td>${allitem[i].Client}</td> 
                    <td>${allitem[i].Brcode}</td>  
                <td>${allitem[i].BranchName}</td>
                 <td>${allitem[i].BranchAddress}</td>
                    <td>${allitem[i].MaterialName}</td> 
                    <td>${allitem[i].availabestock}</td>
                    <td>${allitem[i].qtyTransfer}</td> 
                    <td>${allitem[i].Remarks}</td> 
                    <td>Request Sent For Approval</td> 
                    <td>
                        <button class='btn btn-danger' onclick="deleteRow('${i}')">
                            Remove
                        </button>
                          <button class="btn btn-primary editrow" onclick="EditRow(${i})">Edit</button>
                   
                          
                    </td>
                </tr>
            `;
        }
        $("#table-body-id").append(row);  // Append rows to the table body
    } else {
        // If no items, hide the table and save button
        $("#table-body-id").empty();
    }
}

// Function to delete a row from the table
function deleteRow(index) {
    allitem.splice(index, 1);
    showTable(allitem);
    if (allitem.length > 0) {
        $('#centerpointid').prop('disabled', true);
        $('#dateid').prop('disabled', true);
        $('#brcodeid').prop('disabled', true);
        $('#branchnameid').prop('disabled', true);
        $('#branchaddressid').prop('disabled', true);
        $('#hubid').prop('disabled', true);
        
    }
    // If no items are left, clear the fields and enable the dropdowns
    else {
        $('#qtyid').val('');
        $('#remarksid').val('');
        $('#equipmentid').val(0);
        $('#centerpointid').prop('disabled', false);
        $('#brcodeid').prop('disabled', false)
        $('#brcodeid').val('');
        $('#branchnameid').prop('disabled', false);
        $('#branchnameid').val('');
        $('#branchaddressid').prop('disabled', false);
        $('#branchaddressid').val('');
        $('#dateid').prop('disabled', false);
        $('#hubid').prop('disabled', false);
        $('#centerclientid').prop('disabled', false);
        $('#equipmentid').trigger('change');
    }
} 
 
function EditRow(index) {
    // Get the item from allitem array at the given index
    var arr = allitem[index];

    // Populate the form fields with the item data
    $("#centerpointid").val(arr.CenterPoint);
    $("#dateid").val(arr.Date);
    $("#hubid").val(arr.Hub);
    $("#centerclientid").val(arr.Client);
    $("#brcodeid").val(arr.Brcode);
    $("#branchnameid").val(arr.BranchName);
    $("#branchaddressid").val(arr.BranchAddress);
    $("#equipmentid").val(arr.MaterialName);
    $("#qtyid").val(arr.qtyTransfer);
    $("#remarksid").val(arr.Remarks);
    $("#availabestockid").text(arr.availabestock);
    $('#centerpointid').prop('disabled', true)// Get Remark (Not validated)
    $('#dateid').prop('disabled', true)// Get Remark (Not validated)
    $('#hubid').prop('disabled', true)// Get Remark (Not validated)
    $('#centerclientid').prop('disabled', true)// Get Remark (Not validated)
    $('#brcodeid').prop('disabled', true)// Get Remark (Not validated)
    $('#branchnameid').prop('disabled', true)// Get Remark (Not validated)
    $('#branchaddressid').prop('disabled', true)// Get Remark (Not validated)
    $('#equipmentid').prop('disabled', true)// Get Remark

    // Change the button text to "Update Material List"
    $("#btnaddid").text('Update Material List');

    // Remove the item from the allitem array so that it can be updated
    allitem.splice(index, 1);

    // Re-render the table after removing the item
    showTable(allitem);
    $('#equipmentid').trigger('change');

  
}




//function SaveData() {
//    var newdata = JSON.stringify(allitem);
//    $.ajax({
//        url: myurl + '/Admin/InsertMaterialOut',
//        data: { data: newdata, ticketId: $("#tickitnoid").val() },
//        type: 'post',

//        success: function (data) {
//            // SweetAlert for success
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
//                text: status,
//                icon: 'error',
//                confirmButtonText: 'Try Again'
//            });
//        },
//    });
//}
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
        url: myurl + '/Admin/InsertMaterialOut',
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


//$("#brcodeid").keyup(function (event) {
//    if (event.keyCode === 13) {
//        fetchBranchDetails();
//    }
//});

document.getElementById("brcodeid").addEventListener("keydown", function (event) {
    if (event.key === "Tab" || event.keyCode === 9) {
        console.log("Tab key pressed!");
        event.preventDefault();
        fetchBranchDetails();
    }
    $('#centerclientid').on('change', function () {
        $('#brcodeid').val('');
        $('#branchnameid').val('');
        $('#branchaddressid').val('');
    });
});




function fetchBranchDetails() {
    var  brcodeid=$('#brcodeid').val();
    var centerclientid = $('#centerclientid').val();
    $.ajax({
        url: myurl + '/Admin/BindBranchDetail',
        type: 'post',
        data: {
            brcodeid: brcodeid, centerclientid: centerclientid
        },
        success: function (data) {

            // If 'data' is a string, parse it; otherwise, it's already a JSON object.
            var data = typeof data === 'string' ? JSON.parse(data) : data;

            // Check if the data array is not empty and has the expected fields
            if (data.length > 0) {

                $('#branchnameid').val(data[0].Branch_Name); // Set Branch Name
                $('#branchaddressid').val(data[0].Branch_Address); // Set Branch Address
            } else {
                // SweetAlert if no data is found
                Swal.fire({
                    title: 'Error!',
                    text: 'No data found for the given BR code.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        },

        error: function (error) {
            // SweetAlert for error loading data
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while loading branch data.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        }
    });
}

function addEquipment(equipmentid) {
    // Ensure equipmentid is valid before making the request
    if (!equipmentid || equipmentid <= 0) {
        console.log("Invalid equipment ID");
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

