$.get('/marketss', function(rows){

    /* Parse all markets */
    var assessmentArray = new Array();
    let currentObj;

    for (var i = 0; i < rows.length; i++){
        currentObj = rows[i];
        assessmentArray[i] = currentObj;
    }

    /* Levels chart */
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
    
    /* Render chart */
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawLevelChart);
    
    function drawLevelChart() {

        var levelData = google.visualization.arrayToDataTable(levelArray);

        var levelOptions = {
            title: 'Market Level',
            chartArea: {left: 73},
            legend: {
                textStyle: {
                    color: '#838488',
                    fontSize: '11px'
                }
            },
            slices:[
                {color: '#7B7B7B'},
                {color: '#FDC947'},
                {color: '#C7D48D'},
                {color: '#35C0C8'}
            ],
            titleTextStyle:{
                bold: false,
                fontSize: 12
            }
        };

        var levelChart = new google.visualization.PieChart(document.getElementById('levelChart'));

        levelChart.draw(levelData, levelOptions);
    }

    /* Store Type chart */
    let small = 0;
    let medium = 0;
    let large = 0;
    let convenience = 0;
    let currStore;
    var typeArray;

    /* Calculate types of markets */
    for (var i = 0; i < assessmentArray.length; i++){
        currStore = assessmentArray[i];

        if(currStore.storeType == "Convenience") {
            convenience++;
        }
        else if(currStore.storeType == "Small") {
            small++;
        }
        else if(currStore.storeType == "Medium") {
            medium++;
        }
        else{
            large++;
        }
    }

    typeArray = [
        ['Market Type', 'Number of Markets'],
        ['Convenience', convenience],
        ['Small', small],
        ['Medium', medium],
        ['Large', large]
    ];
    
    /* Render chart */
    google.charts.setOnLoadCallback(drawTypeChart);

    function drawTypeChart() {

        var typeData = google.visualization.arrayToDataTable(
            typeArray);

        var typeOptions = {
            title: 'Market Type',
            chartArea: {left: 73},
            legend: {
                textStyle: {
                    color: '#838488',
                    fontSize: '11px'
                }
            },
            slices:[
                {color: '#7B7B7B'},
                {color: '#FDC947'},
                {color: '#C7D48D'},
                {color: '#35C0C8'}
            ],
            titleTextStyle:{
                bold: false,
                fontSize: 12
            }
        };

        var typeChart = new google.visualization.PieChart(document.getElementById('typeChart'));

        typeChart.draw(typeData, typeOptions);
    }
});

/* Question Chart */
function drawQuestion(){
    
var questionTitle = document.getElementById("question-name-dropdown").value;

console.log(questionTitle);

$.get('/marketss', function(rows){

    /* Parse all markets */
    var assessmentArray = new Array();
    let currentObj;
    
    for (var i = 0; i < rows.length; i++){
        currentObj = rows[i];
        assessmentArray[i] = currentObj;
    }

    var questionArray;
    let currAnswersArray;
    let answerArray;
    let answerCountArray = new Array();

    console.log(assessmentArray);

    /* Iterate through assessment database */
    for (var i = 0; i < assessmentArray.length; i++){

        currAnswersArray = assessmentArray[i].assessments[0].answers;

        /* Iterate through answers array of market */
        for (var j = 0; j < currAnswersArray.length; j++){

            /* If question matches, add answer to array of answers */
            if (questionTitle == currAnswersArray[j].q){
                answerCountArray[i] = currAnswersArray[j].a;
            }
        }
    }

    console.log(answerCountArray);

    let currAnswer;
    /* Initialize answer counters */
    let yesCount = 0;
    let noCount = 0;
    let zeroCount = 0;
    let oneToTwoCount = 0;
    let threeToFiveCount = 0;
    let sixToNineCount = 0;
    let tenPlusCount = 0;
    let allPoorCount = 0;
    let mixedPoorCount = 0;
    let mixedGoodCount = 0;
    let allGoodCount = 0;

    /* Initialize answer strings */
    let oneToTwo = '1-2';
    let threeToFive = '3-5';
    let sixToNine = '6-9';
    let tenPlus = '10+';
    let allPoor = 'All or most is poor';
    let mixedPoor = 'Mixed quality, more poor than good';
    let mixedGood = 'Mixed quality, more good than poor';
    let allGood = 'All or most is good';

    /* Calculate answer counts */
    for (var i = 0; i < answerCountArray.length; i++){
        
        currAnswer = answerCountArray[i];
        console.log(currAnswer);
        switch(currAnswer){
            case 'Yes':
                yesCount++;
                break;
            case 'No':
                noCount++;
                break;
            case '0':
                zeroCount++;
                break;
            case oneToTwo:
                oneToTwoCount++;
                break;
            case threeToFive:
                threeToFiveCount++;
                break;
            case sixToNine:
                sixToNineCount++;
                break;
            case tenPlus:
                tenPlusCount++;
                break;
            case allPoor:
                allPoorCount++;
                break;
            case mixedPoor:
                mixedPoorCount++;
                break;
            case mixedGood:
                mixedGoodCount++;
                break;
            case allGood:
                allGoodCount++;
                break;
        }
    }

    if( yesCount != 0 || noCount != 0){
        answerArray = [
            [ questionTitle, 'Number of Markets', {role: 'style'} ],
            ['Yes', yesCount, 'color: #35C0C8'],
            ['No', noCount, 'color: #EF7E24']
        ];

        google.charts.setOnLoadCallback(drawYesNoChart);
    
        function drawYesNoChart() {

        var answerData = google.visualization.arrayToDataTable(
            answerArray);

        var answerOptions = {
            title: questionTitle,
            chartArea:{
                width: '90%'
            },
            legend: {position: 'bottom'},
            titleTextStyle: {
                fontSize: 14
            }
        };

        var typeChart = new google.visualization.BarChart(document.getElementById('questionChart'));

        typeChart.draw(answerData, answerOptions);
        }
    }
    else if( zeroCount != 0 || oneToTwoCount != 0 || threeToFiveCount != 0
        || sixToNineCount != 0 || tenPlusCount != 0 ){
        answerArray = [
            [ questionTitle, 'Number of Markets', {role: 'style'} ],
            [ '0', zeroCount, 'color: #7B7B7B' ],
            [ oneToTwo, oneToTwoCount, 'color: #FDC947' ],
            [ threeToFive, threeToFiveCount, 'color: #C7D48D' ],
            [ sixToNine, sixToNineCount, 'color: #35C0C8' ],
            [ tenPlus, tenPlusCount, 'color: #EF7E24' ]
        ];

        google.charts.setOnLoadCallback(drawRangeChart);
    
        function drawRangeChart() {

        var answerData = google.visualization.arrayToDataTable(
            answerArray);

        var answerOptions = {
            title: questionTitle,
            chartArea:{
                width: '90%'
            },
            legend: {position: 'bottom'},
            titleTextStyle: {
                fontSize: 14
            }
        };

        var typeChart = new google.visualization.BarChart(document.getElementById('questionChart'));

        typeChart.draw(answerData, answerOptions);
        }
    }
    else {
        answerArray = [
            [ questionTitle, 'Number of Markets', {role: 'style'} ],
            [ allPoor, allPoorCount, 'color: #FDC947' ],
            [ mixedPoor, mixedPoorCount, 'color: #C7D48D' ],
            [ mixedGood, mixedGoodCount, 'color: #35C0C8' ],
            [ allGood, allGoodCount, 'color: #EF7E24' ]
        ];

        google.charts.setOnLoadCallback(drawDescriptionChart);
    
        function drawDescriptionChart() {

        var answerData = google.visualization.arrayToDataTable(
            answerArray);

        var answerOptions = {
            title: questionTitle,
            chartArea:{
                width: '90%'
            },
            legend: {position: 'bottom'},
            titleTextStyle: {
                fontSize: 14
            }
        };

        var typeChart = new google.visualization.BarChart(document.getElementById('questionChart'));

        typeChart.draw(answerData, answerOptions);
        }
    }

    });
};







