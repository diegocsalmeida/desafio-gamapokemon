import React, { useState } from 'react';
import { Button, ListGroup, Modal } from 'react-bootstrap'
export default function Carrinho({ cesta, limparCesta, lista }) {

    const [show, setShow] = useState(false);

    let total = 0;

    function finalizarCompra() {
        setShow(true);
        limparCesta();
        lista();
    }
    function somar(valor) {
        total += valor
    }

    const fecharModal = () => setShow(false);

    return (
        <div>
            <Modal show={show} onHide={fecharModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Sucesso!</Modal.Title>
                </Modal.Header>
                <Modal.Body>Parabéns, sua compra foi finalizada!</Modal.Body>
                <Modal.Footer>
                    <Button size="lg" block variant="outline-success" onClick={fecharModal}>
                        Fechar
                </Button>
                </Modal.Footer>
            </Modal>

            Carrinho de Compras
            <ListGroup variant="flush">
                {
                    cesta.map((i, indice) => {
                        somar(i.valor)
                        return (
                            <ListGroup.Item key={indice}>{i.nome} - R$ {i.valor}</ListGroup.Item>
                        )

                    })
                }
            </ListGroup>

            <Button size="lg" block variant="outline-danger" onClick={() => { limparCesta() }} disabled={cesta.length === 0}>Limpar</Button>
            <Button size="lg" block variant="outline-success" onClick={() => { finalizarCompra() }} disabled={cesta.length === 0}>Finalizar</Button>
            Total: R$ {total}

        </div>
    );
}