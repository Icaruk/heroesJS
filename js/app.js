
/*
	------ Por hacer ------
		
		- NO PRIORIDAD: Copiar el héroe al seleccionarlo para que no esté por referencia.
	
	.
*/


/*
	------ Esquema de eventos ------
	
	Init:
		fase.setPhase
		fase.drawSelectionHeroes
	
	Selección:
		fase.clickSlot
		juego.selectHero
		---> Y cuando están todos seleccionados:
		juego.setHeroAsActive
		hud.updateHud(0)
		hud.updateSkills()
		fase.setPhase
		
	Pulsar skill:
		fase.pressSkill
		miHeroe.useSkill
			this.addMana
			hud.showDamageDone
			---> Si el enemigo muere
			juego.swapActiveHero
		hud.updateHud
		juego.nextTurn()
		
	.
	
*/



// Vars



// Objs
const juego = {
	
	turno: 1, // 1 o 2
	turnosTotales: 0,
	
	p1_heroeActivo: null,
	p1_heroeInactivo: null,
	
	p2_heroeActivo: null,
	p2_heroeInactivo: null,
	
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
		
		// Obtengo la key del slot
		let key = this.getKey (idJugador, idSlot);
		
		
		// Clono el héroe
		// let heroeClonado = new Heroe(); 	// declaro todo undefined
		// heroeClonado = {... objHeroe}; // copio las propiedades
		
		
		// Lo almaceno en el slot
		this[key] = objHeroe;
		
		
		// Le pongo id única
		objHeroe.id = uniqueHeroId;
		uniqueHeroId ++ ;
		
		
		// Le almaceno el padre
		objHeroe.padre = idJugador;
		
		
		// Log
		console.log(`El jugador ${idJugador} ha puesto a ${objHeroe.nombre} en su slot ${idSlot}`);
		
	},
	
	
	
	swapActiveHero (idJugador, ignoraTurno = false) {
		/*
			Pone como activo el héroe que tengo guardado.
			juego.swapActiveHero (1);
			juego.swapActiveHero (2);
		*/
		
		
		// Obtengo slot
		let keySlotActivo = `p${idJugador}_heroeActivo`;
		let keySlotInactivo = `p${idJugador}_heroeInactivo`;
		
		
		// Heroes
		let heroeActivo = juego[keySlotActivo];
		let heroeInactivo = juego[keySlotInactivo];	
		
		
		// ¿Es mi turno?
		if (!ignoraTurno && juego.turno != idJugador) {
			return;
		};
		
		
		// ¿Está vivo el inactivo?
		if (heroeInactivo.vida == 0) {
			return;
		};
		
		
		// Intercambio
		juego[keySlotActivo] = heroeInactivo;
		juego[keySlotInactivo] = heroeActivo;
		
		
		// Paso turno
		juego.nextTurn(); // aquí actualizo HUD y skills
		
	},
	
	
	
	setHeroAsActive (idJugador, idSlot, asActive = true, pasaTurno = true) {
		/*
			Cierto jugador saca su héroe de cierto slot para que luche.
			
			juego.setHeroAsActive (1, 2); 			// pone el héroe del slot 2 como activo
			juego.setHeroAsActive (1, 2, false); 	// pone el héroe del slot 2 como inactivo
			juego.setHeroAsActive (1, 2, true, false); 	// pone el héroe del slot 2 como activo y pasa turno
		*/
		
		// Obtengo el héroe que quiero
		let heroe = this.getHero (idJugador, idSlot);
		
		
		// Obtengo slot
		let keySlotActivo = `p${idJugador}_heroeActivo`;
		let keySlotInactivo = `p${idJugador}_heroeInactivo`;
		
		
		// Pregunto si estoy sacando el que ya tengo activo
		if (heroe == this[keySlotActivo]) {
			console.error("Se ha intentado sacar un héroe que ya estaba fuera.");
			return;
		};
		
		
		// Saco como activo (o inactivo) el heroe que he pedido
		if (asActive) {
			this[keySlotActivo] = heroe;
		} else {
			this[keySlotInactivo] = heroe;
		};
		
		
		// Log
		console.log(`El jugador ${idJugador} ha sacado a su héroe ${idSlot} (${heroe.nombre})`);
		
		
		// Paso turno
		hud.updateHud(idJugador);
		
		
		// ¿Actualizo HUD?
		if (pasaTurno) {
			this.nextTurn();
		};
		
		
	},
	
	
	
	getEnemyId() {
		/*
			Devuelve el idJugador enemigo, respecto al turno en el que se esté.
			En el turno 1, devuelve 2. En el turno 2, devuelve 1.
			
			juego.getEnemyId();
		*/
		
		let idJugadorEnemigo = 2;							// turno 1
		if (this.turno == 2) {idJugadorEnemigo = 1};		// turno 2
		
		
		return idJugadorEnemigo;
		
	},
	
	
	
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
	
	
	getHero (idJugador, slot) {
		/*
			Devuelve el héroe que tiene cierto jugador en cierto slot.
			
			let res = juego.getHero (1, 1);
		*/
		
		let key = this.getKey (idJugador, slot);
		return this[key];
		
	},
	
	
	
	getInactiveHero (idJugador) {
		/*
			Devuelve el héroe inactivo que tiene cierto jugador en cierto slot.
			
			let res = juego.getHero (1, 1);
		*/
		
		let key = this.getKey (idJugador, slot);
		return this[key];
		
	},	
	
	
	
	// ------------------------
	
	
	
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
		
		
		// Sumo turno
		this.turnosTotales ++;
		console.log ("Turno de: " + this.turno);
		
		
		// Obtengo heroes
		miHeroe = this.getMyHero();
		suHeroe = this.getHisHero();
		
		
		// Aumento stats
		miHeroe.gainStats();
		suHeroe.gainStats();
		
		
		// Doy mana al héroe que va a jugar ahora
		miHeroe.addMana( 5 + (miHeroe.int * 0.5) );
		
		
		// Actualizo los botones de la skills según el turno
		hud.updateSkills();
		hud.updateHud(0);
		
		
		// Compruebo victoria
		let ganador = 0;
		
		if (juego.p1_slot1.vida == 0 && juego.p1_slot2.vida == 0) {
			ganador = 2;
		} else if (juego.p2_slot1.vida == 0 && juego.p2_slot2.vida == 0) {
			ganador = 1;
		};
		
		
		// Si hay ganador
		if (ganador != 0) {
			juego.ganador = ganador;
			fase.setPhase(3);
			fase.drawEndOfCombat();
		};
		
		
	},	
	
	
	
	pressSkill (idJugador, idSkill) {
		/*
			Cuando un jugador pulsa un botón de habilidad se ejecuta esto.
			
			pressSkill(0);
			pressSkill(1);
			pressSkill(2);
		*/
		
		// ¿Es mi turno?
		if (idJugador != juego.turno) {
			return;
		};
		
		
		// Obtengo mi héroe y mi enemigo
		let miHeroe = juego.getMyHero();
		let suHeroe = juego.getHisHero();
		
		
		// Compruebo si tengo maná
		if (! miHeroe.hasManaToUse(idSkill)) {
			console.log ( `${miHeroe.nombre} ha intentado usar una habilidad, pero no tenía mana.` ); 
			return;
		};
		
		
		// Uso la habilidad
		miHeroe.useSkill (idSkill, suHeroe);
		
		
		// Paso turno
		hud.updateHud(juego.turno)
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
		
		let fase = "fase" + idFase; // genero "fase1"
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
		
		// Blur al héroe que acabo de seleccionar
		uti.$(`imgHeroe_${idxHeroe}`).classList.add("blur");
		
		
		// Y lo desactivo
		uti.$(`divHeroe_${idxHeroe}`).onclick = "";
		
		
		// Saco key de nSlot_pX
		let keyNSlot = `nSlot_p${this.turnoSeleccion}`; // genero nSlot_p1
		
		
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
			
			// Pongo heroes activos e inactivos
			juego.setHeroAsActive (1, 1, true, false);			// slot 1 activo
			juego.setHeroAsActive (1, 2, false, false);	// slot 2 inactivo
			
			juego.setHeroAsActive (2, 1, true, false);
			juego.setHeroAsActive (2, 2, false, false);
			
			
			// Actualizo HUD
			hud.updateHud(0);
			hud.updateSkills();
			
			
			// Paso de fase
			fase.setPhase(2);
			
		};
		
		
	},
	
	
	
	drawSelectionHeroes() {
		/*
			Dibuja todos los héroes de la selección de héroes.
			fase.drawHeroes();
		*/
		
		let caja = uti.$("cajaHeroes"); // contenedor de los héroes seleccionables
		
		
		// Itero por todos los héroes y concateno string
		let strHtml = "";
		let idx = 0;
		
		for (let _x of allHeroes) {
			
			strHtml +=
			`<div onclick="fase.clickSlot(${idx})" id="divHeroe_${idx}">
				<div class="nombreHeroe">${_x.nombre}</div>
				<img src="${_x.img}" id="imgHeroe_${idx}">
			</div>`;
			
			
			
			idx ++;
			
		};
		
		
		// Pinto
		caja.innerHTML = strHtml;
		
	},
	
	
	
	drawEndOfCombat() {
		/*
			fase.drawEndOfCombat();
		*/
		
		uti.$("infoPostCombate").innerText = `Ganador: jugador ${juego.ganador}`;
		
	}
	
	
	
};



const hud = {
	
	enableButton(enabled, ele) {
		/*
			Activa o desactiva un botón y le da el aspecto desactivado.
			
			hud.enableButton(true, elemento);
			hud.enableButton(false, elemento);
		*/
		
		ele.disabled = !enabled;
		
		
		if (enabled) {
			ele.classList.remove("botonDesactivado");
		} else {
			ele.classList.add("botonDesactivado");
		};
		
	},
	
	
	
	updateHud (idJugador = 0) {
		/*
			Actualiza el HUD en la partida.
			
			hud.updateHud(1); // actualiza el HUD del jugador 1
			hud.updateHud(2); // actualiza el HUD del jugador 2
			hud.updateHud(0); // actualiza el HUD de todos
		*/
		
		
		if (idJugador === 0) {
			
			this.updateHud(1);
			this.updateHud(2);
			
		} else {
		
			
			// Saco heroes de slots
			let heroe1 = juego.getHero (idJugador, 1);
			let heroe2 = juego.getHero (idJugador, 2);
			
			
			// Saco héroes activos
			let miHeroe = juego.getMyHero(idJugador);
			// let suHeroe = this.getHisHero();
			
			
			// Pongo mis slots y mis skills
			// uti.$(`p${idJugador}_slot1`).innerText = heroe1.nombre;
			// uti.$(`p${idJugador}_slot2`).innerText = heroe2.nombre;
			
			uti.$(`p${idJugador}_b1`).innerText = miHeroe.skills[0].nombre;
			uti.$(`p${idJugador}_b2`).innerText = miHeroe.skills[1].nombre;
			uti.$(`p${idJugador}_b3`).innerText = miHeroe.skills[2].nombre;
			
			uti.$(`imgHeroe${idJugador}`).src = miHeroe.img;
			
			
			let gananciaStr = "";
			if (miHeroe.gananciaStr > 0) {gananciaStr = `(+${miHeroe.gananciaStr})`}
			let gananciaAgi = "";
			if (miHeroe.gananciaAgi > 0) {gananciaAgi = `(+${miHeroe.gananciaAgi})`}
			let gananciaInt = "";
			if (miHeroe.gananciaInt > 0) {gananciaInt = `(+${miHeroe.gananciaInt})`}
			
			uti.$(`infoHeroe${idJugador}`).innerHTML = `
				<img class="imgAtributos" src="https://i.gyazo.com/4664196f8b0b9f28b0a0aa2af6ac2e44.png"> ${miHeroe.str} ${gananciaStr}
				<img class="imgAtributos" src="https://i.gyazo.com/7a764ac142df7b24027f2a33603554a7.png"> ${miHeroe.agi} ${gananciaAgi}
				<img class="imgAtributos" src="https://i.gyazo.com/85f8c03626cb33cc579b30822bcd8a25.png"> ${miHeroe.int} ${gananciaInt}
			`;
			
			
			let barraVida = uti.$(`barraVida${idJugador}`);
			let barraMana = uti.$(`barraMana${idJugador}`);
			let txtBarraVida = uti.$(`p${idJugador}_textoBarraVida`);
			let txtBarraMana = uti.$(`p${idJugador}_textoBarraMana`);
			
			barraVida.style.width = `${miHeroe.vida * 100 / miHeroe.vidaMax}%`;
			txtBarraVida.innerText = `${miHeroe.vida} / ${miHeroe.vidaMax}`;
			
			barraMana.style.width = `${miHeroe.mana * 100 / miHeroe.manaMax}%`;
			txtBarraMana.innerText = `${miHeroe.mana} / ${miHeroe.manaMax}`;
			
			// hud.animBar (barraVida, 50);
			// hud.animBar (barraMana, 50);
			
		};
		
	},
	
	
	
	updateSkills() {
		/*
			En el turno 1 desactiva los botones del jugador 2, y viceversa.
			hud.updateSkills();
		*/
		
		// Listo los botones 
		let arrBotones = [
			["imgHeroe1", "p1_b1", "p1_b2", "p1_b3", "p1_slot"],
			["imgHeroe2", "p2_b1", "p2_b2", "p2_b3", "p2_slot"]
		];
		
		
		// Activo mis botones botones, porque es mi turno
		for (let _x of (arrBotones[juego.turno - 1]) ) {
			// hud.enableButton(true, uti.$(_x));
			uti.$(_x).classList.remove("byn");
		};
		
		
		// Deshabilito los botones del otro
		for (let _x of (arrBotones[juego.getEnemyId() - 1]) ) {
			// hud.enableButton(false, uti.$(_x));
			uti.$(_x).classList.add("byn");
		};
		
		
		// Pongo la imagen y el tooltip de cada skill
		for (let _idJugador of [1, 2]) {
			
			let heroeActivo = juego[`p${_idJugador}_heroeActivo`];
			let comprobarMana = _idJugador == juego.turno; // si es mi turno, compruebo mana
			
			
			for (let i = 1; i <= 3; i++) {
				
				let botonSkill = uti.$(`p${_idJugador}_b${i}`);
				let skill = heroeActivo.skills [i - 1];
				
				
				// Pongo la imagen
				botonSkill.src = skill.img; // p1_b1
				
				
				// Compruebo si tengo mana
				if (comprobarMana) {
					if (heroeActivo.mana < skill.costeMana) {
						botonSkill.classList.add("byn"); // esto lo quitaré la próxima vez al entrar en esta función
					};
				};
				
				
				uti.$(`tooltip_p${_idJugador}_b${i}`).title = heroeActivo.skills[i - 1].getInfo(); // tooltip_p1_b1
			};
			
		};
		
		
		// Pongo la imagen de los héroes inactivos
		uti.$("p1_slot").src = juego.p1_heroeInactivo.img;
		uti.$("p2_slot").src = juego.p2_heroeInactivo.img;
		
		
		// Compruebo si están muertos
		if (juego.p1_heroeInactivo.vida == 0) {
			uti.$("p1_slot").classList.add("blur-byn");
		};
		if (juego.p2_heroeInactivo.vida == 0) {
			uti.$("p2_slot").classList.add("blur-byn");
		};
		
		
	},
	
	
	
	showDamageDone(dmg, color) {
		/*
			Muestra el daño causado en el centro de la pantalla.
			
			hud.showDamageDone(450);
			hud.showDamageDone(450, "red");
			hud.showDamageDone(450, "orange");
		*/
		
		let ele = uti.$("combate_textoColumnaCentro");
		
		
		// Aplico color
		if (!color) {color = "red"};
		ele.style.color = color;
		
		
		// Muestro texto
		ele.innerText = dmg;
		ele.style.opacity = 1;
		
		
		
		setTimeout(() => {
		
			// Selecciono animación
			let empuje = 110;
			
			anims = {
				"1": [
					{transform: `translateX(0px)`},
					{transform: `translateX(-${empuje}px)`}
				],
				
				"2": [
					{transform: `translateX(0px)`},
					{transform: `translateX(${empuje}px)`}
				]
			};
			
			
			// Animo de mi lado hasta el suyo
			ele.animate(anims[juego.turno], { // animo
				duration: 350,
				iterations: 1,
				easing: "ease-in-out",
				// fill: "forwards" // no mantengo
			});
			
			
			// Espero para desvanecer
			setTimeout(() => {
				
				ele.animate([
					{opacity: 1},
					{opacity: 0}
				], {
					duration: 350,
					iterations: 1,
					easing: "ease-in-out",
				});
				
				
				ele.style.opacity = 0;
				
			}, 0, ele);
			
		}, 750, ele);
		
	},
	
	
	
	animBar (ele, porcentajeWidthFuturo) {
		/*
			Anima una barra.
			
			hud.animBar (elementoHTML, 50);
		*/
		
		console.log( ele );
		
		let widthActual = ele.style.width;
		console.log( "Actual: " + widthActual );
		
		// ele.style.width = `${90}%`;
		
		
		/*
		let loop = setInterval(() => {
			
			let w = ele.style.width - 1;
			console.log( w );
			
			if (w >= porcentajeWidthFuturo) {
				clearInterval(loop);	
			};
			
			ele.style.width = `${w}%`;
			
		}, 0, ele);
		*/
		
			
	}
	
	
	
};



// EHs
uti.$("p1_b1").addEventListener		("click", ()=> {juego.pressSkill(1, 0)});
uti.$("p1_b2").addEventListener		("click", ()=> {juego.pressSkill(1, 1)});
uti.$("p1_b3").addEventListener		("click", ()=> {juego.pressSkill(1, 2)});
uti.$("p1_slot").addEventListener	("click", ()=> {juego.swapActiveHero (1)});

uti.$("p2_b1").addEventListener		("click", ()=> {juego.pressSkill(2, 0)});
uti.$("p2_b2").addEventListener		("click", ()=> {juego.pressSkill(2, 1)});
uti.$("p2_b3").addEventListener		("click", ()=> {juego.pressSkill(2, 2)});
uti.$("p2_slot").addEventListener	("click", ()=> {juego.swapActiveHero (2)});


// Genero selección de héroes
fase.drawSelectionHeroes();


// Empiezo en fase 1
fase.setPhase(1);



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