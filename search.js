data = {}
pagenumber=1
window.onload = function()
{
	fetch('http://localhost/pokedex/getResults.php')
    .then(function(response) {
    	return response.json();
    })
    .then(function(myJson) {
    	data = myJson
    	writeResults(myJson)
  	});
}

function writeResults(data)
{
	results = document.getElementById('results')
	results.innerHTML = ""
	for(var i=(25*pagenumber)-25;i<25*pagenumber;i++)
	{
		try
		{
			results.innerHTML += data[i]['Name']+'<br>'+data[i]['Type1']+' '+data[i]['Type2']+'<br><br>';
		}
		catch
		{
			document.getElementById("nextpage").style.display = 'none';
		}
	}
	window.scrollTo(0,0);
}

function goToNextPage()
{
	pagenumber++;
	writeResults(data);
	document.getElementById("prevpage").style.display = 'inline';
}

function goToPrevPage()
{
	if(pagenumber > 1)
	{
		pagenumber--;
		writeResults(data);
		if(pagenumber == 1)
		{
			document.getElementById("prevpage").style.display = 'none';
		}
		document.getElementById("nextpage").style.display = 'inline';
	}
}