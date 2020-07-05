import React, { useState,useEffect } from 'react';
import {Card, Button} from 'react-bootstrap'

import {infoPokemon} from '../src/repositorios/pokemonsAPI'

export default function Cartao ({pokemon, adicionarAoCarrinho}){
    
    const [pokemonCard, setPokemonCard] = useState([])
    useEffect(() => {
        async function carregarDadosPokemon(){
            const {name, sprites}  = await infoPokemon(pokemon.name).then(response => response);
            
            setPokemonCard({
                nome: name.charAt(0).toUpperCase() + name.slice(1),
                valor: Math.floor(Math.random() * 100) + 1,
                imagem: sprites.front_default
                
            })
        }
        carregarDadosPokemon()
    },[pokemon]);

    return (
        
        <Card name="cartao" style={{ width: '12rem', marginTop: 10 + 'px',marginLeft: 10 + 'px' }} >
            <Card.Img variant="top" src={pokemonCard.imagem} />
            <Card.Body>
            <Card.Title>{pokemonCard.nome}</Card.Title>
            <Card.Text>R$ {pokemonCard.valor}</Card.Text>
            <Button variant="outline-primary" onClick={ () => { adicionarAoCarrinho(pokemonCard)}}>Comprar</Button>
            </Card.Body>
        </Card>
        
    )
}