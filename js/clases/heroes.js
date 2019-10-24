
class Heroe {
	
	constructor (nombre, img, str, agi, int, gananciaStr, gananciaAgi, gananciaInt, vida, defFisica, defMagica, skills) {
		
		this.nombre = nombre;
		this.img = img;
		
		this.str = str;
		this.agi = agi;
		this.int = int;
		
		this.gananciaStr = gananciaStr;
		this.gananciaAgi = gananciaAgi;
		this.gananciaInt = gananciaInt;
		
		this.vida = vida;
		this.vidaMax = vida;
		
		this.defFisica = defFisica;
		this.defMagica = defMagica;
		
		this.skills = skills;
		
	};
	
	
	
	useSkill (idxSkill, objetivo) {
		/*
			Usa la skill 0, 1 o 2
			
			this.useSkill (0, objHeroeEnemigo)
			this.useSkill (0, objHeroeEnemigo)
			this.useSkill (0, objHeroeEnemigo)
		*/
		
		// Selecciono la skill
		let skill = this.skills[idxSkill];
		
		
		// Calculo el ataque que tengo con esa skill
		let atk = skill.getAtk(this);
		
		
		// Quito vida
		objetivo.vida -= atk;
		cl (`${this.nombre} causa ${atk} de daño a ${objetivo.nombre}. Sobrevivió con ${objetivo.vida} de vida.`);
		
	}
	
	
	
};



heroe_axe = new Heroe (
	"Axe", "https://es.dotabuff.com/assets/heroes/axe-c50aa8d225ae00dd2a3c6016f726f7d07eecfae07cc853d13beb1168837db9dc.jpg",
	30, 15, 5,
	2, 0, 0,
	3500, 40, 10,
	[
		AtaqueMelee,
		GolpeBajo,
		Patada
	]
);

heroe_clinkz = new Heroe (
	"Clinkz", "https://es.dotabuff.com/assets/heroes/clinkz-cb25ffdf344c24d992d225ed9a61767d6f8c0ac12a15ef733d1773f468e724b9.jpg",
	5, 20, 10,
	0, 2, 1,
	2000, 20, 20,
	[
		AtaqueDistancia,
		FlechaPerforadora,
		FlechaExplosiva
	]
);

heroe_lina = new Heroe (
	"Lina", "https://es.dotabuff.com/assets/heroes/lina-8c8d6b1957d3652b7d1dd544497dfce81900a8d707d3ef016bc664cd63d4ffc7.jpg",
	5, 30, 15,
	0, 3, 1,
	1500, 5, 40,
	[
		AtaqueMagico,
		BolaDeFuego,
		BolaDeHielo
	]
);



// Almaceno todos los héroes
var allHeroes = [
	
	heroe_axe,
	
	heroe_clinkz,
	
	heroe_lina
	
];