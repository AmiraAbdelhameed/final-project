import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { getCampaignById } from '../../redux/Slices/campaignsSlice';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const CampaignsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCampaign: campaign, loading, error } = useSelector((state) => state.campaigns);
  const [mainImage, setMainImage] = useState(campaign?.cover_image)

  useEffect(() => {
    dispatch(getCampaignById(id));
  }, [id, dispatch ]);
  useEffect(() => {
    if (campaign?.cover_image) {
      setMainImage(campaign.cover_image);
    }
  }, [campaign]);
  if (loading) return <Typography>جارٍ التحميل...</Typography>;
  if (error) return <Typography color="error">حدث خطأ: {error}</Typography>;
  if (!campaign) return <Typography>لم يتم العثور على المشروع.</Typography>;

  return (
    <>
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Grid container spacing={3} alignItems="start" sx={{ position: 'relative', display: "flex", flexDirection: "column" }} >

          {/* Campaign images */}
          <Grid item size={{ xs: 12, sm: 8 }} >
            <Box component={"img"} src={mainImage} sx={{
              width:"100%",
              height:400,
              objectFit:'cover'
            }} />
            <Button onClick={() => navigate('/admin/main/campaigns')} sx={{ mb: 3, position: "absolute", top: 0, left: 0 }}>
              <Typography>العوده الي جميع المشاريع</Typography>  <ArrowBackIosIcon sx={{ color: 'primary.main' }} />
            </Button>
            <Box  size={12}>

            {campaign.campaign_images.map((img, idx) => (
              <Box
              key={idx}
              component="img"
              src={img}
              alt={`campaign-img-${idx}`}
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 1,
                ml:1
              }}
              onClick={()=>{setMainImage(img)}}
              />
            ))}
            <Box
              component="img"
              src={campaign.cover_image}
              alt={``}
              sx={{
                width: 100,
                height: 100,
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 1,
              }}
                onClick={() => { setMainImage(campaign.cover_image) }}
              />
              </Box>
          </Grid>
          {/* campaign details */}
          <Grid container spacing={2}>
            <Grid item sm={6}>
              <Typography variant="h5" fontWeight="bold" >
                {campaign.name}
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={2}>
                {campaign.description || 'لا يوجد وصف'}
              </Typography>
            </Grid>
            <Grid item size={{xs:12,sm:6}}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">نوع المشروع: {campaign.type}</Typography>
                <Typography variant="subtitle2">تاريخ البداية: {campaign.start_date}</Typography>
                <Typography variant="subtitle2">تاريخ النهاية: {campaign.end_date}</Typography>
                <Typography variant="subtitle2">معرّف المؤسسة: {campaign.organization_id}</Typography>
                <Typography variant="subtitle2">تم الإنشاء: {new Date(campaign.created_at).toLocaleString()}</Typography>
              </Stack>
            </Grid>
            <Divider sx={{ mx: 4, border: 1 }}  />
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                {campaign.current_volunteers && (<Typography variant="subtitle2">عدد المتطوعين الحالي: {campaign.current_volunteers}</Typography>)}
                <Typography variant="subtitle2">العدد المستهدف للمتطوعين: {campaign.goal_volunteers}</Typography>
                {campaign.current_amount && (<Typography variant="subtitle2">المبلغ الحالي: {campaign.current_amount} ج.م</Typography>)}
                <Typography variant="subtitle2">المبلغ المستهدف: {campaign.goal_amount} ج.م</Typography>
                <Chip
                  label={campaign.is_approved ? 'معتمد' : 'غير معتمد'}
                  color={campaign.is_approved ? 'primary' : 'warning'}
                  size="small"
                />
              </Stack>
            </Grid>
          </Grid>
        </Grid>

      </Container>

    </>

  );
};

export default CampaignsDetails;
