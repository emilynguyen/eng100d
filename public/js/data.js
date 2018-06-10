console.log('step1');

getJSONFile();

function getJSONFile(){
    $.getJSON('result.json', function(){
        console.log('success');
    });
}


/*function loadJSON(callback) {   
    console.log('step3')
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', '../markets.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

 function init() {
    console.log('step2');
    loadJSON(function(response) {
     // Parse JSON string into object
       var actual_JSON = JSON.parse(response);
    });
   }*/


/*$.getJSON('../markets.json', function (data){
    console.log('step1');
    $.each(data,function(index, value) {
        console.log(value);
    })
});*/

/*google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);



      levelArray = calcLevelCounts(markets);
      
      function drawChart() {


        var options = {
          title: 'Market Levels'
        };

        var chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(levelArray, options);
      }

function calcLevelCounts(markets){
   

    console.log(markets);

    let levelZero;
    let levelOne;
    let levelTwo;
    let levelThree;
    let currLevel;

    for ( var i = 0; i < markets.length; i++){
        currLevel = markets[i].level;
        if(currLevel == 0) {
            levelZero++;
        }
        else if(currLevel == 1) {
            levelOne++;
        }
        else if(currLevel == 2) {
            levelTwo++;
        }
        else{
            levelThree++;
        }

        return levelArray = [
            ['Market Level', 'Number of Markets'],
            ['Level 0', levelZero],
            ['Level 1', levelOne],
            ['Level 2', levelTwo],
            ['Level 3', levelThree]
          ];
    }
}*/