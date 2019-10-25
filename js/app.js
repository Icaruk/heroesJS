
/*
	- No poder pulsar los botones del otro en mi turno.	
	- Copiar el héroe al seleccionarlo para que no esté por referencia.
	
	
*/



// Vars
const ele_p1_b1 = uti.$("p1_b1");
const ele_p1_b2 = uti.$("p1_b2");
const ele_p1_b3 = uti.$("p1_b3");
const ele_p1_slot1 = uti.$("p1_slot1");
const ele_p1_slot2 = uti.$("p1_slot2");
const ele_p2_b1 = uti.$("p2_b1");
const ele_p2_b2 = uti.$("p2_b2");
const ele_p2_b3 = uti.$("p2_b3");
const ele_p2_slot1 = uti.$("p2_slot1");
const ele_p2_slot2 = uti.$("p2_slot2");



// Obj juego
const juego = {
	
	turno: 1, // 1 o 2
	turnosTotales: 0,
	
	p1_heroeActivo: null,
	p2_heroeActivo: null,
	
	p1_slot1: null,
	p1_slot2: null,
	p2_slot1: null,
	p2_slot2: null,
	
	
	
	getKey (idJugador, idSlot) {
		/*
			Devuelve la key para acceder al héroe del slot de un jugador.
			
			getKey (1, 1) //--> "p1_slot1"
		*/
		
		return `p${idJugador}_slot${idSlot}`;
	},
	
	
	
	selectHero (idJugador, idSlot, objHeroe) {
		/*
			Almacena un héroe en el slot de un jugador.
				Usado en la selección de héroes.
				
			juego.selectHero (1, 1, heroe_lina);
		*/
		
		let key = this.getKey (idJugador, idSlot);
		this[key] = objHeroe;
		
		
		cl(`El jugador ${idJugador} ha puesto a ${objHeroe.nombre} en su slot ${idSlot}`);
		
	},
	
	
	
	getHero (idJugador, slot) {
		/*
			Devuelve el héroe que tiene cierto jugador en cierto slot.
			
			let res = juego.getHero (1, 1);
		*/
		
		let key = this.getKey (idJugador, slot);
		return this[key];
		
	},
	
	
	
	updateHud (idJugador = 0) {
		/*
			Actualiza el HUD en la partida.
			
			juego.updateHud(1); // actualiza el HUD del jugador 1
			juego.updateHud(2); // actualiza el HUD del jugador 2
			juego.updateHud(0); // actualiza el HUD de todos
		*/
		
		
		if (idJugador === 0) {
			
			juego.updateHud(1);
			juego.updateHud(2);
			
		} else {
		
			
			// Saco heroes de slots
			let heroe1 = this.getHero (idJugador, 1);
			let heroe2 = this.getHero (idJugador, 2);
			
			
			// Saco héroes activos
			let miHeroe = this.getMyHero(idJugador);
			// let suHeroe = this.getHisHero();
			
			
			// Pongo mis slots y mis skills
			if (idJugador == 1) {
				
				ele_p1_slot1.innerText = heroe1.nombre;
				ele_p1_slot2.innerText = heroe2.nombre;
				
				ele_p1_b1.innerText = miHeroe.skills[0].nombre;
				ele_p1_b2.innerText = miHeroe.skills[1].nombre;
				ele_p1_b3.innerText = miHeroe.skills[2].nombre;
				
				uti.$("imgHeroe1").src = miHeroe.img;
				uti.$("infoHeroe1").innerText = `Vida: ${miHeroe.vida}`;
				
				uti.$("barraVida1").style.width = `${miHeroe.vida * 100 / miHeroe.vidaMax}%`
				
			} else {
				
				ele_p2_slot1.innerText = heroe1.nombre;
				ele_p2_slot2.innerText = heroe2.nombre;
				
				ele_p2_b1.innerText = miHeroe.skills[0].nombre;
				ele_p2_b2.innerText = miHeroe.skills[1].nombre;
				ele_p2_b3.innerText = miHeroe.skills[2].nombre;
				
				uti.$("imgHeroe2").src = miHeroe.img;
				uti.$("infoHeroe2").innerText = `Vida: ${miHeroe.vida}`;
				
				uti.$("barraVida2").style.width = `${miHeroe.vida * 100 / miHeroe.vidaMax}%`
				
			};
			
			
		};
		
	},
	
	
	
	setHeroAsActive (idJugador, idSlot, pasaTurno = true) {
		/*
			Cierto jugador saca su héroe de cierto slot para que luche.
			
			juego.setHeroAsActive (1, 2); // pone el héroe del slot 2 a luchar
		*/
		
		// Obtengo el héroe que quiero
		let heroe = this.getHero (idJugador, idSlot);
		
		
		// Obtengo slot
		let keySlot = "p1_heroeActivo";
		
		if (idJugador == 2) {
			keySlot = "p2_heroeActivo";
		};
		
		
		// Pregunto si estoy sacando el que ya tengo activo
		if (heroe == this[keySlot]) {
			ce("Se ha intentado sacar un héroe que ya estaba fuera.");
			return;
		};
		
		
		// Lo pongo
		this[keySlot] = heroe;
		
		
		// Log
		cl(`El jugador ${idJugador} ha sacado a su héroe ${idSlot} (${heroe.nombre})`);
		
		
		// Paso turno
		this.updateHud(idJugador);
		
		
		if (pasaTurno) {
			this.nextTurn(); // al pasar turno actualizo HUD
		};
		
		
	},
	
	
	
	nextTurn() {
		/*
			Pasa al siguiente turno.
			
			juego.nextTurn();
		*/
		
		if (this.turno == 1) {
			this.turno = 2;
		} else {
			this.turno = 1;
		};
		
		
		// Actualizo HUD
		this.updateHud(this.turno);	
		
		
		// Sumo turno	
		this.turnosTotales ++;
		cl ("Turno: " + this.turno);
		
	},
	
	
	
	getEnemyId() {
		/*
			Devuelve el idJugador enemigo, respecto al turno en el que se esté.
			En el turno 1, devuelve 2. En el turno 2, devuelve 1.
			
			juego.getEnemyId();
		*/
		
		let idJugadorEnemigo = 2;					// turno 1
		if (this.turno == 2) {idJugadorEnemigo = 1};		// turno 2
		
		
		return idJugadorEnemigo;
		
	},
	
	
	
	// ------------------------
	
	
	
	getMyHero(idJugador = this.turno) {
		/*
			Devuelve mi héroe activo.
			
			juego.getMyHero();		// devuelve el héroe del dueño del turno
			juego.getMyHero(1);	// devuelve el héroe activo del jugador 1
			juego.getMyHero(2);	// devuelve el héroe activo del jugador 2
		*/
		
		return juego[`p${idJugador}_heroeActivo`];
	},
	
	
	
	getHisHero() {
		/*
			Devuelve el héroe activo del enemigo.
			juego.getHisHero();
		*/
		
		return juego[`p${this.getEnemyId()}_heroeActivo`]
	},	
	
	
	
	pressSkill (idSkill) {
		/*
			Cuando un jugador pulsa un botón de habilidad se ejecuta esto.
			
			pressSkill(0);
			pressSkill(1);
			pressSkill(2);
		*/
		
		
		// Obtengo mi héroe y mi enemigo
		let miHeroe = juego.getMyHero();
		let suHeroe = juego.getHisHero();
		
		
		// Uso la habilidad
		miHeroe.useSkill (idSkill, suHeroe);
		
		
		// Paso turno
		juego.nextTurn();
		
		
	}
	
	
	
};



const fase = {
	
	turnoSeleccion: 1,	// idJugador de quién selecciona
	nSlot_p1: 1,		// En qué slot se va a meter el héroe seleccionado
	nSlot_p2: 1,
	
	
	setPhase(idFase) {
		/*
			Muestra y oculta secciones para que se vea la fase actual.
			fase.setPhase(1); // fase 1
		*/
		
		let fase = "fase" + idFase;
		let secciones = ["fase1", "fase2", "fase3"];
		
		
		// Quito mi sección del array de secciones
		uti.delFromArr(secciones, fase);
		
		
		// Oculto las secciones
		for (let _x of secciones) {
			uti.$(_x).style.display = "none";
		};
		
		
		// Muestro la mía
		uti.$(fase).style.display = "block";
		
	},
	
	
	
	clickSlot(idxHeroe) {
		
		// Saco key de nSlot_pX
		let keyNSlot = `nSlot_p${this.turnoSeleccion}`; // genero nSlot_p1
		cl(keyNSlot);
		
		// Saco obj del héroe seleccionado
		let heroe = allHeroes[idxHeroe];
		
		
		// Selecciono
		juego.selectHero (this.turnoSeleccion, fase[keyNSlot], heroe);
		
		
		// Saco la id del HTML img
		let idImg = `p${this.turnoSeleccion}_seleccion${fase[keyNSlot]}`; // genero nSlot_p1
		
		
		// Le pongo la imagen
		uti.$(idImg).src = heroe.img;
		
		
		// Aumento nSlot_pX
		fase[keyNSlot] += 1;
		
		
		// Cambio el turno de selección
		if (this.turnoSeleccion == 1) {
			this.turnoSeleccion = 2;
		} else {
			this.turnoSeleccion = 1;
		};
		
		
		// Termino la fase de selección
		if (this.nSlot_p1 >= 3 && this.nSlot_p2 >= 3) {
			
			// Saco el héroe del slot 1 de cada jugador
			juego.setHeroAsActive (1, 1, false);
			juego.setHeroAsActive (2, 1, false);			
			
			
			// Actualizo HUD
			juego.updateHud(0);
			
			
			// Paso de fase
			fase.setPhase(2);
			
		};
		
		
		
		
	},
	
	
	
	drawSelectionHeroes() {
		/*
			Dibuja todos los héroes de la selección de héroes.
			fase.drawHeroes();
		*/
		
		let zona1 = uti.$("cajaHeroes"); // contenedor de los héroes seleccionables
		
		
		// Itero por todos los héroes y concateno string
		let strHtml = "";
		let idx = 0;
		
		for (let _x of allHeroes) {
			
			strHtml +=
			`<div onclick="fase.clickSlot(${idx})">
				<div class="nombreHeroe">${_x.nombre}</div>
				<img src="${_x.img}">
			</div>`;
			
			
			idx ++;
			
		};
		
		
		// Pinto
		zona1.innerHTML = strHtml;
		
	},
	
	
};




// EHs
ele_p1_b1.addEventListener		("click", ()=> {juego.pressSkill(0)});
ele_p1_b2.addEventListener		("click", ()=> {juego.pressSkill(1)});
ele_p1_b3.addEventListener		("click", ()=> {juego.pressSkill(2)});
ele_p1_slot1.addEventListener	("click", ()=> {juego.setHeroAsActive(1, 1)});
ele_p1_slot2.addEventListener	("click", ()=> {juego.setHeroAsActive(1, 2)});

ele_p2_b1.addEventListener		("click", ()=> {juego.pressSkill(0)});
ele_p2_b2.addEventListener		("click", ()=> {juego.pressSkill(1)});
ele_p2_b3.addEventListener		("click", ()=> {juego.pressSkill(2)});
ele_p2_slot1.addEventListener	("click", ()=> {juego.setHeroAsActive(2, 1)});
ele_p2_slot2.addEventListener	("click", ()=> {juego.setHeroAsActive(2, 2)});


// Empiezo en fase 1
fase.setPhase(1);


// Genero selección de héroes
fase.drawSelectionHeroes();


// Selección de héroes
/*
juego.selectHero (1, 1, heroe_lina);
juego.selectHero (1, 2, heroe_lina);

juego.selectHero (2, 1, heroe_axe);
juego.selectHero (2, 2, heroe_axe);


// Saco al primero
juego.setHeroAsActive (1, 1, false);
juego.setHeroAsActive (2, 1, false);
*/


// Init
// juego.nextTurn(); // pongo turno 1