window.onload = function()
{
    let url = (window.location.href).toLocaleLowerCase();
    let url_ = new URL(url);
    let productID = url_.searchParams.get("id");
    loadDataToUpdate(productID);
}

function loadDataToUpdate(id)
{
    //update
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            let res = JSON.parse(this.responseText);
            let html = 
            '<input id="newname" value="' + res[0].name +'" placeholder="Name" name="productName" type="text"></input>' +
            '<input id="newprice" value="' + res[0].price +'" placeholder="Price" name="productPrice" type="text"></input>'+
            '<input id="newcolor" value="' + res[0].color +'" placeholder="Color" name="productColor" type="text"></input>'+
            '<p> ID: '+ res[0].id +'</p>'+
            '<button onclick="update(this)" value="' + res[0].id +'" name="update">Update</button>';
            $(document).ready(function()
            {
                $(html).appendTo('#update');
            });
        }
    }
    xhttp.open("GET","http://localhost:3000/getDataToUpdate/"+id,true);
    xhttp.send();
}

function update(elements)
{
    let id = elements.value;
    let newName = document.getElementById("newname").value;
    let newPrice = document.getElementById("newprice").value;
    let newColor = document.getElementById("newcolor").value;
    
    let newProduct ={
        name:newName,
        price:newPrice,
        color:newColor,
        id:id 
    };
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function ()
    {
        if(this.readyState == 4 && this.status == 200)
        {
            let res = JSON.parse(this.responseText);
            if(res.status === "Update Done")
            {
                alert(res.status);     
                window.location = "http://localhost:8080/feweb/html/index.html";
            }
        }
    }
    xhttp.open("PUT","http://localhost:3000/updateProduct",true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(newProduct));
}