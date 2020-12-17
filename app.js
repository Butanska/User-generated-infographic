    //Get Dino data from JSON
const getDinoData = async () => {
    const fetchedData = await fetch("./dino.json");
    const data = await fetchedData.json();
    // console.log(data.Dinos[0].fact);
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
    this.image = 'images/' +species.toLowerCase()+ '.png';
    };


    // Create Dino Objects

const dinosArray = [];

getDinoData().then(data => {
    const dinos = data;
        
    dinos.forEach((dino) => {
        const dinoObj = new DinoConstructor([dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact]);
        dinosArray.push(dinoObj);
      });
      
    console.log (dinosArray[0]);
    
    console.log(dinos);

    }).catch(error => {
      console.error(error);
    });

// console.log (dinosArray);
// console.log (dinosArray[0]);

    // Create Human Object

const human = {
    image:'images/human.png'
};

    //Convert human height to inches:

function heightConverter(heightFeet) {
    human.height= Number(heightFeet*12) + Number(human.inches);
    };

    // Use IIFE to get human data from form

document.getElementById('btn').addEventListener('click', (event)=>{
    (function getHumanData (e) {
        human.name = document.getElementById('name').value,
        human.feet = document.getElementById('feet').value,
        human.inches = document.getElementById('inches').value,
        human.weight = parseInt(document.getElementById('weight').value),
        human.diet = document.getElementById('diet').value.toLowerCase(),
        heightConverter(human.feet)
    })();
    console.log(human);

    dinosArray.forEach((dino) => {
        console.log(dino.relativeHeight(human));
        dino.heightFact = dino.relativeHeight(human);
      });
});


    // Create Dino Compare Method 1: Height
    // NOTE: Weight in JSON file is in lbs, height in inches. 

  DinoConstructor.prototype.relativeHeight = function () {
    const humanHeight = human.height;
    const dinoHeight = this.height;
    if (humanHeight > dinoHeight) {
        console.log (`${this.species} was shorter than you! It was ${this.height} tall.`)
    } else if (humanHeight < dinoHeight) {
        console.log (`${this.species} was taller than you! It was ${this.weight} tall.`)
    } else if (humanHeight == dinoHeight) {
        console.log (`${this.species} was exactly as tall as you are! Wow, you are a real ${this.species}!`)
    } else {
        console.log (`If you share how tall you are, we can tell you how you compare to our dinos.`)
    }
};


    // Create Dino Compare Method 2: Weight
    // NOTE: Weight in JSON file is in lbs, height in inches.

DinoConstructor.prototype.compareWeight = function () {
    const humanWeight = human.weight;
    const dinoWeight = this.weight;
    if (humanWeight > dinoWeight) {
        console.log (`${this.species} was lighter than you! It weighed ${this.weight}.`)
    } else if (humanWeight < dinoWeight) {
        console.log (`${this.species} was heavier than you! It weighed ${this.weight}.`)
    } else if (humanWeight == dinoWeight) {
        console.log (`${this.species} weighed exactly as much as you! Wow, you are a real ${this.species}!`)
    } else {
        console.log (`If you share how much you weigh, we can tell you how you compare to our dinos.`)
    }
};
    
    // Create Dino Compare Method 3: Diet
    // NOTE: Weight in JSON file is in lbs, height in inches.

DinoConstructor.prototype.compareDiet = function () {
    const humanDiet = human.diet;
    const dinoDiet = this.diet;
    if (humanDiet === dinoDiet) {
        console.log (`${this.species} had the same diet as you! You are both ${human.diet}.`)
    } else {
        console.log (`Unlike you, ${this.species} was a ${this.diet}.`)
        }
};


    // Generate Tiles for each Dino in Array
  
        // Add tiles to DOM

    // Remove form from screen


// On button click, prepare and display infographic
