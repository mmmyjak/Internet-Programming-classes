var tura = 0;
var x = [];
var o = [];
var ktogra_x = 1;
var zaw1_points = 0;
var zaw2_points = 0;
let kaf  = document.querySelectorAll('.kafelki');
for (let k of kaf) k.addEventListener('click', ruch);


function ruch()
{
	tura += 1;
	this.removeEventListener('click', ruch);
	if (tura % 2 == 1)
	{
		this.innerHTML += "X";
		x.push(parseInt(this.id));
		let czy_x = zwyciestwo(x);
		if (czy_x[0])
		{
			for (let i=0; i < czy_x[1].length; i++)
			{
				let k = document.getElementById(czy_x[1][i]);
				k.style.backgroundColor = "white";
			}
			koniec("X");
		}
		else if (tura == 9)
		{
			koniec("nikt");
		}
		if (ktogra_x == 1)
		{
			document.getElementById('rz1').innerHTML = "";
			document.getElementById('rz2').innerHTML = "YOUR TURN";
		}
		else
		{
			document.getElementById('rz2').innerHTML = "";
			document.getElementById('rz1').innerHTML = "YOUR TURN";
		}
		
	}
	else
	{
		this.innerHTML += "O";
		o.push(parseInt(this.id));
		let czy_o = zwyciestwo(o);
		if (czy_o[0]) 
		{
			for (let i=0; i < czy_o[1].length; i++)
			{
				let k = document.getElementById(czy_o[1][i]);
				k.style.backgroundColor = "white";
			}
			koniec("O");
		}
		if (ktogra_x == 1)
		{
			document.getElementById('rz2').innerHTML = "";
			document.getElementById('rz1').innerHTML = "YOUR TURN";
		}
		else
		{
			document.getElementById('rz1').innerHTML = "";
			document.getElementById('rz2').innerHTML = "YOUR TURN";
		}
		
	}
}


function zwyciestwo(tab)
{
	var wins = [
		[1, 2, 3],
		[4,5,6],
		[7,8,9],
		[1,4,7],
		[2,5,8],
		[3,6,9],
		[1,5,9],
		[3,5,7]
		];
	for (let i=0; i < wins.length; i++)
	{		
		if (tab.includes(wins[i][0]) && tab.includes(wins[i][1]) && tab.includes(wins[i][2])) return [true, wins[i]];		
	}
	return false;
}

function koniec(kto)
{
	let kaf  = document.querySelectorAll('.kafelki');
	for (let k of kaf) 
	{
		k.removeEventListener('click', ruch);
	}
	if (kto == "nikt") document.getElementById("koniec").innerHTML = "<p>Remis.</p>" + "<p>Naciśnij spację, żeby zagrać jeszcze raz.</p>";
	else if ((kto == "X" && ktogra_x == 1) || (ktogra_x == 2 && kto == "O")) 
	{
		document.getElementById("koniec").innerHTML = "<p>Wygrał zawodnik posługujący się " + kto + ".</p>" + "<p>Naciśnij spację, żeby zagrać jeszcze raz.</p>";
		zaw1_points +=1;
		document.getElementById('p1').innerHTML = "Points: " + zaw1_points;
	}
	else
	{
		document.getElementById("koniec").innerHTML = "<p>Wygrał zawodnik posługujący się " + kto + ".</p>" + "<p>Naciśnij spację, żeby zagrać jeszcze raz.</p>";
		zaw2_points +=1;
		document.getElementById('p2').innerHTML = "Points: " + zaw2_points;
	}
		
	document.addEventListener('keypress', resecik);
}

function resecik(klucz)
{
	if (klucz.key == " ")
	{
		let kaf  = document.querySelectorAll('.kafelki');
		for (let k of kaf) 
		{
			k.addEventListener('click', ruch);
			k.innerHTML="";
			k.style.backgroundColor = "";
		}

		tura = 0;
		x = [];
		o = [];
		document.getElementById("koniec").innerHTML = "";
		document.removeEventListener('keypress', resecik);
		if (ktogra_x == 1)
		{
			ktogra_x = 2;
			document.getElementById("kg2").innerHTML = "[X]"
			document.getElementById("kg1").innerHTML = "[O]"
		}
		else
		{
			ktogra_x = 1;
			document.getElementById("kg2").innerHTML = "[O]"
			document.getElementById("kg1").innerHTML = "[X]"
		}
	}
	
}
