function getProducts(){
 var loadingBarContainer = document.getElementById("loadingBarContainer");
 loadingBarContainer.classList.add("show");
 getFilterValue();

fetch("scripts/getProducts.php")
    .then(function(response){
        return response.json();
    })

    .then(function(products){
        console.log(products);
        
        var list = document.getElementById("list-body");
        list.innerHTML = "";
        products.forEach(product => {
            list.innerHTML += 
            `
            <div class="list-row" ondblclick="loadProduct(${product.id});">
                <div class="row-container"><span>${product.id}</span></div>
                <div class="row-container"><span>${product.titulo}</span></div>
                <div class="row-container"><span>${product.departamento}</span></div>
                <div class="row-container"><span>${product.tipo}</span></div>
                <div class="row-container"><span>${convertNumber(product.valor)}</span></div>
                <div class="row-container"><span>${product.status}</span></div>
                <div class="row-container right">
                    <svg onclick="deleteProduct(${product.id});" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                      <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                      <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </div>
            </div>
            `
        });
        
        var loadingBarContainer = document.getElementById("loadingBarContainer");
        loadingBarContainer.classList.remove("show");
    })


    .catch(error => {
        console.log(error);
        var loadingBarContainer = document.getElementById("loadingBarContainer");
        loadingBarContainer.classList.remove("show");
        var list = document.getElementById("list-body");
        list.innerHTML = "";

    });


}

getProducts();


function getFilterValue(){
    var filterTitle = document.getElementById("filterTitle").value;
    var filterDepartamento = document.getElementById("filterDepartamento").value;
    var filterTipo = document.getElementById("filterTipo").value;
    var filterStatus = document.getElementById("filterStatus").value;

    var filterTitleText = "";
    var filterDepartamentoText = "";
    var filterTipoText = "";
    var filterStatusText = "";


    if(filterTitle != ""){
        filterTitleText = `titulo LIKE '%${filterTitle}%' AND `;
    }
   

    if(filterDepartamento != ""){
        
        filterDepartamentoText = `departamento='${filterDepartamento}' AND `;
        
    }

    if(filterTipo != ""){
        
        filterTipoText = `tipo='${filterTipo}' AND `;
        
    }

    if(filterStatus != ""){
        
        filterStatusText = `status='${filterStatus}' AND `;
        
    }








    var query = "SELECT * FROM products WHERE ";

    var final = "deletado=0 ORDER BY id DESC"
        
   


    query = query + filterTitleText + filterDepartamentoText + filterTipoText + filterStatusText + final;


    console.log(query);


    var data = {
        "query" : query
    }

    fetch("scripts/setLastQuery.php", {method:"POST", headers: {'Content-type':'application/json'}, body: JSON.stringify(data)})
        .then(function(response){
            return response.json();
        })

        .then(function(response){
            console.log(response);
        })

}