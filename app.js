    //Get Dino data from JSON

    const getDinoData = async () => {
        const fetchedData = await fetch('./dino.json');
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
        this.image = encodeURI('images/' + species.toLowerCase() + '.png');
    };

    // Create Dino Objects

    const dinosArray = [];

    getDinoData().then(data => {
        const dinos = data;

        dinos.forEach((dino) => {
            const dinoObj = new DinoConstructor([dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact]);
            dinosArray.push(dinoObj);
        });

    }).catch(error => {
        console.error(error);
    });

    // Create Human Object

    const human = {
        image: 'images/human.png',
        species: 'Human'
    };

    //Convert human height to inches to allow comparison to dino height

    function heightConverter(heightFeet) {
        human.height = Number(heightFeet * 12) + Number(human.inches);
    };

    // On button click, prepare and display infographic

    document.getElementById('btn').addEventListener('click', (event) => {
        // Use IIFE to get human data from form
        (function getHumanData(e) {
            human.name = document.getElementById('name').value,
                human.feet = document.getElementById('feet').value,
                human.inches = document.getElementById('inches').value,
                human.weight = parseInt(document.getElementById('weight').value),
                human.diet = document.getElementById('diet').value.toLowerCase(),
                heightConverter(human.feet)
        })();

        dinosArray.forEach((dino) => {
            dino.heightFact = dino.relativeHeight(human);
            dino.weightFact = dino.compareWeight(human);
            dino.dietFact = dino.compareDiet(human);
            dino.where = `The ${dino.species} lived in ${dino.where}.`;
            dino.when = `The ${dino.species} lived in the ${dino.when}.`
        });

        const dinosArrayOne = dinosArray.slice(0, 4);
        const dinosArrayTwo = dinosArray.slice(4, 8);
        const allSpeciesArray = dinosArrayOne.concat(human, dinosArrayTwo);

        // Add tiles to DOM

        allSpeciesArray.forEach((item) => {
            createTiles(item);
        });

        removeForm();

        createNewButton();
    });

    // Create Dino Compare Method 1: Height
    // NOTE: Height in JSON file is in inches. 

    DinoConstructor.prototype.relativeHeight = function() {
        const humanHeight = human.height;
        const dinoHeight = this.height;
        if (humanHeight > dinoHeight) {
            return `${this.species} was shorter than you! It was ${this.height} inches tall.`
        } 
        if (humanHeight < dinoHeight) {
            return `${this.species} was taller than you! It was ${this.weight} inches tall.`
        } 
        if (humanHeight == dinoHeight) {
            return `${this.species} was exactly as tall as you are! Wow, you are a real ${this.species}!`
        } 
        {
            return `If you share how tall you are, we can tell you how you compare to our dinos.`
        }
    };

    // Create Dino Compare Method 2: Weight
    // NOTE: Weight in JSON file is in lbs.

    DinoConstructor.prototype.compareWeight = function() {
        const humanWeight = human.weight;
        const dinoWeight = this.weight;
        if (humanWeight > dinoWeight) {
            return `${this.species} was lighter than you! It weighed ${this.weight} lbs.`
        } 
        if (humanWeight < dinoWeight) {
            return `${this.species} was heavier than you! It weighed ${this.weight} lbs.`
        } 
        if (humanWeight == dinoWeight) {
            return `${this.species} weighed exactly as much as you! Wow, you are a real ${this.species}!`
        } 
        {
            return `If you share how much you weigh, we can tell you how you compare to our dinos.`
        }
    };

    // Create Dino Compare Method 3: Diet

    DinoConstructor.prototype.compareDiet = function() {
        const humanDiet = human.diet;
        const dinoDiet = this.diet;
        if (humanDiet === dinoDiet) {
            return `${this.species} had the same diet as you! You are both ${human.diet}.`
        } 
        {
            return `Unlike you, ${this.species} was a ${this.diet}.`
        }
    };

    // Generate Tiles for each Dino in Array

    const infographic = document.querySelector('main');

    const createTiles = function(dino) {
        const newTile = document.createElement('div');
        newTile.classList.add('grid-item');
        if (dino.species === 'Human') {
            newTile.innerHTML = `<h3>${dino.name}</h3>`
        } else if (dino.species === 'Pigeon') {
            newTile.innerHTML = `<h3>${dino.species}</h3>`;
            newTile.innerHTML += `<p>${dino.fact}</p>`
        } else {
            newTile.innerHTML = `<h3>${dino.species}</h3>`;
            const fact = randomProperty(dino);
            newTile.innerHTML += `<p>${fact}</p>`
        }
        newTile.innerHTML += `<img src= ${dino.image}>`;
        infographic.appendChild(newTile);
    };

   
    // Remove form from screen

    const dataForm = document.querySelector('#dino-compare');

    function removeForm() {
        dataForm.style.display = 'none';
    };


    //Select random Dino fact to display

    const randomProperty = function(obj) {
        const Facts = ['fact', 'weightFact', 'heightFact', 'dietFact', 'when', 'where']
        const oneRandomFact = Facts[Math.floor(Math.random() * Facts.length)]
        return obj[oneRandomFact];
    };


    //Add button to reload the form

    const createNewButton = function() {
        const newButton = document.createElement('div');
        newButton.id = 'btn-reload';
        newButton.innerHTML = `New Comparison!`;
        infographic.appendChild(newButton);
        document.getElementById('btn-reload').addEventListener('click', (event) => {
            window.setTimeout(() => {
                window.location.reload();
            }, 200);
        })
    }