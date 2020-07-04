function deleteProduct(elements,div)
{
  let button = elements.value;
  let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
      if(this.readyState == 4 && this.status==200)
      {
        let arr = JSON.parse(this.responseText);
        let id = "id"+div;
        document.getElementById(id).remove();
        console.log(arr.status);
      }
    };
    xhttp.open("delete","http://localhost:3000/delete/"+button,true);
    xhttp.send();
}

function update(elements)
{
  window.location = "http://localhost:8080/feweb/html/update.html?id="+elements.value;
}

function homePageLoader() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          let data = JSON.parse(this.responseText);
          let html = "";
          for(var i =0;i<data.length;i++)
          {
            html += '<div id="id'+ i +'" class="list-product">'+
            '<h1> Product Name:' + data[i].name + '</h1>'+
            '<h2> Product Price:'+ data[i].price + '</h2>'+
            '<h3> Product Color:' + data[i].color +  '</h3>'+
            '<h4> Product ID: ' + data[i].id + '</h4>' +
            '<button onclick="deleteProduct(this,'+i+')" class="delete" value="'+ data[i].id +'">Delete</button>'+
            '<button onclick="update(this)" value="' + data[i].id + '">Update</button>'+
            '<p>--------------------------------------------</p>'+
            '</div>';
          }
          $(document).ready(function()
          {
              $(html).appendTo('#product');
          });
    }
  };
  xhttp.open("GET", "http://localhost:3000/getDataProduct", true);
  xhttp.send();
}

// $('#HouseList').empty();