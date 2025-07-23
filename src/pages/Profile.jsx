import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabase/supabaseClient';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser();

            if (userError || !user) {
                console.error("Not logged in or failed to get user:", userError);
                setLoading(false);
                return;
            }

     
            const { data, error } = await supabase
                .from('users') 
                .select('*')
                .eq('id', user.id) 
                .single();

            if (error) {
                console.error('Error fetching user data:', error.message);
            } else {
                setUserData(data);
            }

            setLoading(false);
        };

        fetchUserData();
    }, []);

    return (
        <div>
            <h2>User Profile</h2>
            {loading ? (
                <p>Loading...</p>
            ) : userData ? (
                <pre>{JSON.stringify(userData, null, 2)}</pre>
            ) : (
                <p>No data found for this user.</p>
            )}
        </div>
    );
};

export default Profile;
