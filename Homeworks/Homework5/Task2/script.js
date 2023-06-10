(()=>{
    var imageView = document.getElementById('image-view');
    var imageBlocks = document.getElementById('images-list').getElementsByClassName('image-block');
    var currentImage = 0;
    function ChangeCurrentImage(change){
        if(typeof change !== 'number') console.error('ChangeCurrentImage -> invalid input');
        if(currentImage == 0 && change < 0) change = (imageBlocks.length - 1);
        if(currentImage == (imageBlocks.length - 1) && change > 0) change = (imageBlocks.length - 1)*(-1);
        imageBlocks[currentImage].classList.remove('chosenImage');
        currentImage += change;
        imageBlocks[currentImage].classList.add('chosenImage');
        imageView.style.backgroundImage = `url(images/${currentImage+1}.jpg)`;
    }
    ChangeCurrentImage(0);//load the first image

    for(var i = 0; i < imageBlocks.length; ++i){ // now click on an image in the list will open it
        imageBlocks[i].addEventListener('click',(e)=>{
            imageBlocks[currentImage].classList.remove('chosenImage');
            for(var j = 0; j < imageBlocks.length; ++j){
                if(imageBlocks[j] == e.target){
                    imageBlocks[j].classList.add('chosenImage');
                    currentImage = j;
                    imageView.style.backgroundImage = `url(images/${currentImage+1}.jpg)`;
                    break;
                }
            }
        });
    }

    var btnPrevImage = document.getElementById('btnPreviousImage');
    btnPrevImage.addEventListener('click',()=>{
        ChangeCurrentImage(-1); //try to go back to the previous image
    });
    var btnNextImage = document.getElementById('btnNextImage');
    btnNextImage.addEventListener('click',()=>{ 
        ChangeCurrentImage(1);//try to go to the next image
    });
})();