(()=>{
    var uploadData = [
    {
        year:2018,
        data:[
        {
            name:'Poland',
            salary:15164
        },
        {
            name:'Ukraine',
            salary:3723
        },
        {
            name:'Lithuania',
            salary:12350
        },
        {
            name:'Romania',
            salary:13492
        },
        {
            name:'Bulgaria',
            salary:8840
        },
        {
            name:'Estonia',
            salary:4587
        },
        {
            name:'Bulgaria',
            salary:8840
        }]
    },
    {
        year:2019,
        data:[
        {
            name:'Poland',
            salary:16325
        },
        {
            name:'Ukraine',
            salary:4586
        },
        {
            name:'Lithuania',
            salary:12950
        },
        {
            name:'Romania',
            salary:14650
        },
        {
            name:'Bulgaria',
            salary:9500
        },
        {
            name:'Estonia',
            salary:5420
        }]
    }];

    var canvas = document.querySelector('#myCanvas');
    if(canvas == null) return;

    var ctx = canvas.getContext('2d');

    var userSelect = document.querySelector('.diagram-select');

    for (var i = 0; i < uploadData.length; ++i){
        var option = document.createElement('option');
        option.innerHTML = uploadData[i].year;
        option.value = uploadData[i].year;
        userSelect.appendChild(option);
    }
    
    var drawArrow = (ctx,x,y,direction,length,w = 6,h = 10) => {
        ctx.beginPath();
        ctx.moveTo(x, y);
        
        var radian = (direction * Math.PI) / 180;

        var endX = x + Math.cos(radian) * length;
        var endY = y + Math.sin(radian) * length;
        ctx.lineTo(endX, endY);

        var angleRight = Math.atan2(endY - y, endX - x) - (Math.PI / 2);
        var angleLeft = Math.atan2(endY - y, endX - x) + (Math.PI / 2);
      
        var pointRightX = endX - Math.cos(angleRight) * w / 2;
        var pointRightY = endY - Math.sin(angleRight) * w / 2;
      
        var pointLeftX = endX - Math.cos(angleLeft) * w / 2;
        var pointLeftY = endY - Math.sin(angleLeft) * w / 2;
      
        var pointHeadX = endX + Math.cos(radian) * h;
        var pointHeadY = endY + Math.sin(radian) * h;

        ctx.moveTo(pointRightX, pointRightY);
        ctx.lineTo(pointLeftX, pointLeftY);
        ctx.lineTo(pointHeadX, pointHeadY);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();
    }

    userSelect.addEventListener('change',()=>{
        var currentYear = uploadData[userSelect.selectedIndex];
        ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);
        ctx.font = "24px 'Segoe'";
        ctx.fillText(`Мінімальна заробітна плата на ${currentYear.year} рік, грн/міс`,220,50);
        var locX = 80;
        var locY = canvas.clientHeight - 80;
        drawArrow(ctx, locX, locY, 0, canvas.width - 80*2);
        drawArrow(ctx, locX, locY, 270, canvas.height - 80*2);

        var maxSalary = 0;
        for (var i = 0; i < currentYear.data.length;++i){
            if(currentYear.data[i].salary > maxSalary) maxSalary = currentYear.data[i].salary;
        }

        var countRow = Math.ceil(maxSalary/2000);
        var step = (canvas.height - (80*2)) / (countRow  + 1);
        var lastLineHeight = 0;
        for(var i = 0; i < countRow; ++i){
            ctx.beginPath();
            ctx.font = "bold 16px 'Courier New'";
            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'black';
            var stepOffset = (i+1)*step;
            lastLineHeight = locY - stepOffset;
            ctx.fillText((i+1)*2000,locX-55,lastLineHeight +4);
            ctx.moveTo(locX - 5,lastLineHeight);
            ctx.lineTo(locX + 5,lastLineHeight);
            ctx.stroke();
            ctx.closePath();
        }
        var colorStep = 256 / (countRow  + 1);
        var maxShowedSalary = countRow * 2000;
        var maxColumnHeight = canvas.height - 80 - lastLineHeight;
        var diagramWidth = Math.floor(canvas.width - (80*2));
        for(var i = 0; i < currentYear.data.length; ++i){
            ctx.beginPath();
            ctx.fillStyle = `rgb(${i*colorStep},${255-i*colorStep},0)`;
            ctx.strokeStyle = `rgb(${i*colorStep},${255-i*colorStep},0)`;
            var columnOffset = diagramWidth / (currentYear.data.length + 1)*(i+1)*0.75;
            var columnHeight =  canvas.height - ((currentYear.data[i].salary / maxShowedSalary)*maxColumnHeight) - 80;
            ctx.moveTo(locX + columnOffset,locY);
            ctx.lineTo(locX + columnOffset,columnHeight);
            ctx.lineTo(locX + columnOffset + 40,columnHeight);
            ctx.lineTo(locX + columnOffset + 40,locY);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            ctx.beginPath();
            ctx.font = "12px Segoe";
            ctx.fillStyle = 'black';
            ctx.fillText(currentYear.data[i].name,locX + columnOffset,locY+20);
            ctx.fillText(currentYear.data[i].salary,locX + columnOffset + 4,columnHeight - 10);
            ctx.closePath();
        }
    });

    const event = new Event("change");
    userSelect.dispatchEvent(event);
})()