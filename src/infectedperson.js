'use strict';
//each infected person is represented by a circle on the canvas
class InfectedPerson  
{
    constructor(screenWidth,screenHeight,radius)
    {    
        this.id                 = Math.floor((Math.random() * 100000000) + 1); 
        this.screenWidth        = screenWidth;//width of browser window screen
        this.screenHeight       = screenHeight;//height of browser window screen 
        this.radius             = radius;//2;//radius of circle  
        this.colors             = //html color names
        [   "red","darkred","bisque","navajowhite","green","darkgreen","lemonchiffon","lightgoldenrodyellow","aquamarine","mediumturquoise","pink",
            "mediumvioletred","gold","khaki","violet","darkviolet","darkolivegreen","olivedrab","cornsilk","blanchedalmond","wheat","lightgray","silver",
            "seashell","beige","coral", "orange","darkblue","midnightblue","saddlebrown","fuchsia","blueviolet","oldlace","floralwhite","darkgray","dimgray",
            "lightsalmon","darksalmon","orchid","mediumpurple","burlywood","tan","yellow","darkseagreen","teal","darkkhaki","whitesmoke","mintcream","lime",
            "forestgreen","lightskyblue","lightsteelblue","slategray","darkslategray","peru","chocolate","plum","darkorchid","darkmagenta","purple",
            "darkorange","tomato","ivory","antiquewhite","maroon","sienna","lightpink","hotpink","palegreen","seagreen","lgihtcyan","cyan","darkturquoise",
            "lightseagreen","cadetblue","darkcyan","lightgreen","olive","green","lavender","thistle","aliceblue","ghostwhite","gray","gainsboro","rosybrown",
            "mediumseagreen","limegreen","sandybrown","peachpuff","palegoldenrod","indigo","mediumslateblue","aqua","cornflowerblue","mediumblue","slateblue",
            "orangered","lavenderblush","mistyrose","springgreen","mediumspringgreen","goldenrod","brown","papayawhip","honeydew","azure","navy",
            "lightseablue","greenyellow","yellowgreen","magenta","mediumorchid","lightcoral","indianred","lightslategray","black","steelblue","royalblue",
            "lightyellow","moccasin","firebrick","deeppink","palevioletred","skyblue","deepskyblue","white","snow","linen","lawngreen","chartreuse",
            "mediumaquamarine","paleturquoise","powderblue","lightblue","crimson","salmon","blue","dodgerblue"
        ]; 
        this.color              = this.getRandomColor();//color of circle  
        this.velocityMagnitude  = 2;//0.5;//the magnitude of the circle's velocity
        this.velocity           = this.getRandomVelocity();//the direction and speed with which the circle moves on start
        this.linkDistance       = 120;//The maximum distance required for a circle to link to other circles
        this.nodeLinkable       = true;//true if the circle can link to other circles,false otherwise  
        this.moveable           = true;//true if the circle can move,false otherwise 
        //set the starting position of the circle on the canvas
        this.xcoordinateOfCircleCenter = Math.floor((Math.random() * this.screenWidth) + 1);//a random number between 1 and the width of the screen.
        this.ycoordinateOfCircleCenter = Math.floor((Math.random() * this.screenHeight) + 1);//a random number between 1 and the height of the screen. 
        
    }  
    refreshScreenSize(screenHeight,screenWidth)//so the circle responds to the resizing of the browser window
    {
        if(this.screenHeight !== screenHeight || this.screenWidth !== screenWidth)//if the screen size has changed
        { 
            var dy              = screenHeight/this.screenHeight;//percentage change in browser window height 
            var dx              = screenWidth/this.screenWidth;//percentage change in browser window width  
            this.screenHeight   = screenHeight;  
            this.screenWidth    = screenWidth; 
            this.xcoordinateOfCircleCenter *= dx; 
            this.ycoordinateOfCircleCenter *= dy; 
        } 
    }
    getRandomVelocity()//set circle in a random direction on start 
    {  
        var x = Math.random() > 0.5? -this.velocityMagnitude: this.velocityMagnitude;//flip a coin to decide if circle moves forwards or backwards
        var y = Math.random() > 0.5? -this.velocityMagnitude: this.velocityMagnitude;//flip a coin to decide if circle moves upwards or downwards
        return {x:x, y:y};
    }
    getRandomColor() 
    { 
        var index =  Math.floor((Math.random() * (this.colors.length)));
        return this.colors[index];
    }
    draw(ctx,centerCoordinatesOfNodes)
    {  
        //draw the circle
        ctx.beginPath(); 
        ctx.arc(this.xcoordinateOfCircleCenter,this.ycoordinateOfCircleCenter,this.radius,0,2*Math.PI);
        ctx.fillStyle = this.color; 
        ctx.fill(); 
        ctx.strokeStyle = this.color;
        ctx.stroke();   
        //draw link to other circles 
        this.drawLinkToOtherCircles(centerCoordinatesOfNodes,ctx); 
    } 
    drawLinkToOtherCircles(coordinates,ctx)
    {
        var x1          = this.xcoordinateOfCircleCenter,
            y1          = this.ycoordinateOfCircleCenter, 
            color       = this.color,  
            linkDistance= this.linkDistance,
            id          = this.id;
        //link the circles 
        coordinates.forEach(function(coordinate) 
        { 
            if(coordinate.linkable && id > coordinate.id)//if another circle can connect to this circle
            {
                var x2 = coordinate.x; 
                var y2 = coordinate.y;  
                var dx = x2 - x1; 
                var dy = y2 - y1;  
                var distance = Math.sqrt(dx*dx + dy*dy);
                if( distance <= linkDistance)//if another circle is in range, draw the link
                {
                    ctx.strokeStyle = color;
                    ctx.lineWidth = 0.3; 
                    ctx.beginPath();  
                    ctx.moveTo(x1, y1);  
                    ctx.lineTo(x2, y2);   
                    ctx.stroke();
                    ctx.closePath(); 
                }  
            } 
        }); 
    }
    update(deltaTime)
    {  
        /*move the circle*/   
        //randomly change the angle of movement in the current direction 
        this.velocity.x += Math.random() > 0.5? -Math.random()/20:Math.random()/20; 
        this.velocity.y += Math.random() > 0.5? -Math.random()/20:Math.random()/20; 
        //keep the circle moving in its current direction  
        this.xcoordinateOfCircleCenter += this.velocity.x;//if circle is going left or right at an angle, keep it going
        this.ycoordinateOfCircleCenter += this.velocity.y;//if circle is going up or down at an angle, keep it going  
        if(this.xcoordinateOfCircleCenter - this.radius < 0)//if circle touches the left wall of the canvas
        {
            this.velocity.x = -this.velocity.x;//move to the right 
            this.velocity.y = Math.random() > 0.5? -this.velocityMagnitude: this.velocityMagnitude ;//flip a coin to move either up or down
        } 
        if(this.xcoordinateOfCircleCenter + this.radius> this.screenWidth)//if circle touches the right wall
        {
            this.velocity.x = -this.velocity.x;//move to the left
            this.velocity.y = Math.random() > 0.5? -this.velocityMagnitude: this.velocityMagnitude ;//flip a coin to move either up or down 
        } 
        if( this.ycoordinateOfCircleCenter - this.radius< 0)//if circle touches the top of the wall 
        {
            this.velocity.y = -this.velocity.y;//move down 
            this.velocity.x = Math.random() > 0.5? -this.velocityMagnitude: this.velocityMagnitude ;//flip a coin to move either left or right
        } 
        if(this.ycoordinateOfCircleCenter + this.radius > this.screenHeight)//if circle touches the bottom of the wall
        { 
            this.velocity.y = -this.velocity.y;//move up  
            this.velocity.x = Math.random() > 0.5? -this.velocityMagnitude: this.velocityMagnitude ;//flip a coin to move either left or right 
        }   
    }  
    getCoordinatesOfCenter() 
    {
        return {x:this.xcoordinateOfCircleCenter,y:this.ycoordinateOfCircleCenter,linkable:this.nodeLinkable,id:this.id};
    } 
}