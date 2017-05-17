var app = function(){
  var inputElement = document.getElementById("search-query");
  inputElement.addEventListener('keyup', searchInput)

}

var searchInput = function(input){
  var inputElement = document.getElementById("search-query");
  var input = inputElement.value;
console.log(input)
  var url = "https://api.spotify.com/v1/search?q=" + input + "&type=album";

  if (input === "") return;

  makeRequest(url, requestComplete); 
}

var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var albums = JSON.parse(jsonString).albums;

  populateList(albums)
}

var populateList = function(albums){
  var albumDiv = document.getElementById("albums");

  albumDiv.innerHTML = ""

  albums.items.forEach(function(album){
    var albumPara = document.createElement("p")
    albumPara.innerText = album.name

    var albumLink = document.createElement("a")
    albumLink.innerText = "View"
    albumLink.href = album.external_urls.spotify

    albumPara.appendChild(albumLink)
    albumDiv.appendChild(albumPara)

  })
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback)
  request.send();
}


window.addEventListener('load', app);