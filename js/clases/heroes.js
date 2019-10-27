
var uniqueHeroId = 1;



class Heroe {
	
	constructor (
		nombre, img,
		str, agi, int,
		gananciaStr, gananciaAgi, gananciaInt,
		vida, defFisica, defMagica,
		skills
	) {
		
		this.nombre = nombre;
		this.img = img;
		
		this.str = str; // estos 3 variarán
		this.agi = agi;
		this.int = int;
		this.strBase = str; // estos 3 no
		this.agiBase = agi;
		this.intBase = int;
		
		this.gananciaStr = gananciaStr;
		this.gananciaAgi = gananciaAgi;
		this.gananciaInt = gananciaInt;
		
		this.vida = vida; 		// esto variará
		this.vidaMax = vida; 	// esto no
		
		this.defFisica = defFisica;
		this.defMagica = defMagica;
		
		this.skills = skills;
		
		this.mana = 100; 		// esto variará
		this.manaMax = 100; 	// esto no
		
	};
	
	
	
	hasManaToUse (idxSkill) {
		/*
			Devuelve si tiene mana para lanzar la habilidad.
			this.hasManaToUse(objKill);
		*/
		
		// Selecciono la skill
		let skill = this.skills[idxSkill];
		
		
		// Return		
		return (this.mana >= skill.costeMana);
		
	};
	
	
	
	addMana (n) {
		/*
			Cambia el maná del héroe.
			
			this.addMana(20);
			this.addMana(-20);
		*/
		
		this.mana = uti.minMax ( this.mana + (Math.ceil(n)), 0, this.manaMax );
		
	};
	
	
	
	gainStats() {
		/*
			Incrementa los stats del héroe según sus ganacias personales.
			this.gainStats();
		*/
		
		this.str += this.gananciaStr;
		this.agi += this.gananciaAgi;
		this.int += this.gananciaInt;
		
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
		
		
		// Gasto mana
		this.addMana( - skill.costeMana);
		
		
		// Calculo el ataque que tengo con esa skill
		let atk = skill.getAtk(this);
		
		
		// Color del daño mostrado
		let color = "red";
		
		
		// Aplico crítico
		if (skill.tipo == "FIS") {
			
			let agi = this.agi;
			let porcentaje = uti.minMax( (agi * 0.5), 0, 100);
			
			if (uti.random(0, 100) <= porcentaje) {
				atk = atk * 1.5;
				color = "orange";
			};
			
		};
		
		
		// Aplico reducciones según defensa
		let reduccion = 0;
		
		if (skill.tipo == "MAG") {
			reduccion = objetivo.defMagica;
		} else {
			reduccion = objetivo.defFisica;
		};
		
		atk = Math.ceil ( atk * (100 / (100 - reduccion)) );
		
		
		// Calculo la vida final
		let vidaFinal = Math.max (objetivo.vida - atk, 0);
		
		
		// Quito vida
		objetivo.vida = vidaFinal;
		
		
		// Muestro
		hud.showDamageDone(atk, color);
		
		
		// Log
		console.log (`${this.nombre} (${atk}) --> ${objetivo.nombre}`);
		
		
		// ¿Muerte?
		if (vidaFinal <= 0) {
			console.warn ( `Héroe muerto: ${objetivo.nombre}` );
			juego.swapActiveHero (juego.getEnemyId(), true);
		};
		
		
	}
	
	
	
};



// Fuerza
heroe_axe = new Heroe (
	"Axe", "https://es.dotabuff.com/assets/heroes/axe-c50aa8d225ae00dd2a3c6016f726f7d07eecfae07cc853d13beb1168837db9dc.jpg",
	30, 15, 5,
	2, 0, 0,
	2000, 40, 5,
	[
		AtaqueMelee,
		BattleHunger,
		CullingBlade
	]
);

heroe_sven = new Heroe (
	"Sven", "https://es.dotabuff.com/assets/heroes/sven-c43dfb9d167908ae71baef7df9a1259a08cb168a237be916cf72bf49efa389b7.jpg",
	35, 10, 5,
	2, 0, 0,
	1850, 40, 5,
	[
		AtaqueMelee,
		HammerStorm,
		GreatCleave
	]
);



// Agilidad
heroe_clinkz = new Heroe (
	"Clinkz", "https://es.dotabuff.com/assets/heroes/clinkz-cb25ffdf344c24d992d225ed9a61767d6f8c0ac12a15ef733d1773f468e724b9.jpg",
	10, 25, 15,
	0, 2, 1,
	2000, 20, 20,
	[
		AtaqueDistancia,
		SearingArrow,
		Strafe
	]
);


heroe_phantomAssasin = new Heroe (
	"Phantom Assasin", "https://es.dotabuff.com/assets/heroes/phantom-assassin-39fa845b71a1b8215f3fc8735f4a8d16a1d0e88b00fd8286388779399bf187ed.jpg",
	10, 40, 0,
	0, 2, 1,
	2000, 20, 20,
	[
		AtaqueDistancia,
		StiflingDagger,
		CoupDeGrace
	]
);



// Inteligencia
heroe_lina = new Heroe (
	"Lina", "https://es.dotabuff.com/assets/heroes/lina-8c8d6b1957d3652b7d1dd544497dfce81900a8d707d3ef016bc664cd63d4ffc7.jpg",
	5, 10, 35,
	0, 3, 1,
	1500, 15, 40,
	[
		AtaqueMagico,
		DragonSlave,
		LagunaBlade
	]
);

heroe_ancientApparition = new Heroe (
	"Ancient Apparition", "https://es.dotabuff.com/assets/heroes/ancient-apparition-f51db57a5e1ca4609fc30e195e71fbc220eb9dbe6e1db41b7d4cb431c91c7779.jpg",
	5, 5, 40,
	0, 3, 1,
	1500, 15, 40,
	[
		AtaqueMagico,
		ColdFeet,
		IceBlast
	]
);



// Almaceno todos los héroes
var allHeroes = [
	
	heroe_axe,
	heroe_sven,
	
	heroe_clinkz,
	heroe_phantomAssasin,
	
	heroe_lina,
	heroe_ancientApparition
	
];