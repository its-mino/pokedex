colors = {'Poison':'DA35DC', 'Grass':'35DC43', 'Fire': 'FF0000', 'Water': '26CCFF', 'Bug': '458027', 'Flying': 'ADFFFF', 'Normal': 'E7E7E7', 'Fighting': 'A64141', 'Ground': 'D3B469', 'Rock': '85744C', 'Ghost': '6F6E6B', 'Steel': '72798D', 'Electric': 'F4F700', 'Psychic': 'F261D1', 'Ice': 'EAFCFC', 'Dragon': '3B256E', 'Dark': '282828', 'Fairy': 'FAB4E9'};

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
    	writeData(data);
  	});
}

function writeData(data)
{
	console.log(data)
	$('#info').append('<h3 id="pokemonName"><b>'+data['Name']+'</b></h3>');
	$('#info').append('<table>')
	$('#info').append('<img id="pokemonImage" src="'+data['Sprite']+'"></img>');
	$('#info').append('<div class=\"type2\" style=\"background-color:#'+colors[data['Type1']]+'\">'+data['Type1']+'</div> <div class=\"type2\" style=\"background-color:#'+colors[data['Type2']]+'\">'+data['Type2']+'</div><br>');
	$('#info').append('<table id="statTable"><tr><th class="stat">HP</th><td class="stat" class="stat">'+data['HP']+'</td><th class="stat">Speed</th><td class="stat">'+data['Speed']+'</td></tr><tr><th class="stat">Attack</th><td class="stat">'+data['Attack']+'</td><th class="stat">Defense</th><td class="stat">'+data['Defense']+'</td></tr><tr><th class="stat">Spec. Attack</th><td class="stat">'+data['SpecialAttack']+'</td><th class="stat">Spec. Defense</th><td class="stat">'+data['SpecialDefense']+'</td></tr></table>');
}
