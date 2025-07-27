import { Box,Button , Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
import React from 'react';
const AdminCard = ({ email, image, name, id, is_approved, identification_number, handleApproval, handleDelete, handleNavigation }) => {

    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: 3,
                p: 2,
                mb: 2,
                background: 'secondary.main',
                maxWidth: 500,
                mx: 'auto'
            }}
        >
            <CardMedia
                component="img"
                image={image || '/images/avatar-placeholder.png'}
                alt={name}
                sx={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    objectFit: 'cover',
                    mr: { sm: 3, xs: 0 },
                    mb: { xs: 2, sm: 0 },
                    boxShadow: 1,
                    background: '#fff'
                }}
            />
            <CardContent sx={{ flex: 1 }}>
                <Typography
                    variant="h6"
                    fontWeight="bold"
                    gutterBottom
                    sx={{ cursor: 'pointer' }}
                    onClick={handleNavigation}
                >
                    {name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    {email}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                    رقم الهوية: {identification_number}
                </Typography>
                <Stack direction="row" spacing={1} mt={1}>
                    <Chip
                        label={is_approved ? "مفعل" : "غير مفعل"}
                        color={is_approved ? "success" : "warning"}
                        size="small"
                    />
                    <Chip label={`ID: ${id}`} variant="outlined" size="small" />
                </Stack>
                <Button
                    variant="outlined"
                    color={is_approved ? 'warning' : 'primary.main'}
                    size="small"
                    onClick={handleApproval}
                    sx={{ mt: 1 }}
                >
                    {is_approved ? 'إلغاء الاعتماد' : 'اعتماد'}
                </Button>
                <Button
                    variant="contained"
                    size="small"
                    onClick={handleDelete}
                    bgcolor="red-500"
                    sx={{ mt: 1 , bgcolor:'red' }}
                >
                    حذف
                </Button>
            </CardContent>
        </Card>
    );
};

export default AdminCard;
