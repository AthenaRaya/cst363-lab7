const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public")); //folder for images, css, js
 
const request = require('request'); // require the request package 
//This is the begining of version of line 29
//app.get("/",function(req,res){

    //  request('https://pixabay.com/api/?key=13797838-1fc413dc8959408105de7daf0', function (error, response, body) { // this a call back with 3 params.
    //  console.log('error:', error); // Print the error if one occurred
    //  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
   //   console.log('body:', body); // Print the HTML for the Google homepage.
   // });
 //  res.send("It works!");
//});
//routes
app.get("/", async function(req, res){
    
    
//   let parsedData = await getImages("otters");
 
//   console.dir("parsedData: " + parsedData); //displays content of the object
    
//   res.render("index", {"defaultimg":parsedData.hits[0].largeImageURL});
 
 
    var words = ["beach","bus","mountain","sunflowers","house"];

    var ran= Math.floor(Math.random() * 6)
    
    //displays content of the object
        
    let rand = words[ran];
    let orien = "horizontal";
    let parsedData = await getImages(rand,orien);
    
    console.log("parsedData: " + parsedData);
    res.render("index", {"images":parsedData});


         
         
}); //root route


app.get("/results", async function(req, res){ // request and respond param. 
   // console.dir(req); all info in terminal 
   
   
   
   
    let keyword = req.query.keyword; // get the values that the user typed in forms(GET METHOD)
    let orien = req.query.orientation; 
    let parsedData = await getImages(keyword,orien);
    
    res.render("results", {"images":parsedData});

    
  
  
});//results route


//Returns all data from the Pixabay API as JSON format
function getImages(keyword,orien){
 
    
    return new Promise( function(resolve, reject){
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q='+keyword,
                 function (error, response, body) {
    
            if (!error && response.statusCode == 200  ) { //no issues in the request
                
                 let parsedData = JSON.parse(body); //converts string to JSON
                 
                 resolve(parsedData);
                
                //let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
                //res.send(`<img src='${parsedData.hits[randomIndex].largeImageURL}'>`);
                //res.render("index", {"image":parsedData.hits[randomIndex].largeImageURL});
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    });
    
}
 // app.listen("8081","0.0.0.0",function(){
 // console.log("Express Server is running...");
//});

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
 console.log("Express server is running...");
});