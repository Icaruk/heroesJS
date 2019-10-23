
// Base
class Skill {
	
	constructor (nombre, img, atk, stat, multi, tipo, cd) {
		
		this.nombre = nombre;	// Nombre de la habilidad
		this.img = img;			// Ruta de imagen
		
		this.atk = atk;			// Daño base
		
		this.stat = stat;		// STR AGI INT
		this.multi = multi;		// % de stat del caster que se suma al daño base
		
		this.tipo = tipo; 		// FIS o MAG
		this.cd = cd; 			// turnos hasta reutilización
		
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
	"Ataque melee", "",
	100, "STR", 0.1,
	"FIS", 1
);
GolpeBajo = new Skill (
	"Golpe bajo", "",
	0, "STR", 2,
	"FIS", 2
);
Patada = new Skill (
	"Patada", "",
	300, "STR", 0.2,
	"FIS", 3
);



// Distancia
AtaqueDistancia = new Skill (
	"Ataque distancia", "",
	100, "AGI", 0.15,
	"FIS", 1
);
FlechaPerforadora = new Skill (
	"Flecha perforadora", "",
	200, "AGI", 0.8,
	"FIS", 1
);
FlechaExplosiva = new Skill (
	"Flecha explosiva", "",
	600, "AGI", 0.1,
	"MAG", 1
);



// Magico
AtaqueMagico = new Skill (
	"Ataque magico", "",
	125, "INT", 0.2,
	"MAG", 1
);
BolaDeFuego = new Skill (
	"BolaDeFuego", "",
	400, "INT", 0.5,
	"MAG", 3
);
BolaDeHielo = new Skill (
	"Bola de hielo", "",
	300, "INT", 0.9,
	"MAG", 4
);


