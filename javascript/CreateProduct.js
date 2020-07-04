function createProduct()
{
    let name = document.getElementById("name").value;
    let price = document.getElementById("price").value;
    let color = document.getElementById("color").value;
    let product = {
        productName: name,
        productPrice: price,
        productColor: color
    };
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            let st = JSON.parse(this.responseText);  
            alert(st.status);     
            window.location = "http://localhost:8080/feweb/html/index.html";
        }
    }
    xhttp.open("POST","http://localhost:3000/create",true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send(JSON.stringify(product));
}