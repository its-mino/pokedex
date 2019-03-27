data = {}
pagenumber=1
window.onload = function()
{
	fetch('http://localhost/pokedex/getResults.php')
    .then(function(response) {
    	return response.json();
    })
    .then(function(myJson) {
    	data = myJson;
    	writeResults();
  	});

  	document.getElementById('searchbar').addEventListener('input', writeResults)
}

function writeResults()
{
	var query = document.getElementById('searchbar').value;
	var new_data = []
	for(var i=0;i<data.length;i++)
	{
		if(data[i]['Name'].includes(query))
		{
			new_data.push(data[i]);
		}
	}
	results = document.getElementById('results')
	results.innerHTML = ""
	for(var i=(25*pagenumber)-25;i<25*pagenumber;i++)
	{
		var flag = true;
		try
		{
			results.innerHTML += new_data[i]['Name']+'<br>'+new_data[i]['Type1']+' '+new_data[i]['Type2']+'<br><br>';
		}
		catch
		{
			document.getElementById("nextpage").style.display = 'none';
			var flag = false;
		}
		if(flag)
		{
			document.getElementById("nextpage").style.display = 'inline';
		}
	}
	window.scrollTo(0,0);
}

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