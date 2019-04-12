data = {}
pagenumber = 1
colors = {'Poison':'DA35DC', 'Grass':'35DC43', 'Fire': 'FF0000', 'Water': '26CCFF', 'Bug': '458027', 'Flying': 'ADFFFF', 'Normal': 'E7E7E7', 'Fighting': 'A64141', 'Ground': 'D3B469', 'Rock': '85744C', 'Ghost': '6F6E6B', 'Steel': '72798D', 'Electric': 'F4F700', 'Psychic': 'F261D1', 'Ice': 'EAFCFC', 'Dragon': '3B256E', 'Dark': '282828', 'Fairy': 'FAB4E9'};
id=0
types = ['Poison', 'Grass', 'Fire', 'Water', 'Bug', 'Flying', 'Normal', 'Fighting', 'Ground', 'Rock', 'Ghost', 'Steel', 'Electric', 'Psychic', 'Ice', 'Dragon', 'Dark', 'Fairy']
coveredTypes = []
strongAgainst = {
					'Normal': [],
					'Fighting': ['Normal', 'Rock', 'Steel', 'Ice', 'Dark'],
					'Flying': ['Fighting', 'Bug', 'Grass'],
					'Poison': ['Grass', 'Fairy'],
					'Ground': ['Poison', 'Rock', 'Steel', 'Fire', 'Electric'],
					'Rock': ['Flying', 'Bug', 'Fire', 'Ice'],
					'Bug': ['Grass', 'Psychic', 'Dark'],
					'Ghost': ['Ghost', 'Psychic'],
					'Steel': ['Rock', 'Ice', 'Fairy'],
					'Fire': ['Bug', 'Steel', 'Grass', 'Ice'],
					'Water': ['Ground', 'Rock', 'Fire'],
					'Grass': ['Ground', 'Rock', 'Water'],
					'Electric': ['Flying', 'Water'],
					'Psychic': ['Fighting', 'Poison'],
					'Ice': ['Flying', 'Ground', 'Grass', 'Dragon'],
					'Dragon': ['Dragon'],
					'Dark': ['Ghost', 'Psychic'],
					'Fairy': ['Fighting', 'Dragon', 'Dark'] 
				}

window.onload = function()
{
	updateTypes()
}

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
	updateTypes();
}

function clearChoices()
{
	for(var i=1;i<=6;i++)
	{
		$('#pokemon'+i).attr('src', 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=');
		$('#name'+i).empty();
		$('#name'+i).append('Choose One:');
	}
	updateTypes();
}

function updateTypes()
{
	coveredTypes = [];
	$('#covered').empty()
	$('#uncovered').empty()

	for(var n=1;n<=6;n++)
	{
		name = $('#name'+n).text()
		if(name != 'Choose One:')
		{
			for(var i=0;i<data.length;i++)
			{
				if(data[i]['Name'] == name)
				{
					strongAgainst[data[i]['Type1']].forEach(function(type)
					{
						if(!coveredTypes.includes(type))
						{
							coveredTypes.push(type);
						}
					})
					if(data[i]['Type2'] != '')
					{
						strongAgainst[data[i]['Type2']].forEach(function(type)
						{
							if(!coveredTypes.includes(type))
							{
								coveredTypes.push(type);
							}
						})
					}
					break;
				}
			}
		}
	}
	for(var i=0;i<coveredTypes.length;i++)
	{
		$('#covered').append('<div class=\"typeCovered\" style=\"background-color:#'+colors[coveredTypes[i]]+'\">'+coveredTypes[i]+'</div>')
	}

	uncoveredTypes = types.diff(coveredTypes);
	for(var i=0;i<uncoveredTypes.length;i++)
	{
		$('#uncovered').append('<div class=\"typeCovered\" style=\"background-color:#'+colors[uncoveredTypes[i]]+'\">'+uncoveredTypes[i]+'</div>')
	}
}

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function goToNextPage()
{
	pagenumber++;
	writeResults();
	document.getElementById("prevpage").style.display = 'inline';
}

function goToPrevPage()
{
	if(pagenumber > 1)
	{
		pagenumber--;
		writeResults();
		if(pagenumber == 1)
		{
			document.getElementById("prevpage").style.display = 'none';
		}
		document.getElementById("nextpage").style.display = 'inline';
	}
}