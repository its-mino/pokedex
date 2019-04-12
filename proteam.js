targetPokemon = "Torchic"


window.onload = function()
{
  fetch('http://localhost/pokedex/getPokemon.php/?name='+targetPokemo)
    .then(function(response) {
    	return response.json();
    })
    .then(function(myJson) {
    	writeImage(myJson[0]['Sprite']);
  	});
}

function writeImage(link)
{
    $('#imageHolder').attr('src', link)
}
