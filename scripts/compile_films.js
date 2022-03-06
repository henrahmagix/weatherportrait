// Visit https://en.wikipedia.org/wiki/List_of_photographic_films and run this in the browser dev console:
var wikiFilmStocks = Array.from(document.querySelectorAll('.wikitable')).map(table => {
  var headers = Array.from(table.querySelectorAll('th')).map(th => th.textContent.trim());
  return Array.from(table.querySelectorAll('tr')).map(tr => {
    var row = {};
    tr.querySelectorAll('td').forEach((td, i) => {
      row[headers[i]] = td.textContent.trim()
    });
    return row;
  });
});
copy(JSON.stringify(wikiFilmStocks)) // this will place JSON into your clipboard

// Save that to films.json, then run the following javascript and save into films_data.js:
var filmsBySpeed = {};
wikiFilmStocks
  .flat()
  .filter(row => row.Make && row.ISO)
  .map(row => {
    // Some table entries have ISO range or multiple ISO speeds, so duplicate the entry for all of them.
    var isos = row.ISO.match(/\d[\d.]*/g) || [];
    return isos.map(iso => {
      return {...row, ISO: iso};
    });
  })
  .flat()
  .sort((a, b) => a.ISO - b.ISO)
  .forEach(row => {
    if (!filmsBySpeed[row.ISO]) {
      filmsBySpeed[row.ISO] = [];
    }
    var description = `${row.Make} ${row.Name}`;
    if (!description.includes(row.ISO) && parseFloat(row.ISO) >= 20) {
      description += ` ${row.ISO}`;
    }
    filmsBySpeed[row.ISO].push(description);
  });
copy(filmsBySpeed)
