import React from 'react'
import { supabase } from '../services/supabase/supabaseClient';

const Home = () => {
  
  const signInUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      // email: 'test122@gmail.com',
      email: 'admin@gmail.com',
      password: '12345678'
    });

    if (error) {
      console.error('Sign-in error:', error.message);
    } else {
      console.log('Sign-in successful:', data);
    }
  };

  return (
    <>
      <button onClick={signInUser}>sign in</button>
    </>
  )
}

export default Home
