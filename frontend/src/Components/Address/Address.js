import React from 'react';
import { Row, Col, Form, Button, Card } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

function Address(methods) {
    return (
        <>
            <Form.Group as={Col} md={4} name="enderecoCliente" style={{ display: "none" }}>
                <Form.Label>CEP</Form.Label>
                <Form.Control type="text" placeholder="Digite o CEP" id="cepInput" required="required" autoComplete="off" onBlur={methods.onBlurZipCode} />
            </Form.Group>


            <Col md={8}></Col>

            <Form.Group as={Col} md={6} name="enderecoCliente" style={{ display: "none" }}>
                <Form.Label>Rua</Form.Label>
                <Form.Control type="text" disabled placeholder="Digite a rua" id="ruaInput" required="required" autoComplete="off" />
            </Form.Group>

            <Form.Group as={Col} md={2} name="enderecoCliente" style={{ display: "none" }}>
                <Form.Label>Número</Form.Label>
                <Form.Control type="number" disabled placeholder="Digite o numero da sua residencia" id="numberInput" required="required" autoComplete="off" />
            </Form.Group>

            <Form.Group as={Col} md={4} name="enderecoCliente" style={{ display: "none" }}>
                <Form.Label>Complemento</Form.Label>
                <Form.Control type="text" disabled placeholder="Digite o complemento" id="complementoInput" required="required" autoComplete="off" />
            </Form.Group>

            <Form.Group as={Col} md={4} name="enderecoCliente" style={{ display: "none" }}>
                <Form.Label>Cidade</Form.Label>
                <Form.Control type="text" disabled placeholder="Digite sua cidade" id="cidadeInput" required="required" autoComplete="off" />
            </Form.Group>

            <Form.Group as={Col} md={4} name="enderecoCliente" style={{ display: "none" }}>
                <Form.Label>Bairro</Form.Label>
                <Form.Control type="text" disabled placeholder="Digite o bairro" id="bairroInput" required="required" autoComplete="off" />
            </Form.Group>

            <Form.Group as={Col} md={4} name="enderecoCliente" style={{ display: "none" }}>
                <Form.Label>Estado</Form.Label>
                <Form.Control as="select" id="stateInput" disabled custom>
                    <option name="optionStates" value="">Selecione o seu estado por favor</option>
                    <option name="optionStates" value="AC" >Acre</option>
                    <option name="optionStates" value="AL">Alagoas</option>
                    <option name="optionStates" value="AM">Amazonas</option>
                    <option name="optionStates" value="AP">Amapá</option>
                    <option name="optionStates" value="BA">Bahia</option>
                    <option name="optionStates" value="CE">Ceará</option>
                    <option name="optionStates" value="DF">Distrito Federal</option>
                    <option name="optionStates" value="ES">Espírito Santo</option>
                    <option name="optionStates" value="GO">Goiás</option>
                    <option name="optionStates" value="MA">Maranhão</option>
                    <option name="optionStates" value="MT">Mato Grosso</option>
                    <option name="optionStates" value="MS">Mato Grosso do Sul</option>
                    <option name="optionStates" value="MG">Minas Gerais</option>
                    <option name="optionStates" value="PA">Pará</option>
                    <option name="optionStates" value="PB">Paraíba</option>
                    <option name="optionStates" value="PR">Paraná</option>
                    <option name="optionStates" value="PE">Pernambuco</option>
                    <option name="optionStates" value="PI">Piauí</option>
                    <option name="optionStates" value="RJ">Rio de Janeiro</option>
                    <option name="optionStates" value="RN">Rio Grande do Norte</option>
                    <option name="optionStates" value="RO">Rondônia</option>
                    <option name="optionStates" value="RS">Rio Grande do Sul</option>
                    <option name="optionStates" value="RR">Roraima</option>
                    <option name="optionStates" value="SC">Santa Catarina</option>
                    <option name="optionStates" value="SE">Sergipe</option>
                    <option name="optionStates" value="SP">São Paulo</option>
                    <option name="optionStates" value="TO">Tocantins</option>
                </Form.Control>
            </Form.Group>
        </>
    );
}
export default Address;