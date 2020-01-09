
// Base
class Skill {
	
	constructor (nombre, img, atk, stat, multi, tipo, costeMana) {
		
		this.nombre = nombre;	// Nombre de la habilidad
		this.img = img;			// Ruta de imagen
		
		this.atk = atk;			// Daño base
		
		this.stat = stat;		// STR AGI INT
		this.multi = multi;		// % de stat del caster que se suma al daño base
		
		this.tipo = tipo; 		// FIS o MAG
		this.costeMana = costeMana; 	// coste de mana
		
	};
	
	
	
	getInfo() {
		
		return `
${this.nombre}
(Coste de mana: ${this.costeMana})

ATK: ${this.atk} + (${this.stat} * ${this.multi})
Tipo: ${this.tipo}
		`;
		
	};
	
	
	
	getAtk (caster) {
		/*
			Devuelve el ataque que hace esta habilidad, según el héroe que la utilice.
			
			Skill.getAtk()
		*/
		
		let atk = this.atk; // daño base
		
		
		
		switch (this.stat) {
			case "STR":
				atk += (caster.str * this.multi);
			break;
			case "AGI":
				atk += (caster.agi * this.multi);
			break;
			case "INT":
				atk += (caster.int * this.multi);
			break;
		};
		
		
		return Math.ceil(atk);
		
	};
	
};



// Físico
AtaqueMelee = new Skill (
	"Ataque melee", "/img/skills/wild_axes.jpg",
	200, "STR", 0.2,
	"FIS", 0
);


// Axe
BattleHunger = new Skill (
	"Battle hunger", "/img/skills/battle_hunger.jpg",
	400, "STR", 2,
	"FIS", 20
);
CullingBlade = new Skill (
	"Culling blade", "/img/skills/culling_blade.jpg",
	0, "STR", 8,
	"FIS", 40
);


// Sven
HammerStorm = new Skill (
	"Hammer storm", "/img/skills/hammer_storm.jpg",
	300, "STR", 2.5,
	"FIS", 20
);
GreatCleave = new Skill (
	"Great cleave", "/img/skills/great_cleave.jpg",
	600, "STR", 0.25,
	"FIS", 40
);



// Distancia
AtaqueDistancia = new Skill (
	"Ataque distancia", "/img/skills/marksmanship.jpg",
	200, "AGI", 0.2,
	"FIS", 0
);



// Clinkz
SearingArrow = new Skill (
	"Searing arrow", "/img/skills/searing_arrows.jpg",
	200, "INT", 2,
	"FIS", 45
);
Strafe = new Skill (
	"Strafe", "/img/skills/death_pact.jpg",
	800, "AGI", 0.2,
	"FIS", 60
);


// PA
StiflingDagger = new Skill (
	"Strafe", "/img/skills/stifling_dagger.jpg",
	250, "AGI", 0.4,
	"FIS", 20
);
CoupDeGrace = new Skill (
	"Strafe", "/img/skills/coup_de_grace.jpg",
	500, "AGI", 5,
	"FIS", 100
);



// Magico
AtaqueMagico = new Skill (
	"Ataque magico", "/img/skills/arcane_bolt.jpg",
	300, "INT", 0.3,
	"MAG", 0
);



// Lina
DragonSlave = new Skill (
	"Dragon slave", "/img/skills/dragon_slave.jpg",
	500, "INT", 0.6,
	"MAG", 25
);
LagunaBlade = new Skill (
	"Laguna blade", "/img/skills/laguna_blade.jpg",
	0, "INT", 20,
	"MAG", 100
);


// AA
ColdFeet = new Skill (
	"Cold feet", "/img/skills/cold_feet.jpg",
	200, "INT", 0.4,
	"MAG", 20
);
IceBlast = new Skill (
	"Ice blast", "/img/skills/ice_blast.jpg",
	300, "INT", 10,
	"MAG", 100
);
