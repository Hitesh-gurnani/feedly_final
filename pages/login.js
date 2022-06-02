import { useState } from 'react'
import Link from 'next/link'
import { auth } from '../firebase'
export default function login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const result = await auth.signInWithEmailAndPassword(email, password)
      M.toast({ html: `welcome back to feedly ${email} `, classes: "green" })


    } catch (err) {
      M.toast({ html: err.message, classes: "red" })
    }

  }


  return (
    <div className="container center">
      <h2 style={{ color: 'white', fontFamily: 'sans-serif' }}><b>SIGN-IN PAGE</b></h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="input-field">
          <input type="email" style={{ color: 'white' }} placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" style={{ color: 'white' }} placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <a><button type="submit" className="btn #fb8c00 orange darken-1" >Login</button></a>
        <Link href="/signup" style={{ color: 'white' }}><a><h6 style={{ color: 'white' }} >Don't Have a account?</h6></a></Link>
      </form>

    </div>
  )
}
