// Crawl Through the F1 website for necessary assets

var Xray = require("x-ray")
var x = Xray()
x("https://www.formula1.com/en/teams.html",{team:[".car-img img@alt"],src:[".car-img img@data-src"]})
.write('result.json')   
