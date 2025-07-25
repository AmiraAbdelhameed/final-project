import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../../services/supabase/supabaseClient';

const ProtectedAdminRoute = ({ children }) => {
    const [isAllowed, setIsAllowed] = useState(null); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAdmin = async () => {
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();
            if (!session || sessionError) {
                setIsAllowed(false);
                setLoading(false);
                return;
            }

            const userId = session.user.id;
            const { data, error } = await supabase
                .from('users') 
                .select('user_type')
                .eq('user_id', userId)
                .single();

            if (error || !data || data.user_type !== 'admin') {
                setIsAllowed(false);
            } else {
                setIsAllowed(true);
            }

            setLoading(false);
        };

        checkAdmin();
    }, []);

    if (loading) return <div>Loading...</div>;

    return isAllowed ? children : <Navigate to="/" replace />;
};

export default ProtectedAdminRoute;
