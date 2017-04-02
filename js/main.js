'use script'

var nbCartesDejaTires = []; // tirage aléatoire du flop
	
var tapisUser = 10000;
var tapisBot = 10000;
var miseUser;
var miseBot;
var potTotal;
var CoupPartie = 0;
var tapisAfond;
var valCombi;
var valCombi2;

var nbBrelan = 0;
var nbDP = 0;
var nbDPBot = 0;
var brelan = 0;
var brelan2 = 0;
var paire1 =0;
var paire2 = 0;
var combinaisonMax = 0;
var combinaison = 0;
var paire;
var paireBot;
var paire3;
var kickerquadUser = 0;
var kickerquadBot = 0;
var brelanKicker1 =0;
var brelanKicker2 =0;
var paireSimple;
var paireHauteur1;
var paireHauteur2;
var paireHauteur3;
var nbCouleur = 0;
var carteColorUser = [];
var carteColorBot = [];
var colorValUserMax = 0;
var colorValBotMax = 0;
var quinteFlushUser = 0;
var quinteFlushBot = 0;
var nbMain = 0;

var psBot;
var phBot1;
var phBot2;
var phBot3;
var nbbrelanBot;
var brelanBot;
var paireBot1;
var paireBot2;
var gagnant = 0;


function startGame(){

	nbBrelan = 0;
	nbbrelanBot = 0;
	nbDP = 0;
	nbDPBot = 0;
	brelan = 0;
	brelanBot = 0;
	brelan2 = 0;
	brelanBot2 = 0;
	paire1 =0;
	paire2 = 0;
	paireBot1 =0;
	paireBot2 = 0;
	combinaisonMax = 0;
	combinaison = 0;
	kickerquadUser = 0;
	kickerquadBot = 0;
	brelanKicker1 =0;
	brelanKicker2 =0;
	nbCouleur = 0;
	carteColor = [];
	colorValUserMax = 0;
	colorValBotMax = 0;
	quinteFlushUser = 0;
	quinteFlushBot = 0;
	gagnant = 0;
	// ici commence la partie 
	CoupPartie++;
	//console.log(CoupPartie,CoupPartie%2);
	nbMain++;



	for(var i=0; i<9 ; i++){ // on a besoin de 9 cartes 5 pour le board 2 pour le bot et 2 pour l'utilisateur
		var numCarte=Math.ceil(Math.random()*52);
		nbCartesDejaTires[i] = numCarte;

		for(var j=0;j<i;j++){  // empêche les doublons
			if(nbCartesDejaTires[j] == numCarte){
				i=0;
			}
		}
	}
	//console.log(nbCartesDejaTires);

	//nbCartesDejaTires =[48, 44, 9, 13, 30, 1, 2, 42, 17];

	
	$('#aside').append('<br><p>Main n°'+nbMain+'</p>');
	$('#aside').append('<p>Tu reçois <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/></p>');
	document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;

	$('#board').hide(); //on cache le board du coup précédant

	if(CoupPartie%2 == 1){ // avec le %2 on determine la position

		console.log('c\'est à ton tour de jouer');
		
		$('#aside').append('<p>Tu es de petite blinde 100</p>');
		$('#aside').append('<p>J1 est de grosse blinde 200</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;


		$('#dealerUser').show(); // affiche le bouton dealer (determine la position)
		$('#dealerBot').hide();  // on masque le bouton dealer du bot

		miseUser=100;
		tapisUser -= miseUser;
		miseBot=200;
		tapisBot-=miseBot;

		document.getElementById('tapisUser').textContent=tapisUser;
		document.getElementById('jetonUser').textContent=miseUser;

		document.getElementById('tapisBot').textContent=tapisBot;
		document.getElementById('jetonBot').textContent=miseBot;
		$('#jetonBot').show();
		$('#jetonUser').show();
		document.getElementById('potValeur').textContent=(miseBot+miseUser);
		document.getElementById('mainUser').innerHTML='<img src="img/'+nbCartesDejaTires[5]+'.png" />,<img src="img/'+nbCartesDejaTires[6]+'.png" />'
		//document.getElementById('mainBot').innerHTML='<img src="img/'+nbCartesDejaTires[7]+'.png" />,<img src="img/'+nbCartesDejaTires[8]+'.png" />'
		document.getElementById('mainBot').innerHTML='<img src="img/face.gif" />,<img src="img/face.gif" />'
		document.getElementById('decisions').innerHTML='<button id="0">Passer</button><button id="3">Suivre</button><button id="4">Relancer</button>';

		document.getElementById('slide').setAttribute('min', 2*miseBot);
		document.getElementById('slide').setAttribute('max', tapisUser+miseUser);

		document.getElementById('sliderAmount').innerHTML=2*miseBot;
		
		misePreflop();
		
	}else{

		$('#dealerUser').hide();
		$('#dealerBot').show();

		$('#aside').append('<p>Tu es de grosse blinde 200</p>');
		$('#aside').append('<p>J1 est de petite blinde 100</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;

		document.getElementById('mainUser').innerHTML='<img src="img/'+nbCartesDejaTires[5]+'.png" />,<img src="img/'+nbCartesDejaTires[6]+'.png" />'
		//document.getElementById('mainBot').innerHTML='<img src="img/'+nbCartesDejaTires[7]+'.png" />,<img src="img/'+nbCartesDejaTires[8]+'.png" />'
		document.getElementById('mainBot').innerHTML='<img src="img/face.gif" />,<img src="img/face.gif" />'

		miseUser=200;
		tapisUser -= miseUser;
		miseBot=100;
		tapisBot-=miseBot;

		document.getElementById('tapisUser').textContent=tapisUser;
		document.getElementById('jetonUser').textContent=miseUser;
		document.getElementById('tapisBot').textContent=tapisBot;
		document.getElementById('jetonBot').textContent=miseBot;
		document.getElementById('potValeur').textContent=(miseBot+miseUser);
		$('#jetonBot').show();
		$('#jetonUser').show();

		document.getElementById('decisions').innerHTML='<button id="checkPre">Check</button><button id="raisePre">Relancer</button>';

		window.setTimeout(function(){
				window.setTimeout(function(){
					document.getElementById('jetonBot').textContent='200';
					$('#aside').append('<p>J1 paye 200</p>');
					document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				},1000)
				
				miseBot+=100;
				tapisBot-=100;
				document.getElementById('tapisBot').textContent=tapisBot;
				document.getElementById('jetonBot').textContent=miseBot;
				document.getElementById('potValeur').textContent=(miseBot+miseUser);
				window.setTimeout(misePreflop,1000);
			}, 1000);	
	}
}

function misePreflop(){

	

		$('#checkPre').on('click',function(){ 
			window.setTimeout(function(){
				
				document.getElementById('jetonUser').textContent='check';
				$('#aside').append('<p>Tu check</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				window.setTimeout(flop,1);
			}, 500);

		});

		$('#raisePre').on('click',function(){ 
			var relance =parseInt(prompt('Combien veux tu relancer ? min: 400 et max : '+(tapisUser+200)));
			if(relance>tapisBot){
				relance=tapisBot+miseBot;
			}else if(relance>tapisUser){
				relance=tapisUser;
			}
			if(relance<400){
				relance=400;
			}
			tapisUser+=miseUser;
			miseUser=relance;									// on met a jour les mises
			tapisUser-=relance;
			$('#aside').append('<p>Tu relances '+relance+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			document.getElementById('tapisUser').textContent=tapisUser;
			document.getElementById('jetonUser').textContent=miseUser;
			document.getElementById('potValeur').textContent=(miseBot+miseUser);
			$('#checkPre').hide();
			$('#raisePre').hide();					// on cache les boutons
			window.setTimeout(function(){
				tapisBot+=miseBot;
				miseBot=miseUser;          // le bot paye et on actualise les mises
				tapisBot-=miseBot;
				document.getElementById('tapisBot').textContent=tapisBot;
				document.getElementById('jetonBot').textContent=miseBot;
				document.getElementById('potValeur').textContent=(miseBot+miseUser);
				console.log('Bot paye '+miseBot); // bonus : afficher "call" avec un dégradé
				$('#aside').append('<p>J1 paye '+relance+'</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				if(tapisUser===0 || tapisBot ===0){
					tapisAfond = 'flop';
					tapis();
				}else{
					window.setTimeout(flop,1000);
				}
			}, 1000);

		});
	
		$('#0').on('click',function(){ // quand on fold 
			tapisBot+=(miseUser+miseBot) // on perd sa mise 
			$('#aside').append('<p>Tu passes</p>');
			$('#aside').append('<p>J1 remporte le pot '+(miseUser+miseBot)+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			window.setTimeout(startGame,1000);				// le coup est fini on passe au prochain
		});
		$('#3').on('click',function(){ // quand on paye
			$('#aside').append('<p>Tu payes 200</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			miseUser+=100;
			tapisUser-=100;
			document.getElementById('tapisUser').textContent=tapisUser;
			document.getElementById('jetonUser').textContent=miseUser;
			document.getElementById('potValeur').textContent=(miseBot+miseUser);
			$('#0').hide();
			$('#3').hide();			// on cache les boutons
			$('#4').hide(); 
			window.setTimeout(function(){	
				document.getElementById('jetonBot').textContent='check';
				$('#aside').append('<p>J1 check</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				window.setTimeout(flop,1000);
			}, 1000);

		});
		$('#4').on('click',function(){ // quand on raise
			/*var relance =parseInt(prompt('Combien veux tu relancer ? min: 400 et max : '+(tapisUser+100)));
			if(relance>tapisBot){
				relance=tapisBot+miseBot;
			}else if(relance>tapisUser){
				relance=tapisUser;
			}
			if(relance<400){
				relance=400;
			}
			tapisUser+=miseUser;
			miseUser=relance;									// on met a jour les mises
			tapisUser-=relance;*/

			var elt = document.getElementById('sliderAmount'); // on récupere le montant de la relance
    		var relance = elt.innerText || elt.textContent;

    		relance = parseInt(relance);

    		$('#slider').hide();
			$('#sliderAmount').hide();

    		tapisUser+=miseUser;
    		miseUser=relance;
			tapisUser-=relance;

			$('#aside').append('<p>Tu relances '+relance+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			document.getElementById('tapisUser').textContent=tapisUser;
			document.getElementById('jetonUser').textContent=miseUser;
			document.getElementById('potValeur').textContent=(miseBot+miseUser);
			$('#0').hide();
			$('#3').hide();					// on cache les boutons
			$('#4').hide();
			window.setTimeout(function(){
				tapisBot+=miseBot;
				miseBot=miseUser;          // le bot paye et on actualise les mises
				tapisBot-=miseBot;
				document.getElementById('tapisBot').textContent=tapisBot;
				document.getElementById('jetonBot').textContent=miseBot;
				document.getElementById('potValeur').textContent=(miseBot+miseUser);
				console.log('Bot paye '+miseBot); // bonus : afficher "call" avec un dégradé
				$('#aside').append('<p>J1 paye '+relance+'</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				if(tapisUser===0 || tapisBot ===0){
					tapisAfond = 'flop';
					tapis();
				}else{
					window.setTimeout(flop,1000);
				}
				
			}, 1000);
			
		});
		
}

function flop(){
	//console.log(CoupPartie%2);
	$('#jetonUser').hide();
	$('#jetonBot').hide();
	document.getElementById('board').innerHTML='<img src="img/'+nbCartesDejaTires[0]+'.png" />,<img src="img/'+nbCartesDejaTires[1]+'.png" />,<img src="img/'+nbCartesDejaTires[2]+'.png" />';
	$('#board').show();
	$('#aside').append('<p>Le flop : <img src="img/miniature/'+nbCartesDejaTires[0]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[1]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[2]+'.png"/></p>');
	document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
	if(CoupPartie%2===1){
		window.setTimeout(function(){
			$('#jetonBot').show();
			document.getElementById('jetonBot').textContent='check';
			$('#aside').append('<p>J1 check</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			document.getElementById('decisions').innerHTML='<button id="check">Check</button><button id="bet">Miser</button>';
			
			document.getElementById('slide').setAttribute('min', '200');
			document.getElementById('slide').setAttribute('max', tapisUser);
			document.getElementById('slide').setAttribute('value', 200);

			document.getElementById('sliderAmount').innerHTML=200;

			$('#slider').show();
			$('#sliderAmount').show();

			$('#check').on('click',function(){ // on check le flop
				$('#jetonUser').show();
				document.getElementById('jetonUser').textContent='check';
				$('#aside').append('<p>Tu check</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				$('#bet').hide();
				$('#check').hide();
					window.setTimeout(function(){
						$('#jetonBot').show();
						document.getElementById('jetonBot').textContent='check';
						$('#aside').append('<p>J1 check</p>');
						document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
						window.setTimeout(turn,1);
					}, 500);
				});

			$('#bet').on('click',function(){ // on veut miser le flop
				/*var bet = parseInt(prompt('Combien veux tu miser ? min: 200 et max : '+tapisUser));
				if(bet>tapisUser){
					bet=tapisUser;
				}
				if(bet<200){
					bet=200;
				}
				tapisUser-=bet;*/
				var elt = document.getElementById('sliderAmount'); // on récupere le montant de la relance
	    		var bet = elt.innerText || elt.textContent;

	    		bet = parseInt(bet);

	    		$('#slider').hide();
				$('#sliderAmount').hide();

	    		
	    		
				tapisUser-=bet;

				document.getElementById('tapisUser').textContent=tapisUser;
				document.getElementById('jetonUser').textContent=bet;
				$('#jetonUser').show();
				$('#aside').append('<p>Tu mises '+bet+'</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
				$('#bet').hide();
				$('#check').hide();
				window.setTimeout(function(){
				      
					tapisBot-=bet;
					document.getElementById('tapisBot').textContent=tapisBot;
					document.getElementById('jetonBot').textContent=bet;
					$('#jetonBot').show();
					document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
					console.log('Bot paye '+bet); // bonus : afficher "call" avec un dégradé
					$('#aside').append('<p>J1 paye '+bet+'</p>');
					document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
					if(tapisUser===0 || tapisBot ===0){
						tapisAfond = 'flop';
						tapis();
					}else{
						window.setTimeout(turn,1000);
					}
					
				}, 1000);

			});

		}, 1000);
	}else{

		document.getElementById('decisions').innerHTML='<button id="check">Check</button><button id="bet">Miser</button>';
		$('#check').on('click',function(){ // on check le flop
			$('#jetonUser').show();
			document.getElementById('jetonUser').textContent='check';
			$('#aside').append('<p>Tu check</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			$('#bet').hide();
			$('#check').hide();
			window.setTimeout(function(){
				$('#jetonBot').show();
				document.getElementById('jetonBot').textContent='check';
				$('#aside').append('<p>J1 check</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				window.setTimeout(turn,1000);
			}, 1000);
		});

		$('#bet').on('click',function(){ // on veut miser le flop
			var bet = parseInt(prompt('Combien veux tu miser ? min: 200 et max : '+tapisUser));
			if(bet>tapisUser){
				bet=tapisUser;
			}
			if(bet<200){
				bet=200;
			}
			tapisUser-=bet;
			$('#aside').append('<p>Tu mises '+bet+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			document.getElementById('tapisUser').textContent=tapisUser;
			document.getElementById('jetonUser').textContent=bet;
			$('#jetonUser').show();
			document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
			$('#bet').hide();
			$('#check').hide();
			window.setTimeout(function(){
				      
				tapisBot-=bet;
				document.getElementById('tapisBot').textContent=tapisBot;
				document.getElementById('jetonBot').textContent=bet;
				$('#jetonBot').show();
				document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
				console.log('Bot paye '+bet); // bonus : afficher "call" avec un dégradé
				$('#aside').append('<p>J1 paye '+bet+'</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				if(tapisUser===0 || tapisBot ===0){
					tapisAfond = 'flop';
					tapis();
				}else{
					window.setTimeout(turn,1000);
				}				
			}, 1000);
		});
	}	
}

function turn(){
	$('#jetonUser').hide();
	$('#jetonBot').hide();
	document.getElementById('board').innerHTML='<img src="img/'+nbCartesDejaTires[0]+'.png" />,<img src="img/'+nbCartesDejaTires[1]+'.png" />,<img src="img/'+nbCartesDejaTires[2]+'.png" />,<img src="img/'+nbCartesDejaTires[3]+'.png" />';
	$('#board').show();
	$('#aside').append('<p>Le turn : <img src="img/miniature/'+nbCartesDejaTires[0]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[1]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[2]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[3]+'.png"/></p>');
	document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
	if(CoupPartie%2===1){
		window.setTimeout(function(){
			$('#jetonBot').show();
			$('#aside').append('<p>J1 check</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			document.getElementById('jetonBot').textContent='check';
			document.getElementById('decisions').innerHTML='<button id="checkTurn">Check</button><button id="betTurn">Miser</button>';
			$('#checkTurn').on('click',function(){ // on check le turn
				$('#jetonUser').show();
				document.getElementById('jetonUser').textContent='check';
				$('#aside').append('<p>Tu check</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				$('#betTurn').hide();
				$('#checkTurn').hide();
				window.setTimeout(function(){
					$('#jetonBot').show();
					document.getElementById('jetonBot').textContent='check';
					$('#aside').append('<p>J1 check</p>');
					document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
					window.setTimeout(river,1);
				}, 500);
			});

			$('#betTurn').on('click',function(){ // on veut miser le turn
				var bet = parseInt(prompt('Combien veux tu miser ? min: 200 et max : '+tapisUser));
				if(bet>tapisUser){
					bet=tapisUser;
				}
				if(bet<200){
					bet=200;
				}
				tapisUser-=bet;
				document.getElementById('tapisUser').textContent=tapisUser;
				document.getElementById('jetonUser').textContent=bet;
				$('#jetonUser').show();
				$('#aside').append('<p>Tu mises : '+bet+'</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
				$('#bet').hide();
				$('#check').hide();
				window.setTimeout(function(){
					      
					tapisBot-=bet;
					document.getElementById('tapisBot').textContent=tapisBot;
					document.getElementById('jetonBot').textContent=bet;
					$('#jetonBot').show();
					document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
					console.log('Bot paye '+bet); // bonus : afficher "call" avec un dégradé
					$('#aside').append('<p>J1 paye '+bet+'</p>');
					document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
					if(tapisUser===0 || tapisBot ===0){
						tapisAfond = 'flop';
						tapisTurn();
					}else{
						window.setTimeout(river,1000);
					}
				}, 1000);

			});

		}, 1000);
	}else{
		document.getElementById('decisions').innerHTML='<button id="checkTurn">Check</button><button id="betTurn">Miser</button>';
		$('#checkTurn').on('click',function(){ // on check le turn
			$('#jetonUser').show();
			document.getElementById('jetonUser').textContent='check';
			$('#aside').append('<p>Tu check</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			$('#bet').hide();
			$('#check').hide();
			window.setTimeout(function(){
				$('#jetonBot').show();
				document.getElementById('jetonBot').textContent='check';
				$('#aside').append('<p>J1 check</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				window.setTimeout(river,1000);
			}, 1000);
				});

			$('#betTurn').on('click',function(){ // on veut miser le turn
			var bet = parseInt(prompt('Combien veux tu miser ? min: 200 et max : '+tapisUser));
			if(bet>tapisUser){
				bet=tapisUser;
			}
			if(bet<200){
				bet=200;
			}
			tapisUser-=bet;
			$('#aside').append('<p>Tu mises '+bet+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			document.getElementById('tapisUser').textContent=tapisUser;
			document.getElementById('jetonUser').textContent=bet;
			$('#jetonUser').show();
			document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
			$('#bet').hide();
			$('#check').hide();
			window.setTimeout(function(){
				      
				tapisBot-=bet;
				document.getElementById('tapisBot').textContent=tapisBot;
				document.getElementById('jetonBot').textContent=bet;
				$('#jetonBot').show();
				document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
				$('#aside').append('<p>J1 paye '+bet+'</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				console.log('Bot paye '+bet); // bonus : afficher "call" avec un dégradé
				if(tapisUser===0 || tapisBot ===0){
					tapisAfond = 'flop';
					tapisTurn();
				}else{
					window.setTimeout(river,1000);
				}
			}, 1000);

		});
	}
	
	
}
function river(){
	$('#jetonUser').hide();
	$('#jetonBot').hide();
	document.getElementById('board').innerHTML='<img src="img/'+nbCartesDejaTires[0]+'.png" />,<img src="img/'+nbCartesDejaTires[1]+'.png" />,<img src="img/'+nbCartesDejaTires[2]+'.png" />,<img class="img" src="img/'+nbCartesDejaTires[3]+'.png" />,<img class="img" src="img/'+nbCartesDejaTires[4]+'.png" />';
	$('#board').show();
	$('#aside').append('<p>Le turn : <img src="img/miniature/'+nbCartesDejaTires[0]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[1]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[2]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[3]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[4]+'.png"/></p>');
	document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
	if(CoupPartie%2===1){
		window.setTimeout(function(){
			$('#jetonBot').show();
			document.getElementById('jetonBot').textContent='check';
			$('#aside').append('<p>J1 check</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			document.getElementById('decisions').innerHTML='<button id="checkRiver">Check</button><button id="betRiver">Miser</button>';
			
			$('#checkRiver').on('click',function(){ // on check la river
				$('#jetonUser').show();
				document.getElementById('jetonUser').textContent='check';
				$('#betRiver').hide();
				$('#checkRiver').hide();
				window.setTimeout(function(){
					$('#jetonBot').show();
					document.getElementById('jetonBot').textContent='check';
					$('#aside').append('<p>Tu check</p>');
					document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
					window.setTimeout(comparaison,1);
				}, 500);
			});

			$('#betRiver').on('click',function(){ // on veut miser la river
					var bet = parseInt(prompt('Combien veux tu miser ? min: 200 et max : '+tapisUser));
					if(bet>tapisUser){
						bet=tapisUser;
					}
					if(bet<200){
						bet=200;
					}
					tapisUser-=bet;
					document.getElementById('tapisUser').textContent=tapisUser;
					document.getElementById('jetonUser').textContent=bet;
					$('#jetonUser').show();
					$('#aside').append('<p>Tu mises '+bet+'</p>');
					document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
					document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
					$('#betRiver').hide();
					$('#checkRiver').hide();
					window.setTimeout(function(){
						      
						tapisBot-=bet;
						document.getElementById('tapisBot').textContent=tapisBot;
						document.getElementById('jetonBot').textContent=bet;
						$('#jetonBot').show();
						document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
						console.log('Bot paye river'+bet); // bonus : afficher "call" avec un dégradé
						$('#aside').append('<p>J1 paye '+bet+'</p>');
						document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
						window.setTimeout(comparaison,1000);
					}, 1000);

				});

		}, 1000);
	}else{
		document.getElementById('decisions').innerHTML='<button id="checkRiver">Check</button><button id="betRiver">Miser</button>';
		$('#checkRiver').on('click',function(){ // on check la river
			$('#jetonUser').show();
			document.getElementById('jetonUser').textContent='check';
			$('#aside').append('<p>Tu check</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			$('#betRiver').hide();
			$('#checkRiver').hide();
			window.setTimeout(function(){
				$('#jetonBot').show();
				document.getElementById('jetonBot').textContent='check';
				$('#aside').append('<p>J1 check</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				window.setTimeout(comparaison,1000);
			}, 1000);
				});

			$('#betRiver').on('click',function(){ // on veut miser la river
			var bet = parseInt(prompt('Combien veux tu miser ? min: 200 et max : '+tapisUser));
			if(bet>tapisUser){
				bet=tapisUser;
			}
			if(bet<200){
				bet=200;
			}
			tapisUser-=bet;
			$('#aside').append('<p>Tu mises '+bet+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			document.getElementById('tapisUser').textContent=tapisUser;
			document.getElementById('jetonUser').textContent=bet;
			$('#jetonUser').show();
			document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
			$('#betRiver').hide();
			$('#checkRiver').hide();
			window.setTimeout(function(){
				      
				tapisBot-=bet;
				document.getElementById('tapisBot').textContent=tapisBot;
				document.getElementById('jetonBot').textContent=bet;
				$('#jetonBot').show();
				document.getElementById('potValeur').textContent=(20000-tapisUser-tapisBot);
				console.log('Bot paye river'+bet); // bonus : afficher "call" avec un dégradé
				$('#aside').append('<p>J1 paye '+bet+'</p>');
				document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
				window.setTimeout(comparaison,1000);
			}, 1000);

		});
	}
	
	
}
function tapis(){
	window.setTimeout(function(){
		document.getElementById('mainBot').innerHTML='<img src="img/'+nbCartesDejaTires[7]+'.png" />,<img src="img/'+nbCartesDejaTires[8]+'.png" />'
		$('#jetonBot').hide();
		$('#jetonUser').hide();
		window.setTimeout(function(){
			document.getElementById('board').innerHTML='<img src="img/'+nbCartesDejaTires[0]+'.png" />,<img src="img/'+nbCartesDejaTires[1]+'.png" />,<img src="img/'+nbCartesDejaTires[2]+'.png" />';
			$('#board').show();

			window.setTimeout(function(){
				document.getElementById('board').innerHTML='<img src="img/'+nbCartesDejaTires[0]+'.png" />,<img src="img/'+nbCartesDejaTires[1]+'.png" />,<img src="img/'+nbCartesDejaTires[2]+'.png" />,<img src="img/'+nbCartesDejaTires[3]+'.png" />';
				$('#board').show();

				window.setTimeout(function(){
					document.getElementById('board').innerHTML='<img src="img/'+nbCartesDejaTires[0]+'.png" />,<img src="img/'+nbCartesDejaTires[1]+'.png" />,<img src="img/'+nbCartesDejaTires[2]+'.png" />,<img src="img/'+nbCartesDejaTires[3]+'.png" />,<img src="img/'+nbCartesDejaTires[4]+'.png" />';
					$('#board').show();

					window.setTimeout(function(){
						comparaison();
					},1000)
				},1000)
			},1000)
		},1000)		
	},1000);	
}
function tapisTurn(){
	window.setTimeout(function(){
		document.getElementById('mainBot').innerHTML='<img src="img/'+nbCartesDejaTires[7]+'.png" />,<img src="img/'+nbCartesDejaTires[8]+'.png" />'
		$('#jetonBot').hide();
		$('#jetonUser').hide();
		window.setTimeout(function(){
			document.getElementById('board').innerHTML='<img src="img/'+nbCartesDejaTires[0]+'.png" />,<img src="img/'+nbCartesDejaTires[1]+'.png" />,<img src="img/'+nbCartesDejaTires[2]+'.png" />,<img src="img/'+nbCartesDejaTires[3]+'.png" />,<img src="img/'+nbCartesDejaTires[4]+'.png" />';
			$('#board').show();

			window.setTimeout(function(){
				comparaison();
			},1000)
		},2000)
	},1000)		
}


function comparaison(){
	console.log('on compare les jeux');
	$('#jetonBot').hide();
	$('#jetonUser').hide();
	document.getElementById('mainBot').innerHTML='<img src="img/'+nbCartesDejaTires[7]+'.png" />,<img src="img/'+nbCartesDejaTires[8]+'.png" />'
	

	var carteBoard1  = Math.ceil(nbCartesDejaTires[0]/4);  // cet opération définit la valeur de la carte
	var carteBoard2  = Math.ceil(nbCartesDejaTires[1]/4);
	var carteBoard3 = Math.ceil(nbCartesDejaTires[2]/4);
	var carteBoard4 = Math.ceil(nbCartesDejaTires[3]/4);
	var carteBoard5 = Math.ceil(nbCartesDejaTires[4]/4);
	var carteUser1 = Math.ceil(nbCartesDejaTires[5]/4);
	var carteUser2 = Math.ceil(nbCartesDejaTires[6]/4);
	var carteBot1   = Math.ceil(nbCartesDejaTires[7]/4);
	var carteBot2   = Math.ceil(nbCartesDejaTires[8]/4);

	
	var userColor = [nbCartesDejaTires[0]%4,nbCartesDejaTires[1]%4,nbCartesDejaTires[2]%4,nbCartesDejaTires[3]%4,nbCartesDejaTires[4]%4,nbCartesDejaTires[5]%4,nbCartesDejaTires[6]%4];
	
	var botColor = [nbCartesDejaTires[0]%4,nbCartesDejaTires[1]%4,nbCartesDejaTires[2]%4,nbCartesDejaTires[3]%4,nbCartesDejaTires[4]%4,nbCartesDejaTires[7]%4,nbCartesDejaTires[8]%4];
	
	var boardUser = [carteBoard1,carteBoard2,carteBoard3,carteBoard4,carteBoard5,carteUser1,carteUser2];
		
	var boardBot = [carteBoard1,carteBoard2,carteBoard3,carteBoard4,carteBoard5,carteBot1,carteBot2];

	var user = [nbCartesDejaTires[0],nbCartesDejaTires[1],nbCartesDejaTires[2],nbCartesDejaTires[3],nbCartesDejaTires[4],nbCartesDejaTires[5],nbCartesDejaTires[6]];

	var bot = [nbCartesDejaTires[0],nbCartesDejaTires[1],nbCartesDejaTires[2],nbCartesDejaTires[3],nbCartesDejaTires[4],nbCartesDejaTires[7],nbCartesDejaTires[8]];


	//console.log(userColor,botColor);
	//console.log(boardUser,boardBot);
	


	boardUser.sort(function(a, b) {  // fonction qui trie dans l'ordre croissant

	    if (a < b) {
	        return -1;
	    } else if (a > b) {
	        return 1;
	    } else {
	        return 0;
	    }

	});
	//console.log(boardUser);


	boardBot.sort(function(c, d) {  // fonction qui trie dans l'ordre croissant

	    if (c < d) {
	        return -1;
	    } else if (c > d) {
	        return 1;
	    } else {
	        return 0;
	    }

	});
	//console.log(boardBot);


	// on analyse la main de l'utilisateur
	for(var i=0;i<boardUser.length;i++){

		for(var j=i+1;j<boardUser.length;j++){

			if(boardUser[i] == boardUser[j]){  // paire
				paireSimple = boardUser[i];
				combinaisonMax=2;
				if(combinaisonMax>combinaison){
					combinaison = combinaisonMax;
				}
					paireHauteur1 = boardUser[6];    // determine la paire et les hauteurs
					paireHauteur2 = boardUser[5];
					paireHauteur3 = boardUser[4];
				if(boardUser[6]==paireSimple && boardUser[5]==paireSimple){
					paireHauteur1 = boardUser[4];
					paireHauteur2 = boardUser[3];
					paireHauteur3 = boardUser[2];
					if(boardUser[0]===1){
						paireHauteur1 = 1;
						paireHauteur2 = boardUser[4];
						paireHauteur3 = boardUser[3];
					}
				}else if(boardUser[5]==paireSimple && boardUser[4]==paireSimple){
					paireHauteur1 = boardUser[6];
					paireHauteur2 = boardUser[3];
					paireHauteur3 = boardUser[2];
					if(boardUser[0]===1){
						paireHauteur1 = 1;
						paireHauteur2 = boardUser[6];
						paireHauteur3 = boardUser[3];
					}
				}else if(boardUser[4]==paireSimple && boardUser[3]==paireSimple){
					paireHauteur1 = boardUser[6];
					paireHauteur2 = boardUser[5];
					paireHauteur3 = boardUser[2];
					if(boardUser[0]===1){
						paireHauteur1 = 1;
						paireHauteur2 = boardUser[6];
						paireHauteur3 = boardUser[5];
					}
				}else if(boardUser[3]==paireSimple && boardUser[2]==paireSimple){
					paireHauteur1 = boardUser[6];
					paireHauteur2 = boardUser[5];
					paireHauteur3 = boardUser[4];
					if(boardUser[0]===1){
						paireHauteur1 = 1;
						paireHauteur2 = boardUser[6];
						paireHauteur3 = boardUser[5];
					}
				}else if(boardUser[2]==paireSimple && boardUser[1]==paireSimple){
					paireHauteur1 = boardUser[6];
					paireHauteur2 = boardUser[5];
					paireHauteur3 = boardUser[4];
					if(boardUser[0]===1){
						paireHauteur1 = 1;
						paireHauteur2 = boardUser[6];
						paireHauteur3 = boardUser[5];
					}
				}
			}
			
			for(var k=j+1;k<boardUser.length;k++){

				if(boardUser[i] === boardUser[j] && boardUser[j] === boardUser[k]){  // brelan
					//console.log('brelan '+boardUser[i]);
					//console.log('i:'+i+' j:'+j+' k:'+k);

					nbBrelan++
					//console.log(nbBrelan);
					if(nbBrelan === 1){
						brelan = boardUser[i];
						combinaisonMax=4;
						if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
						}
						brelanKicker1 = boardUser[6];
						brelanKicker2 = boardUser[5];
						if(boardUser[0]===1 && boardUser[1]!==1){       // determine les 2 kickers du brelan 
							brelanKicker1 = 1;				
							brelanKicker2 = boardUser[6];
							if(boardUser[6]===brelan){
								brelanKicker1 = 1;				
								brelanKicker2 = boardUser[3];
							}else if(boardUser[5]===brelan){
								brelanKicker1 = 1;				
								brelanKicker2 = boardUser[6];
							}					
						}else if(boardUser[6]===brelan){
							brelanKicker1 = boardUser[3];
							brelanKicker2 = boardUser[2];
						}else if(boardUser[5]===brelan && boardUser[6]!==brelan){
							brelanKicker1 = boardUser[6];
							brelanKicker2 = boardUser[2];
						}

						//console.log(brelanKicker1,brelanKicker2)
						
					}
					if(nbBrelan === 2){  // si il y a 2 brelans alors on a full 
						brelan2 = boardUser[i];
						if(brelan === 1){ // cas spéciale ou l'AS compte comme une petite et grosse carte
							//console.log('tu as full '+brelan+' par les '+brelan2);
							var full = brelan;
							var fullP = brelan2;
						}else if(brelan2 === 1){
							//console.log('tu as full '+brelan2+' par les '+brelan);
							var full = brelan2;
							var fullP = brelan;
						}else if(brelan>brelan2){// determine l'ordre du full
							//console.log('tu as full '+brelan+' par les '+brelan2);
							var full = brelan;
							var fullP = brelan2;
						}else{
							//console.log('tu as full '+brelan2+' par les '+brelan);
							var full = brelan2;
							var fullP = brelan;
						}
						combinaisonMax=7;
						if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
						}
					}
				}

				for(var l=k+1;l<boardUser.length;l++){
					//console.log('i:'+i+' j:'+j+' k:'+k+' l:'+l);

					if(boardUser[i] === boardUser[j] && boardUser[k] === boardUser[l]){ // 2 paires
						if(boardUser[j]===1){
							paire1 = boardUser[j]; // cas ou il y a 2 paires dont paire d'as
						}
						if(boardUser[l]===1){
							paire2 = boardUser[l];
						}
						if(boardUser[j]>paire1 && paire1!==1){
							paire1 = boardUser[j];
						}
						if(boardUser[l]>paire2 && paire2!==1){
							paire2 = boardUser[l];
						}
						for(var h=0;h<boardUser.length;h++){
							if(boardUser[h] !== paire1 && boardUser[h] !== paire2){
								var kickerDP = boardUser[h]
								//console.log(boardUser[h]);
								if(boardUser[h] === 1){		// determine le kicker des 2 paires
									//console.log(boardUser[h])
									kickerDP = boardUser[h];
									break;
								}
							}
						}
						nbDP++
						//console.log(nbDP);
						//console.log('tu as 2 paires!!'+paire1+' et '+paire2);
						combinaisonMax = 3;
						if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
						}
					}
					if(boardUser[i] === boardUser[j] && boardUser[j] === boardUser[k] && boardUser[k] === boardUser[l]){
						var quadUser = boardUser[i];
						combinaisonMax = 8;					// carré
						if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
						}
						for(var h=0;h<boardUser.length;h++){
							if(boardUser[h] !== quadUser){
								kickerquadUser = boardUser[h]
								//console.log(boardUser[h]);
								if(boardUser[h] === 1){
									//console.log(boardUser[h])
									kickerquadUser = boardUser[h];
									break;
								}
							}
						}
					}
					for(var m=l+1;m<boardUser.length;m++){
						//console.log('i:'+i+' j:'+j+' k:'+k+' l:'+l+' m:'+m);
						// on calcule la quinte
						if(boardUser[i]+1 == boardUser[j] &&
						   boardUser[j]+1 == boardUser[k] &&				// quinte
						   boardUser[k]+1 == boardUser[l] &&
						   boardUser[l]+1 == boardUser[m]){
						   	combinaisonMax=5;
							var quinteHauteurUser = boardUser[m];
							if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
							}  
						}else if(boardUser[i] == 1 && boardUser[j] == 10 && boardUser[k]== 11 && boardUser[l]==12 && boardUser[m]==13){
							//on calcule la grosse quinte car l'as est a la fois la plus petite et la plus grande carte
							//console.log('tu as la grande quinte');
							combinaison = 5;
							var quinteHauteur = boardUser[i];    // quinte hauteur as
							if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
							}
						}
						if( userColor[i]%4 == userColor[j]%4 &&
							userColor[j]%4 == userColor[k]%4 && /// couleur
							userColor[k]%4 == userColor[l]%4 &&
							userColor[l]%4 == userColor[m]%4 ){
							carteColorUser =   [Math.ceil(user[i]/4),
											Math.ceil(user[j]/4),
											Math.ceil(user[k]/4),
											Math.ceil(user[l]/4),
											Math.ceil(user[m]/4)];

							

							carteColorUser.sort(function(a, b) {  // fonction qui trie dans l'ordre croissant

							    if (a < b) {
							        return -1;
							    } else if (a > b) {
							        return 1;
							    } else {
							        return 0;
							    }

							});

							//console.log(carteColorUser)

							if( carteColorUser[0]+1 == carteColorUser[1] &&
								carteColorUser[1]+1 == carteColorUser[2] &&
								carteColorUser[2]+1 == carteColorUser[3] &&
								carteColorUser[3]+1 == carteColorUser[4] ){
								//console.log('quinte fluch');
								quinteFlushUser = 9;
								var quinteFlushUserHauteur = carteColorUser[4];
							}

							if(carteColorUser[0]===1 && carteColorUser[1]===10 && carteColorUser[2]===11 && carteColorUser[3]===12 && carteColorUser[4]===13){
								//console.log('quinte fluch Royale');
								quinteFlushUser = 10;
							}

							colorValUser = carteColorUser[0]+carteColorUser[1]+carteColorUser[2]+carteColorUser[3]+carteColorUser[4];
							if(carteColorUser[0]===1 || carteColorUser[1]===1 || carteColorUser[2]===1 || carteColorUser[3]===1 || carteColorUser[4]===1){
								colorValUser+=100;
							}
							//console.log(colorValUser);
							if(colorValUser>colorValUserMax){
								colorValUserMax = colorValUser;
								var carteColorUserMax = carteColorUser;
							}
							//console.log(carteColorUserMax);

							
							combinaisonMax = 6;
							if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
							}
						}
					}
				}
			}
		}
	}



	if(nbBrelan === 1 && nbDP>=1){
		combinaisonMax=7;
			if(combinaisonMax>combinaison){
				combinaison = combinaisonMax;
			}
		if(brelan==paire1){
			//console.log('tu as full '+brelan+' par les '+paire2);
			paire = paire2
		}else{
			//console.log('tu as full '+brelan+' par les '+paire1);
			paire = paire1
		}
		
	}
	if(nbBrelan>1 ){
		brelan = full;
		paire = fullP;
	}
	if(quinteFlushUser===9){
		combinaison = 9;
	}
	if(quinteFlushUser===10){
		combinaison = 10;
	}
//console.log(combinaison)

	var combinaisonUser = combinaison;
	switch(combinaison){

		case 10:
		console.log('Tu as la plus belle main du jeu Quinte Flush Royale !!');
		//on montre les jeux et on les combinaisons
		$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Quinte flush royale</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		break;

		case 9:
		console.log('tu as fais quinte flush hauteur '+quinteFlushUserHauteur);
		//on montre les jeux et on les combinaisons
		if(quinteFlushUserHauteur===13){
			valCombi = 'Roi';
		}else if(quinteFlushUserHauteur===12){
			valCombi = 'Dame'
		}else if(quinteFlushUserHauteur===11){
			valCombi = 'Valet'
		}else{
			valCombi = quinteFlushUserHauteur;
		}
		$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Quinte flush hauteur '+valCombi+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		break;

		case 8:
		console.log('tu as carré de : '+quadUser+' kicker '+kickerquadUser);
		if(quadUser===13){
			valCombi = 'Roi';
		}else if(quadUser===12){
			valCombi = 'Dame'
		}else if(quadUser===11){
			valCombi = 'Valet'
		}else if(quadUser===1){
			valCombi = 'As'
		}else{
			valCombi = quadUser;
		}
		//on montre les jeux et on les combinaisons
		$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Carré de '+valCombi+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		var quadUserVal = quadUser*100+kickerquadUser;
		if(quadUser===1){
			quadUserVal+=10000;
		}
		if(kickerquadUser===1){
			quadUserVal+=15;
		}
		break;

		case 7:
		console.log('tu as full au : '+brelan+' par les '+paire);
		if(brelan===13){
			valCombi = 'Rois';
		}else if(brelan===12){
			valCombi = 'Dames'
		}else if(brelan===11){
			valCombi = 'Valets'
		}else if(brelan===1){
			valCombi = 'As'
		}else{
			valCombi = brelan;
		}
		if(paire===13){
			valCombi2 = 'Rois';
		}else if(paire===12){
			valCombi2 = 'Dames'
		}else if(paire===11){
			valCombi2 = 'Valets'
		}else if(paire===1){
			valCombi2 = 'As'
		}else{
			valCombi2 = paire;
		}
		//on montre les jeux et on les combinaisons
		$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Full aux '+valCombi+' par les '+valCombi2+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		var fullUserVal = brelan*100+paire;
		if(brelan===1){
			fullUserVal+=10000;
		}
		if(paire===1){
			fullUserVal+=15;
		}
		break;

		case 6:
		carteColorUserMax.sort(function(a, b) {  // fonction qui trie dans l'ordre DEcroissant

		    if (a > b) {
		        return -1;
		    } else if (a < b) {
		        return 1;
		    } else {
		        return 0;
		    }

		});
		if(carteColorUserMax[4]===1){
			// faire passer l'as en premier dans le tableau 
			carteColorUserMax.pop();
			carteColorUserMax.unshift(1);
		}
		if(carteColorUserMax[0]===13){
			valCombi = 'Roi';
		}else if(carteColorUserMax[0]===12){
			valCombi = 'Dame'
		}else if(carteColorUserMax[0]===11){
			valCombi = 'Valet'
		}else if(carteColorUserMax[0]===1){
			valCombi = 'As'
		}else{
			valCombi = carteColorUserMax[0];
		}
		$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Couleur hauteur '+valCombi+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		console.log('tu as la couleur hauteur '+carteColorUserMax[0]+', '+carteColorUserMax[1]+', '+carteColorUserMax[2]+', '+carteColorUserMax[3]+', '+carteColorUserMax[4]);
		break;

		case 5:
		console.log('tu as quinte hauteur : '+quinteHauteurUser);
		if(quinteHauteurUser===13){
			valCombi = 'Roi';
		}else if(quinteHauteurUser===12){
			valCombi = 'Dame'
		}else if(quinteHauteurUser===11){
			valCombi = 'Valet'
		}else if(quinteHauteurUser===1){
			valCombi = 'As'
		}else{
			valCombi = quinteHauteurUser;
		}
		$('#aside').append('<p>J1 montre : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Quinte hauteur '+valCombi+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		break;

		case 4:
		console.log('tu as brelan de : '+brelan+' kicker '+brelanKicker1+' et '+brelanKicker2);
		if(brelan===13){
			valCombi = 'Rois';
		}else if(brelan===12){
			valCombi = 'Dames'
		}else if(brelan===11){
			valCombi = 'Valets'
		}else if(brelan===1){
			valCombi = 'As'
		}else{
			valCombi = brelan;
		}
		$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Brelan de '+valCombi+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		var brelanUserVal = brelan*100+brelanKicker1+brelanKicker2;
		if(brelan===1){
			brelanUserVal+=10000;
		}
		if(brelanKicker1===1 || brelanKicker2===1){
			brelanUserVal+=15;
		}
		break;

		case 3:
		if(paire1===1){
			paire1 = paire2;
			paire2 = 1;
		}
		console.log('tu as deux paires : '+paire2+' et '+paire1+' kicker '+kickerDP);
		if(paire2===13){
			valCombi = 'Rois';
		}else if(paire2===12){
			valCombi = 'Dames'
		}else if(paire2===11){
			valCombi = 'Valets'
		}else if(paire2===1){
			valCombi = 'As'
		}else{
			valCombi = paire2;
		}
		if(paire1===13){
			valCombi2 = 'Rois';
		}else if(paire1===12){
			valCombi2 = 'Dames'
		}else if(paire1===11){
			valCombi2 = 'Valets'
		}else if(paire1===1){
			valCombi2 = 'As'
		}else{
			valCombi2 = paire1;
		}
		$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Deux paires '+valCombi+' et '+valCombi2+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		var dbPaireUserVal = paire2*100+paire1*10+kickerDP;
		if(paire2===1){
			dbPaireUserVal+=10000;
		}
		if(kickerDP===1){
			dbPaireUserVal+=15;
		}
		break;

		case 2:
		console.log('tu as une paire de '+paireSimple+' hauteur '+paireHauteur1+', '+paireHauteur2+', '+paireHauteur3);
		if(paireSimple===13){
			valCombi = 'Rois';
		}else if(paireSimple===12){
			valCombi = 'Dames'
		}else if(paireSimple===11){
			valCombi = 'Valets'
		}else if(paireSimple===1){
			valCombi = 'As'
		}else{
			valCombi = paireSimple;
		}
		$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Une paire de '+valCombi+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		var paireUserVal = paireHauteur1+paireHauteur2+paireHauteur3;
		if(paireHauteur1===1){
			paireUserVal += 100;
		}
		break;

		case 0:
		if(boardUser[0]===1){

			$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Hauteur As</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			console.log('tu as hauteur : '+boardUser[0]+', '+boardUser[6]+', '+boardUser[5]+', '+boardUser[4]+', '+boardUser[3]);
			var hauteurUserVal = 100+boardUser[6]+boardUser[5]+boardUser[4]+boardUser[3];
		}else{
			if(boardUser[6]===13){
				valCombi = 'Roi';
			}else if(boardUser[6]===12){
				valCombi = 'Dame'
			}else if(boardUser[6]===11){
				valCombi = 'Valet'
			}else if(boardUser[6]===1){
				valCombi = 'As'
			}else{
				valCombi = boardUser[6];
			}
			$('#aside').append('<p>Tu as : <img src="img/miniature/'+nbCartesDejaTires[5]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[6]+'.png"/> Hauteur '+valCombi+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			console.log('tu as hauteur : '+boardUser[6]+', '+boardUser[5]+', '+boardUser[4]+', '+boardUser[3]+', '+boardUser[2]+', ');
			var hauteurUserVal = boardUser[6]+boardUser[5]+boardUser[4]+boardUser[3]+boardUser[2];
		}
		
	}

	
	combinaison = 0;
	

	for(var i=0;i<boardBot.length;i++){

		for(var j=i+1;j<boardBot.length;j++){

			if(boardBot[i] == boardBot[j]){  // paire
				psBot = boardBot[i];
				combinaisonMax=2;
				if(combinaisonMax>combinaison){
					combinaison = combinaisonMax;
				}
					phBot1 = boardBot[6];    // determine la paire et les hauteurs
					phBot2 = boardBot[5];
					phBot3 = boardBot[4];
				if(boardBot[6]==psBot && boardBot[5]==psBot){
					phBot1 = boardBot[4];
					phBot2 = boardBot[3];
					phBot3 = boardBot[2];
					if(boardBot[0]===1){
						phBot1 = 1;
						phBot2 = boardBot[4];
						phBot3 = boardBot[3];
					}
				}else if(boardBot[5]==psBot && boardBot[4]==psBot){
					phBot1 = boardBot[6];
					phBot2 = boardBot[3];
					phBot3 = boardBot[2];
					if(boardBot[0]===1){
						phBot1 = 1;
						phBot2 = boardBot[6];
						phBot3 = boardBot[3];
					}
				}else if(boardBot[4]==psBot && boardBot[3]==psBot){
					phBot1 = boardBot[6];
					phBot2 = boardBot[5];
					phBot3 = boardBot[2];
					if(boardBot[0]===1){
						phBot1 = 1;
						phBot2 = boardBot[6];
						phBot3 = boardBot[5];
					}
				}else if(boardBot[3]==psBot && boardBot[2]==psBot){
					phBot1 = boardBot[6];
					phBot2 = boardBot[5];
					phBot3 = boardBot[4];
					if(boardBot[0]===1){
						phBot1 = 1;
						phBot2 = boardBot[6];
						phBot3 = boardBot[5];
					}
				}else if(boardBot[2]==psBot && boardBot[1]==psBot){
					phBot1 = boardBot[6];
					phBot2 = boardBot[5];
					phBot3 = boardBot[4];
					if(boardBot[0]===1){
						phBot1 = 1;
						phBot2 = boardBot[6];
						phBot3 = boardBot[5];
					}
				}
			}
			
			for(var k=j+1;k<boardBot.length;k++){

				if(boardBot[i] === boardBot[j] && boardBot[j] === boardBot[k]){  // brelanBot
					//console.log('brelanBot '+boardBot[i]);
					//console.log('i:'+i+' j:'+j+' k:'+k);

					nbbrelanBot++
					//console.log(nbbrelanBot);
					if(nbbrelanBot === 1){
						brelanBot = boardBot[i];
						combinaisonMax=4;
						if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
						}
						brelanBotKicker1 = boardBot[6];
						brelanBotKicker2 = boardBot[5];
						if(boardBot[0]===1 && boardBot[1]!==1){       // determine les 2 kickers du brelanBot 
							brelanBotKicker1 = 1;				
							brelanBotKicker2 = boardBot[6];
							if(boardBot[6]===brelanBot){
								brelanBotKicker1 = 1;				
								brelanBotKicker2 = boardBot[3];
							}else if(boardBot[5]===brelanBot){
								brelanBotKicker1 = 1;				
								brelanBotKicker2 = boardBot[6];
							}					
						}else if(boardBot[6]===brelanBot){
							brelanBotKicker1 = boardBot[3];
							brelanBotKicker2 = boardBot[2];
						}else if(boardBot[5]===brelanBot && boardBot[6]!==brelanBot){
							brelanBotKicker1 = boardBot[6];
							brelanBotKicker2 = boardBot[2];
						}

						//console.log(brelanBotKicker1,brelanBotKicker2)
						
					}
					if(nbbrelanBot === 2){  // si il y a 2 brelanBots alors on a full 
						brelanBot2 = boardBot[i];
						if(brelanBot === 1){ // cas spéciale ou l'AS compte comme une petite et grosse carte
							//console.log('Bot as full '+brelanBot+' par les '+brelanBot2);
							var full = brelanBot;
							var fullP = brelanBot2;
						}else if(brelanBot2 === 1){
							//console.log('Bot as full '+brelanBot2+' par les '+brelanBot);
							var full = brelanBot2;
							var fullP = brelanBot;
						}else if(brelanBot>brelanBot2){// determine l'ordre du full
							//console.log('Bot as full '+brelanBot+' par les '+brelanBot2);
							var full = brelanBot;
							var fullP = brelanBot2;
						}else{
							//console.log('Bot as full '+brelanBot2+' par les '+brelanBot);
							var full = brelanBot2;
							var fullP = brelanBot;
						}
						combinaisonMax=7;
						if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
						}
					}
				}

				for(var l=k+1;l<boardBot.length;l++){
					//console.log('i:'+i+' j:'+j+' k:'+k+' l:'+l);

					if(boardBot[i] === boardBot[j] && boardBot[k] === boardBot[l]){ // 2 paires
						if(boardBot[j]===1){
							paireBot1 = boardBot[j]; // cas ou il y a 2 paires dont paire d'as
						}
						if(boardBot[l]===1){
							paireBot2 = boardBot[l];
						}
						if(boardBot[j]>paireBot1 && paireBot1!==1){
							paireBot1 = boardBot[j];
						}
						if(boardBot[l]>paireBot2 && paireBot2!==1){
							paireBot2 = boardBot[l];
						}
						for(var h=0;h<boardBot.length;h++){
							if(boardBot[h] !== paireBot1 && boardBot[h] !== paireBot2){
								var kickerDP = boardBot[h]
								//console.log(boardBot[h]);
								if(boardBot[h] === 1){		// determine le kicker des 2 paires
									//console.log(boardBot[h])
									kickerDP = boardBot[h];
									break;
								}
							}
						}
						nbDPBot++
						//console.log(nbDP);
						//console.log('Bot as 2 paires!!'+paireBot1+' et '+paireBot2);
						combinaisonMax = 3;
						if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
						}
					}
					if(boardBot[i] === boardBot[j] && boardBot[j] === boardBot[k] && boardBot[k] === boardBot[l]){
						var quadBot = boardBot[i];
						combinaisonMax = 8;					// carré
						if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
						}
						for(var h=0;h<boardBot.length;h++){
							if(boardBot[h] !== quadBot){
								kickerquadBot = boardBot[h]
								//console.log(boardBot[h]);
								if(boardBot[h] === 1){
									//console.log(boardBot[h])
									kickerquadBot = boardBot[h];
									break;
								}
							}
						}
					}
					for(var m=l+1;m<boardBot.length;m++){
						//console.log('i:'+i+' j:'+j+' k:'+k+' l:'+l+' m:'+m);
						// on calcule la quinte
						if(boardBot[i]+1 == boardBot[j] &&
						   boardBot[j]+1 == boardBot[k] &&				// quinte
						   boardBot[k]+1 == boardBot[l] &&
						   boardBot[l]+1 == boardBot[m]){
						   	combinaisonMax=5;
							var quinteHauteurBot = boardBot[m];
							if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
							}  
							
						}else if(boardBot[i] == 1 && boardBot[j] == 10 && boardBot[k]== 11 && boardBot[l]==12 && boardBot[m]==13){
							//on calcule la grosse quinte car l'as est a la fois la plus petite et la plus grande carte
							//console.log('Bot as la grande quinte');
							combinaison = 5;
							var quinteHauteur = boardBot[i];    // quinte hauteur as
							if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
							}
						}
						if( botColor[i]%4 == botColor[j]%4 &&
							botColor[j]%4 == botColor[k]%4 && /// couleur
							botColor[k]%4 == botColor[l]%4 &&
							botColor[l]%4 == botColor[m]%4 ){
							carteColorBot =   [Math.ceil(bot[i]/4),
											Math.ceil(bot[j]/4),
											Math.ceil(bot[k]/4),
											Math.ceil(bot[l]/4),
											Math.ceil(bot[m]/4)];


							carteColorBot.sort(function(a, b) {  // fonction qui trie dans l'ordre croissant

							    if (a < b) {
							        return -1;
							    } else if (a > b) {
							        return 1;
							    } else {
							        return 0;
							    }

							});

							//console.log(carteColorBot);

							if( carteColorBot[0]+1 == carteColorBot[1] &&
								carteColorBot[1]+1 == carteColorBot[2] &&
								carteColorBot[2]+1 == carteColorBot[3] &&
								carteColorBot[3]+1 == carteColorBot[4] ){
								//console.log('quinte fluch');
								quinteFlushBot = 9;
								var quinteFlushBotHauteur = carteColorBot[4];
							}

							if(carteColorBot[0]===1 && carteColorBot[1]===10 && carteColorBot[2]===11 && carteColorBot[3]===12 && carteColorBot[4]===13){
								//console.log('quinte fluch Royale');
								quinteFlushBot = 10;

							}

								//calcul de la valeur de la couleur (pour comparer avec le bot)
							colorValBot = carteColorBot[0]+carteColorBot[1]+carteColorBot[2]+carteColorBot[3]+carteColorBot[4];
							if(carteColorBot[0]===1 || carteColorBot[1]===1 || carteColorBot[2]===1 || carteColorBot[3]===1 || carteColorBot[4]===1){
								colorValBot+=100;
							}
							//console.log(colorValBot);
							if(colorValBot>colorValBotMax){
								colorValBotMax = colorValBot;
								var carteColorBotMax = carteColorBot;
							}
							//console.log(carteColorBotMax);

							/*carteColorBotMax.sort(function(a, b) {  // fonction qui trie dans l'ordre croissant

							    if (a < b) {
							        return -1;
							    } else if (a > b) {
							        return 1;
							    } else {
							        return 0;
							    }

							});*/
							
							combinaisonMax = 6;
							if(combinaisonMax>combinaison){
							combinaison = combinaisonMax;
							}
						}
					}
				}
			}
		}
	}

	//console.log(nbDPBot);

	if(nbbrelanBot === 1 && nbDPBot>=1){
		combinaisonMax=7;
			if(combinaisonMax>combinaison){
				combinaison = combinaisonMax;
			}
		if(brelanBot==paireBot1){
			//console.log('Bot as full '+brelanBot+' par les '+paireBot2);
			paireBot = paireBot2
		}else{
			//console.log('Bot as full '+brelanBot+' par les '+paireBot1);
			paireBot = paireBot1
		}
		
	}
	if(nbbrelanBot>1 ){
		brelanBot = full;
		paireBot = fullP;
	}
	if(quinteFlushBot===9){
		combinaison = 9;
	}
	if(quinteFlushBot===10){
		combinaison = 10;
	}
//console.log(combinaison)

var combinaisonBot = combinaison;

	switch(combinaison){
		case 10:
		console.log('Le bot a la plus belle main du jeu Quinte Flush Royale !!')
		break;

		case 9:
		console.log('Le bot a fais quinte flush hauteur '+quinteFlushBotHauteur)
		if(quinteFlushBotHauteur===13){
				valCombi = 'Roi';
			}else if(quinteFlushBotHauteur===12){
				valCombi = 'Dame'
			}else if(quinteFlushBotHauteur===11){
				valCombi = 'Valet'
			}else{
				valCombi = quinteFlushBotHauteur;
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Quinte flush hauteur '+valCombi+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		break;

		case 8:
		console.log('Bot a carré de : '+quadBot+' kicker '+kickerquadBot);
		if(quadBot===13){
				valCombi = 'Rois';
			}else if(quadBot===12){
				valCombi = 'Dames'
			}else if(quadBot===11){
				valCombi = 'Valets'
			}else if(quadBot===1){
				valCombi = 'As'
			}else{
				valCombi = quadBot;
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Carré de '+valCombi+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		var quadBotVal = quadBot*100+kickerquadBot;
		if(quadBot===1){
			quadBotVal+=10000;
		}
		if(kickerquadBot===1){
			quadBotVal+=15;
		}
		break;

		case 7:
		console.log('Bot a full au : '+brelanBot+' par les '+paireBot);
		if(brelanBot===13){
				valCombi = 'Rois';
			}else if(brelanBot===12){
				valCombi = 'Dames'
			}else if(brelanBot===11){
				valCombi = 'Valets'
			}else if(brelanBot===1){
				valCombi = 'As'
			}else{
				valCombi = brelanBot;
			}
			if(paireBot===13){
				valCombi2 = 'Rois';
			}else if(paireBot===12){
				valCombi2 = 'Dames'
			}else if(paireBot===11){
				valCombi2 = 'Valets'
			}else if(paireBot===1){
				valCombi2 = 'As'
			}else{
				valCombi2 = paireBot;
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Full aux '+valCombi+' par les '+valCombi2+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		var fullBotVal = brelanBot*100+paireBot;
		if(brelanBot===1){
			fullBotVal+=10000;
		}
		if(paireBot===1){
			fullBotVal+=15;
		}
		break;

		case 6:
		carteColorBotMax.sort(function(a, b) {  // fonction qui trie dans l'ordre DEcroissant

							    if (a > b) {
							        return -1;
							    } else if (a < b) {
							        return 1;
							    } else {
							        return 0;
							    }

							});
		if(carteColorBotMax[4]===1){
			// faire passer l'as en premier dans le tableau 
			carteColorBotMax.pop();
			carteColorBotMax.unshift(1);
		}
		console.log('Bot a couleur hauteur '+carteColorBotMax[0]+', '+carteColorBotMax[1]+', '+carteColorBotMax[2]+', '+carteColorBotMax[3]+', '+carteColorBotMax[4]);
		if(carteColorBotMax[0]===13){
				valCombi = 'Roi';
			}else if(carteColorBotMax[0]===12){
				valCombi = 'Dame'
			}else if(carteColorBotMax[0]===11){
				valCombi = 'Valet'
			}else if(carteColorBotMax[0]===1){
				valCombi = 'As'
			}else{
				valCombi = carteColorBotMax[0];
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Couleur hauteur '+valCombi+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		break;

		case 5:
		console.log('Bot a quinte hauteur : '+quinteHauteurBot);
		if(quinteHauteurBot===13){
				valCombi = 'Roi';
			}else if(quinteHauteurBot===12){
				valCombi = 'Dame'
			}else if(quinteHauteurBot===11){
				valCombi = 'Valet'
			}else if(quinteHauteurBot===1){
				valCombi = 'As'
			}else{
				valCombi = quinteHauteurBot;
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Quinte hauteur '+valCombi+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		break;

		case 4:
		if(brelanBot===13){
				valCombi = 'Rois';
			}else if(brelanBot===12){
				valCombi = 'Dames'
			}else if(brelanBot===11){
				valCombi = 'Valets'
			}else if(brelanBot===1){
				valCombi = 'As'
			}else{
				valCombi = brelanBot;
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Brelan de '+valCombi+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		console.log('Bot a brelan de : '+brelanBot+' kicker '+brelanBotKicker1+' et '+brelanBotKicker2);
		var brelanBotVal = brelanBot*100+brelanBotKicker1+brelanBotKicker2;
		if(brelanBot===1){
			brelanBotVal+=10000;
		}
		if(brelanBotKicker1===1 || brelanBotKicker2===1){
			brelanBotVal+=15;
		}
		break;

		case 3:
		if(paireBot1===1){
			paireBot1 = paireBot2;
			paireBot2 = 1;
		}
		if(paireBot2===13){
				valCombi = 'Rois';
			}else if(paireBot2===12){
				valCombi = 'Dames'
			}else if(paireBot2===11){
				valCombi = 'Valets'
			}else if(paireBot2===1){
				valCombi = 'As'
			}else{
				valCombi = paireBot2;
			}
			if(paireBot1===13){
				valCombi2 = 'Rois';
			}else if(paireBot1===12){
				valCombi2 = 'Dames'
			}else if(paireBot1===11){
				valCombi2 = 'Valets'
			}else if(paireBot1===1){
				valCombi2 = 'As'
			}else{
				valCombi2 = paireBot1;
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Deux paires '+valCombi+' et '+valCombi2+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		console.log('Bot a deux paires : '+paireBot2+' et '+paireBot1+' kicker '+kickerDP);
		var dbPaireBotVal = paireBot2*100+paireBot1*10+kickerDP;
		if(paireBot2===1){
			dbPaireBotVal+=10000;
		}
		if(kickerDP===1){
			dbPaireBotVal+=15;
		}

		break;

		case 2:
		if(psBot===13){
				valCombi = 'Rois';
			}else if(psBot===12){
				valCombi = 'Dames'
			}else if(psBot===11){
				valCombi = 'Valets'
			}else if(psBot===1){
				valCombi = 'As'
			}else{
				valCombi = psBot;
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Une paire de '+valCombi+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
		console.log('Bot a une paire de '+psBot+' hauteur '+phBot1+', '+phBot2+', '+phBot3);
		var paireBotVal = phBot1+phBot2+phBot3;
		if(phBot1===1){
			paireBotVal += 100;
		}
		break;

		case 0:
		if(boardBot[0]===1){ // cas spéciale avec l'as
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Hauteur As </p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			console.log('Bot a hauteur : '+boardBot[0]+', '+boardBot[6]+', '+boardBot[5]+', '+boardBot[4]+', '+boardBot[3]);
			var hauteurBotVal = 100+boardBot[6]+boardBot[5]+boardBot[4]+boardBot[3];
		}else{
			if(boardBot[6]===13){
				valCombi = 'Rois';
			}else if(boardBot[6]===12){
				valCombi = 'Dames'
			}else if(boardBot[6]===11){
				valCombi = 'Valets'
			}else if(boardBot[6]===1){
				valCombi = 'As'
			}else{
				valCombi = boardBot[6];
			}
			$('#aside').append('<p>J1 a : <img src="img/miniature/'+nbCartesDejaTires[7]+'.png"/><img src="img/miniature/'+nbCartesDejaTires[8]+'.png"/> Hauteur '+valCombi+'</p>');
			document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
			console.log('Bot a hauteur : '+boardBot[6]+', '+boardBot[5]+', '+boardBot[4]+', '+boardBot[3]+', '+boardBot[2]+', ');
			var hauteurBotVal = boardBot[6]+boardBot[5]+boardBot[4]+boardBot[3]+boardBot[2];
		}
		
	}

	//console.log(combinaisonUser,combinaisonBot);

	if(combinaisonUser==combinaisonBot){
		
		switch(combinaisonUser){

			case 10:
			console.log("vous avez le meme jeu");
			gagnant = 2;
			break;

			case 9:
			console.log(quinteFlushUserHauteur,quinteFlushBotHauteur);
			if(quinteFlushUserHauteur>quinteFlushBotHauteur){
				console.log('tu as gagné le coup');
				gagnant = 1;
			}else if(quinteFlushUserHauteur===quinteFlushBotHauteur){
				console.log('vous avez le meme jeu');
				gagnant = 2;
			}else{
				console.log('tu as perdu le coup');
				gagnant = 3;
			}
			break;

			case 8:
			console.log(quadUserVal,quadBotVal);
			if(quadUserVal>quadBotVal){
				console.log('tu as gagné le coup');
				gagnant = 1;
			}else if(quadUserVal===quadBotVal){
				console.log('vous avez le meme jeu');
				gagnant = 2;
			}else{
				console.log('tu as perdu le coup');
				gagnant = 3;

			}
			break;

			case 7:
			console.log(fullUserVal,fullBotVal);
			if(fullUserVal>fullBotVal){
				console.log('tu as gagné le coup');
				gagnant = 1;
			}else if(fullUserVal===fullBotVal){
				console.log('vous avez le meme jeu');
				gagnant = 2;
			}else{
				console.log('tu as perdu le coup');
				gagnant = 3;

			}
			break;

			case 6:
			console.log(colorValUserMax,colorValBotMax);
			if(colorValUserMax>colorValBotMax){
				console.log('tu as gagné le coup');
				gagnant = 1;
			}else if(colorValUserMax===colorValBotMax){
				console.log('vous avez le meme jeu');
				gagnant = 2;
			}else{
				console.log('tu as perdu le coup');
				gagnant = 3;
			}
			break;

			case 5:
			console.log(quinteHauteurUser,quinteHauteurBot);
			if(quinteHauteurUser>quinteHauteurBot){
				console.log('tu as gagné le coup');
				gagnant = 1;
			}else if(quinteHauteurUser===quinteHauteurBot){
				console.log('vous avez le meme jeu');
				gagnant = 2;
			}else{
				console.log('le bot gagne');
				gagnant = 3;
			}
			break;

			case 4:
			console.log(brelanUserVal,brelanBotVal);
			if(brelanUserVal>brelanBotVal){
				console.log('tu as gagné le coup');
				gagnant = 1;
			}else if(brelanUserVal===brelanBotVal){
				console.log('vous avez le meme jeu');
				gagnant = 2;
			}else{
				console.log('le bot gagne');
				gagnant = 3;
			}
			break;

			case 3:
			console.log(dbPaireUserVal,dbPaireBotVal);
			if(dbPaireBotVal>dbPaireUserVal){
				console.log('le bot gagne');
				gagnant = 3;
			}else if(dbPaireBotVal===dbPaireUserVal){
				console.log('vous avez le meme jeu');
				gagnant = 2;
			}else{
				console.log('tu as gagné le coup');
				gagnant = 1;
			}
			break;

			case 2:
			console.log(paireUserVal,paireBotVal);
			if(paireSimple>psBot & paireSimple!==1 & psBot !==1){
				console.log('tu gagnes');
				gagnant = 1;
			}else if(paireSimple===psBot){ // 
				console.log('vous avez chacun la meme paire');
				gagnant = 2;
				if(paireUserVal>paireBotVal){
					console.log('tu gagnes');
					gagnant = 1;
				}else if(paireUserVal===paireBotVal){
					console.log('Vous avez exactement la meme main');
					gagnant = 2;
				}else{
					console.log('Tu as perdu le coup');
					gagnant = 3;
				}

			}else if(paireSimple===1 & psBot!==1){
				console.log('tu gagnes');
				gagnant = 1;
			}else{
				console.log('tu perds');
				gagnant = 3;
			}
			break;

			case 0:
			console.log(hauteurUserVal,hauteurBotVal);
			if(hauteurUserVal>hauteurBotVal){
				console.log('Tu as gagné le coup');
				gagnant = 1;
			}else if(hauteurUserVal===hauteurBotVal){
				console.log('Vous avez exactement la meme main');
				gagnant = 2;
			}else{
				console.log('Tu as perdu le coup');
				gagnant = 3;
			}
		
		}
	}else if(combinaisonUser>combinaisonBot){
		console.log('Tu as gagné le coup');
		gagnant = 1;
	}else{
		console.log('Tu as perdu le coup');
		gagnant = 3;
	}
	

	


	potTotal = (20000-tapisUser-tapisBot);
	//console.log(potTotal);

	if(gagnant===1){
		tapisUser+=potTotal;
		$('#aside').append('<p>Tu as le meilleur jeu, tu gagnes '+potTotal+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
	}else if(gagnant===2){
		tapisUser+=potTotal/2;
		tapisBot+=potTotal/2;
		$('#aside').append('<p>Tu as le même jeu, tu partages le pot '+potTotal+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
	}else{
		tapisBot+=potTotal;
		$('#aside').append('<p>J1 a un meilleur jeu, il gagne '+potTotal+'</p>');
		document.getElementById("aside").scrollTop = document.getElementById("aside").scrollHeight;
	}

	if(tapisBot<=0){
		alert('Tu as gagné la partie Bravo!!!');
		tapisUser = 10000;
		tapisBot = 10000;
		CoupPartie = 0;
		startGame();}
		
	if(tapisUser<=0){
		alert('Tu as perdu la partie...retente ta chance');
		tapisUser = 10000;
		tapisBot = 10000;
		CoupPartie = 0;
		startGame();
	}
	
										
window.setTimeout(startGame,5000);


/*
	if(tapisBot===0){
		alert('Tu as gagné la partie Bravo!!!');
		tapisUser = 10000;
		tapisBot = 10000;
		CoupPartie = 0;
		startGame();
	}*/
}


$(function(){
	
	startGame();
	
});

/*
	BONUS : 
		si on fait tapis :  
			1/ si on fait tapis afficher all in mais si il nous reste des jetons on laisse le reste affiché
			2/ afficher les probabilités de gagner et de perdre (en pourcentage)
		
		faire un résumé sur le coté de toutes les actions ( on peu scroll si a bcp d'action )

*/