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
        url: myurl + '/Master/showUser',
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
    $("#UserId").val('');
    $("#UserName").val('');
    $("#Password").val('');
}
function SaveData() {
  

    var val = Validation();
    if (val == '') {
        save()
    
    } else {
        Swal.fire({
            title: 'OOPs !!',
            html: val,
            icon: 'error', // Swal expects icon in lowercase: 'success', 'error', etc.
            confirmButtonText: "OK"
        })
    }
}

function save() {
    $.ajax({
        url: myurl + '/Master/SaveUser',
        type: 'Post',
        data: {
            Id: $("#Hid_Id").val(),
            UserId: $("#UserId").val().trim(),
            UserName: $("#UserName").val().trim(),
            Password: $("#Password").val().trim(),

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
function Delete(Id) {
    var val = confirm("Are You Sure To Delete Item")
    if (val) {
        $.ajax({
            url: myurl + '/Master/DeleteUser',
            type: 'Post',
            data: {
                Id: Id,

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
}

function Edit(row) {
    var $row = $(row);

    var Id = $row.find(".Hid_Id").text();
    var UserId = $row.find(".UserId").text();
    var UserName = $row.find(".UserName").text();
    var Password = $row.find(".Password").text();

    $("#btnsave").text('Update');

    $("#Hid_Id").val(Id);
    $("#UserId").val(UserId);
    $("#UserName").val(UserName);
    $("#Password").val(Password);
    Show()

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

   
    return msg;
}