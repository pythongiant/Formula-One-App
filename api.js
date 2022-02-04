var http = require("https")
var convert = require("xml-js")

function schedule(callback){
    
    var option = {
        host:"ergast.com",
        //https://www.npmjs.com/package/country-flag-icons for country 
        path:"/api/f1/current", 
        method:"GET"
    }
    var xml = ""
    var req = http.request(option,res=>{
        console.log(`status code: ${res.statusCode}`)
        res.on("data",d=>{
            xml += d.toString()  
        })
        res.on("end",function(){
            schedule = JSON.parse(convert.xml2json(xml,{compact:true}))
            var races = schedule["MRData"]["RaceTable"]["Race"]
            var calendarYear = new Array()
            races.forEach(element => {
                var race = new Array()
                raceName = element["RaceName"]["_text"]
                raceCircuit = element["Circuit"]["CircuitName"]["_text"]
                raceDate = element["Date"]["_text"]
                raceTime = element["Time"]["_text"]
                race.push(raceName,raceCircuit,raceDate,raceTime)
                calendarYear.push(race)
            })
            callback(calendarYear)
            // console.log(calendarYear)
        });
    })
    
    req.on('error', error => {
        console.error(error)    
    })
    req.end()
    
}

function constructorStandings(callback){
    var option = {
        host:"ergast.com",
        // For Constructor Standings add /constructorStandings
        // For Driver Standings add /driverStandings
        //https://www.npmjs.com/package/country-flag-icons for country 
        path:"/api/f1/current/constructorStandings",
        method:"GET"
    }

    var xml = ""
    var req = http.request(option,res=>{
        console.log(`status code: ${res.statusCode}`)
        res.on("data",d=>{
            xml += d.toString()  
        })
        res.on("end",function(){
            schedule = JSON.parse(convert.xml2json(xml,{compact:true}))
            var standings = schedule["MRData"]["StandingsTable"]['StandingsList']["ConstructorStanding"]
            
            var standingsL = new Array()
            standings.forEach(element => {
                 var stand = new Array()
                
                 position = element["_attributes"]["position"]
                 points = element["_attributes"]["points"]
                 consName = element["Constructor"]["Name"]["_text"]
                 consId = element["Constructor"]["_attributes"]["constructorId"]
                 stand.push(position,points,consName,consId)
                 standingsL.push(stand)
             })
             callback(standingsL)
             console.log(standingsL)
        });
    })
    
    req.on('error', error => {
        console.error(error)    
    })
    req.end()
}
function driverStandings(callback){
    var option = {
        host:"ergast.com",
        // For Constructor Standings add /constructorStandings
        // For Driver Standings add /driverStandings
        //https://www.npmjs.com/package/country-flag-icons for country 
        path:"/api/f1/current/driverStandings",
        method:"GET"
    }

    var xml = ""
    var req = http.request(option,res=>{
        console.log(`status code: ${res.statusCode}`)
        res.on("data",d=>{
            xml += d.toString()  
        })
        res.on("end",function(){
            schedule = JSON.parse(convert.xml2json(xml,{compact:true}))
            var standings = schedule["MRData"]["StandingsTable"]['StandingsList']["DriverStanding"]
            console.log(standings)  
            var standingsL = new Array()
            standings.forEach(element => {
                 var stand = new Array()
                
                 position = element["_attributes"]["position"]
                 points = element["_attributes"]["points"]
                 driverCode = element["Driver"]["_attributes"]["code"]
                 permananentNumber = (element["Driver"]["PermanentNumber"] == undefined) ? undefined : element["Driver"]["PermanentNumber"]["_text"]
                 givenName = element["Driver"]["GivenName"]["_text"]
                 familyName = element["Driver"]["FamilyName"]["_text"]
                 consId = element["Constructor"]["Name"]["_text"]

                 stand.push(position,points,driverCode,permananentNumber,givenName,familyName,consId)
                 standingsL.push(stand)
             })
             callback(standingsL)
        });
    })
    
    req.on('error', error => {
        console.error(error)    
    })
    req.end()
}

function lastRace(callback){
    var option = {
        host:"ergast.com", 
        path:"/api/f1/current/last/results",
        method:"GET"
    }

    var xml = ""
    var req = http.request(option,res=>{
        console.log(`status code: ${res.statusCode}`)
        res.on("data",d=>{
            xml += d.toString()  
        })
        res.on("end",function(){
            schedule = JSON.parse(convert.xml2json(xml,{compact:true}))
            var race = schedule["MRData"]["RaceTable"]["Race"]
            var standingsL = new Array()
            raceName = race["RaceName"]
            date = race["Date"]
            time = race["Time"]
            res = race["ResultsList"] ["Result"] 
            let count = 0
            res.forEach(element => {
                if(count<1){

                }
                 count+=1
                 var stand = new Array()
                    raceNumber = element["Driver"]["PermanentNumber"]["_text"]
                    familyName = element["Driver"]["FamilyName"]["_text"]
                    consName = element["Constructor"]["Name"]["_text"]
                    time = (element["Time"] == undefined) ? "DNF":element["Time"]["_text"] 
                    
                    stand.push(raceNumber,familyName,time,consName)
                    console.log(stand)
                 standingsL.push(stand)
             })
             callback(standingsL)
        });
    })
    
    req.on('error', error => {
        console.error(error)    
    })
    req.end()

}
function getDrivers(callback,cons){
    
    var option = {
        host:"ergast.com", 
        path:"/api/f1/current/constructors/"+cons+"/drivers",
        method:"GET"
    }

    var xml = ""
    var req = http.request(option,res=>{
        console.log(`status code: ${res.statusCode}`)
        res.on("data",d=>{
            xml += d.toString()  
        })
        res.on("end",function(){
            schedule = JSON.parse(convert.xml2json(xml,{compact:true}))
            var race = schedule["MRData"]["DriverTable"]
            const drivers = ""
            race.forEach(element => {
                drivers += element["GivenName"]["_text"] + element["FamilyName"]["_text"].toUpperCase()
             })
             callback(drivers)
        });
    })
    
    req.on('error', error => {
        console.error(error)    
    })
    req.end()
}

export {schedule,lastRace,constructorStandings,driverStandings,getDrivers}
// To Find Number Of Championships
// https://ergast.com/api/f1/constructors/mclaren/constructorStandings/1