import React, { useEffect, useState } from "react"
import logoImg from "../../assets/logo.svg"
import styles from "./style.module.scss"
import { api } from "../../services/api"
import { io } from "socket.io-client"
interface IMessage {
  id: string
  text: string
  user: {
    avatar_url: string
    name: string
  }
}

const messagesQueue: IMessage[] = []
const socket = io("http://localhost:4000")

socket.on("new_message", (newMessage: IMessage) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {

    //A cada 3 segundos verificar se a lista de mensagens foi atualizada
    const timer = setInterval(() => {
    // Se houver pelo menos 1 mensagem na fila, sobrescrever o array anterior
      if(messagesQueue.length > 0) {
        setMessages( prevState => [ //prevState usado quando a atualização do react depende de um item anterior
          messagesQueue[0], //primeira mensagem da fila
          prevState[0], //primeira mensagem da fila anterior
          prevState[1] //segunda mensagem da fila anterior
        ].filter(Boolean)) //Filtro remove valores Undefined (caso não haja 3 mensagens na fila)
        
        messagesQueue.shift()
      }
    }, 3000)
  }, [])
  
  useEffect(() => {
    api.get<IMessage[]>('messages/last3').then(response => 
      setMessages(response.data)
    )
  }, [])

  return (
    <div className={styles.messageBoxWrapper}>
      <img src={logoImg} alt="Logo NWL Heat" />

      <ul className={styles.messageList}>
        {messages.map(message => {
          return(
            <li key={message.id} className={styles.message}>
              <p className={styles.messageContent}>{message.text}</p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img src={message.user.avatar_url} alt={message.user.name} />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
