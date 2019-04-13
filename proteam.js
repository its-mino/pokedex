var teams;
var mycount = 0
var teamcount = 0



window.onload = function()
{
  myt = fetch('http://localhost/pokedex/proteam.php')
  .then(function(response){
    return response.json();
  })
  .then(function(myJson)
  {
    teams = myJson;
    console.log(teams);


    for(var i = 0; i < teams.length; i++)
    {
      $('#proteamTable').append(
                  '<tr><td><h3 id="name'+i+'1"></h3><img id="imageHolder'+i+'1"></td>'+
                  '<td><h3 id="name'+i+'2"></h3><img id="imageHolder'+i+'2"></td>'+
                  '<td><h3 id="name'+i+'3"></h3><img id="imageHolder'+i+'3"></td>'+
                  '<td><h3 id="name'+i+'4"></h3><img id="imageHolder'+i+'4"></td>'+
                  '<td><h3 id="name'+i+'5"></h3><img id="imageHolder'+i+'5"></td>'+
                  '<td><h3 id="name'+i+'6"></h3><img id="imageHolder'+i+'6"></td></tr>');

      for(var j = 1; j<=6; j++)
      {
        writeResults(teams[i]['Pokemon' + j], i, j);
      }

    }
  })
}


function writeResults(pokemonName,i,j){

  console.log(pokemonName)

    fetch('http://localhost/pokedex/getPokemon.php/?name='+pokemonName)
      .then(function(response) {
      	return response.json();
      })
      .then(function(myJson) {
        console.log(i,j)
        console.log(myJson)
      	writeImage(myJson[0]['Sprite'],pokemonName,i,j);
    	});
}

function writeImage(link,name, i, j)
{

    $(('#name' + i) + j).append(name)
    $(('#imageHolder' + i) + j).attr('src', link)

}
