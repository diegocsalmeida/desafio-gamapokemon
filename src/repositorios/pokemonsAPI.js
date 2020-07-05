import axios  from 'axios'

export default async function listaPokemons (limit, offset){
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    return result.data
}

export async function infoPokemon(name){
    const result = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    return result.data
}

export async function buscarFoto(url){
    const result = await axios.get(url)
    return result.data
}

export async function paginacao(url){
    const result = await axios.get(url)
    return result.data
}