function toggleAudio() {
    const audio = document.querySelector('.audio')
    const music = document.querySelector('audio')

    audio.addEventListener('click', () => {
        audio.classList.toggle("play")

        const containPlay = audio.classList.contains("play")

        if (containPlay) {
            music.play()
        } else {
            music.pause()
        }
    })
}

const imageCard = [
    {
        src: "./assets/bulbasaur.svg",
        alt: "bulbasaur"
    },
    {
        src: "./assets/charmander.svg",
        alt: "charmander"
    },
    {
        src: "./assets/eevee.svg",
        alt: "eevee"
    },
    {
        src: "./assets/meowth.svg",
        alt: "meowth"
    },
    {
        src: "./assets/pikachu.svg",
        alt: "pikachu"
    },
    {
        src: "./assets/psyduck.svg",
        alt: "psyduck"
    },
    {
        src: "./assets/snorlax.svg",
        alt: "snorlax"
    },
    {
        src: "./assets/squirtle.svg",
        alt: "squirtle"
    },

]

// pontos
let hit = 0
let mistake = 0

function createCardGrid(imageCard) {

    const newArray = [...imageCard]
    const joinArray = imageCard.concat(newArray)
    const sortLetters = joinArray.sort(() => Math.random() - 0.5)

    for (let i = 0; i < joinArray.length; i++) {

        document.getElementById("grid").innerHTML += `
            <div class="card">
                <div class="face" id="front">
                    <img src="./assets/questionmark.svg" alt="ícone de interrogação">
                </div>
                <div class="face" id="back">
                    <img src="${sortLetters[i].src}" alt="${sortLetters[i].alt}">
                </div>
            </div>
        `
    }
}

function flipCard() {
    const cards = document.querySelectorAll('.card')

    for (const card of cards) {
        card.addEventListener('click', () => {
            card.classList.remove('flip')
            card.style.pointerEvents = "none"
        })
    }
}

function cardFlipTime() {
    const cards = document.querySelectorAll('.card')

    for (const card of cards) {
        card.classList.add('flip')
        card.style.pointerEvents = "auto"
    }

    clearInterval(interval)
}

function differentOrSameCard() {
    const cards = document.querySelectorAll('.card')

    const arrayOfSelectedCards = []
    const rightLetters = []

    for (const card of cards) {
        card.addEventListener('click', () => {

            arrayOfSelectedCards.unshift(card)

            const evenNumber = arrayOfSelectedCards.length % 2 === 0

            if (evenNumber) {
                if (card.innerHTML == arrayOfSelectedCards[1].innerHTML) {

                    hitsAndMistake(hit = hit + 1, mistake)

                    rightLetters.push(card)

                    if (rightLetters.length == 8) {
                        showModal(hit, mistake)
                    }

                } else {

                    hitsAndMistake(hit, mistake = mistake + 1)

                    setTimeout(function () {
                        for (let i = 0; i < 2; i++) {
                            arrayOfSelectedCards[i].classList.add("flip")

                            arrayOfSelectedCards[i].style.pointerEvents = "auto"
                        }
                    }, 1000)

                }
            }

        })
    }
}

function hitsAndMistake(hit, mistake) {
    const punctuations = document.querySelectorAll(".punctuation")

    for (const punctuation of punctuations) {
        punctuation.innerHTML = `
            <p>Acertos : <span id="hits">${hit}</span></p>
            <p>Erros: <span id="mistakes">${mistake}</span></p>
        `
    }
}

function showModal(hit, mistake) {
    const modal = document.querySelector(".modal")
    const button = document.querySelector(".button")
    const message = document.querySelector(".message")

    modal.classList.add("active")

    hitsAndMistake(hit, mistake)

    if (mistake == 0) {
        message.innerHTML = "Você têm uma memória excelente"
    } else if (mistake <= 5) {
        message.innerHTML = "Você têm uma boa memória"
    } else if (mistake >= 6) {
        message.innerHTML = "Você precisa trabalhar sua memória"
    }

    button.addEventListener('click', () => {
        document.location.reload(true);
    })
}

toggleAudio()
createCardGrid(imageCard)
flipCard()
const interval = setInterval(cardFlipTime, 1500)
differentOrSameCard()