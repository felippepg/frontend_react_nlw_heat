import React, { useEffect, useState } from "react"
import logoImg from "../../assets/logo.svg"
import styles from "./style.module.scss"
import { api } from "../../services/api"

interface IMessage {
  id: string
  text: string
  user: {
    avatar_url: string
    name: string
  }
}

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])

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
