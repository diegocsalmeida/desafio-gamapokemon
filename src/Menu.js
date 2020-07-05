import React, { useState } from 'react';
import {
  Navbar,
  Nav,
  Form,
  Button,
  FormControl
} from 'react-bootstrap';
import logo from './imagens/logo.png'

export default function Menu({ pesquisa }) {

  const [txtPesquisa, setTxtPesquisa] = useState('');

  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Navbar.Brand href="/">
        <img
          src={logo}
          width="48"
          height="48"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />{' '}
      Loja Pokémon
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="https://github.com/diegocsalmeida/desafio-gamapokemon">Github</Nav.Link>
        </Nav>
        <Form inline onSubmit={() => { pesquisa(txtPesquisa) }}>
          <FormControl type="text" placeholder="Nome do pokémon" className="mr-sm-2" onChange={e => setTxtPesquisa(e.target.value)} />
          <Button variant="outline-success" onClick={() => { pesquisa(txtPesquisa); setTxtPesquisa("") }}>Pesquisar</Button>
        </Form>

      </Navbar.Collapse>
    </Navbar>
  );
}