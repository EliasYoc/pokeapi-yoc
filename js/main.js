const $templatePoke = document.getElementById("template-pokemon").content,
    $fragment = document.createDocumentFragment(),
    $contentPoke=document.querySelector(".content-pokemon"),
    $templatePokedex = document.getElementById("template-pokedex").content,
    $pokedexContainer = document.querySelector(".container-pokedex");


document.addEventListener("DOMContentLoaded",()=>{
    fetchPokemon();
    
})


const fetchPokemon = async ()=>{
    try{
        const getPokeurl = id => `https://pokeapi.co/api/v2/pokemon/${id}`,
        //arrPokemones =[],
        objPokemones = {};
        for(i=1;i<=51;i++){
            const res = await fetch(getPokeurl(i));
            const data = await res.json();
            // console.log(data);
            //arrPokemones.push(data);
            objPokemones[data.id] = data; 
        }
        //console.log(arrPokemones)
        pintarCards(objPokemones);
        console.warn("cargado")
        // console.log(objPokemones);
        //verPokemon(arrPokemones)
        $contentPoke.addEventListener("click",(e)=>{
            //console.log(e.target)
            e.preventDefault()
            if(e.target.matches(".card-pokemon") || e.target.matches(".card-pokemon *") ){
                const cardId = e.target.dataset.id;
                const cardPokemon = objPokemones[cardId];
                // console.log(cardId);
                // console.log(cardPokemon);
                pintarPokedex(cardPokemon);
            }
        })
    }catch(err){
        console.warn(err)
    }
    
}


const pintarCards = (pokemones)=>{
    Object.values(pokemones).forEach( pokemon =>{
        const $clone = $templatePoke.cloneNode(true);
        $clone.querySelector(".card-pokemon").dataset.id = pokemon.id;
        $clone.querySelector("img").dataset.id = pokemon.id;
        $clone.querySelector(".card-bg-img > img").setAttribute("src",pokemon.sprites.front_default);
        $clone.querySelector(".card-bg-img > img").setAttribute("loading","lazy");

        $clone.getElementById("nombre").textContent = pokemon.name;
        $clone.getElementById("nombre").dataset.id = pokemon.id;
        $clone.querySelectorAll(".card-info span")[0].textContent = pokemon.types[0].type.name;
        $clone.querySelectorAll(".card-info span")[0].dataset.id = pokemon.id;
        $fragment.appendChild($clone);
    })
    $contentPoke.appendChild($fragment);
}

//Como solo es un card pokedex no nececito foreach
const pintarPokedex = (pokemon)=>{
    $pokedexContainer.innerHTML = ``
    const $clone = $templatePokedex.cloneNode(true);
    $clone.querySelector(".pokedex-bg-img img").setAttribute("src",pokemon.sprites.other.dream_world.front_default);
    $clone.querySelector(".pokedex-info h3").innerHTML = `<h3>${pokemon.name} <span>${pokemon.stats[0].base_stat} hp</span></h3>`;
    //escoje el primer p que encuentre
    $clone.querySelector(".pokedex-info p").textContent = `${pokemon.base_experience} exp`;
    $clone.querySelectorAll(".pokedex-stats h4")[0].textContent = pokemon.stats[1].base_stat;
    $clone.querySelectorAll(".pokedex-stats h4")[1].textContent = pokemon.stats[3].base_stat;
    $clone.querySelectorAll(".pokedex-stats h4")[2].textContent = pokemon.stats[2].base_stat;
    $clone.querySelectorAll(".pokedex-stats h4")[3].textContent = `${pokemon.weight/10}kg`;
    $clone.querySelectorAll(".pokedex-stats h4")[4].textContent = `${pokemon.height/10}m`;
    // console.log($clone)
    $fragment.appendChild($clone);

    $pokedexContainer.appendChild($fragment);
}