

function DataInsert() {
    // Get values from the input fields
    var equipmentid = $('#equipmentid').val();  // Get Equipment List
    var quantityid = $('#quantityid').val();  // Get Quantity

    // Check if the required fields are filled
    if (equipmentid && quantityid) {
        // Perform the AJAX request
        $.ajax({
            url: '/Admin/InsertAvailableStock',  // Specify the correct API endpoint URL
            type: 'POST',  // Set the HTTP request method to POST
            data: {
                equipmentid: equipmentid,  // Send the equipmentid
                quantityid: quantityid     // Send the quantityid
            },
            success: function (response) {
                // Handle the success response
                Swal.fire({
                    title: 'Success!',
                    text: 'Data Inserted Successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                // Optionally, you can reload the page or reset the form here
            },
            error: function (xhr, status, error) {
                // Handle the error response
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while inserting the data. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'Try Again'
                });
            }
        });
    } else {
        // If the fields are empty, show an error message
        Swal.fire({
            title: 'Error!',
            text: 'Please fill in all required fields.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
}











var editingRow = null;

function AddData() {
    var equipment = $('#equipmentid').val();  // Get Equipment List
    var qty = $('#quantityid').val();  // Get Quantity

    // Validation to ensure quantity is provided
    if (qty != '') {
        if (editingRow) {
            // Update existing row
            editingRow.find("td").eq(1).text(equipment);
            editingRow.find("td").eq(2).text(qty);

            // Reset editingRow to null after updating
            editingRow = null;

            // Change the Add button text back to "Add Data"
            $("#addtolistbtn").text("Add Data");

            // Show success message
            Swal.fire({
                title: "Success!",
                text: "Item Updated Successfully!",
                icon: "success"
            });
        } else {
            // Add new row
            var row = ` 
                <tr>
                    <td>${$("#table-body-idd tr").length + 1}</td> <!-- Automatically increment row number -->
                    <td>${equipment}</td>
                    <td>${qty}</td>
                    <td>
                        <button class="btn btn-danger deleterow" onclick="deleteRow(this)">Remove</button>
                        <button class="btn btn-primary editrow" onclick="editRow(this)">Edit</button>
                    </td>
                </tr>
            `;

            // Append the new row to the table body
            var $newRow = $(row);
            $("#table-body-idd").append($newRow);

            // Show success message
            Swal.fire({
                title: "Success!",
                text: "Item Added Successfully!",
                icon: "success"
            });
        }

        // Reset input fields
        $("#quantityid").val('');
        $("#availabestockid").text('Please Select Equipment');
        $("#equipmentid").val(0);
        $("#centerpointid").val(0);
        $("#dateid").val(0);
    } else {
        // If quantity is empty, show an error message
        Swal.fire({
            title: "Error!",
            text: "Quantity Received is Mandatory.",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
}

// Function to edit a row
function editRow(button) {
    // Get the row being edited
    var row = $(button).closest('tr');

    // Fill the form with the data from the selected row
    var equipment = row.find("td").eq(1).text();
    var qty = row.find("td").eq(2).text();

    // Populate the input fields with the row data
    $('#equipmentid').val(equipment);
    $('#quantityid').val(qty);

    // Trigger change event for equipment field if necessary
    $("#equipmentid").trigger('change');

    // Set the row as the one being edited
    editingRow = row;

    // Change the Add button text to "Update"
    $("#addtolistbtn").text("Update");

    // Scroll the page to the form section
    $('html, body').animate({
        scrollTop: $("#form-container").offset().top
    }, 500);
}

// Function to delete a row
function deleteRow(button) {
    var row = $(button).closest('tr');
    row.remove();  // Remove the row from the table
    updateRowNumbers();  // Recalculate row numbers after deletion
}

// Function to update row numbers
function updateRowNumbers() {
    $("#table-body-idd tr").each(function (index) {
        $(this).find("td:eq(0)").text(index + 1); // Update the row number (first cell)
    });
}



function SaveData() {
    var data = new Array();

    // Check if the table has any rows
    if ($("#tableid tbody tr").length === 0) {
        Swal.fire({
            title: 'Error!',
            text: 'No data available to save. Please add items to the table.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return; // Stop the function if the table is empty
    }

    // Loop through each row in the table to collect the data
    $("#tableid tbody tr").each(function () {
        var row = $(this);
        var item = {};

        // Extract data from the row
        item.EquipmentList = row.find('td:eq(1)').html();
        item.QtyReceived = row.find('td:eq(2)').html();
 
     

        // Push the item data into the array
        data.push(item);
    });

    // Check if the data array is empty (i.e., no rows to submit)
    if (data.length === 0) {
        Swal.fire({
            title: 'Error!',
            text: 'No data available to save. Please add items to the table.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return; // Stop further execution if no valid data
    }

    // If the table has rows, proceed to save the data
    var newdata = JSON.stringify(data);
    $.ajax({
        url: myurl + '/Admin/InsertInventory',
        data: { data: newdata },
        type: 'post',
        success: function (data) {
            Swal.fire({
                title: 'Success!',
                text: data.message, // Assuming `data.message` contains the success message
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(function () {
                location.reload(); // Reload the page after the success alert is closed
            });
        },
        error: function (xhr, status, error) {
            // SweetAlert for error
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while saving the data. Please try again.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        },
    });
}