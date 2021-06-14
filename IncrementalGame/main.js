var timer = 256
var tickRate = 16
var visualRate = 256
var resources = {"gold":0,"equipment":1}
var costs = {"equipment":10,
		 /**"equipment_bulk":costs["equipment"]*5+150,*/
	     "scientist":200,
		 "scientist_equipment":20,
		 "tnt":5,
		 "nitroglycerin":40,
		 "spaceship_laser_beam":100}
		 
var damage = {"tnt":51,
		 "nitroglycerin":445,
		 "spaceship_laser_beam":1200}
		 
var health = {"city":50,
		 "planet":2800}

		 /**
var growthRate = {"equipment":1.25,
		  "scientist":1.25,
	     "scientist_equipment":1.75}
		 */
		 
var growthAdditive = {"equipment":10,
		  "scientist":200,
		  "scientist_equipment":20,
		  "tnt":0,
		  "nitroglycerin":0,
		  "spaceship_laser_beam":0}
		 
var increments = [{"input":["scientist","scientist_equipment"],
		   "output":"gold"}]

var unlocks = {"equipment":{"gold":10},
	       "scientist":{"gold":100},
		   "scientist_equipment":{"scientist":1},
	       "tnt":{"scientist":3},
		   "nitroglycerin":{"tnt":3},
		   "spaceship_laser_beam":{"tnt":3},
		   "planet":{"tnt":3}}

function mineGold(num){
	if(resources["equipment"]!==0){
		resources["gold"] += num*resources["equipment"]
		updateText()
	}	
};

function purchaseEquipment(num){
	
    if (resources["gold"] >= costs["equipment"]*num){
	resources["equipment"] += num
	resources["gold"] -= num*costs["equipment"]
	
	costs["equipment"] += growthAdditive["equipment"]
	
	updateText()
    }
};

function purchaseEquipmentBulk(num){
	
    if (resources["gold"] >= num*costs["equipment"]+num*costs["equipment"]+10+num*costs["equipment"]+20+num*costs["equipment"]+30+num*costs["equipment"]+40) {
	resources["equipment"] += 5
	/**if (!costs["equipment_bulk"]){
	    costs["equipment_bulk"] = costs["equipment"]*5+100
	}*/
	resources["gold"] -= num*costs["equipment"]+num*costs["equipment"]+10+num*costs["equipment"]+20+num*costs["equipment"]+30+num*costs["equipment"]+40
	
	costs["equipment"] += growthAdditive["equipment"]*5+100
	
	updateText()
    }
};

function upgradeScientistEquipment(num){
    if (resources["gold"] >= costs["scientist_equipment"]*num){
	resources["scientist_equipment"] += num
	resources["gold"] -= num*costs["scientist_equipment"]
	
	costs["scientist_equipment"] += growthAdditive["scientist_equipment"]
	
	updateText()
    }
};

function equipment_cost(num){
	return Math.pow(1.5, num-1)*10 + num*10
};

function hireScientist(num){
    if (resources["gold"] >= costs["scientist"]*num){
	if (!resources["scientist"]){
	    resources["scientist"] = 0
	}
	if (!resources["scientist_equipment"]){
	    resources["scientist_equipment"] = 1
	}
	resources["scientist"] += num
	resources["gold"] -= num*costs["scientist"]
	
	costs["scientist"] += growthAdditive["scientist"]
	
	updateText()

	
    }
};

function purchaseTNT(num){
    if (resources["equipment"] >= costs["tnt"]*num){
	if (!resources["tnt"]){
	    resources["tnt"] = 0
	}
	resources["tnt"] += num
	resources["equipment"] -= num*costs["tnt"]
	
	costs["tnt"] += growthAdditive["tnt"]
	
	updateText()
    }
};

function purchaseNitro(num){
    if (resources["equipment"] >= costs["nitroglycerin"]*num){
	if (!resources["nitroglycerin"]){
	    resources["nitroglycerin"] = 0
	}
	resources["nitroglycerin"] += num
	resources["equipment"] -= num*costs["nitroglycerin"]
	
	costs["nitroglycerin"] += growthAdditive["nitroglycerin"]
	
	updateText()
    }
};

function purchaseSLB(num){
    if (resources["equipment"] >= costs["spaceship_laser_beam"]*num){
	if (!resources["spaceship_laser_beam"]){
	    resources["spaceship_laser_beam"] = 0
	}
	resources["spaceship_laser_beam"] += num
	resources["equipment"] -= num*costs["spaceship_laser_beam"]
	
	costs["spaceship_laser_beam"] += growthAdditive["spaceship_laser_beam"]
	
	updateText()
    }
};

/**
function resetPrice(object){
	costs["equipment"] = initial_costs["equipment"]
};

function use_equipment()
{
	resetPrice("equipment")
};
*/	

/***/
function damagePlanetTNT(num){        // inflict damage to planet
    if (resources["tnt"] !== 0){                           // if TNT is in arcenal.
        health["planet"] -= (num*resources["tnt"]*damage["tnt"]) // for all TNT in arcenal, launch at planet
    }
	resources["tnt"] = 0   // there now is no more TNT in arcenal
	damage["tnt"] += growthAdditive["tnt"]
	
	updateText()
    if (health["planet"] <= 0){
            //print You Win.
    }
};

function damagePlanetNitro(num){        // inflict damage to planet
    if (resources["nitroglycerin"] != 0){        // inflict damage to planet
		health["planet"] -= (num*resources["nitroglycerin"]*damage["nitroglycerin"])
    }
	resources["nitroglycerin"] = 0
	damage["nitroglycerin"] += growthAdditive["nitroglycerin"]
    
	udpateText()
	if (health["planet"] <= 0){
            //print You Win.
    }
};

function damagePlanetSLB(num){        // inflict damage to planet
    if (resources["spaceship_laser_beam"] != 0){     // inflict damage to planet
		health["planet"] -= (num*resources["spaceship_laser_beam"]*damage["spaceship_laser_beam"])
	}
	resources["spaceship_laser_beam"] = 0
	damage["spaceship_laser_beam"] += growthAdditive["spaceship_laser_beam"]
	
	updateText()
    if (health["planet"] <= 0){
            //print You Win.
    }
};



function updateText(){
	document.body.style.backgroundColor = "black";
	costs["equipment_bulk"] = costs["equipment"]*5+100
    for (var key in unlocks){
	var unlocked = true
	for (var criterion in unlocks[key]){
	    unlocked = unlocked && resources[criterion] >= unlocks[key][criterion]
	}
	if (unlocked){
	    for (var element of document.getElementsByClassName("show_"+key)){		
		element.style.display = "block"
	    }
	}
    }
    
    for (var key in resources){
	 for (var element of document.getElementsByClassName(key)){
	    element.innerHTML = resources[key].toFixed(2)
	}
    }
    for (var key in costs){
	for (var element of document.getElementsByClassName(key+"_cost")){
	    element.innerHTML = costs[key].toFixed(2)
	}
    }
};


window.setInterval(function(){
    timer += tickRate

    
    for (var increment of increments){
	total = 1
	for (var input of increment["input"]){
	    total *= resources[input]
	    
	}
	if (total){
	    console.log(total)
	    resources[increment["output"]] += total/tickRate
	}
    }
    
    if (timer > visualRate){
	timer -= visualRate
	updateText()
    }
  

}, tickRate);
