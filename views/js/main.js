/*
 Welcome to the 60fps project! Your goal is to make Cam's Pizzeria website run
 jank-free at 60 frames per second.

 There are two major issues in this code that lead to sub-60fps performance. Can
 you spot and fix both?


 Built into the code, you'll find a few instances of the User Timing API
 (window.performance), which will be console.log()ing frame rate data into the
 browser console. To learn more about User Timing API, check out:
 http://www.html5rocks.com/en/tutorials/webperformance/usertiming/

 Creator:
 Cameron Pittman, Udacity Course Developer
 cameron *at* udacity *dot* com
 */

// As you may have realized, this website randomly generates pizzas.
// Here are arrays of all possible pizza ingredients.
var pizzaIngredients = {};
pizzaIngredients.meats = [
    "Pepperoni",
    "Sausage",
    "Fennel Sausage",
    "Spicy Sausage",
    "Chicken",
    "BBQ Chicken",
    "Chorizo",
    "Chicken Andouille",
    "Salami",
    "Tofu",
    "Bacon",
    "Canadian Bacon",
    "Proscuitto",
    "Italian Sausage",
    "Ground Beef",
    "Anchovies",
    "Turkey",
    "Ham",
    "Venison",
    "Lamb",
    "Duck",
    "Soylent Green",
    "Carne Asada",
    "Soppressata Picante",
    "Coppa",
    "Pancetta",
    "Bresola",
    "Lox",
    "Guanciale",
    "Chili",
    "Beef Jerky",
    "Pastrami",
    "Kielbasa",
    "Scallops",
    "Filet Mignon"
];
pizzaIngredients.nonMeats = [
    "White Onions",
    "Red Onions",
    "Sauteed Onions",
    "Green Peppers",
    "Red Peppers",
    "Banana Peppers",
    "Ghost Peppers",
    "Habanero Peppers",
    "Jalapeno Peppers",
    "Stuffed Peppers",
    "Spinach",
    "Tomatoes",
    "Pineapple",
    "Pear Slices",
    "Apple Slices",
    "Mushrooms",
    "Arugula",
    "Basil",
    "Fennel",
    "Rosemary",
    "Cilantro",
    "Avocado",
    "Guacamole",
    "Salsa",
    "Swiss Chard",
    "Kale",
    "Sun Dried Tomatoes",
    "Walnuts",
    "Artichoke",
    "Asparagus",
    "Caramelized Onions",
    "Mango",
    "Garlic",
    "Olives",
    "Cauliflower",
    "Polenta",
    "Fried Egg",
    "Zucchini",
    "Hummus"
];
pizzaIngredients.cheeses = [
    "American Cheese",
    "Swiss Cheese",
    "Goat Cheese",
    "Mozzarella Cheese",
    "Parmesean Cheese",
    "Velveeta Cheese",
    "Gouda Cheese",
    "Muenster Cheese",
    "Applewood Cheese",
    "Asiago Cheese",
    "Bleu Cheese",
    "Boursin Cheese",
    "Brie Cheese",
    "Cheddar Cheese",
    "Chevre Cheese",
    "Havarti Cheese",
    "Jack Cheese",
    "Pepper Jack Cheese",
    "Gruyere Cheese",
    "Limberger Cheese",
    "Manchego Cheese",
    "Marscapone Cheese",
    "Pecorino Cheese",
    "Provolone Cheese",
    "Queso Cheese",
    "Roquefort Cheese",
    "Romano Cheese",
    "Ricotta Cheese",
    "Smoked Gouda"
];
pizzaIngredients.sauces = [
    "Red Sauce",
    "Marinara",
    "BBQ Sauce",
    "No Sauce",
    "Hot Sauce"
];
pizzaIngredients.crusts = [
    "White Crust",
    "Whole Wheat Crust",
    "Flatbread Crust",
    "Stuffed Crust"
];

// CHANGE: Use capital Letters in lookup tables to avoid usage of 'capitalize' function
var adj = {
    "dark":
        ["Dark","Morbid","Scary","Spooky","Gothic","Deviant","Creepy","Sadistic","Black","Dangerous","Dejected",
            "Haunted","Morose","Tragic","Shattered","Broken","Sad","Melancholy","Somber","Dark","Gloomy","Homicidal",
            "Murderous","Shady","Misty","Dusky","Ghostly","Shadowy","Demented","Cursed","Insane","Possessed","Grotesque",
            "Obsessed"],
    "colors":
        ["Blue","Green","Purple","Grey","Scarlet","NeonGreen","NeonBlue","NeonPink","HotPink","Pink","Black","Red",
            "Maroon","Silver","Golden","Yellow","Orange","Mustard","Plum","Violet","Cerulean","Brown","Lavender","Violet",
            "Magenta","Chestnut","Rosy","Copper","Crimson","Teal","Indigo","Navy","Azure","Periwinkle","Brassy","Verdigris",
            "Veridian","Tan","Raspberry","Beige","Sandy","ElectricBlue","White","Champagne","Coral","Cyan"],
    "whimsy":
        ["Whimsical","Silly","Drunken","Goofy","Funny","Weird","Strange","Odd","Playful","Clever","Boastful",
            "Breakdancing","Hilarious","Conceited","Happy","Comical","Curious","Peculiar","Quaint","Quirky","Fancy",
            "Wayward","Fickle","Yawning","Sleepy","Cockeyed","Dizzy","Dancing","Absurd","Laughing","Hairy","Smiling",
            "Perplexed","Baffled","Cockamamie","Vulgar","Hoodwinked","Brainwashed"],
    "shiny":
        ["Sapphire","Opal","Silver","Gold","Platinum","Ruby","Emerald","Topaz","Diamond","Amethyst","Turquoise",
            "Starlit","Moonlit","Bronze","Metal","Jade","Amber","Garnet","Obsidian","Onyx","Pearl","Copper","Sunlit","Brass",
            "Brassy","Metallic"],
    "noisy":
        ["Untuned","Loud","Soft","Shrieking","Melodious","Musical","Operatic","Symphonic","Dancing","Lyrical",
            "Harmonic","Orchestral","Noisy","Dissonant","Rhythmic","Hissing","Singing","Crooning","Shouting","Screaming",
            "Wailing","Crying","Howling","Yelling","Hollering","Caterwauling","Bawling","Bellowing","Roaring","Squealing",
            "Beeping","Knocking","Tapping","Rapping","Humming","Scatting","Whispered","Whispering","Rasping","Buzzing",
            "Whirring","Whistling","Whistled"],
    "apocalyptic":
        ["Nuclear","Apocalyptic","Desolate","Atomic","Zombie","Collapsed","Grim","Fallen","Collapsed","Cannibalistic",
            "Radioactive","Toxic","Poisonous","Venomous","Disastrous","Grimy","Dirty","Undead","Bloodshot","Rusty",
            "Glowing","Decaying","Rotten","Deadly","Plagued","Decimated","Rotting","Putrid","Decayed","Deserted","Acidic"],
    "insulting":
        ["Stupid","Idiotic","Fat","Ugly","Hideous","Grotesque","Dull","Dumb","Lazy","Sluggish","Brainless","Slow",
            "Gullible","Obtuse","Dense","Dim","Dazed","Ridiculous","Witless","Daft","Crazy","Vapid","Inane","Mundane",
            "Hollow","Vacuous","Boring","Insipid","Tedious","Monotonous","Weird","Bizarre","Backward","Moronic","Ignorant",
            "Scatterbrained","Forgetful","Careless","Lethargic","Insolent","Indolent","Loitering","Gross","Disgusting",
            "Bland","Horrid","Unseemly","Revolting","Homely","Deformed","Disfigured","Offensive","Cowardly","Weak",
            "Villainous","Fearful","Monstrous","Unattractive","Unpleasant","Nasty","Beastly","Snide","Horrible",
            "Syncophantic","Unhelpful","Bootlicking"],"praise":["Beautiful","Intelligent","Smart","Genius","Ingenious",
        "Gorgeous","Pretty","Witty","Angelic","Handsome","Graceful","Talented","Exquisite","Enchanting",
        "Fascinating","Interesting","Divine","Alluring","Ravishing","Wonderful","Magnificient","Marvelous",
        "Dazzling","Cute","Charming","Attractive","Nifty","Delightful","Superior","Amiable","Gentle","Heroic",
        "Courageous","Valiant","Brave","Noble","Daring","Fearless","Gallant","Adventurous","Cool","Enthusiastic",
        "Fierce","Awesome","Radical","Tubular","Fearsome","Majestic","Grand","Stunning"],
    "scientific":
        ["Scientific","Technical","Digital","Programming","Calculating","Formulating","Cyberpunk",
            "Mechanical","Technological","Innovative","Brainy","Chemical","Quantum","Astro","Space","Theoretical",
            "Atomic","Electronic","Gaseous","Investigative","Solar","Extinct","Galactic"]
};

// Pulls adjective out of array using random number sent from generator
function getAdj(x){
    var result = adj[x];
    return 'undefined' === result ? adj["scientific"] : result;
}

// CHANGE: Use capital Letters in lookup tables to avoid usage of 'capitalize' function
var animals = ["Flamingo", "Hedgehog", "Owl", "Elephant", "Pussycat", "Alligator", "Dachsund", "Poodle",
    "Beagle", "Crocodile", "Kangaroo", "Wallaby", "Woodpecker", "Eagle", "Falcon", "Canary", "Parrot",
    "Parakeet", "Hamster", "Gerbil", "Squirrel", "Rat", "Dove", "Toucan", "Raccoon", "Vulture", "Peacock",
    "Goldfish", "Rook", "Koala", "Skunk", "Goat", "Rooster", "Fox", "Porcupine", "Llama", "Grasshopper",
    "Gorilla", "Monkey", "Seahorse", "Wombat", "Wolf", "Giraffe", "Badger", "Lion", "Mouse", "Beetle",
    "Cricket", "Nightingale", "Hawk", "Trout", "Squid", "Octopus", "Sloth", "Snail", "Locust", "Baboon",
    "Lemur", "Meerkat", "Oyster", "Frog", "Toad", "Jellyfish", "Butterfly", "Caterpillar", "Tiger", "Hyena",
    "Zebra", "Snail", "Pig", "Weasel", "Donkey", "Penguin", "Crane", "Buzzard", "Vulture", "Rhino",
    "Hippopotamus", "Dolphin", "Sparrow", "Beaver", "Moose", "Minnow", "Otter", "Bat", "Mongoose", "Swan", "Firefly", "Platypus"];

var professions = ["Doctor", "Lawyer", "Ninja", "Writer", "Samurai", "Surgeon", "Clerk", "Artist", "Actor", "Engineer",
    "Mechanic", "Comedian", "Fireman", "Nurse", "RockStar", "Musician", "Carpenter", "Plumber", "Cashier", "Electrician",
    "Waiter", "President", "Governor", "Senator", "Scientist", "Programmer", "Singer", "Dancer", "Director", "Mayor", "Merchant",
    "Detective", "Investigator", "Navigator", "Pilot", "Priest", "Cowboy", "Stagehand", "Soldier", "Ambassador", "Pirate",
    "Miner", "Police"];

var fantasy = ["Centaur", "Wizard", "Gnome", "Orc", "Troll", "Sword", "Fairy", "Pegasus", "Halfling", "Elf", "Changeling",
    "Ghost", "Knight", "Squire", "Magician", "Witch", "Warlock", "Unicorn", "Dragon", "Wyvern", "Princess", "Prince", "King",
    "Queen", "Jester", "Tower", "Castle", "Kraken", "Seamonster", "Mermaid", "Psychic", "Seer", "Oracle"];

var music = ["Violin", "Flute", "Bagpipe", "Guitar", "Symphony", "Orchestra", "Piano", "Trombone", "Tuba", "Opera", "Drums",
    "Harpsichord", "Harp", "Harmonica", "Accordion", "Tenor", "Soprano", "Baritone", "Cello", "Viola", "Piccolo", "Ukelele",
    "Woodwind", "Saxophone", "Bugle", "Trumpet", "Sousaphone", "Cornet", "Stradivarius", "Marimbas", "Bells", "Timpani", "Bongos",
    "Clarinet", "Recorder", "Oboe", "Conductor", "Singer"];

var horror = ["Murderer", "Chainsaw", "Knife", "Sword", "Murder", "Devil", "Killer", "Psycho", "Ghost", "Monster", "Godzilla",
    "Werewolf", "Vampire", "Demon", "Graveyard", "Zombie", "Mummy", "Curse", "Death", "Grave", "Tomb", "Beast", "Nightmare",
    "Frankenstein", "Specter", "Poltergeist", "Wraith", "Corpse", "Scream", "Massacre", "Cannibal", "Skull", "Bones", "Undertaker",
    "Zombie", "Creature", "Mask", "Psychopath", "Fiend", "Satanist", "Moon", "FullMoon"];

var gross = ["Slime", "Bug", "Roach", "Fluid", "Pus", "Booger", "Spit", "Boil", "Blister", "Orifice", "Secretion", "Mucus",
    "Phlegm", "Centipede", "Beetle", "Fart", "Snot", "Crevice", "Flatulence", "Juice", "Mold", "Mildew", "Germs", "Discharge",
    "Toilet", "Udder", "Odor", "Substance", "Fluid", "Moisture", "Garbage", "Trash", "Bug"];

var everyday = ["Mirror", "Knife", "Fork", "Spork", "Spoon", "Tupperware", "Minivan", "Suburb", "Lamp", "Desk", "Stereo",
    "Television", "TV", "Book", "Car", "Truck", "Soda", "Door", "Video", "Game", "Computer", "Calender", "Tree", "Plant", "Flower",
    "Chimney", "Attic", "Kitchen", "Garden", "School", "Wallet", "Bottle"];

var jewelry = ["Earrings", "Ring", "Necklace", "Pendant", "Choker", "Brooch", "Bracelet", "Cameo", "Charm", "Bauble", "Trinket",
    "Jewelry", "Anklet", "Bangle", "Locket", "Finery", "Crown", "Tiara", "BlingBling", "Chain", "Rosary", "Jewel", "Gemstone", "Beads",
    "Armband", "Pin", "Costume", "Ornament", "Treasure"];

var places = ["Swamp", "Graveyard", "Cemetery", "Park", "Building", "House", "River", "Ocean", "Sea", "Field", "Forest", "Woods",
    "Neighborhood", "City", "Town", "Suburb", "Country", "Meadow", "Cliffs", "Lake", "Stream", "Creek", "School", "College",
    "University", "Library", "Bakery", "Shop", "Store", "Theater", "Garden", "Canyon", "Highway", "Restaurant", "Cafe", "Diner",
    "Street", "Road", "Freeway", "Alley"];

var scifi = ["Robot", "Alien", "Raygun", "Spaceship", "UFO", "Rocket", "Phaser", "Astronaut", "Spaceman", "Planet", "Star",
    "Galaxy", "Computer", "Future", "TimeMachine", "WormHole", "TimeTraveler", "Scientist", "Invention", "Martian", "Pluto",
    "Jupiter", "Saturn", "Mars", "Quasar", "BlackHole", "WarpDrive", "Laser", "Orbit", "Gears", "Molecule", "Electron", "Neutrino",
    "Proton", "Experiment", "Photon", "Apparatus", "Universe", "Gravity", "DarkMatter", "Constellation", "Circuit", "Asteroid"];


// Pulls noun out of array using random number sent from generator
function getNoun(y) {
    switch(y) {
        case "animals":
            return animals;
        case "profession":
            return professions;
        case "fantasy":
            return fantasy;
        case "music":
            return music;
        case "horror":
            return horror;
        case "gross":
            return gross;
        case "everyday":
            return everyday;
        case "jewelry":
            return jewelry;
        case "places":
            return places;
        case "scifi":
            return scifi;
        default:
            return scifi;
    }
}

var adjectives = ["dark", "colors", "whimsy", "shiny", "noisy", "apocalyptic", "insulting", "praise", "scientific"];  // types of adjectives for pizza titles
var nouns = ["animals", "everyday", "fantasy", "gross", "horror", "jewelry", "places", "scifi"];                        // types of nouns for pizza titles


// Returns a number in the range 0 <= result < max.
function getRandomNumber(max) {
    return Math.floor((Math.random() * max));
}

// Generates random numbers for getAdj and getNoun functions and returns a new pizza name
function generator(adj, noun) {
    var adjectives = getAdj(adj);
    var nouns = getNoun(noun);
    var randomAdjective = getRandomNumber(adjectives.length);
    var randomNoun = getRandomNumber(nouns.length);
    return "The " + adjectives[randomAdjective]+ " " + nouns[randomNoun];
}

// Chooses random adjective and random noun
function randomName() {
    var randomNumberAdj = getRandomNumber(adjectives.length);
    var randomNumberNoun = getRandomNumber(nouns.length);
    return generator(adjectives[randomNumberAdj], nouns[randomNumberNoun]);
}

// These functions return a string of a random ingredient from each respective category of ingredients.
var selectRandomMeat = function() {
    return pizzaIngredients.meats[getRandomNumber(pizzaIngredients.meats.length)];
};

var selectRandomNonMeat = function() {
    return pizzaIngredients.nonMeats[getRandomNumber(pizzaIngredients.nonMeats.length)];
};

var selectRandomCheese = function() {
    return pizzaIngredients.cheeses[getRandomNumber(pizzaIngredients.cheeses.length)];
};

var selectRandomSauce = function() {
    return pizzaIngredients.sauces[getRandomNumber(pizzaIngredients.sauces.length)];
};

var selectRandomCrust = function() {
    return pizzaIngredients.crusts[getRandomNumber(pizzaIngredients.crusts.length)];
};

var ingredientItemizer = function(string) {
    return "<li>" + string + "</li>";
};

// Returns a string with random pizza ingredients nested inside <li> tags
var makeRandomPizza = function() {
    var pizza = "";

    var numberOfMeats = getRandomNumber(4);
    var numberOfNonMeats = getRandomNumber(3);
    var numberOfCheeses = getRandomNumber(2);

    for (var i = 0; i < numberOfMeats; i++) {
        pizza += ingredientItemizer(selectRandomMeat());
    }

    for (var i = 0; i < numberOfNonMeats; i++) {
        pizza += ingredientItemizer(selectRandomNonMeat());
    }

    for (var i = 0; i < numberOfCheeses; i++) {
        pizza += ingredientItemizer(selectRandomCheese());
    }

    pizza += ingredientItemizer(selectRandomSauce());
    pizza += ingredientItemizer(selectRandomCrust());

    return pizza;
}

// CHANGE: Taken from http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] !== 'undefined' ? args[number] : match;
    });
};

// HTML template for a pizza
var pizzaTemplate =
    '<div id="pizza{0}" class="randomPizzaContainer" style="width:33.33%; height: 325px;">' +
        '<div class="col-md-6"><img src="images/pizza.png" class="img-responsive"></div>' +
        '<div class="col-md-6">' +
        '<h4>{1}</h4>' +
        '<ul>{2}</ul>' +
        '</div>' +
        '</div>';

// returns a HTML element for each pizza
var pizzaElementGenerator = function(i) {
    // CHANGE: Use string functions to generate HTML
    return pizzaTemplate.format(i, randomName(), makeRandomPizza());
};

// resizePizzas(size) is called when the slider in the "Our Pizzas" section of the website moves.
var resizePizzas = function(size) {
    window.performance.mark("mark_start_resize");   // User Timing API function
    var slider = document.getElementById("pizzaSize");

    // Changes the value for the size of the pizza above the slider
    function changeSliderLabel(size) {
        switch(size) {
            case "1":
                slider.innerHTML = "Small";
                return;
            case "2":
                slider.innerHTML = "Medium";
                return;
            case "3":
                slider.innerHTML = "Large";
                return;
            default:
                console.log("bug in changeSliderLabel");
        }
    }

    changeSliderLabel(size);

    //Returns the size difference to change a pizza element from one size to another. Called by changePizzaSlices(size).
    // CHANGE: The signature of this function change as former arguments are now calculated beforehand in the calling function
    function determineDx (size, windowwidth, oldwidth) {
        var oldsize = oldwidth / windowwidth;

        // TODO: change to 3 sizes? no more xl?
        // Changes the slider value to a percent width
        function sizeSwitcher (size) {
            switch(size) {
                case "1":
                    return 0.25;
                case "2":
                    return 0.3333;
                case "3":
                    return 0.5;
                default:
                    console.log("bug in sizeSwitcher");
            }
        }

        var newsize = sizeSwitcher(size);
        var dx = (newsize - oldsize) * windowwidth;

        return dx;
    }

    // Iterates through pizza elements on the page and changes their widths
    function changePizzaSizes(size) {
        // CHANGE: Use the querySelector only once per DOM item/container and store them in variables
        // CHANGE: Use getElement functions instead of querySelector
        var windowwidth = document.getElementById("randomPizzas").offsetWidth;
        var randomPizzaContainer = document.getElementsByClassName("randomPizzaContainer");

        // CHANGE: calculate new width only once and not for every pizza within the loop
        var pizzaOldWidth = randomPizzaContainer[0].offsetWidth;

        // CHANGE: Call determineDx only once and give already calculated values as arguments
        var dx = determineDx(size, windowwidth, pizzaOldWidth);
        var newwidth = (pizzaOldWidth + dx) + 'px';

        // CHANGE: Use randomPizzaContainer instead of querying it in every cycle. Only set the new width in the loop.
        for (var i = 0; i < randomPizzaContainer.length; i++) {
            randomPizzaContainer[i].style.width = newwidth;
        }
    }

    changePizzaSizes(size);

    // User Timing API is awesome
    window.performance.mark("mark_end_resize");
    window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
    var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
    console.log("Time to resize pizzas: " + timeToResize[0].duration + "ms");
};

window.performance.mark("mark_start_generating"); // collect timing data

// This for-loop actually creates and appends all of the pizzas when the page loads
var pizzas = '';

for (var i = 2; i < 100; i++) {
    pizzas += pizzaElementGenerator(i);
}

// CHANGE: Insert HTML into randomPizzas
document.getElementById("randomPizzas").insertAdjacentHTML('beforeend', pizzas);


// User Timing API again. These measurements tell you how long it took to generate the initial pizzas
window.performance.mark("mark_end_generating");
window.performance.measure("measure_pizza_generation", "mark_start_generating", "mark_end_generating");
var timeToGenerate = window.performance.getEntriesByName("measure_pizza_generation");
console.log("Time to generate pizzas on load: " + timeToGenerate[0].duration + "ms");

// Iterator for number of times the pizzas in the background have scrolled.
// Used by updatePositions() to decide when to log the average time per frame
var frame = 0;

// Logs the average amount of time per 10 frames needed to move the sliding background pizzas on scroll.
function logAverageFrame(times) {   // times is the array of User Timing measurements from updatePositions()
    var numberOfEntries = times.length;
    var sum = 0;
    for (var i = numberOfEntries - 1; i > numberOfEntries - 11; i--) {
        sum = sum + times[i].duration;
    }
    console.log("Average time to generate last 10 frames: " + sum / 10 + "ms");
}

// The following code for sliding background pizzas was pulled from Ilya's demo found at:
// https://www.igvita.com/slides/2012/devtools-tips-and-tricks/jank-demo.html

// Moves the sliding background pizzas based on scroll position
function updatePositions() {
    frame++;
    window.performance.mark("mark_start_frame");

    movingPizzas.update();

    // User Timing API to the rescue again. Seriously, it's worth learning.
    // Super easy to create custom metrics.
    window.performance.mark("mark_end_frame");
    window.performance.measure("measure_frame_duration", "mark_start_frame", "mark_end_frame");
    if (frame % 10 === 0) {
        var timesToUpdatePosition = window.performance.getEntriesByName("measure_frame_duration");
        logAverageFrame(timesToUpdatePosition);
    }
}

// CHANGE: Encapsulate all moving pizza data into one object
var movingPizzas = {
    distance: 256,
    cols: 0,
    rows: 0,
    num: 0,
    sinPositions: [],
    update: function() {
        this.updateSinPositions();
        this.updateElements();
    },
    updateDimensions: function() {
        // update dimensions of moving pizza elements
        var height = window.innerHeight;
        var width = window.innerWidth;

        this.cols = Math.floor(width / this.distance) + 1;
        this.rows = Math.floor(height / this.distance) + 1;
        this.num = this.cols * this.rows;
    },
    updateSinPositions: function() {
        // CHANGE: Calculate scrollTop only once before the loop not in every cycle
        var scrollTop = document.body.scrollTop / 1250;

        for (i = 0; i < 5; i++) {
            this.sinPositions[i] = 100 * Math.sin(scrollTop + i);
        }
    },
    setPosition: function(elem) {
        // sets the position of an element
        var phase = this.sinPositions[elem.sinPos];
        elem.style.transform = 'translateX('+ phase + 'px' +')';
    },
    createElement : function(num) {
        // creates a new moving pizza image element
        var elem = document.createElement('img');
        elem.className = 'mover';
        elem.src = "images/pizza.png";
        elem.style.height = "100px";
        elem.style.width = "73.333px";
        elem.basicLeft = (num % this.cols) * this.distance;
        elem.style.left = elem.basicLeft + 'px';
        elem.num = num;
        elem.sinPos = num % 5;
        elem.style.top = (Math.floor(num / this.cols) * this.distance) + 'px';

        if (this.sinPositions.length !== 0) {
            this.setPosition(elem);
        }

        return elem;
    },
    createElements: function() {
        var parent = document.getElementById("movingPizzas1");

        // remove old moving pizzas if there are any
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        // create new moving pizza elemens
        for (var i = 0; i < this.num; i++) {
            var elem = this.createElement(i);
            parent.appendChild(elem);
        }
    },
    updateElements: function() {
        var colsBefore = this.cols;
        var rowsBefore = this.rows;

        this.updateDimensions();

        // (re-)create moving pizza elements in case the
        if (this.cols !== colsBefore || this.rows !== rowsBefore) {
            this.createElements();
            return;
        }

        // update positions
        var items = document.getElementsByClassName('mover');
        for (var i = 0; i < items.length; i++) {
            this.setPosition(items[i]);
        }
    }
};

// runs updatePositions on scroll
window.addEventListener('scroll', updatePositions);

window.addEventListener('resize', function() {
    movingPizzas.update();
});

// Generates the sliding pizzas when the page loads.
document.addEventListener('DOMContentLoaded', function() {
    movingPizzas.update();
});

