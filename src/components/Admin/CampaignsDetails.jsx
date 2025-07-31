import React, { useEffect } from 'react';
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
  Divider,
  Grid,
  Stack,
  Typography
} from '@mui/material';

const CampaignsDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCampaign: campaign, loading, error } = useSelector((state) => state.campaigns);

  useEffect(() => {
    dispatch(getCampaignById(id));
  }, [id, dispatch]);

  if (loading) return <Typography>جارٍ التحميل...</Typography>;
  if (error) return <Typography color="error">حدث خطأ: {error}</Typography>;
  if (!campaign) return <Typography>لم يتم العثور على المشروع.</Typography>;

  return (
    <Box sx={{ px: { xs: 2, sm: 5 }, py: 3 }}>
      <Button onClick={() => navigate('/admin/main/campaigns')} sx={{ mb: 2 }}>
        العودة إلى جميع المشاريع
      </Button>

      <Card sx={{ boxShadow: 3, borderRadius: 3, overflow: 'hidden' }}>
        {campaign.cover_image && (
          <CardMedia
            component="img"
            image={campaign.cover_image}
            alt={campaign.name}
            sx={{ height: 300, objectFit: 'cover' }}
          />
        )}

        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {campaign.name}
          </Typography>

          <Typography variant="body1" color="text.secondary" mb={2}>
            {campaign.description || 'لا يوجد وصف'}
          </Typography>

          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">نوع المشروع: {campaign.type}</Typography>
                <Typography variant="subtitle2">تاريخ البداية: {campaign.start_date}</Typography>
                <Typography variant="subtitle2">تاريخ النهاية: {campaign.end_date}</Typography>
                <Typography variant="subtitle2">معرّف المؤسسة: {campaign.organization_id}</Typography>
                <Typography variant="subtitle2">تم الإنشاء: {new Date(campaign.created_at).toLocaleString()}</Typography>
              </Stack>
            </Grid>
            <Divider sx={{ mx: 4, border: 1 }} />
            <Grid xs={12} sm={6}>
              <Stack spacing={1}>
                <Typography variant="subtitle2">عدد المتطوعين الحالي: {campaign.current_volunteers}</Typography>
                <Typography variant="subtitle2">العدد المستهدف للمتطوعين: {campaign.goal_volunteers}</Typography>
                <Typography variant="subtitle2">المبلغ الحالي: {campaign.current_amount} ج.م</Typography>
                <Typography variant="subtitle2">المبلغ المستهدف: {campaign.goal_amount} ج.م</Typography>
                <Chip
                  label={campaign.is_approved ? 'معتمد' : 'غير معتمد'}
                  color={campaign.is_approved ? 'success' : 'warning'}
                  size="small"
                />
              </Stack>
            </Grid>
          </Grid>

          {campaign.campaign_images?.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                صور المشروع
              </Typography>
              <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
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
                    }}
                  />
                ))}
              </Stack>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default CampaignsDetails;
