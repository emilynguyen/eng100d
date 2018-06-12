//console.log('step1');

//var assessmentArray;
//var currentObj;

$.get('/marketss', function(rows){

    /* Parse all markets */
    var assessmentArray = new Array();
    let currentObj;

    console.log(rows[0].name);
    console.log(rows[1].name);
    console.log(rows[2].name);
    console.log(rows[3].name);

    for (var i = 0; i < rows.length; i++){
        currentObj = JSON.parse(rows[i].name);
        assessmentArray[i] = currentObj;
    }

    console.log(assessmentArray);

    /* Levels graph */
    let levelZero = 0;
    let levelOne = 0;
    let levelTwo = 0;
    let levelThree = 0;
    let currLevel;
    var levelArray;

    /* Calculate levels */
    for (var i = 0; i < assessmentArray.length; i++){
        currLevel = assessmentArray[i].level;
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
    }

    levelArray = [
        ['Market Level', 'Number of Markets'],
        ['Level 0', levelZero],
        ['Level 1', levelOne],
        ['Level 2', levelTwo],
        ['Level 3', levelThree]
    ];
    
    /* Render graph */
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawLevelChart);
    
    function drawLevelChart() {

        var levelData = google.visualization.arrayToDataTable(levelArray);

        var levelOptions = {
            title: 'Market Level'
        };

        var levelChart = new google.visualization.PieChart(document.getElementById('levelChart'));

        levelChart.draw(levelData, levelOptions);
    }

    /* Storetype Graph */
    let small = 0;
    let medium = 0;
    let large = 0;
    let convenience = 0;
    let currStore;
    var typeArray;
/*
    console.log("rows[0].storeType is " + rows[3].storeType);

    Calculate types of markets 
    for (var i = 0; i < assessmentArray.length; i++){
        //currStore = assessmentArray[i];
        if(currStore == 0) {
            convenience++;
        }
        else if(currStore == 1) {
            small++;
        }
        else if(currStore == 2) {
            medium++;
        }
        else{
            large++;
        }
    } */

        /*console.log("levelZero count: " + levelZero);
        console.log("levelOne count: " + levelOne);
        console.log("levelTwo count: " + levelTwo);
        console.log("levelThree count: " + levelThree);*/

    typeArray = [
        ['Market Type', 'Number of Markets'],
        ['Convenience', 3],
        ['Small', 3],
        ['Medium', 4],
        ['Large', 5]
    ];
    
    /* Google charts */
   // google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawTypeChart);

    /*levelArray = calcLevelCounts(markets);*/
    
    function drawTypeChart() {

        var typeData = google.visualization.arrayToDataTable(
            typeArray);

        var typeOptions = {
            title: 'Market Type'
        };

        var typeChart = new google.visualization.PieChart(document.getElementById('typeChart'));

        typeChart.draw(typeData, typeOptions);
    }

    /* Question Graph */
  /*  let small = 0;
    let medium = 0;
    let large = 0;
    let convenience = 0;
    let currStore;*/
    var questionArray;
/*
    console.log("rows[0].storeType is " + rows[3].storeType);

    Calculate types of markets 
    for (var i = 0; i < assessmentArray.length; i++){
        //currStore = assessmentArray[i];
        if(currStore == 0) {
            convenience++;
        }
        else if(currStore == 1) {
            small++;
        }
        else if(currStore == 2) {
            medium++;
        }
        else{
            large++;
        }
    } */

        /*console.log("levelZero count: " + levelZero);
        console.log("levelOne count: " + levelOne);
        console.log("levelTwo count: " + levelTwo);
        console.log("levelThree count: " + levelThree);*/

    questionArray = [
        ['Does the Market Sell Alcohol', 'Number of Markets'],
        ['Yes', 9],
        ['No', 4]
    ];
    
    /* Google charts */
   // google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawQuestionChart);

    /*levelArray = calcLevelCounts(markets);*/
    
    function drawQuestionChart() {

        var questionData = google.visualization.arrayToDataTable(
            questionArray);

        var questionOptions = {
            title: 'Does the Market Sell Alcohol?',
            legend: {position: 'bottom'}
        };

        var typeChart = new google.visualization.BarChart(document.getElementById('questionChart'));

        typeChart.draw(questionData, questionOptions);
    }
});





