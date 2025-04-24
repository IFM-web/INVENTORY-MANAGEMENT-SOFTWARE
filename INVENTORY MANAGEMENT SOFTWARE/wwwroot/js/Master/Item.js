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
        url: myurl + '/Master/showItem',
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
    $("#Item").val('');
}
function SaveData() {
    var itemname = $("#Item").val().trim()

    if (itemname != '') {


        save()
    } else {
        Swal.fire({
            title: 'OOPs !!',
            html: 'Item Name Required !!',
            icon: 'error', // Swal expects icon in lowercase: 'success', 'error', etc.
            confirmButtonText: "OK"
        })
    }
}

function save() {
    $.ajax({
        url: myurl + '/Master/SaveItem',
        type: 'Post',
        data: {
            Id: $("#Hid_Id").val(),
            Item: $("#Item").val().trim(),
            
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
function Delete(Id,ItemName) {
    var val = confirm("Are You Sure To Delete Item")
    if (val) { 
    $.ajax({
        url: myurl + '/Master/DeleteItem',
        type: 'Post',
        data: {
            Id: Id,  
            ItemName: ItemName
            
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
    var Item = $row.find(".ItemName").text();
 
    $("#btnsave").text('Update');

    $("#Hid_Id").val(Id);
    $("#Item").val(Item);
    Show()

}


