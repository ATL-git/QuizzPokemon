const container = document.querySelector('#pokeContainer')
const input = document.querySelector('#input')
const textScore = document.querySelector('#textScore')
textScore.classList.add('hidden')
let currentPoke = null
let score = 0
let loader = false

function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getPokemons() {
    if (loader == false) {
       
        container.innerHTML = ""
        textScore.textContent = ""
        let randoma = random(0, 151)
        let response = await fetch('https://pokebuildapi.fr/api/v1/pokemon/' + randoma)
        let data = await response.json()
        let pokeimageResponse = await fetch('https://pokeapi.co/api/v2/pokemon/' + randoma)
        let pokeimageData = await pokeimageResponse.json()
        currentPoke = data.name.toLowerCase()
        const para = document.createElement('p')
        img = document.createElement('img')
        img.classList.add('pokeImage')
        img.src = pokeimageData.sprites.other['official-artwork'].front_default
        container.appendChild(para)
        container.appendChild(img)
        loader = true
    }


}



input.addEventListener('keyup', (event) => {

    switch (event.code) {
        case "Enter":
            if (input.value.toLowerCase() == currentPoke) {
                input.value = ""
                textScore.classList.remove('hidden')
                textScore.classList.add('textScore')
                textScore.textContent = `Bonne réponse Bravo !! +1`
                score++
                document.querySelector('#score').textContent = `Score = ${score}`



            } else if (input.value != currentPoke) {
                input.value = ""
                textScore.classList.remove('hidden')
                textScore.classList.add('textScore')
                document.querySelector('#textScore').textContent = `Mauvaise reponse !! le nom était ${currentPoke}`

            }
            setTimeout(() => {

                getPokemons()
                textScore.classList.add('hidden')

            }, 3000);
            loader = false
            break;
    }

})



getPokemons()
