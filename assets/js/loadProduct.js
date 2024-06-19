function loadProduct(productId){
    if(!productId){
        console.log("sem id");
        var productScreenBg = document.getElementById("productScreenBg");
        productScreenBg.classList.add("show");
        var loadingScreen = document.getElementById("loadingScreen");

        var productTitle = document.getElementById("productTitle");
        var idDesc = document.getElementById("productId");
        var productDepartamento = document.getElementById("productDepartamento");
        var productTipo = document.getElementById("productTipo");
        var productSexo = document.getElementById("productSexo");
        var productValue = document.getElementById("productValue");
        var productPreviousValue = document.getElementById("productPreviousValue");
        var saveButtonContainer = document.getElementById("saveButtonContainer");

        productValue.value = "R$ 0,00";
        productPreviousValue.value = "R$ 0,00";
        productTitle.value = "";
        productDepartamento.innerHTML = `
        <option value="">--Selecione--</option>
        <option value="Roupa">Roupa</option>
        <option value="Calçado">Calçado</option>
        `;
        productTipo.innerHTML = `
        <option value="">--Selecione--</option>
        <option value="Regata">Regata</option>
        <option value="Camisa">Camisa</option>
        `;
        productSexo.innerHTML = `
        <option value="">--Selecione--</option>
        <option value="">Masculino</option>
        <option value="">Feminino</option>
        `;

          saveButtonContainer.innerHTML = `<div id="saveButton" onclick="saveProduct();">SALVAR</div>`


        idDesc.textContent = "# Novo Produto"
        loadingScreen.classList.remove("show");
    }else{
    
    
    
    data = {
        "query": `SELECT * FROM products WHERE id='${productId}' ORDER BY id`,
        "img": 1
    }
    var loadingScreen = document.getElementById("loadingScreen");
    if(!loadingScreen.classList.contains("show")){
        loadingScreen.classList.add("show");
    }
    var productScreenBg = document.getElementById("productScreenBg");

    productScreenBg.classList.add("show");
        
    console.log("aqui");
    
    fetch("scripts/getProducts.php", {method:"POST", headers: {'Content-type':'application/json'}, body: JSON.stringify(data)})
        .then(function(response){
            
            return response.json();
        })

        .then(function(product){

            var loadingScreen = document.getElementById("loadingScreen");
            var productTitle = document.getElementById("productTitle");
            var productId = document.getElementById("productId");
            var productDepartamento = document.getElementById("productDepartamento");
            var productTipo = document.getElementById("productTipo");
            var productSexo = document.getElementById("productSexo");
            var saveButtonContainer = document.getElementById("saveButtonContainer");
            var productValue = document.getElementById("productValue");
            var productPreviousValue = document.getElementById("productPreviousValue");
            var productPreviousValue = document.getElementById("productPreviousValue");
            var picturesDisplay = document.getElementById("picturesDisplay");
            



            
            
            
            
            
            
            saveButtonContainer.innerHTML = `<div id="saveButton" onclick="saveProduct(${product.id})">SALVAR</div>`
            
            productSexo.innerHTML =
            `
            <option value="${product.sexo}">${product.sexo}</option>`;
            
            productTipo.innerHTML = 
            `
            <option value="${product.tipo}">${product.tipo}</option>
            `;
            
            productDepartamento.innerHTML = 
            `
            <option value="${product.departamento}">${product.departamento}</option>
            `;
            
            picturesDisplay.innerHTML= "";
            
            
            if('image' in product){
                
                product.image.forEach(image => {
                    picturesDisplay.innerHTML += 
                    `
                    <div class="pictures-container">
                        <img src="${image.path}" alt="image_${image.nome}">
                    </div>
                    `;
                });
    
                picturesDisplay.innerHTML += 
                `
                <div class="add-picture">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                </div>
                `;
            }else{
                picturesDisplay.innerHTML += 
                `
                <div class="add-picture">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor" class="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"/>
                    </svg>
                </div>
                `;
            }



            
            
            productId.textContent = `Product ID: #${product.id}`;
            productTitle.value = product.titulo;
            productValue.value = convertNumber(product.valor); 
            productPreviousValue.value = convertNumber(product.valor_anterior);
            

            loadingScreen.classList.remove("show");
        })

    }
}

function convertNumber (number){
    
    number = Number(number).toFixed(2);
    number = "R$ " + number.slice(0, -3) + "," + number.slice(-2);
    return number;

}