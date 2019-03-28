window.onload = function()
{
	var urlParams = new URLSearchParams(window.location.search);
	var myParam = urlParams.get('name')
	console.log(myParam)
}