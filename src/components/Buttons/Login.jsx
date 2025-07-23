import React from 'react'
import { supabase } from '../../services/supabase/supabaseClient'
import Button from '@mui/material/Button'
const Login = () => {
     const handleLogout = async () => {
          const { error } = await supabase.auth.signOut()
    
          if (error) {
            console.error('Logout error:', error.message)
          } else {
            console.log('Logged out successfully')
         
          }
        }
      
  return (
    <>
          <Button variant="text" color="primary" onClick={handleLogout}>
              Logout   
          </Button> 
         
    </>
  )
}

export default Login
