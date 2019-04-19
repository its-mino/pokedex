var teams;
var mycount = 0
var teamcount = 0



window.onload = function()
{
  myt = fetch('http://pokepedia.tk/pokedex/proteam.php')
  .then(function(response){
    return response.json();
  })
  .then(function(myJson)
  {
    teams = myJson;

    for(var i = 0; i < teams.length; i++)
    {
      console.log('<tr><h1>' + teams[i]['PlayerName'] + ' - ' + teams[i]['Ranking'] + '</h1></tr>')
      $('#proteamTable').append(
                  '<tr><td colspan = "6"><h1 class = "proteamName">' + teams[i]['PlayerName'] + ' - ' + teams[i]['Ranking'] + '</h1></td></tr>' +
                  '<tr><td><h3 class = "proteamName" id="name'+i+'1"></h3><img onclick="pokemonDetails(\''+teams[i]['Pokemon1']+'\')" class = "proteamim" id="imageHolder'+i+'1"></td>'+
                  '<td><h3 class = "proteamName" id="name'+i+'2"></h3><img onclick="pokemonDetails(\''+teams[i]['Pokemon2']+'\')" class = "proteamim" id="imageHolder'+i+'2"></td>'+
                  '<td><h3 class = "proteamName" id="name'+i+'3"></h3><img onclick="pokemonDetails(\''+teams[i]['Pokemon3']+'\')" class = "proteamim" id="imageHolder'+i+'3"></td>'+
                  '<td><h3 class = "proteamName" id="name'+i+'4"></h3><img onclick="pokemonDetails(\''+teams[i]['Pokemon4']+'\')" class = "proteamim" id="imageHolder'+i+'4"></td>'+
                  '<td><h3 class = "proteamName" id="name'+i+'5"></h3><img onclick="pokemonDetails(\''+teams[i]['Pokemon5']+'\')" class = "proteamim" id="imageHolder'+i+'5"></td>'+
                  '<td><h3 class = "proteamName" id="name'+i+'6"></h3><img onclick="pokemonDetails(\''+teams[i]['Pokemon6']+'\')" class = "proteamim" id="imageHolder'+i+'6"></td></tr><br>');

      for(var j = 1; j<=6; j++)
      {
        writeResults(teams[i]['Pokemon' + j], i, j);
      }

    }
  })
}


function writeResults(pokemonName,i,j){
    fetch('http://pokepedia.tk/pokedex/getPokemon.php/?name='+pokemonName)
      .then(function(response) {
      	return response.json();
      })
      .then(function(myJson) {
      	writeImage(myJson[0]['Sprite'],pokemonName,i,j);
    	});
}

function writeImage(link,name, i, j)
{

    $(('#name' + i) + j).append(name.charAt(0).toUpperCase()+name.slice(1))
    $(('#imageHolder' + i) + j).attr('src', link)

}

function pokemonDetails(name)
{
	window.location.href = '/pokedex/pokemon.html?name='+name;
}
