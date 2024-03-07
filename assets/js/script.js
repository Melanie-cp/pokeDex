
$(document).ready(function () {
    const pokeForm = $('#pokeForm')
    const pokeNumber = $('#pokeNumber')
    const pokeResult = $('#pokeResult')
    const chartContainer = $('#chartContainer')

    pokeForm.on('submit', function (event) {
        event.preventDefault()
        // console.log("me estas procesando") prueba que funciona el botón

        //remover clases is-valid is-invalid
        pokeNumber.removeClass("is-valid is-invalid")

        // console.log(pokeNumber.val()) prueba q captura el numero q escribe usuario
        const pokeNumberUser = parseInt(pokeNumber.val())

        //validaciones, que sea numero mayor que 0 y no espacios en blanco
        if (pokeNumberUser > 0) {
            // console.log("Es correcta la búsqueda")
            pokeNumber.addClass("is-valid")
            getPokemon(pokeNumberUser)
        } else {
            // console.log("Es incorrecta la búsqueda")
            pokeNumber.addClass("is-invalid")
        }
    })

    //consumir la api de pokemon con ajax
    //url: https://pokeapi.co/api/v2/pokemon/3

    const getPokemon = (pokeNumberFn) => {

        $.ajax({
            // url: "https://pokeapi.co/api/v2/pokemon/" + pokeNumberFn,
            url: `https://pokeapi.co/api/v2/pokemon/${pokeNumberFn}`,
            method: "GET",
            success(pokemon) {
                // console.log(pokemon)
                // console.log("image:", pokemon.sprites.other.dream_world.front_default)
                // console.log("name:", pokemon.name)
                // console.log("height:", pokemon.height)
                // console.log("weight:", pokemon.weight)
                // console.log("base_experience:", pokemon.base_experience)
                // console.log("types:", pokemon.types)

                //construir un objeto
                const myPokemon = {
                    image: pokemon.sprites.other.dream_world.front_default,
                    name: pokemon.name,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    base_experience: pokemon.base_experience,
                    types: pokemon.types,
                    stats: pokemon.stats
                }

                //Pintar la card con el Pokemon
                pokeResult.html(`
                <div class="card">
                    <img src="${myPokemon.image}"
                        alt="" class="card-img-top">
                    <div class="card-body">
                        <h5>name: ${myPokemon.name}</h5>
                    </div>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">base_experience: ${myPokemon.base_experience}</li>
                        <li class="list-group-item">height: ${myPokemon.height}</li>
                        <li class="list-group-item">weight: ${myPokemon.weight}</li>
                        <li class="list-group-item">type: ${myPokemon.types.map((item) => item.type.name).join(" - ")}</li>
                    </ul>
                </div>
                `)

                //Pintar el gráfico con CanvaJS
                const dataPoints = myPokemon.stats.map((stat) => {
                    return ({
                        label: stat.stat.name,
                        y: stat.base_stat
                    })
                })

                const options = {
                    animationEnabled: true,
                    title: {
                        text: "Estadísticas del Pokemon"
                    },
                    data: [
                        {
                            type: "column",
                            dataPoints: dataPoints
                        }
                    ]

                }
                chartContainer.CanvasJSChart(options);

            },
            error(e) {
                console.log(e)
            }
        })
    }
})