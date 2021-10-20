import React from "react"
import logoImg from "../../assets/logo.svg"
import styles from "./style.module.scss"

export function MessageList() {
  return (
    <div className={styles.messageBoxWrapper}>
      <img src={logoImg} alt="Logo NWL Heat" />

      <ul className={styles.messageList}>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamoo pra cima!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/felippepg.png" alt="Usuario" />
            </div>
            <span>Felippe Pires</span>
          </div>
        </li>
        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamoo pra cima!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/felippepg.png" alt="Usuario" />
            </div>
            <span>Felippe Pires</span>
          </div>
        </li>
        
        <li className={styles.message}>
          <p className={styles.messageContent}>Não vejo a hora de começar esse evento, com certeza vai ser o melhor de todos os tempos, vamoo pra cima!</p>
          <div className={styles.messageUser}>
            <div className={styles.userImage}>
              <img src="https://github.com/felippepg.png" alt="Usuario" />
            </div>
            <span>Felippe Pires</span>
          </div>
        </li>
      </ul>
    </div>
  )
}
