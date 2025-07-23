import React from 'react'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase/supabaseClient'
import Organizations from '../components/Home/Organizations'
import Login from '../components/Buttons/Login'

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


  const addUser = async () => {
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email: 'ameraa@gmail.com',
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

  const addOrg = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Failed to get user:", userError.message);
      return;
    }

    const userId = userData?.user?.id;
    console.log("User ID:", userId);

    if (!userId) {
      console.error("User ID is undefined — make sure you're logged in.");
      return;
    }

    const { data, error } = await supabase
      .from('organizations')
      .insert([
        {
          email: 'org2@gmail.com',
          name: 'Org12',
          identification_number: "12345",
          is_approved: true,
        }
      ]);

    if (error) {
      console.error('Insert error:', error);
    } else {
      console.log('Inserted data:', data);
    }
  };


  const signInUser = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      // email: 'test122@gmail.com',
      email: 'amera@gmail.com',
      password: '123456'
    });

    if (error) {
      console.error('Sign-in error:', error.message);
    } else {
      console.log('Sign-in successful:', data);
    }
  };

  return (
    <>
      <h1>
        Home page
      </h1>

      <div>
        <h1>Data</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
      <button onClick={signInUser}>Sign in</button>
      <button onClick={addUser}>Add user</button>
      <button onClick={addOrg}>addOrg</button>
      <Login />
      <Organizations />
    </>
  )
}

export default Home
