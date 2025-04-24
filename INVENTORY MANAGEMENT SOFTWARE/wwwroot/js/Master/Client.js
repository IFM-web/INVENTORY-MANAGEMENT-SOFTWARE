function getURL() {
    const hostname = window.location.hostname;
    if (hostname == "localhost") {
        return '';
    }
    else {
        return '/Inventory';
    }

};

var myurl = getURL();

$(document).ready(() => {
    showdata()
})


function showdata() {
    $.ajax({
        url: myurl + '/Master/showClint',
        type: 'get',
        data: {},
        success: (data) => {

            var data = JSON.parse(data);

            CreateTableFromArray(data, 'printdiv');
         
       



        },
        error: (err) => {
            alert(err);
        }



    });
}

function Show() {
    $("#DivHead").removeClass('d-none')
    $("#footdiv").addClass('d-none')
}


function ShowList() {
    $("#DivHead").addClass('d-none')
    $("#footdiv").removeClass('d-none')

    $("#btnsave").text('Submit');

    $("#Hid_Id").val(0);
    $("#Cliet").val('');
    $("#BrCode").val('');
    $("#BrCode").prop("disabled", false);
    $("#BranchName").val('');
    $("#BranchAddress").val('');
    $("#State").val('');
    $("#District").val('');
}
function SaveData() {
    var val = Validation();
    if (val == '') {
        save()
    } else {
        Swal.fire({
            title: "Error!",
            html: val,
            icon: "error",
            confirmButtonText: "OK"
        });
    }
   
}

function save() {
    $.ajax({
        url: myurl + '/Master/SaveClint',
        type: 'Post',
        data: {
            Id: $("#Hid_Id").val(),
            Cliet: $("#Cliet").val(),
            BrCode: $("#BrCode").val(),
            BranchName: $("#BranchName").val(),
            BranchAddress: $("#BranchAddress").val(),
            State: $("#State").val(),
            District: $("#District").val(),

            },
        success: (data) => {

            var data = JSON.parse(data);
            
            Swal.fire({
                title: data[0].status,
                html: data[0].Message,
                icon: data[0].status.toLowerCase(), // Swal expects icon in lowercase: 'success', 'error', etc.
                confirmButtonText: "OK"
            }).then((result) => {
                if (data[0].status === 'Success' && result.isConfirmed) {
                    window.location.reload();
                }
            });
            console.log(data);
            




        },
        error: (err) => {
            alert(err);
        }



    });
}

function Edit(row) {
    var $row = $(row);

    var Id = $row.find(".Hid_Id").text();    
    var client = $row.find(".Client").text();   
    var brCode = $row.find("td:eq(3)").text();         
    var branchName = $row.find("td:eq(4)").text();      
    var branchAddress = $row.find("td:eq(5)").text();   
    var state = $row.find("td:eq(6)").text();          
    var district = $row.find("td:eq(7)").text();
    $("#btnsave").text('Update');

    $("#Hid_Id").val(Id);
    $("#Cliet").val(client);
    $("#BrCode").val(brCode);
    $("#Cliet").prop("disabled",true);
    $("#BrCode").prop("disabled",true);
    $("#BranchName").val(branchName);
    $("#BranchAddress").val(branchAddress);
    $("#State").val(state);
    $("#District").val(district);
    Show()
}


function Delete(Id,Client) {
    var val = confirm("Are You Sure To Delete Client")
    if (val) {
        $.ajax({
            url: myurl + '/Master/DeleteClient',
            type: 'Post',
            data: {
                Id: Id,
                Client: Client

            },
            success: (data) => {

                var data = JSON.parse(data);
                Swal.fire({
                    title: data[0].status,
                    html: data[0].Message,
                    icon: data[0].status.toLowerCase(), 
                    confirmButtonText: "OK"
                }).then((result) => {
                    if (data[0].status === 'Success' && result.isConfirmed) {
                        window.location.reload();
                    }
                });





            },
            error: (err) => {
                alert(err);
            }



        });
    }
}



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

    if ($("#BrCode").val().length > 8) {
        msg += "Br Code Must be Less than 8 digits!!\n";
    }
    return msg;
}