function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return "";
    return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  var getAllRecords = function() {
    $.getJSON(
      "https://api.airtable.com/v0/appb3EG8LFAonyYsj/Games?api_key=keysxpLZZeJWGyODT",
      function(airtable) {
        var html = [];
        $.each(airtable.records, function(index, record) {
          var id = record.id;
          var picture = record.fields["Pictures"];
          var name = record.fields["Name"];
          var price = record.fields["Price"];
          html.push(listView(id, picture, name, price,  ));
        });
        $(".list-view").append(html);
      }
    );
  };

  var getOneRecord = function(id) {
    $.getJSON(
      `https://api.airtable.com/v0/appb3EG8LFAonyYsj/Games/${id}?api_key=keysxpLZZeJWGyODT`,
      function(record) {
        var html = [];
        var picture = record.fields["Pictures"];
        var name = record.fields["Name"];
        var price = record.fields["Price"];
        var console = record.fields["Consoles"];
        var comp = record.fields["Company"];
        var release = record.fields["Date"];
        var rate = record.fields["Rating"];
        var vid = record.fields["Gameplay"];
        var summ = record.fields["Summary"];
        html.push(
          detailView(
            picture,
            name,
            price,
            console,
            comp,
            release,
            rate,
            vid,
            summ,
            
          )
        );
        $(".detail-view").append(html);
      }
    );
  };

  var listView = function(id, picture, name, price) {
    return `
    <div class = ".col-4">
    <div class="card" style="width: 18rem;">
    ${picture ? `<img src="${picture[0].url}">` : ``}
  <div class="card-body">
    <h5 class="card-title">${name}</h5>
    <p class="card-text">$${price}</p>
    <a href="index.html?id=${id}" class="btn btn-primary">More Info</a>
  </div>
</div>
  `;
};

var detailView = function(
  picture,
  name,
  price,
  console,
  comp,
  release,
  rate,
  vid,
  summ,

) {
  return `
  
  <p align="center"><iframe display: width="420" height="315" src="https://www.youtube.com/embed/${vid}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>
    <h5 class="card-title">Card title</h5>
    <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div> 
  `;
};






















var id = getParameterByName("id");
  if (id) {
  getOneRecord(id);
} else {
  getAllRecords();
}






