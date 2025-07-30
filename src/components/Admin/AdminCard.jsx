import { Box, Button, Card, CardContent, CardMedia, Typography, Chip, Stack } from '@mui/material';
const AdminCard = ({ email, image, name, id, is_approved, identification_number, handleApproval, handleDelete, handleNavigation }) => {
    return (
 
        <Card
            sx={{
                minWidth: 250,
                maxWidth: 300,
                display:"flex",
                flexDirection:'column',
                flex: '1 1 250px',
                justifyContent:"space-between",
                textAlign: 'center',
                borderRadius: 3,
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': {
                    transform: 'scale(1.03)',
                },
             
            }}
        >
            {/* Optional image */}
            <CardMedia
                component="img"
                image={image}
                alt={name}
                sx={{
                    height: 180,
                    objectFit: 'cover',
                    borderTopLeftRadius: 12,
                    borderTopRightRadius: 12,
                }}
                onClick={handleNavigation}
            />

            <CardContent sx={{
         
            }}>
                <Box>

                <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ cursor: 'pointer' }}
                    onClick={handleNavigation}
                >
                    {name}
                </Typography>

        {   email?    ( <Typography color="text.secondary" >
                    الايميل: {email}
                </Typography>):(<Typography></Typography>)}

      { identification_number   ?(      <Typography color="text.secondary">
                    رقم الهوية: {identification_number}
                </Typography>):(<Typography></Typography>)}

                <Typography
                    sx={{
                        color: is_approved ? 'primary.main' : 'danger.main',
                        fontWeight: 'bold',
                        mb: 1,
                    }}
                >
                    {is_approved ? 'مفعل' : 'غير مفعل'}
                </Typography>
                </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: 1,
                        flexWrap: 'wrap',
                        mt: 1,
                    }}
                >
                    <Button
                        variant="outlined"
                        color={is_approved ? 'warning' : 'primary'}
                        size="small"
                        onClick={handleApproval}
                    >
                        {is_approved ? 'إلغاء الاعتماد' : 'اعتماد'}
                    </Button>

                    <Button
                        variant="contained"
                        size="small"
                        onClick={handleDelete}
                        sx={{ bgcolor: 'danger.main', color: '#fff' }}
                    >
                        حذف
                    </Button>
                </Box>
            </CardContent>
        </Card>

    );
};

export default AdminCard;
