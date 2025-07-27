import React from 'react';
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

const Login = () => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const onSubmit = async (data) => {
        const { email, password } = data;
        const { error } = await supabase.auth.signInWithPassword({ email, password });

        if (error) {
            alert('Sign in failed: ' + error.message);
        } else {
            alert('Signed in successfully!');
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
                    src="images/login.png"
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
                        p={4}
                     
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
                            <Typography sx={{ textAlign: 'center' }}>ليس لديك حساب <Typography sx={{textDecoration:'none'}} component={NavLink} to={'/signup'}>انشئ حساب </Typography></Typography>

                        </form>
                    </Box>
                </Paper>
            </Grid>
   
        </>
    );
};

export default Login;

