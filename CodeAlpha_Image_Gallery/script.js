const images = document.querySelectorAll(".gallery img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

let currentIndex = 0;

function openLightbox(img){

    lightbox.style.display="flex";

    lightboxImg.src=img.src;

    currentIndex=[...images].indexOf(img);
}

function closeLightbox(){
    lightbox.style.display="none";
}

function changeImage(step){

    currentIndex += step;

    if(currentIndex < 0)
        currentIndex = images.length - 1;

    if(currentIndex >= images.length)
        currentIndex = 0;

    lightboxImg.src = images[currentIndex].src;
}

function filterImages(category){

    const items = document.querySelectorAll(".item");

    items.forEach(item=>{

        if(category==="all" || item.classList.contains(category))
            item.style.display="block";

        else
            item.style.display="none";
    });
}

document.addEventListener("keydown",e=>{

    if(e.key==="Escape")
        closeLightbox();

    if(e.key==="ArrowRight")
        changeImage(1);

    if(e.key==="ArrowLeft")
        changeImage(-1);
});