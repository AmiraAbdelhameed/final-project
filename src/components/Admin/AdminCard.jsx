import { Box, Button, Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
const AdminCard = ({ email, image, name, id, is_approved, identification_number, handleApproval, handleDelete, handleNavigation }) => {
    return (
        <Card
            sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
                boxShadow: 3,
                borderRadius: 3,
                p: 1,
                mb: 2,
                background: 'secondary.main',
                width: { xs: "100%", md: '70%' },
            }}
        >
            <CardMedia
                component="img"
                image={image}
                alt={name}
                sx={{
                    width: {
                        xs: '100%', sm: '40%'
                    },
                    alignSelf: 'stretch',
                    height: 'auto',
                    objectFit: 'cover',
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
                <Typography  color="text.secondary" gutterBottom>
                    الايميل:{email}
                </Typography>
                <Typography color="text.secondary" gutterBottom>
                    رقم الهوية: {identification_number}
                </Typography>
                <Box sx={{
                    color: is_approved ? "primary.main" : "danger.main" 
                }}
                >
                    {is_approved ? "مفعل" : "غير مفعل"}
                </Box>
                <Box sx={{
                    display:'flex',
                    justifyContent:'space-between'
                }}>

                <Button
                    variant="outlined"
                    color={is_approved ? 'warning' : 'primary'}
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
                    sx={{ mt: 1, bgcolor: 'red' }}
                >
                    حذف
                </Button>
                </Box>

            </CardContent>
        </Card>
    );
};

export default AdminCard;
