import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getOrganizationById,
  getOrganizationCampaignsById,
} from "../../redux/Slices/organizationsSlice";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Stack,
  Typography,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

const AdminOrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedOrg: org,
    loading,
    error,
    organizationCampaigns,
  } = useSelector((state) => state.organizations);

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

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Button
        variant="outlined"
        onClick={() => navigate("/admin/main")}
        sx={{ mb: 3 }}
      >
        العودة إلى جميع المؤسسات
      </Button>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4}>
            <CardMedia
              component="img"
              image={org.profile_image || "/images/avatar-placeholder.png"}
              alt={org.name}
              sx={{ width: "100%", height: 200, objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {org.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {org.description || "لا يوجد وصف متاح"}
              </Typography>
              <Stack direction="row" spacing={1} mt={1} flexWrap="wrap">
                <Chip
                  label={org.is_approved ? "معتمد" : "غير معتمد"}
                  color={org.is_approved ? "success" : "warning"}
                />
                <Chip
                  label={`رقم الهوية: ${org.identification_number}`}
                  variant="outlined"
                />
                <Chip label={`الهاتف: ${org.phone}`} variant="outlined" />
              </Stack>
              <Typography variant="body2" color="text.secondary" mt={2}>
                البريد الإلكتروني: {org.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                تم الإنشاء في: {new Date(org.created_at).toLocaleDateString()}
              </Typography>
              <br />
              <Typography variant="caption" color="text.secondary">
                آخر تحديث: {new Date(org.updated_at).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Grid>
        </Grid>
      </Box>

      <Box>
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
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  alignItems: "center",
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
                    width: { xs: "100%", sm: 120 },
                    height: 120,
                    objectFit: "cover",
                    borderRadius: 2,
                    mr: { sm: 2, xs: 0 },
                    mb: { xs: 1, sm: 0 },
                    backgroundColor: "#f0f0f0",
                  }}
                />

                {/* Campaign Info */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {campaign.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {campaign.description || "لا يوجد وصف"}
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
