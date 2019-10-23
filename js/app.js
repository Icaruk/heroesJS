
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
	
	
	
	setHeroe (idJugador, idSlot, objHeroe) {
		/*
			Almacena un héroe en el slot de un jugador.
				Usado en la selección de héroes.
				
			juego.setHeroe (1, 1, heroe_lina);
		*/
		
		let key = this.getKey (idJugador, idSlot);
		this[key] = objHeroe;
		
	},
	
	
	
	getHeroe (idJugador, slot) {
		/*
			Devuelve el héroe que tiene cierto jugador en cierto slot.
			
			let res = juego.getHeroe (1, 1);
		*/
		
		let key = this.getKey (idJugador, slot);
		return this[key];
		
	},
	
	
	
	updateHud (idJugador) {
		/*
			juego.updateHud(1);
		*/
		
		// Saco heroes de slots
		let heroe1 = this.getHeroe (idJugador, 1);
		let heroe2 = this.getHeroe (idJugador, 2);
		
		
		// Saco héroes activos
		let miHeroe = this.getMiHeroe();
		let suHeroe = this.getSuHeroe();
		
		
		// Pongo mis slots y mis skills
		if (idJugador == 1) {
			
			ele_p1_slot1.innerText = heroe1.nombre;
			ele_p1_slot2.innerText = heroe2.nombre;
			
			ele_p1_b1.innerText = miHeroe.skills[0].nombre;
			ele_p1_b2.innerText = miHeroe.skills[1].nombre;
			ele_p1_b3.innerText = miHeroe.skills[2].nombre;			
			
		} else {
			
			ele_p2_slot1.innerText = heroe1.nombre;
			ele_p2_slot2.innerText = heroe2.nombre;
			
			ele_p2_b1.innerText = miHeroe.skills[0].nombre;
			ele_p2_b2.innerText = miHeroe.skills[1].nombre;
			ele_p2_b3.innerText = miHeroe.skills[2].nombre;			
			
		};
		
	},
	
	
	
	sacaHeroe (idJugador, idSlot, pasaTurno = true) {
		/*
			Cierto jugador saca su héroe de cierto slot para que luche.
			
			juego.sacaHeroe (1, 2); // pone el héroe del slot 2 a luchar
		*/
		
		// Saco el héroe que quiero
		let heroe = this.getHeroe (idJugador, idSlot);
		
		
		// Lo pongo como luchador
		if (idJugador == 1) {
			this.p1_heroeActivo = heroe;
		} else {
			this.p2_heroeActivo = heroe;
		};
		
		
		// Log
		cl(`El jugador ${idJugador} ha sacado a su héroe ${idSlot} (${heroe.nombre})`);
		
		
		// Actualizo HUD
		this.updateHud(idJugador);
		
		
		// Paso turno
		if (pasaTurno) {
			this.pasaTurno();
		};
		
		
	},
	
	
	
	pasaTurno() {
		/*
			Pasa al siguiente turno.
			
			juego.pasaTurno();
		*/
		
		if (this.turno == 1) {
			this.turno = 2;
		} else {
			this.turno = 1;
		};
		
		
		this.turnosTotales ++;
		cl ("Turno: " + this.turno);
		
		
		// Actualizo HUD
		this.updateHud();
		
	},
	
	
	
	getTurnoContrario() {
		/*
			Devuelve el idJugador enemigo, respecto al turno en el que se esté.
			En el turno 1, devuelve 2. En el turno 2, devuelve 1.
			
			juego.getTurnoContrario();
		*/
		
		let idJugadorEnemigo = 2;					// turno 1
		if (this.turno == 2) {idJugadorEnemigo = 1};		// turno 2
		
		
		return idJugadorEnemigo;
		
	},
	
	
	
	// ------------------------
	
	
	
	getMiHeroe() {
		/*
			Devuelve mi héroe activo.
			juego.getMiHeroe();
		*/
		
		return juego[`p${this.turno}_heroeActivo`];
	},
	
	
	
	getSuHeroe() {
		/*
			Devuelve el héroe activo del enemigo.
			juego.getSuHeroe();
		*/
		
		return juego[`p${this.getTurnoContrario()}_heroeActivo`]
	},	
	
	
	
	pulsaSkill (idSkill) {
		/*
			Cuando un jugador pulsa un botón de habilidad se ejecuta esto.
			
			pulsaSkill(0);
			pulsaSkill(1);
			pulsaSkill(2);
		*/
		
		
		// Obtengo mi héroe y mi enemigo
		let miHeroe = juego.getMiHeroe();;
		let suHeroe = juego.getSuHeroe();;
		
		
		// Uso la habilidad
		miHeroe.usaSkill (idSkill, suHeroe);
		
		
		// Paso turno
		juego.pasaTurno();
		
		
	}
	
	
	
};



// EHs
ele_p1_b1.addEventListener		("click", ()=> {juego.pulsaSkill(0)});
ele_p1_b2.addEventListener		("click", ()=> {juego.pulsaSkill(1)});
ele_p1_b3.addEventListener		("click", ()=> {juego.pulsaSkill(2)});
ele_p1_slot1.addEventListener	("click", ()=> {juego.sacaHeroe(1, 1)});
ele_p1_slot2.addEventListener	("click", ()=> {juego.sacaHeroe(1, 2)});

ele_p2_b1.addEventListener		("click", ()=> {juego.pulsaSkill(0)});
ele_p2_b2.addEventListener		("click", ()=> {juego.pulsaSkill(1)});
ele_p2_b3.addEventListener		("click", ()=> {juego.pulsaSkill(2)});
ele_p2_slot1.addEventListener	("click", ()=> {juego.sacaHeroe(2, 1)});
ele_p2_slot2.addEventListener	("click", ()=> {juego.sacaHeroe(2, 2)});






// Selección de héroes
juego.setHeroe (1, 1, heroe_lina);
juego.setHeroe (1, 2, heroe_clinkz);

juego.setHeroe (2, 1, heroe_axe);
juego.setHeroe (2, 2, heroe_lina);


// Saco al primero
juego.sacaHeroe (1, 1, false);
juego.sacaHeroe (2, 1, false);

cl (juego);
cl (juego.getMiHeroe());



// Init
// juego.pasaTurno(); // pongo turno 1