data = {}
pagenumber = 1
colors = {'Poison':'DA35DC', 'Grass':'35DC43', 'Fire': 'FF0000', 'Water': '26CCFF', 'Bug': '458027', 'Flying': 'ADFFFF', 'Normal': 'E7E7E7', 'Fighting': 'A64141', 'Ground': 'D3B469', 'Rock': '85744C', 'Ghost': '6F6E6B', 'Steel': '72798D', 'Electric': 'F4F700', 'Psychic': 'F261D1', 'Ice': 'EAFCFC', 'Dragon': '3B256E', 'Dark': '282828', 'Fairy': 'FAB4E9'};
id=0
function choosePokemon(num)
{
	id = num
	$('#myModal').modal({show:true});
	fetch('http://localhost/pokedex/getResults.php')
    .then(function(response) {
    	return response.json();
    })
    .then(function(myJson) {
    	data = myJson;
    	writeResults();
  	});
}

function writeResults()
{
	var query = document.getElementById('searchbarModal').value.toLowerCase();
	var new_data = []
	for(var i=0;i<data.length;i++)
	{
		if(data[i]['Name'].toLowerCase().includes(query))
		{
			new_data.push(data[i]);
		}
	}
	results = document.getElementById('results')
	results.innerHTML = ''
	for(var i=(25*pagenumber)-25;i<25*pagenumber;i++)
	{
		new_data[i]['Name'] = new_data[i]['Name'].charAt(0).toUpperCase() + new_data[i]['Name'].slice(1);
		new_data[i]['Type1'] = new_data[i]['Type1'].charAt(0).toUpperCase() + new_data[i]['Type1'].slice(1);
		new_data[i]['Type2'] = new_data[i]['Type2'].charAt(0).toUpperCase() + new_data[i]['Type2'].slice(1);
		var flag = true;
		try
		{
			results.innerHTML += '<div id=\"'+new_data[i]['Name']+'\" onclick=\"setPokemon(\''+new_data[i]['Name'].toLowerCase()+'\', \''+new_data[i]['Sprite']+'\')\"><img src=\"'+new_data[i]['Sprite']+'\"><b>'+new_data[i]['Name']+'</b> <div class=\"type\" style=\"background-color:#'+colors[new_data[i]['Type1']]+'\">'+new_data[i]['Type1']+'</div> <div class=\"type\" style=\"background-color:#'+colors[new_data[i]['Type2']]+'\">'+new_data[i]['Type2']+'</div><br><br></div>';
			h = document.getElementById(new_data[i]['Name']);
			h.className += 'resultModal';
		}
		catch(e)
		{
			var flag = false;
		}
	}
	results.innerHTML += '<button id="prevpage" onclick="goToPrevPage()">Previous Page</button><button id="nextpage" onclick="goToNextPage()">Next Page</button>'
	if(flag)
	{
		document.getElementById("nextpage").style.display = 'inline';
	}
	else
	{
		document.getElementById("nextpage").style.display = 'none';
	}
}

function setPokemon(name, sprite)
{
	$('#myModal').modal('hide');
	$('#pokemon'+id).attr('src', sprite)
	$('#name'+id).empty()
	$('#name'+id).append(name.charAt(0).toUpperCase() + name.slice(1))
}