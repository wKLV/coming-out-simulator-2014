function Start(){

	$ = {};
	
	/////// SET UP SCENE ////////

	Show("background","coffeehouse");
	Show("cup","cup_steam",{x:44,y:359});
	Show("nicky","coffee_nicky_still");

	PlaySound("bg","coffeehouse",{loop:-1, volume:0.7});

	//////////////////////////////

	N("<b>COMING OUT SIMULATOR 2014</b>");
	N("Un medio-cierto juego sobre medias verdades.");
	N("Ey jugador. Bienvenido a este juego, supongo.");
	N("¿Qué querrías hacer ahora?");

	Choose({
		"¡Vamos a jugar esto!": Play,
		"¿Quién eres? (Creditos)": function(){
			Credits("¿Quién eres?");
		},
		"Hm, cuantame más. (Acerca el juego)": function(){
			About("Hm, cuantame más.");
		}
	});

}

function SipCoffee(message){
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);
	PlaySound("sfx","coffee_sip");
	p(message);
	Show("nicky","coffee_nicky_still");
	Show("cup","cup_steam");
}

function Play(message){
	
	SipCoffee(message);

	// Asked neither
	if(!$.asked_about && !$.asked_credits){
		N("¡Directo al grano! ¡Genia!");
		N("No trastear con las secciones de Creditos o el Acerca el ---");
		p("Shhh.");
		N("Vale, vale.");
	}
	// Asked both
	if($.asked_about && $.asked_credits){
		p(". . .");
		p("¿Por qué hiciste esta una opción cuando era la última que quedaba.");
		N("NI IDEA");
	// Asked either
	}else if($.asked_about || $.asked_credits){
		N("¡Sí, vamos allá!");
	}

	N("Vayamos a hace cuatro años, a 2010...");
	p("¡¿Eso fue hace CUATRO años?!");
	N("...a la tarde en la que mi vida cambió para siempre.");

	N("Dime, querido jugador, ¿cómo crees que acaba todo?");

	Choose({
		"¿Con flores y arcoiris y unicornios gays?": function(message){
			$.main_menu_convo_1 = 1;

			p(message);
			N("Sí. Así es exactamente como acaba el juego.");
			p("¿De veras?");
			N("No.");
			Play_2();
		},
		"Apparentemente, contigo redditeando en Starbucks.": function(message){
			$.main_menu_convo_1 = 2;

			p(message);
			N("Ey, Estoy programando en este portatil. Convirtiendo mi historia de paso a la vida adulta en el juego que estas apunto de jugar.");
			p("Nah, probablemente estás procrastinando.");
			N("Mira quién lo dice.");
			p("Touché.");
			N("En cualquier caso...");
			Play_2();
		},
		"TODO ACABA EN SANGRE": function(message){
			$.main_menu_convo_1 = 3;

			p(message);
			N("Uh, comparado a eso, supongo que mi historia no es tan trágica.");
			N("Aunque es como una interpretación del vaso una centava-parte lleno.");
			p("sangreeeee.");
			N("En cualquier caso...");
			Play_2();
		}
	});

}

function Play_2(){

	if(!$.asked_about){
		N("Si no te hubieras saltado la sección de Acerca de, sabrías que es una historia muy personal.");
		p("Shhh.");
	}

	N("Este juego incluye diálogo que, yo, mis padres y mi exnovio dijimos de verdad.");
	N("Así como cosas que podríamos, deberíamos y nunca hubieramos dicho.");
	N("Ya no importa cuál es cuál.");
	N("Ya no.");

	Choose({
		"¿Cómo puedo ganar un juego sin respuestas correctas?": function(message){
			$.main_menu_convo_2 = 2;

			p(message);
			N("Exacto.");
			p(". . .");
			Play_3();
		},
		"Eres un poco deprimente, ¿no?": function(message){
			$.main_menu_convo_2 = 1;

			p(message);
			N("La VIDA es un pco deprimente.");
			p("Así que sí.");
			Play_3();
		},
		"¿Este juego de 'verdad' esta lleno de mentiras?": function(message){
			$.main_menu_convo_2 = 3;

			p(message);
			N("Incluso si el diálogo fuera 100% preciso, aún serían 100% de mentiras.");
			p(". . .");
			Play_3();
		}
	});

}

function Play_3(){

	N("Jugarás como yo, hacia 2010.");
	if(!$.asked_credits){
		N("Como te saltaste los créditos, mi nombre(no-legal-aún) es Nicky Case. Solo para que lo sepas.");
		p("Shhh.");
	}

	var whatISay;
	switch($.main_menu_convo_1){
		case 1: whatISay = "Este juego no acaba con unicornios gays. "; break;
		case 2: whatISay = "Este juego es de dejar el armario, dejar la niñez, dejar ir las cosas. "; break; // This was hard to translate, and i'm not very sure yet
		case 3: whatISay = "Este juego no acaba en sangre, sino en lagrimas. "; break;
	}
	switch($.main_menu_convo_2){
		case 1: whatISay += "Perdón por ser un poco deprimente."; break;
		case 2: whatISay += "Y no hay respuestas correctas."; break;
		case 3: whatISay += "Y está lleno de mentiras."; break;
	}
	N(whatISay);

	PlaySound("sfx","coffee_sip");
	Show("nicky","coffee_nicky_drink");
	Show("cup",null);

	p("Hey, I just said that!");

	// HACK - Just clear dialogue & stuff.
	Wait(1000);
	queue(ClearDialogue,0);

	Wait(500);
	Show("nicky","coffee_nicky_throw");
	PlaySound("sfx","coffee_throw");
	
	Wait(1000);
	Show("nicky","coffee_nicky_still_2");
	Wait(500);
	
	N("Cuando juegues...");
	N("escoge tus palabras sabiamente.");
	N("Cada personaje recordará todo lo que digas. O dejes de decir.");
	p("Sip. Incluso has sacado mis opciones el MENU PRINCIPAL.");
	N("Exactamente.");

	N(". . .");
	N("Algunas cosas son dificles de no recordar.");
	
	Clear();
	Start_Jack_1();

}

function Credits(message){

	$.asked_credits = true;
	
	if($.asked_about){
		SipCoffee(message);
	}else{
		SipCoffee("¿Quién eres?");
	}
	
	N("Ah, ¡Qué maleducado! Dejame introducirme.");
	N("Hola, Soy Nicky Case.");
	N("No es mi nombre legal, solo es mi nombre REAL.");

	p("Eso es rarísimo, tío."); // I hope everyone will understand this line, but dude :P
	if($.asked_about){
		p("¿Y cómo me has contado, esta es tu historia personal?");
	}else{
		p("¿Y cómo hiciste el juego?");
	}

	N("Sip, soy el único escritor / programador / artista de Coming Out Simulator 2014.");

	if($.asked_about){
		p("¿Todo esto tú solo?");
		p("Lo dije antes y lo volveré a decir...");
		p("Por supuesto. Maldito narcisista."); //Only narcisista hasn't the strength of the original, I think
		N("Bueno, claro no es TODO yo.");
		N("Los sónidos y audio son de distintas fuentes de dominio público.");
	}else{
		N("Los sónidos y audio, sin embargo, son de distintas fuentes de dominio público.");
	}

	N("Pero aunque esté principalmente sólo detrás de este juego...");
	N("...hay muha gente detrás de la historia de este juego.");

	if($.asked_about){
		Choose({
			"Hablando del tema, ¡vamos a jugar esto! ¡Ya!": Play
		});
	}else{
		Choose({
			"Hablando del tema, ¿podemos jugar ya?": Play,
			"¿Por qué harías esto? (Acerca del juego)": function(){
				About("¿Por qué harías esto?");
			}
		});
	}

}

function About(message){

	$.asked_about = true;

	SipCoffee(message);

	if($.asked_credits){
		N("Quería contar mi historia.");
	}else{
		N("Este juego...");
		N("...más buien un simulador de conversaciones realmente...");
		N("...es una historia muy personal.");
	}
	
	p("Por supuesto. Maldito narcisista.");
	N("Ja, claro.");

	if($.asked_credits){
		p("De hecho no, un narcisista usaría su auténtico nombre.");
		N("Te lo he dicho, es mi auténtico nom--");
		p("Vale, vale. Bicho raro.");
	}

	N("Hice este juego para el #Nar8 Game Jam. Me dió una excusa. ¡Y un límite de tiempo!");
	p("procrastinaste hasta el último día para entrar, ¿verdad?");
	N("Sí.");
	N("¡Además! Este juego no tiene copyright (derechos de autor). Dedicado al dominio público.");
	N("Soy tan abierto con mi código como con mi sexualidad."); // Oh my god the pun worked without sweat :)

	p("Agh, esa puya es terrible.");
	N("¿Y una de programación de 'Fork Me'?");
	p("noooooo.");

	if($.asked_credits){
		Choose({
			"Vamos a jugar a este juego ya.": Play
		});
	}else{
		Choose({
			"Malas bromas aparte, ¿podemos jugar ya?": Play,
			"¿Pero quien ERES? (Creditos)": function(){
				Credits("¿Pero quien ERES?");
			}
		});
	}

}
