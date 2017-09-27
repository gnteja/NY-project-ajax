
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var street = $('#street').val();
    var city = $('#city').val();
    var loc = street +', '+city;

    $greeting.text('you choose to live at '+loc+' ?');
   var stviewURL= 'https://maps.googleapis.com/maps/api/streetview?size=600x400&location='+loc+'';
   $body.append('<img class="bgimg" src="'+stviewURL+'">');
   

 
 // ny times ajax request
  
  var nytimesUrl = 'http://api.nytimes.com/svc/search/v2/articlesearch.json?q='+city+'&sort=newest&api-key=3087ed8df76b48219585008ef6942d48';

  $.getJSON(nytimesUrl, function(data){
    $nytHeaderElem.text('New York Times Articles about '+city);
    articles = data.response.docs;
    for (var i = 0; i < articles.length; i++) {
      var article = articles[i];
      $nytElem.append('<li class ="article">'+'<a href="'+article.web_url+'">'+article.headline.main+'</a>'+'<p>'+ article.snippet+'</p>'+'</li>');

    };
  }).error(function(e){
    $nytHeaderElem.text('Sry New York Times Article could not be Loaded ');
  });
  

 $.getJSON(nytimesUrl, function(data){
  console.log(data);
 });

 // wikipedia Ajax request

 var wikiRequestTimeout = setTimeout(function(){
    $wikiElem.text("failed to get wikipedia resource");
 },8000);
  var wikiUrl= 'http://en.wikipedia.org/w/api.php?action=opensearch&search='+city+'&format=json&callback=wikiCallback';
    $.ajax({
    url: wikiUrl, dataType: "jsonp",
    success: function (response) {
      var articleList = response[1];
      for (var i = 0; i < articleList.length; i++) {
        articleStr = articleList[i];
        var url = 'http://en.wikipedia.org/wiki/'+articleStr;
        $wikiElem.append('<li><a href="'+url+'" target="_blank">'+articleStr+'</a></li>');
      };
    }
  });
    

clearTimeout(wikiRequestTimeout);

return false;
};


$('#form-container').submit(loadData);
