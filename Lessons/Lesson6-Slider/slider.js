(()=>{
    window.addEventListener('load',()=>{
        let sliderBlock = document.querySelector('.slider');
        if(sliderBlock != null){
            var prevButton = sliderBlock.querySelector('#prevButton');
            var nextButton = sliderBlock.querySelector('#nextButton');
            var mainImage = sliderBlock.querySelector('#mainImage');

            var thumbnailBlock = sliderBlock.querySelector('.thumbnail-container');
            var smallImages = thumbnailBlock.querySelectorAll('.thumbnail');

            smallImages[0].classList.add('thumbnail-choosed');
            
            var currentImageIndex = 0;

            for(let i = 0; i < smallImages.length; ++i){
                smallImages[i].addEventListener('click',(e)=>{
                    smallImages[currentImageIndex].classList.remove('thumbnail-choosed');
                    for(let j = 0; j < smallImages.length; ++j){
                        if(smallImages[j] == e.target){
                            currentImageIndex = j;
                            mainImage.src = smallImages[currentImageIndex].src;
                            smallImages[currentImageIndex].classList.add('thumbnail-choosed');
                            break;
                        }
                    }
                });
            }

            /**
             * @param {int} side
             * @description side == 1 => to right, side == -1 => to left
             */
            var changeSlide = (side) =>{
                smallImages[currentImageIndex].classList.remove('thumbnail-choosed');
                currentImageIndex += side;
                if(currentImageIndex > smallImages.length - 1){
                    currentImageIndex = 0;
                }
                else if(currentImageIndex < 0){
                    currentImageIndex = smallImages.length - 1;
                }
                mainImage.src = smallImages[currentImageIndex].src;
                smallImages[currentImageIndex].classList.add('thumbnail-choosed');
            }

            nextButton.addEventListener('click',()=>{
                changeSlide(1);
            });
            
            prevButton.addEventListener('click',()=>{
                changeSlide(-1);
            });
        }
    });
})()