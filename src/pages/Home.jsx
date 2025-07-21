import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase/supabaseClient'

const Home = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from('users').select('*')
      console.log("Data:", data)
      console.log("Error:", error)
      if (error) console.error(error)
      else setData(data)
    }

    fetchData()
  }, [])

    const handleLogout = async () => {
      const { error } = await supabase.auth.signOut()

      if (error) {
        console.error('Logout error:', error.message)
      } else {
        console.log('Logged out successfully')
     
      }
    }
  
  const addUser = async () => {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email: 'amera2@gmail.com',
          name: 'amira',
          password_hash: "12345",
          user_type: 'donor'
        }
      ])

    if (error) {
      console.error('Insert error:', error)
    } else {
      console.log('Inserted data:', data)
    }
  }
  
  const signUpUser = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: 'amera@gmail.com',
      password: '123456'
    })

    if (error) {
      console.error('Signup error:', error.message)
    } else {
      console.log('Signup successful:', data)
    }
  }
  
  return (
    <>
      <h1>
        Home page
      </h1>

      <div>
        <h1>Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <button onClick={signUpUser}>Sign Up</button>
      <button onClick={addUser}>Add user</button>
      <button onClick={handleLogout}>
        Logout
      </button>
    </>
  )
}

export default Home
