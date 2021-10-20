import React from "react"
import styles from "./style.module.scss"
import { VscGithubInverted } from "react-icons/vsc"
export function LoginBox() {
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Envie e Compartilhe a sua Mensagem</strong>
      <a className={styles.loginWithGithub}href="#">
        <VscGithubInverted size="24"/>
        Entrar com o Github
      </a>
    </div>
  )
}