import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { disapproveCampaign, getCampaignById, toggleApproval } from '../../redux/Slices/campaignsSlice';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
  Modal,
  TextField,

} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
const CampaignsDetails = () => {
  const [openModal, setOpenModal] = useState(false);
  const [disapprovalReason, setDisapprovalReason] = useState("")
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedCampaign: campaign, loading, error } = useSelector((state) => state.campaigns);
  const [mainImage, setMainImage] = useState(campaign?.cover_image)

  useEffect(() => {
    dispatch(getCampaignById(id));
  }, [id, dispatch]);
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
      <Container maxWidth="md" sx={{ my: 8 }}>
        <Grid container spacing={4} alignItems="start" sx={{ position: 'relative', display: "flex", flexDirection: "row" }} >

          {/* Campaign images */}
          <Grid item size={{ xs: 12, sm: 6 }} >
            <Box component={"img"} src={mainImage} sx={{
              width: "100%",
              height: 400,
              objectFit: 'cover'
            }} />
            <Button onClick={() => navigate('/admin/main/campaigns')} sx={{ mb: 3, position: "absolute", top: -50, right: 0 }}>
              <ArrowForwardIosIcon sx={{ color: 'primary.main' }} />
            </Button>
            <Box size={12}>

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
                    ml: 1
                  }}
                  onClick={() => { setMainImage(img) }}
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
          <Grid item spacing={2} size={{ xs: 12, sm: 6 }} >
            <Grid item >
              <Typography variant="h5" fontWeight="bold" >
                {campaign.name}
              </Typography>

              <Typography variant="body1" color="text.secondary" mb={2}>
                {campaign.description || 'لا يوجد وصف'}
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2" mt={2} color="text.secondary">
                حاله الاعتماد :<Typography variant='span' color={campaign.is_approved ? "primary.main" : 'danger.main'}> {campaign.is_approved ? 'معتمده' : "غير معتمده"}</Typography>
              </Typography>
              <Stack spacing={1}>
                <Typography variant="subtitle2">
                  نوع المشروع: {campaign.type}
                </Typography>
                <Typography variant="subtitle2">
                  تاريخ البداية: {new Date(campaign.start_date).toLocaleDateString('ar-EG')}
                </Typography>
                <Typography variant="subtitle2">
                  تاريخ النهاية: {new Date(campaign.end_date).toLocaleDateString('ar-EG')}
                </Typography>
                <Typography variant="subtitle2">
                  معرّف المؤسسة: {campaign.organization_id}
                </Typography>
                <Typography variant="subtitle2">
                  تم الإنشاء: {new Date(campaign.created_at).toLocaleString('ar-EG')}
                </Typography>
              </Stack>
            </Grid>

            <Grid item >
              <Box spacing={1}>
                {campaign.current_volunteers ? (<Typography variant="subtitle2">عدد المتطوعين الحالي: {campaign.current_volunteers}</Typography>) : (<Typography></Typography>)}
                {campaign.goal_volunteers ? (<Typography variant="subtitle2">العدد المستهدف للمتطوعين: {campaign.goal_volunteers}</Typography>) : (<Typography></Typography>)}
                {campaign.current_amount ? (<Typography variant="subtitle2">المبلغ الحالي: {campaign.current_amount} ج.م</Typography>) : (<Typography></Typography>)}
                {campaign.goal_amount ? (<Typography variant="subtitle2">المبلغ المستهدف: {campaign.goal_amount} ج.م</Typography>) : (<Typography></Typography>)}

                <Button
                  variant="outlined"
                  color={campaign.is_approved ? 'warning' : 'primary'}
                  sx={{ width: "50%" }}
                  onClick={() => {
                    if (campaign.is_approved) {
                      setOpenModal(true);
                    } else {
                      dispatch(toggleApproval({ id: campaign.id, currentStatus: campaign.is_approved }));
                    }
                  }}
                >
                  {campaign.is_approved ? "إلغاء الاعتماد" : "اعتماد"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>

      </Container>
      {/* Modal  */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          p: 4, borderRadius: 2, width: 400
        }}>
          <Typography variant="h6" mb={2}>سبب عدم الاعتماد</Typography>
          <TextField
            fullWidth
            label="السبب"
            multiline
            rows={4}
            value={disapprovalReason}
            onChange={(e) => setDisapprovalReason(e.target.value)}
          />

          <Button onClick={() => setOpenModal(false)}>إلغاء</Button>
          <Button
            onClick={() => {
              dispatch(disapproveCampaign({ id: campaign.id, reason: disapprovalReason }));
              setOpenModal(false);
              setDisapprovalReason('');
            }}
          >
            حفظ
          </Button>
        </Box>
      </Modal>


    </>

  );
};

export default CampaignsDetails;
