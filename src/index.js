/*
 * Simple illustration to simulate the power of an unchecked pandemic.
 * ===================================================================
 * In a pandemic outbreak, how many people will be infected if every infected person infected one person each day, 
 * starting with patient zero?(Based on the assumption that the spread is not contained) 
 * @author : Caleb Nii Tetteh Tsuru Addy (Virus)  
 * @email  : 100percentvirusdownloading@gmail.com   
 * @twitter: @niitettehtsuru
 * @github : 
 * @codepen: https://codepen.io/niitettehtsuru/pen/dyoJwRd
 * @date   : March 09,2020. 
 * **/
'use strict';  
$(function () //Initialize Select2 Elements
{ 
    $('.select2').select2(); 
});
var warningRectangleIsDarker = false;//alternate the lightness of the bottom warning rectangle
var timeinterval  =   setInterval(function()
{ 
    warningRectangleIsDarker = !warningRectangleIsDarker;  
},1000); 
var c                   = document.getElementById("pandemicCanvas");
var ctx                 = c.getContext("2d");  
var browserWindowSize   = getBrowserWindowSize();

//set size of canvas
c.width                 = browserWindowSize.x; 
c.height                = browserWindowSize.y; 
var SCREEN_WIDTH        = browserWindowSize.x;
var SCREEN_HEIGHT       = browserWindowSize.y;  

//initialize
var numOfDaysSincePatientZero = 1; //assuming the pandemic starts with 1 person on the first day.
var infectedPeople            = spawnInfectedPeople(getNumberOfCirclesToDraw(numOfDaysSincePatientZero)); //create the number of infected people specified 
var warningRectangleBackground= getBackgroundColor(numOfDaysSincePatientZero); 
$('#meme').html(getMeme(numOfDaysSincePatientZero)); 

//populate the select element with the number of days from 1 to 34.
var numberOfDaysSincePatientZeroOptions = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34];
numberOfDaysSincePatientZeroOptions.forEach(function(day)
{ 
    var dayOption = `<option value='${day}'>${day}</option>`; 
    $('#day').append(dayOption); 
}); 

//set event listener for select element
$('#day').on('change',function() 
{    
    numOfDaysSincePatientZero   = Number($(`#day`).children("option").filter(":selected").val().trim());
    warningRectangleBackground  = getBackgroundColor(numOfDaysSincePatientZero); 
    $('#meme').html(getMeme(numOfDaysSincePatientZero)); 
    var numOfInfectedPeople     = Math.pow(2,(numOfDaysSincePatientZero-1));//number of infected people if every infected person infected 1 extra person each day since patient zero
    $('#numOfInfectedPersons').html(numOfInfectedPeople);  
    infectedPeople              = spawnInfectedPeople(getNumberOfCirclesToDraw(numOfDaysSincePatientZero)); 
});
function getBrowserWindowSize() 
{
    var win = window,
    doc     = document,
    docElem = doc.documentElement,
    body    = doc.getElementsByTagName('body')[0],
    browserWindowWidth  = win.innerWidth || docElem.clientWidth || body.clientWidth,
    browserWindowHeight = win.innerHeight|| docElem.clientHeight|| body.clientHeight; 
    return {x:browserWindowWidth-10,y:browserWindowHeight-10}; 
}
function spawnInfectedPeople(numOfInfectedPeople)//create a number of infected people(represented by circles on the canvas)
{
    var infectedPeople = [];
    for(var i = 0; i < numOfInfectedPeople;i++)
    {
        infectedPeople.push(new InfectedPerson(SCREEN_WIDTH,SCREEN_HEIGHT,getCircleRadius(numOfDaysSincePatientZero))); 
    }  
    return infectedPeople; 
}  
function getNumberOfCirclesToDraw(numOfDaysSincePatientZero) 
{  
     
        if(numOfDaysSincePatientZero < 6)
        {
            return Math.pow(2,numOfDaysSincePatientZero-1); 
        }
        else if(numOfDaysSincePatientZero < 13)
        {
            return numOfDaysSincePatientZero * 4; 
        } 
        else if(numOfDaysSincePatientZero < 21) 
        {
            return numOfDaysSincePatientZero * 5; 
        }
        else if(numOfDaysSincePatientZero < 25)
        {
            return numOfDaysSincePatientZero * 6; 
        } 
        else if(numOfDaysSincePatientZero < 29) 
        {
            return numOfDaysSincePatientZero * 7; 
        }
        else if(numOfDaysSincePatientZero < 32) 
        {
            return numOfDaysSincePatientZero * 8; 
        }  
        return numOfDaysSincePatientZero * 12;  
}
function getCircleRadius(numOfDaysSincePatientZero) 
{  
     
        if(numOfDaysSincePatientZero < 3)
        {
            return 9; 
        }
        else if(numOfDaysSincePatientZero < 5)
        {
            return 8; 
        }  
        else if(numOfDaysSincePatientZero < 9)
        {
            return 7; 
        } 
        else if(numOfDaysSincePatientZero < 13)
        {
            return 6; 
        }  
        else if(numOfDaysSincePatientZero < 17)
        {
            return 5; 
        }
        else if(numOfDaysSincePatientZero < 21)
        {
            return 4; 
        }
        else if(numOfDaysSincePatientZero < 25)
        {
            return 3; 
        }
        return 2; 
}
function getMeme(numOfDaysSincePatientZero) 
{ 
    var data = ['Just You','Just You and I','Average Swedish Family','Tug of War Team','Cabinet of Donald Trump','Parliament of Greenland',
                'School Bus','Double Decker Bus','Airbus 340','Boeing 747','Antarctica','London Business School','Monteserrat','Princeton University',
                'Los Angeles County Jail','Gibraltar',"Levi's Football Stadium",'Johnson & Johnson Employees','Sao Tome And Principe','Maldives',
                'Cyprus','Slovenia',/*23*/'Croatia','New York','Cambodia','Uzbekistan','France','Mexico','Indonesia','North America','Africa',
                'We are FKUCED!','Asia','Whole World']; 
    var meme = data[numOfDaysSincePatientZero-1]; 
    return meme;
}
function getBackgroundColor(numOfDaysSincePatientZero)
{
    var daysForWorldWideInfestation     = 34,
            saturation                  = 80,
            lightness                   = 70,
            alpha                       = 0.6;
    var hue = 100 - Math.floor(numOfDaysSincePatientZero/daysForWorldWideInfestation * 100);  
    if(hue > 100)
    {
        hue = 100; 
    } 
    else if ( hue <= 0 ) 
    {
        hue = 0; 
    }  
    if(warningRectangleIsDarker)
    {
        lightness = 30; 
    }
    var hsvText = "hsla("+hue+","+saturation+"%,"+lightness+"%,"+alpha+")"; 
    return hsvText;
}
/*Rectangle at the bottom of canvas that changes colour and increases in height wrt the number of days since patient zero*/
function drawWarningRectangle(ctx,numOfDaysSincePatientZero,color)
{
    ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT); 
    var unitHeight  = SCREEN_HEIGHT/34;//divide the canvas horizontally into 34 equal parts
    var width       = SCREEN_WIDTH;  
    var dy          = numOfDaysSincePatientZero * unitHeight;   
    var yCoordinate = SCREEN_HEIGHT - dy; 
    ctx.fillStyle   = color;
    ctx.fillRect(0, yCoordinate, width, dy); 
} 

//init circle animation
let lastTime        = 100;  
var numOfLoops = 0; 
function pandemicLoop(timestamp)
{    
    //Let the canvas correspond to window resizing
    var windowSize = getBrowserWindowSize();
    c.width        = windowSize.x; 
    c.height       = windowSize.y; 
    SCREEN_WIDTH   = windowSize.x;
    SCREEN_HEIGHT  = windowSize.y;  
    ctx.clearRect(0,0,SCREEN_WIDTH,SCREEN_HEIGHT);   
    drawWarningRectangle(ctx,numOfDaysSincePatientZero,getBackgroundColor(numOfDaysSincePatientZero));
    /*infectedPeople are represented on the canvas as filled circles. Get the center of each of these filled circles*/ 
    var centerCoordinatesCircles =  infectedPeople.reduce(function(a, e) 
    { 
        e.refreshScreenSize(SCREEN_HEIGHT,SCREEN_WIDTH);//let each filled circle respond to window resizing
        a.push(e.getCoordinatesOfCenter());  
        return a; 
    }, []);  
    infectedPeople.forEach(function (infectedPerson) 
    {     
        let deltaTime = timestamp - lastTime; 
        lastTime = timestamp; 
        infectedPerson.update(deltaTime);
        infectedPerson.draw(ctx,centerCoordinatesCircles);   
    });    
    requestAnimationFrame(pandemicLoop); 
} 
requestAnimationFrame(pandemicLoop); 

 