colors = {'Poison':'DA35DC', 'Grass':'35DC43', 'Fire': 'FF0000', 'Water': '26CCFF', 'Bug': '458027', 'Flying': 'ADFFFF', 'Normal': 'E7E7E7', 'Fighting': 'A64141', 'Ground': 'D3B469', 'Rock': '85744C', 'Ghost': '6F6E6B', 'Steel': '72798D', 'Electric': 'F4F700', 'Psychic': 'F261D1', 'Ice': 'EAFCFC', 'Dragon': '3B256E', 'Dark': '282828', 'Fairy': 'FAB4E9'};
data = {}

window.onload = function()
{
	var urlParams = new URLSearchParams(window.location.search);
	var targetPokemon = urlParams.get('name')

	fetch('http://localhost/pokedex/getPokemon.php/?name='+targetPokemon)
    .then(function(response) {
    	return response.json();
    })
    .then(function(myJson) {
    	data = myJson[0];
    	data['Name'] = data['Name'].charAt(0).toUpperCase() + data['Name'].slice(1);
		data['Type1'] = data['Type1'].charAt(0).toUpperCase() + data['Type1'].slice(1);
		data['Type2'] = data['Type2'].charAt(0).toUpperCase() + data['Type2'].slice(1);
    	getEvolutions();
  	});
}

function getEvolutions()
{
	evoImage1 = '';
	evoImage2 = '';
	evoImage3 = '';
	if(data['Evo1'] != '')
	{
		fetch('http://localhost/pokedex/getPokemon.php/?name='+data['Evo1'])
		.then(function(response){
			return response.json();
		})
		.then(function(myJson){
			evoImage1 = myJson[0]['Sprite'];
			if(data['Evo2'] != '')
			{
				fetch('http://localhost/pokedex/getPokemon.php/?name='+data['Evo2'])
				.then(function(response){
					return response.json();
				})
				.then(function(myJson2){
					evoImage2 = myJson2[0]['Sprite'];
					if(data['Evo3'] != '')
					{
						fetch('http://localhost/pokedex/getPokemon.php/?name='+data['Evo3'])
						.then(function(response){
							return response.json();
						})
						.then(function(myJson3){
							evoImage3 = myJson3[0]['Sprite'];
							writeData(evoImage1, evoImage2, evoImage3);
						})
					}
					else
					{
						writeData(evoImage1, evoImage2, '');
					}
				})
			}
			else
			{
				writeData(evoImage1, '', '')
			}
		});
	}
}

function writeData(evoImage1, evoImage2, evoImage3)
{
	$('#info').append('<h3 id="pokemonName"><b>'+data['Name']+'</b></h3>'+
					  '<div class="row">'+
					  '<div class="col-md"><img id="pokemonImage" src="'+data['Sprite']+'"></img></div>'+
					  '<div class="col-md"><table id="statTable"><tr><th class="stat">HP</th><td class="stat" class="stat">'+data['HP']+'</td><th class="stat">Speed</th><td class="stat">'+data['Speed']+'</td></tr><tr><th class="stat">Attack</th><td class="stat">'+data['Attack']+'</td><th class="stat">Defense</th><td class="stat">'+data['Defense']+'</td></tr><tr><th class="stat">Spec. Attack</th><td class="stat">'+data['SpecialAttack']+'</td><th class="stat">Spec. Defense</th><td class="stat">'+data['SpecialDefense']+'</td></tr></table></div>'+
					  '</div>'+
					  '<div class="row">'+
					  '<div class="col-md"><div class=\"type2\" style=\"background-color:#'+colors[data['Type1']]+'\">'+data['Type1']+'</div> <div class=\"type2\" style=\"background-color:#'+colors[data['Type2']]+'\">'+data['Type2']+'</div></div>'+
					  '<div class="col-md" style="text-align: center"><h5>Evolution Path</h5><img src="'+evoImage1+'"><span class="glyphicon glyphicon-arrow-right"></span>Lvl '+data['Level1']+'<img src="'+evoImage2+'"><span class="glyphicon glyphicon-arrow-right"></span>Lvl '+data['Level2']+'<img src="'+evoImage3+'"></div>'+
					  '</div>')
	fetch('http://localhost/pokedex/getMoves.php/?name='+data['Name'])
	.then(function(response){
		return response.json();
	})
	.then(function(myJson){
		moves = myJson;
		writeMoves(moves);
	})
}

function writeMoves(moves)
{
	moves = sortMoves(moves)
	$('#info').append('<h2><b>Moves<b></h2><table  id="moveTable">');
	$('#moveTable').append('<tr><td class="move"><b>Move Name</b></td><td class="move"><b>Level Learned</b></td><td class="move"><b>Type</b></td><td class="move"><b>Effect</b></td><td class="move"><b>Power</b></td><td class="move"><b>Accuracy</b></td><td class="move"><b>PP</b></td></tr><br>')
	for(var i=0;i<moves[0].length;i++)
	{
		$('#moveTable').append('<tr><td class="move">'+moves[0][i]['Name'].charAt(0).toUpperCase()+moves[0][i]['Name'].slice(1) + '</td><td class="move">' + moves[0][i]['LevelLearned']+'</td><td class="move">' + moves[0][i]['Type']+'</td><td class="move">' + moves[0][i]['Effect']+'</td><td class="move">' + moves[0][i]['Power']+'</td><td class="move">' + moves[0][i]['Accuracy']+'</td><td class="move">' + moves[0][i]['PP']+'</td></tr><br>')
	}
	for(var i=0;i<moves[1].length;i++)
	{
		$('#moveTable').append('<tr><td class="move">'+moves[1][i]['Name'].charAt(0).toUpperCase()+moves[1][i]['Name'].slice(1) + '</td><td class="move">' + moves[1][i]['LevelLearned']+'</td><td class="move">' + moves[1][i]['Type']+'</td><td class="move">' + moves[1][i]['Effect']+'</td><td class="move">' + moves[1][i]['Power']+'</td><td class="move">' + moves[1][i]['Accuracy']+'</td><td class="move">' + moves[1][i]['PP']+'</td></tr><br>')
	}
	$('#info').append('</table>')
}

function sortMoves(moves)
{
	levelMoves = []
	otherMoves = []
	for(var i=0;i<moves.length;i++)
	{
		if(moves[i].LevelLearned != 'Tutor' && moves[i].LevelLearned != 'TM or HM' && moves[i].LevelLearned != 'Egg' && moves[i].LevelLearned != 'Event')
		{
			moves[i].LevelLearned = parseInt(moves[i].LevelLearned)
			levelMoves.push(moves[i])
		}
		else
		{
			otherMoves.push(moves[i])
		}
	}
	return [levelMoves.sort(compare), otherMoves.sort(compare)]
}

function compare(a,b) {
	if (a.LevelLearned < b.LevelLearned)
		return -1;
	if (a.LevelLearned > b.LevelLearned)
		return 1;
	return 0;
}
