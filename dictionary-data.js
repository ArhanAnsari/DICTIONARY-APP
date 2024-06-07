
const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';
let btn = document.querySelector("#search-btn");
let myrow = document.querySelector("#showans");
let sound = document.querySelector("#sound");
let change_img = document.querySelector(".newimg");
let voiceBtn = document.querySelector(".voice");

btn.addEventListener("click", async () => {
    let word = document.querySelector("#myword").value;

    await fetch(`${url}${word}`)
        .then((response) => response.json())
        .then((data) => {
            let meanings1 = data[0].meanings[0].partOfSpeech;
            let meanings2 = data[0].phonetic;
            let main_meanings = data[0].meanings[0].definitions[0].definition;
            let example = data[0].meanings[0].definitions[0].example;
            let sound1 = data[0].phonetics[0].audio;

            myrow.innerHTML = `
            <div class="word">
            <h3>${word}</h3>
            <button onclick="playSound()" class="voice" id="voiceBtn">
            <i class="fas fa-volume-up"></i>
            </button>
            </div>
            <div class="details">
            <p>${meanings1}</p>
            <p>${meanings2}</p>
            </div>
            <p class="word-meaning">${main_meanings}</p>
            <p class="word-example">${example}</p>`;
            sound.setAttribute("src", `${sound1}`);
            change_img.src = "./Dictionary-pana.png";
        })
        .catch(() => {
            if (word === "") {
                myrow.innerHTML = `<h4>Please Enter the word !</h4>`;
            } else {
                change_img.src = "./Dictionary-pana (4).png";
                myrow.innerHTML = `<h3 class="word-error">Couldn't Find The Word</h3>`;
            }
        });
});

function playSound() {
    sound.play();
  
    document.getElementById('voiceBtn').classList.add('voiceAn');
  
    setTimeout(() => {
      document.getElementById('voiceBtn').classList.remove('voiceAn');
    }, 500);
  }      


          