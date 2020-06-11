import React, { useEffect, useState } from 'react'
import socketIOClient from 'socket.io-client'
import MainLayout from '../MainLayout/MainLayout';
import ChatWidget from '../../Components/Chat/Chat'

function Chat() {

	const[message, setMessage] = useState('');
	const[reciever, setReciever] = useState(0);
	const userData = JSON.parse(localStorage.getItem("userData"));
	const logado = userData.idUser;
	const serverURL = 'http://localhost:8000';
	const socket = socketIOClient(serverURL)

	useEffect(() => {
		socket.on('Message', (receivedInfo) => {
			if ((receivedInfo.sender == logado) || receivedInfo.reciever == logado) {
				//Para acesso receivedInfo.sender, receivedInfo.reciever ou receivedInfo.mensagem
				// Inserir codigo que escreve na tela o sender e a mensagem
			}
		})
		socket.on('ErroEnvio', (ErroMensagem) => {
			if (ErroMensagem.sender == logado)
				alert(ErroMensagem.mensagem)
		})
	})

	function sendMessage() {
		const dadosMensagem = {
			sender: logado,
			reciever: reciever,
			mensagem: message
		}
		socket.emit('Message', dadosMensagem)
	}
	
	return(
		<div>
			<ChatWidget></ChatWidget>
		</div>
	)
}

export default Chat
