
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
		return `ATK: ${this.atk} + (${this.stat} * ${this.multi})`;
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
	"Ataque melee", "https://es.dotabuff.com/assets/skills/beastmaster-wild-axes-5168-5a9cc8387edc6a15ab415273b4e69d997d2da23e16b5e847927fe04d18e64faa.jpg",
	100, "STR", 0.1,
	"FIS", 0
);


// Axe
BattleHunger = new Skill (
	"BattleHunger", "https://es.dotabuff.com/assets/skills/axe-battle-hunger-5008-ee628cf379462a374e03fa8fea04b065e97aaf0fe241629a266a102041106267.jpg",
	200, "STR", 1,
	"FIS", 20
);
CullingBlade = new Skill (
	"Culling blade", "https://es.dotabuff.com/assets/skills/axe-culling-blade-5010-7334574abc38980c3f2df4040f384572361c4fd4d8c136c766a4c76c49624aee.jpg",
	0, "STR", 5,
	"FIS", 40
);


// Sven
HammerStorm = new Skill (
	"Hammer storm", "https://es.dotabuff.com/assets/skills/sven-storm-hammer-5094-e024ade99b99c4c0905b2e67bb681c6d4178833577dc0c0a8b811a61d93eaa9d.jpg",
	150, "STR", 1.5,
	"FIS", 20
);
GreatCleave = new Skill (
	"Great cleave", "https://es.dotabuff.com/assets/skills/sven-great-cleave-5095-e67fee0f76f0a1788a8a067efaf5320b9b1383a527641e81decac7c3bacdd924.jpg",
	500, "STR", 0.1,
	"FIS", 40
);



// Distancia
AtaqueDistancia = new Skill (
	"Ataque distancia", "https://es.dotabuff.com/assets/skills/windranger-powershot-5131-188a968270a649dc0640ec3dbae97a5940403e05784bd04a2753dca5cf5a79a0.jpg",
	100, "AGI", 0.15,
	"FIS", 1
);



// Clinkz
SearingArrow = new Skill (
	"Flecha perforadora", "https://es.dotabuff.com/assets/skills/clinkz-strafe-5259-87880a3e8e6cf98c4c7c09c0150b953099a8f154641c3dd8d9e0927791763580.jpg",
	150, "INT", 3,
	"FIS", 15
);
Strafe = new Skill (
	"Strafe", "https://es.dotabuff.com/assets/skills/clinkz-strafe-5259-87880a3e8e6cf98c4c7c09c0150b953099a8f154641c3dd8d9e0927791763580.jpg",
	600, "AGI", 0.1,
	"MAG", 60
);



// Magico
AtaqueMagico = new Skill (
	"Ataque magico", "https://es.dotabuff.com/assets/skills/skywrath-mage-arcane-bolt-5581-19d06da3ef80f0c8e9e34e47bc65df5d36fe0ba037a6014a771c962b00090c2d.jpg",
	125, "INT", 0.2,
	"MAG", 1
);



// Lina
DragonSlave = new Skill (
	"Dragon slave", "https://es.dotabuff.com/assets/skills/lina-dragon-slave-5040-1e6ee5a0618920bcad4acfd3427867f5e3a20b48e974d4f85752b4f11642c1e4.jpg",
	400, "INT", 0.5,
	"MAG", 25
);
LagunaBlade = new Skill (
	"Laguna blade", "https://es.dotabuff.com/assets/skills/lina-laguna-blade-5043-34ba02a00fcf721c14478a9adc4017cfbc3eddbb260b1b06ef16725d2444be70.jpg",
	0, "INT", 10,
	"MAG", 100
);


