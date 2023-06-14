    window.addEventListener('load',()=>{
    setTimeout(()=>{
        var closeClickCounter = 0;

        var bannerBlock = document.createElement('div');

        bannerBlock.style.width= '400px';
        bannerBlock.style.height= '300px';
        bannerBlock.style.zIndex = 9999;
        bannerBlock.style.position = 'fixed';
        bannerBlock.style.bottom = '15px';
        bannerBlock.style.right = '15px';
        bannerBlock.style.border = '3px solid black';
        bannerBlock.style.borderRadius = '10px';
        bannerBlock.style.boxShadow = '0px 0px 15px 3px rgba(0,0,0,0.75)';
        bannerBlock.classList.add('animate');
        bannerBlock.style.animationName = 'moveObject';
        bannerBlock.style.animationDuration = '0.3s';
        bannerBlock.style.animationTimingFunction = 'linear';
        bannerBlock.style.overflow = 'hidden';
        bannerBlock.style.display = 'flex';
        bannerBlock.style.flexDirection = 'column';
        bannerBlock.innerHTML = "<video muted=\"\" borderRadius = \"10px\" autoplay=\"\" loop=\"\" name=\"media\" width=\"400\" height=\"300\" id=\"rz-banner-img\" src=\"https://s0.rozetka.com.ua/video/weblayer_birthdayparty_120623.mp4\" poster=\"https://content.rozetka.com.ua/files/images/original/342646172.jpg\" type=\"video/mp4\">\n" +
        "</video>";



        document.body.appendChild(bannerBlock);



        var closeX = document.createElement('img');
        closeX.setAttribute('src', "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAugAAALoBTx5ghQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGhSURBVEiJpZS/btNQFIe/392qOixd+iK2mBCqs3TjAZBgYYkKlZiY2hipA0tBEBVlYmJnYoq7MOG8BqgP4CAUqfJhoKlC6nt9HX6jzznfd637RwD1QfpA0geDRNhJUs4/s0UWefrYUCGoG3h+r6y+qR7efyhrvgI7N31m2NGgnF/0gdd5OhKaALr59NucHTpZM12DA0hoUufp6D/gADtqNHXAXstMtMQDX2XPIc48s52SDjiYzlwyq96aKIKSg+xos/BrmD4LwsWb5PL7u9tiPczGMk49IjPjxeCymqzgZpoG4bPqFZsNMRLnbBkLvyPokgjMPHNtcG9jx5+0pwXuX0lfiQceFERLAnAAF5p12E/AfHUDrOFH2O9J51Fc86wf4ShBD3in5A5gC3hQ8s8exNzQ4LMi3m8+K7egPte/z7OivvBVYiVa5NkT4JMPbqIYzKpxW63O00LoxCdBPNUiz66A/b7wSMmVA5bbwgEG5fzUsNee8tJJOgaut4F3SK7VuOO/m5xnjww+ArvAOCmr81j4ehZ59lJQGNSC0W5ZffkDcV/60qJU4rYAAAAASUVORK5CYII=")
        closeX.setAttribute('alt', "Close button")
        closeX.setAttribute('title', "Закрыть Баннер")
        closeX.style.position = 'fixed';
        closeX.style.zIndex = 100000;
        closeX.style.cursor ='pointer';
        bannerBlock.appendChild(closeX);
    
        closeX.style.bottom = (bannerBlock.clientHeight - 15) + 'px';
        closeX.style.right = '30px';

        let mouseoverHandler = ()=>{
            ++closeClickCounter;
            if(closeClickCounter <= 3){
                closeX.style.display = 'none';
                setTimeout(()=>{
                    closeX.style.display = 'inherit';
                    closeX.style.bottom = (window.innerHeight - (Math.random() * window.innerHeight)) + 'px';
                    closeX.style.right = (window.innerWidth - (Math.random() * window.innerWidth)) + 'px';
                },1000);
            }
            else{
                closeX.removeEventListener('mouseover', mouseoverHandler);
                var tempText = document.createElement('span');
                tempText.innerHTML = 'mine';
                document.body.appendChild(tempText);
                closeX.addEventListener('click',()=>{
                    bannerBlock.parentNode.removeChild(bannerBlock);
                    bannerBlock = null;
                })
            }
        };

        closeX.addEventListener('mouseover', mouseoverHandler);

        var bannerFooter = document.createElement('div');
        bannerFooter.style.width = '400px';
        bannerFooter.style.height = '75px';
        bannerFooter.style.backgroundColor = 'rgba(0,0,0,0.75)';
        bannerFooter.style.position = 'fixed';
        bannerFooter.style.borderRadius = '0 0 5px 5px';
        bannerFooter.style.bottom = '15px';

        bannerBlock.appendChild(bannerFooter);


        var timerContainer = document.createElement('div');
        timerContainer.style.fontSize = '32';
        timerContainer.style.position = 'fixed';
        timerContainer.style.bottom = '37px';
        timerContainer.style.right = '180px';

        timerContainer.innerHTML = '';
        var timer = new Timer(new Date('2023-07-13T18:00:00'));
        timer.start();
        timerContainer.appendChild(timer.render());


        setInterval(()=>{
            if(timerContainer.children.length > 0)timerContainer.removeChild(timerContainer.children[0]);
            timerContainer.appendChild(timer.render());
        },1000);

        bannerFooter.appendChild(timerContainer);

        var timerSubText = document.createElement('div');
        timerSubText.style.position = 'fixed';
        timerSubText.style.bottom = '27px';
        timerSubText.style.right = '180px';
        timerSubText.style.color = 'white';
        timerSubText.style.fontSize = '13px';

        var daysSubText = document.createElement('span');
        daysSubText.innerHTML = 'днів';

        timerSubText.appendChild(daysSubText);

        var hoursSubText = document.createElement('span');
        hoursSubText.innerHTML = 'годин';
        hoursSubText.style.marginLeft = '30px';

        timerSubText.appendChild(daysSubText);

        var minutesSubText = document.createElement('span');
        minutesSubText.innerHTML = 'хвилин';
        minutesSubText.style.marginLeft = '20px';

        timerSubText.appendChild(daysSubText);

        var secondsSubText = document.createElement('span');
        secondsSubText.innerHTML = 'секунд';
        secondsSubText.style.marginLeft = '17px';

        timerSubText.appendChild(daysSubText);
        timerSubText.appendChild(hoursSubText);
        timerSubText.appendChild(minutesSubText);
        timerSubText.appendChild(secondsSubText);

        bannerFooter.appendChild(timerSubText);


        var bannerFollowButton = document.createElement('button');
        bannerFollowButton.innerHTML = 'Перейти';
        bannerFollowButton.style.fontSize = '23px';
        bannerFollowButton.style.color = 'white';
        bannerFollowButton.style.backgroundColor = 'green';
        bannerFollowButton.style.border = 'none';
        bannerFollowButton.style.borderRadius = '5px';
        bannerFollowButton.style.position = 'fixed';
        bannerFollowButton.style.bottom = '32px';
        bannerFollowButton.style.right = '45px';
        bannerFollowButton.style.padding = '5px 10px';

        bannerFooter.appendChild(bannerFollowButton);
    },2000);
});