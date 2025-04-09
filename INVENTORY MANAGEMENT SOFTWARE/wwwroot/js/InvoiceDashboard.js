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
    ShowData();
})

function BindState(Id) {
    $('#State').val(0)
    $('#District').val(0)
    $.ajax({
        url: myurl + '/Home/Bindstate',
        type: "post",
        data: { Id: Id },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#State');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].Id).text(data[i].Name));
            }
        },
        error: (err) => {
           // alert(err)
        }
    })


};


function Binddistrict() {

    $.ajax({
        url: myurl + '/Home/Binddistrict',
        type: "post",
        data: { Id: $("#State").val(), marrialname: $("#materialName option:selected").text(), },
        success: function (data) {
            var data = JSON.parse(data);

            var dropdown = $('#District');
            dropdown.empty();
            dropdown.append($('<option></option>').attr('value', 0).text('Select'));
            for (var i = 0; i < data.length; i++) {

                dropdown.append($('<option></option>').attr('value', data[i].Id).text(data[i].Name));
            }
        },
        error: (err) => {
            alert(err)
        }
    })


};


function ShowData() {
    $("#loader").removeClass("d-none")

    $.ajax({
        url: myurl + '/Home/getInvoiceDashboard',
        type: "post",
        data: { materialName: $("#materialName option:selected").text(), State: $("#State").val(), District: $("#District").val(), formdate: $("#fromdate").val(), todate: $("#Todate").val() },
        success: function (data) {

            $("#loader").addClass("d-none")
            var data = JSON.parse(data);
            if (data.length != 0) {



                CreateTableFromArray(data, "itemsTable")


            }
            else {
                $("#itemsTable tbody").html(`<tr><td colspan="3" class="text-center text-danger"><h4>Record Not Found<h4></td></tr>`);
            }

        },
        error: (err) => {
            $("#loader").addClass("d-none")
            alert(err)
        }
    })
}
