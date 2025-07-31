import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getOrganizationById, getOrganizationCampaignsById , toggleApproval } from '../../redux/Slices/organizationsSlice';
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,

} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
const AdminOrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const { selectedOrg: org, loading, error, organizationCampaigns } = useSelector((state) => state.organizations);


  useEffect(() => {
    dispatch(getOrganizationById(id));
    dispatch(getOrganizationCampaignsById(id));
  }, [id, dispatch]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">حدث خطأ: {error}</Typography>;
  if (!org) return <Typography>لم يتم العثور على المؤسسة.</Typography>;
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) return <Typography color="error">حدث خطأ: {error}</Typography>;
  if (!org) return <Typography>لم يتم العثور على المؤسسة.</Typography>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>

 

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="start" sx={{ position: 'relative', display:"flex" , flexDirection:"column" }} >
          <Grid item xs={12} sm={6} >
            <Box
              component="img"
              src={org.profile_image }
              alt={org.name}
              sx={{ width: '100%', height: 200, objectFit: 'cover', }}
            />

            <Button onClick={() => navigate('/admin/main')} sx={{ mb: 3,position:"absolute",top:0, left:0 }}>
            <Typography>العوده الي جميع المؤسسات</Typography>  <ArrowBackIosIcon sx={{ color: 'primary.main' }} />
            </Button>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Box >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {org.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {org.description || 'لا يوجد وصف متاح'}
              </Typography>
              <Typography variant="body2" mt={2} color="text.secondary">
                حاله الاعتماد :<Typography variant='span'  color={org.is_approved ? "primary.main" : 'danger.main'}> {org.is_approved ? 'معتمده' : "غير معتمده"}</Typography>
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                رقم الهويه : {org.identification_number}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                رقم الهاتف : {org.phone}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                البريد الإلكتروني: {org.email}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                تم الإنشاء في: {new Date(org.created_at).toLocaleDateString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={2}>
                آخر تحديث: {new Date(org.updated_at).toLocaleDateString()}
              </Typography>
              <Button variant='outlined' color={org.is_approved ? 'warning' : 'primary'} onClick={()=> dispatch(toggleApproval({ id: org.id, currentStatus: org.is_approved }))}>
                {org.is_approved ? 'إلغاء الاعتماد' : 'اعتماد'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{my:4}}>
        <Typography variant="h6" gutterBottom>
          المشاريع التابعة
        </Typography>

        {organizationCampaigns.length === 0 ? (
          <Typography>لا توجد مشاريع مرتبطة بهذه المؤسسة.</Typography>
        ) : (
          <Stack spacing={2}>
            {organizationCampaigns.map((campaign) => (
              <Card
                key={campaign.id}
                sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  p: 2,
                  boxShadow: 2,
                  borderRadius: 2,
                }}
              >
                {/* Campaign Image */}
                <Box
                  component="img"
                  src={campaign.cover_image || "/images/placeholder.png"}
                  alt={campaign.name}
                  sx={{
                    width: { xs: '100%', sm: 120 },
                    height: 120,
                    objectFit: 'cover',
                    borderRadius: 2,
                    mx: { sm: 2, xs: 0 },
                    mb: { xs: 1, sm: 0 },
                    backgroundColor: '#f0f0f0'
                  }}
                />

                {/* Campaign Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold" sx={{cursor:"pointer"}} onClick={() => navigate(`/admin/campaigns/${campaign.id}`)}>
                    {campaign.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {campaign.description || 'لا يوجد وصف'}
                  </Typography>
                </Box>
              </Card>
            ))}
          </Stack>

        )}
      </Box>
    </Container>
  );
};

export default AdminOrganizationDetails;

