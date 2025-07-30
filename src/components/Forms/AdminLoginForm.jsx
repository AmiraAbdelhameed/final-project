import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate, NavLink, Outlet, useNavigate } from "react-router";

import {
    Grid,
    Box,
    Typography,
    TextField,
    Button,
    Divider,
    Paper
} from '@mui/material';
import { supabase } from '../../services/supabase/supabaseClient';

const AdminLoginForm = () => {
    const [isAllowed, setIsAllowed] = useState(null); 
    const navigate =useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
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


    };
    useEffect(() => {
        checkAdmin();
    }, []);
    const onSubmit = async (data) => {
        const { email, password } = data;
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert('Sign in failed: ' + error.message);
        } else {
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
                navigate('/')
            } else {
                setIsAllowed(true);
                navigate('/admin/main')
            }
        }
    };

    return (
        <>
            <Grid
                container
                sx={{
                    minHeight: '95vh',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={6}
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        borderRadius: 4,
                        overflow: 'hidden',
                        maxWidth: 1000,
                        width: '100%',
                    }}
                >
     {/* Image Section */}
                <Box
                    component="img"
                    src="images/adminlogin.jpg"
                    alt="Login Visual"
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        width: '50%',
                        objectFit: 'cover',
                    }}
                />
                    <Box
                        maxWidth={400}
                        mx="auto"
                        my="auto"
                        px={4}
                        py={8}
                     
                    >
                        <Typography variant="h5" mb={2} textAlign="center">
                            تسجيل الدخول
                        </Typography>

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <TextField
                                label="البريد الإلكتروني"
                                fullWidth
                                margin="normal"
                                {...register('email', { required: 'البريد مطلوب' })}
                                error={!!errors.email}
                                helperText={errors.email?.message}
                            />

                            <TextField
                                label="كلمة المرور"
                                type="password"
                                fullWidth
                                margin="normal"
                                {...register('password', { required: 'كلمة المرور مطلوبة' })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                                sx={{ mt: 2 }}
                            >
                                تسجيل الدخول
                            </Button>

                        </form>
                    </Box>
                </Paper>
            </Grid>
   
        </>
    );
};

export default AdminLoginForm;

