var SHOW_PET_ITEM = 20;
const data = [];


function closePopup() {
  let closePopupConatiner = document.getElementById("myModal");
  closePopupConatiner.remove();
}

const hasMorePets = (page, limit, total) => {
  const startIndex = (page - 1) * limit + 1;
  return total === 0 || startIndex < total;
};

function showData() {
    let htmlContent = data?.slice(0, SHOW_PET_ITEM).map((val) => {
      return `<div id=${val.animal_id} class="col-md-6 col-lg-4 col-sm-4 col-xl-3 single-product" onclick=showPopup('${val.animal_id}')>
     <div class="product-area">
      <img class="petImg d-flex justify-content-center" src=${val.image.url}  alt="Ooops!!! image not found 😢" />        
  <br> <br>
      <span>Gender : ${val.sex}  </span> <br>
      <span>Color :${val.color} </span> <br>
      <span>Age : ${val.age} </span> <br>
           
                  </div>
                  </div>`;
    });
    document.getElementById("pet").innerHTML += htmlContent.join(" ");
  }

async function fetchAnimalData() {
  fetch("https://data.austintexas.gov/resource/kz4x-q9k5.json")
    .then((response) => response.json())
    .then((value) => {
      console.log(" >>> ", value);
      data.push(...value);
      showData();
    });
}

function showPopup(id) {
    const result = data.filter((val) => {
      return val.animal_id == id;
    })[0];
    let htmlContent = `<div id="myModal" class="modal-popup">
        <div class="modal-content">
          <span class="close" onclick=closePopup()>&times;</span>
          <img class="petImg d-flex justify-content-center" src=${result.image.url} alt="Ooops!!! image not found 😢" />        
          <span>  Thank you for choosing me !! I am ${result.type} having ${result.sex} gender. I look like a ${result.looks_like} and my age is ${result.age}. </span>
        </div>
      </div>`;
    document.getElementById("popup").innerHTML = htmlContent;
}
  

document.addEventListener("DOMContentLoaded", function (event) {
  fetchAnimalData();
});

window.addEventListener(
  "scroll",
  () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (
      scrollTop + clientHeight >= scrollHeight - 5 &&
      hasMorePets(1, SHOW_PET_ITEM, 0) &&
      SHOW_PET_ITEM <= data.length
    ) {
       document.getElementById("loader").innerHTML = "<h1 class='d-flex justify-content-center'> We are loading data 🐕. Please wait. <h1>";
      setTimeout(()=>{
        SHOW_PET_ITEM += 10;
        showData();

        let removeLoader = document.getElementById("loader");
        removeLoader.remove();
      },5000)
    }
  },
  {
    passive: true,
  }
);
