'use strict';

function Product(name, imagePath) {
    this.name = name;
    this.imagePath = imagePath;
    this.timesShown = 0;
    this.timesSelected = 0;
}

const products = [
    new Product("bag", "img/bag.jpg"),
    new Product("banana", "img/banana.jpg"),
    new Product("bathroom", "img/bathroom.jpg"),
    new Product("boots", "img/boots.jpg"),
    new Product("breakfast", "img/breakfast.jpg"),
    new Product("bubblegum", "img/bubblegum.jpg"),
    new Product("chair", "img/chair.jpg"),
    new Product("cthulhu", "img/cthulhu.jpg"),
    new Product("dog-duck", "img/dog-duck.jpg"),
    new Product("dragon", "img/dragon.jpg"),
    new Product("pen", "img/pen.jpg"),
    new Product("pet-sweep", "img/pet-sweep.jpg"),
    new Product("scissors", "img/scissors.jpg"),
    new Product("shark", "img/shark.jpg"),
    new Product("tauntaun", "img/tauntaun.jpg"),
    new Product("unicorn", "img/unicorn.jpg"),
    new Product("water-can", "img/water-can.jpg"),
    new Product("wine-glass", "img/wine-glass.jpg"),
    new Product("sweep", "img/sweep.png")
];

let previousIndices = [];
let chartInstance;

function generateRandomProducts() {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const img3 = document.getElementById("img3");

    let randomIndices = [];
    while (randomIndices.length < 3) {
        const randomIndex = Math.floor(Math.random() * products.length);
        if (!randomIndices.includes(randomIndex) && !previousIndices.includes(randomIndex)) {
            randomIndices.push(randomIndex);
        }
    }

    previousIndices = randomIndices.slice();

    img1.src = products[randomIndices[0]].imagePath;
    img1.alt = products[randomIndices[0]].name;
    img1.dataset.index = randomIndices[0];
    img1.addEventListener("click", handleProductClick);

    img2.src = products[randomIndices[1]].imagePath;
    img2.alt = products[randomIndices[1]].name;
    img2.dataset.index = randomIndices[1];
    img2.addEventListener("click", handleProductClick);

    img3.src = products[randomIndices[2]].imagePath;
    img3.alt = products[randomIndices[2]].name;
    img3.dataset.index = randomIndices[2];
    img3.addEventListener("click", handleProductClick);

    randomIndices.forEach(index => {
        products[index].timesShown++;
    });
}

function handleProductClick(event) {
    if (roundsLeft > 0) {
        const clickedIndex = parseInt(event.target.dataset.index);
        const clickedProduct = products[clickedIndex];

        clickedProduct.timesSelected++;
        roundsLeft--;

        if (roundsLeft === 0) {
            document.getElementById("mostrarResultados").hidden = false;
            document.getElementById("reset").hidden = false;
        }

        generateRandomProducts();
    }
}

let roundsLeft = 25;

generateRandomProducts();

document.getElementById("mostrarResultados").addEventListener("click", showResults);

function showResults() {
    const resultados = document.getElementById("Resultados");
    resultados.innerHTML = "";

    products.forEach(product => {
        const resultText = `${product.name} tiene ${product.timesSelected} votos, y se ha visto ${product.timesShown} veces.`;
        const resultElement = document.createElement("p");
        resultElement.textContent = resultText;
        resultados.appendChild(resultElement);
    });

    displayChart();
    document.getElementById("mostrarResultados").hidden = true;
    document.getElementById("reset").hidden = false;

    document.getElementById("img1").removeEventListener("click", handleProductClick);
    document.getElementById("img2").removeEventListener("click", handleProductClick);
    document.getElementById("img3").removeEventListener("click", handleProductClick);
}

document.getElementById("reset").addEventListener("click", () => {
    roundsLeft = 25;
    products.forEach(product => {
        product.timesShown = 0;
        product.timesSelected = 0;
    });
    generateRandomProducts();

    const resultados = document.getElementById("Resultados");
    resultados.innerHTML = "";

    document.getElementById("mostrarResultados").hidden = true;
    document.getElementById("reset").hidden = true;

    if (chartInstance) {
        chartInstance.destroy();
    }
});