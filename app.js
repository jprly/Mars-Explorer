const key = 'zmKhKImaEZsyZXovbPgQxjgpniTJ8UFUCyfCtMYB';
// let photoData = [];
// let curiosityPhotos = fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${key}`)
//   .then(data => data.json())
//   .then(entries => console.log(entries))
//   .then(data => photoData = [... data]);
  
let myPhotos = []
let currentManifest;
let currentPhotos;
let currentSol;

let currentPhotoNumber = 0;

const getManifest = async () => {
    const rover = roverSelect.value;
    const getData = await fetch(`https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}?api_key=${key}`)
    const data = await getData.json();
    console.log(data);
    console.log(data['photo_manifest']['name']);
    await populateManifest(data);
    currentPhotoNumber = 0;
    missionDetails.style.display = 'block';

}

function populateManifest(data) {
    roverName.innerText =  data['photo_manifest']['name'];
    roverStatus.innerText =  data['photo_manifest']['status'];
    launchDate.innerText =  data['photo_manifest']['launch_date'];
    landDate.innerText =  data['photo_manifest']['landing_date'];
    maxSols.innerText =  data['photo_manifest']['max_sol'];
    photoCount.innerText =  data['photo_manifest']['total_photos'];
    solSelector.max = `${data['photo_manifest']['max_sol']}`;
    currentManifest = data;
}

const getPhoto = async () => {
    const base = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?'
    
    const getData = await fetch(base+`sol=${currentSol}&api_key=${key}`)
    .then(mydata => mydata.json())
    .then(mydata => console.log(mydata))
    // console.log(getData.headers);
    const data = await getData.json();

    // console.log(data.headers);
    console.log(data);
    let photoArray = data.photos;
     myPhotos = [... photoArray];
     if (myPhotos.length == 0){
        console.log('alert!!!')
        currentSol +=1;
        console.log(currentSol);
        getPhoto();
        return;
    }
     cameraName.innerText = myPhotos[currentPhotoNumber]['camera']['full_name'];
     marsImage.innerHTML = `<img id="marsImage" src="${myPhotos[currentPhotoNumber]['img_src']}" width="100%" alt="mars">`
}

let marsImage = document.querySelector('#marsImage');
marsImage.addEventListener('click', getRandomImage);

function selectSol(){
    // console.log('hi');
    selectedSol.innerText = solSelector.value
    currentSol = parseInt(solSelector.value);
    getPhoto()
}

function getRandomImage(){
    let photoRange = myPhotos.length;
    console.log('range: ', photoRange);
    //get random number in range.
    let randomPhoto = Math.floor(Math.random() * (photoRange))

    //set random photo
    marsImage.src = myPhotos[randomPhoto]['img_src'];
    console.log(myPhotos[randomPhoto])
}
const selectedSol = document.querySelector('#selectedSol');
const roverName = document.querySelector('#rover-name');
const roverStatus = document.querySelector('#status');
const launchDate = document.querySelector('#launchDate');
const landDate = document.querySelector('#landDate');
const maxSols = document.querySelector('#solCount');
const photoCount = document.querySelector('#photoCount');
const roverSelect = document.querySelector('#roverDropdown');
const solSelector = document.querySelector('#solSelector');
const cameraName = document.querySelector('#cameraName');
const missionDetails = document.querySelector('#missionDetails');
roverSelect.addEventListener('change', getManifest);
solSelector.addEventListener('change', selectSol)