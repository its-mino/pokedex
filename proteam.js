targetPokemon = "torchic"

window.onload = function()
{
  function choosePokemon(num)
  {
    id = num
    fetch('http://localhost/pokedex/getPokemon.php/?name='+targetPokemon)
      .then(function(response) {
      	return response.json();
      })
      .then(function(myJson) {
      	writeImage(myJson[0]['Sprite']);
    	});
  }
}

function writeImage(link)
{
    $('#imageHolder').attr('src', link)
}
