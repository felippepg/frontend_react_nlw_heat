import React, { useContext } from "react"
import styles from "./style.module.scss"
import { VscGithubInverted } from "react-icons/vsc"
import { AuthContext } from "../../context/auth"

export function LoginBox() {
  const { signInUrl, user } = useContext(AuthContext)
  console.log(user)
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Envie e Compartilhe a sua Mensagem</strong>
      <a className={styles.loginWithGithub}href={signInUrl}>
        <VscGithubInverted size="24"/>
        Entrar com o Github
      </a>
    </div>
  )
}