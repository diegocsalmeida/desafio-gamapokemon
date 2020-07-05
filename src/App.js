import React, { useEffect, useState } from 'react';
import './App.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Menu from './Menu'
import Cartao from './Cartao'
import Carrinho from './Carrinho'

import listaPokemon, { paginacao, infoPokemon } from '../src/repositorios/pokemonsAPI'

function App() {
  const [lista, setLista] = useState([]);
  const [cesta, setCesta] = useState([])
  const [proximaPagina, setProximaPagina] = useState();
  const [paginaAnterior, setPaginaAnterior] = useState();

  useEffect(() => {
    listaPokemons()
  }, []);

  const listaPokemons = () => {
    listaPokemon(0, 0).then(response => {
      setLista(response.results)
      setProximaPagina(response.next)
      setPaginaAnterior(response.previous)
      const cestaStorage = JSON.parse(localStorage.getItem("cart")) || [];
      setCesta(cestaStorage);
    })
  }

  const adicionarItem = (dado) => {
    const cestaStorage = JSON.parse(localStorage.getItem("cart")) || [];
    cestaStorage.push(dado)
    setCesta(cestaStorage);
    localStorage.setItem("cart", JSON.stringify(cestaStorage));
  };

  const limparCarrinho = () => {
    localStorage.clear()
    const cestaStorage = JSON.parse(localStorage.getItem("cart")) || [];
    setCesta(cestaStorage);
  }

  function mudarPagina(url) {
    paginacao(url).then(response => {
      setLista(response.results)
      setProximaPagina(response.next)
      setPaginaAnterior(response.previous)
    })
  }

  const pesquisarPokemon = (nome) => {
    if (nome === "") {
      listaPokemons()
    }
    else {
      infoPokemon(nome).then(response => {
        setLista(response.forms)
      })
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col sm="12">
          <Menu pesquisa={pesquisarPokemon} />
        </Col>
      </Row>

      <Row>
        <Col>
          <Button variant="outline-info" onClick={() => { mudarPagina(paginaAnterior) }} disabled={paginaAnterior === null || lista.length <= 1}>Página Anterior</Button>
          <Button variant="outline-info" onClick={() => { mudarPagina(proximaPagina) }} disabled={proximaPagina === null || lista.length <= 1}>Próxima Página</Button>
        </Col>
      </Row>

      <Row>

        <Col sm="10">
          <Row>

            {
              lista.map((item, indice) => {
                return (
                  <Cartao key={indice} pokemon={item} adicionarAoCarrinho={adicionarItem} />
                )
              })

            }

          </Row>
        </Col>

        <Col sm="2">
          <Carrinho cesta={cesta} limparCesta={limparCarrinho} lista={listaPokemons} />
        </Col>

      </Row>

    </Container>

  );
}

export default App;
