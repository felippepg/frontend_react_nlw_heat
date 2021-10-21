import React, { useEffect, useState } from "react";
import { createContext, ReactNode } from "react";
import { api } from "../services/api";
type User = {
  name: string
  login: string
  avatar_url: string
  id: string
}

type AuthContextData = {
  user: User | null
  signInUrl: string
  signOut: () => void
}
export const AuthContext = createContext({} as AuthContextData)

interface IAuthProvider {
  children: ReactNode //qualquer componente React
}

interface IAuthResponse {
  token: string
  user: {
    name: string
    login: string
    avatar_url: string
    id: string
  }
}

//tudo o que estiver dentro do componente vai possuir acesso ao conteúdo de AuthContext
export function AuthProvider(props: IAuthProvider) {
  const [user, setUser] = useState<User | null>(null)

  async function signIn(githubCode: string) {
    const response = await api.post<IAuthResponse>('/auth', {
      code: githubCode
    });

    const { token, user } = response.data

    localStorage.setItem("nlw_heat_token", token)
    setUser(user)
  }
  
  function signOut() {
    setUser(null)
    localStorage.removeItem("nlw_heat_token")
  }
  useEffect(() => {
    const token = localStorage.getItem("nlw_heat_token")
    if(token) {
      api.defaults.headers.common.authorization = `Bearer ${token}` //adicionar o token no cabeçalho da requisição

      api.get<User>('/user').then(response => {
        setUser(response.data)
      })
    }
  }, [])

  useEffect(() => {
    const url = window.location.href     //pegar a url da página
    const urlWithCode = url.includes("?code=")     //verificar se a url possui o código do github

    if(urlWithCode) {
      const [urlWithoutcode, codeUrl] = url.split("?code=")    //armazenando o código da url numa variavel
      window.history.pushState({}, '', urlWithoutcode)       //removendo o código da url
      console.log(urlWithoutcode, codeUrl)

      signIn(codeUrl)

    }

  }, [])

  const signInUrl = "http://localhost:4000/github"

  return (
    <AuthContext.Provider value={{signInUrl, user, signOut}}>
      {props.children}
    </AuthContext.Provider>
  )
}