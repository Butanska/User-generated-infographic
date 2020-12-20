    //Get Dino data from JSON
const getDinoData = async () => {
    const fetchedData = await fetch("./dino.json");
    const data = await fetchedData.json();
    return data.Dinos;
  };

    // Create Dino Constructor

function DinoConstructor([species, weight, height, diet, where, when, fact]) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
    this.image = encodeURI ('images/' +species.toLowerCase()+ '.png');
    };

    // Create Dino Objects

const dinosArray = [];

getDinoData().then(data => {
    const dinos = data;
        
    dinos.forEach((dino) => {
        const dinoObj = new DinoConstructor([dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact]);
        dinosArray.push(dinoObj);
      });
      
    console.log (dinosArray);
    
    console.log(dinos);

    }).catch(error => {
      console.error(error);
    });

    // Create Human Object

const human = {
    image:'images/human.png',
    species: 'Human'
};

    //Convert human height to inches:

function heightConverter(heightFeet) {
    human.height= Number(heightFeet*12) + Number(human.inches);
    };


// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', (event)=>{
    // Use IIFE to get human data from form
    (function getHumanData (e) {
        human.name = document.getElementById('name').value,
        human.feet = document.getElementById('feet').value,
        human.inches = document.getElementById('inches').value,
        human.weight = parseInt(document.getElementById('weight').value),
        human.diet = document.getElementById('diet').value.toLowerCase(),
        heightConverter(human.feet)
    })();

    dinosArray.forEach((dino) => {
        // console.log(dino.relativeHeight(human));
        dino.heightFact = dino.relativeHeight(human);
        dino.weightFact = dino.compareWeight(human);
        dino.dietFact = dino.compareDiet(human);
        dino.where = `The ${dino.species} lived in ${dino.where}.`;
        dino.when = `The ${dino.species} lived in the ${dino.when}.`
      });

    const dinosArrayOne = dinosArray.slice (0,4);
    const dinosArrayTwo = dinosArray.slice (4,8);
    const allSpeciesArray = dinosArrayOne.concat(human, dinosArrayTwo);
    console.log(allSpeciesArray);

    // Add tiles to DOM

    allSpeciesArray.forEach((item) =>{
        if(item.species==='Human') {
            createHumanTile(item);
        } else if (item.species==='Pigeon') {
            createPigeonTile(item);
        } 
        else {
            createTiles(item);
        }
    });

    removeForm();
});


    // Create Dino Compare Method 1: Height
    // NOTE: Weight in JSON file is in lbs, height in inches. 

  DinoConstructor.prototype.relativeHeight = function () {
    const humanHeight = human.height;
    const dinoHeight = this.height;
    if (humanHeight > dinoHeight) {
        return `${this.species} was shorter than you! It was ${this.height} inches tall.`
    } else if (humanHeight < dinoHeight) {
        return `${this.species} was taller than you! It was ${this.weight} inches tall.`
    } else if (humanHeight == dinoHeight) {
        return `${this.species} was exactly as tall as you are! Wow, you are a real ${this.species}!`
    } else {
        return `If you share how tall you are, we can tell you how you compare to our dinos.`
    }
};

    // Create Dino Compare Method 2: Weight
    // NOTE: Weight in JSON file is in lbs, height in inches.

DinoConstructor.prototype.compareWeight = function () {
    const humanWeight = human.weight;
    const dinoWeight = this.weight;
    if (humanWeight > dinoWeight) {
        return `${this.species} was lighter than you! It weighed ${this.weight} lbs.`
    } else if (humanWeight < dinoWeight) {
        return `${this.species} was heavier than you! It weighed ${this.weight} lbs.`
    } else if (humanWeight == dinoWeight) {
        return `${this.species} weighed exactly as much as you! Wow, you are a real ${this.species}!`
    } else {
        return `If you share how much you weigh, we can tell you how you compare to our dinos.`
    }
};
    
    // Create Dino Compare Method 3: Diet
    // NOTE: Weight in JSON file is in lbs, height in inches.

DinoConstructor.prototype.compareDiet = function () {
    const humanDiet = human.diet;
    const dinoDiet = this.diet;
    if (humanDiet === dinoDiet) {
        return `${this.species} had the same diet as you! You are both ${human.diet}.`
    } else {
        return `Unlike you, ${this.species} was a ${this.diet}.`
        }
};

    // Generate Tiles for each Dino in Array

const infographic = document.querySelector('main');

const createTiles = function (dino) {
    const newTile = document.createElement('div');
    newTile.classList.add('grid-item');
    newTile.innerHTML = `<h3>${dino.species}</h3> 
    <img src= ${dino.image}>`;
    const fact = randomProperty(dino);
    newTile.innerHTML += `<p>${fact}</p>`
    infographic.appendChild(newTile);
};

const createHumanTile = function (human) {
    const newTile = document.createElement('div');
    newTile.classList.add('grid-item');
    newTile.innerHTML = `<h3>${human.name}</h3> 
    <img src= ${human.image}>`;
    infographic.appendChild(newTile);
};

const createPigeonTile = function (pigeon) {
    const newTile = document.createElement('div');
    newTile.classList.add('grid-item');
    newTile.innerHTML = `<h3>${pigeon.species}</h3> 
    <img src= ${pigeon.image}>`;
    newTile.innerHTML += `<p>${pigeon.fact}</p>` 
    infographic.appendChild(newTile);
};

    // Remove form from screen

const dataForm = document.querySelector('#dino-compare');
function removeForm() {
    dataForm.style.display = "none";
  };


//Select random Dino fact to display

const randomProperty = function (obj) {
    const keys = Object.keys(obj);
    delete obj.image; 
    delete obj.species;
    console.log(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
};


