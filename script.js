const imageoCntainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const count=10;
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
const apikey='A-opLsUHnNedwGDC8getNZjIEe8sLsd40laZjzNOYPI';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apikey}&count=${count}`;
let photoArray=[];

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      loader.hidden = true;
    }
}

async function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photoArray.length;
    photoArray.forEach((photo) => {
        const img = document.createElement("img");
        img.alt =photo.alt_description;
        img.title =photo.alt_description;
        img.src = photo.urls.regular;
        
        const a = document.createElement("a");
        a.href = photo.links.html;
        a.target='_blank';
        img.addEventListener('load', imageLoaded);
        a.appendChild(img);
        imageoCntainer.appendChild(a);
        
    })
    
}

async function getPhotos() {
    try {
        const response =await fetch(apiUrl);
        photoArray = await response.json();
        displayPhotos();
    } catch (error) {
        //errr
    }
}
window.addEventListener("scroll", () => {
    if(window.innerHeight +window.scrollY >= document.body.offsetHeight - 1000 && ready){
        getPhotos();
        ready = false;
    }
});

getPhotos();