import { Box, Grid, Typography, Avatar, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getCampaigns,
  toggleApproval,
} from "../../redux/Slices/campaignsSlice";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function Article() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    data: campaigns = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.campaigns || {});
  let campaign = campaigns[0];
  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  console.log("Campaigns:", campaigns);
  if (loading) return <Box textAlign="center">Loading</Box>;
  if (error)
    return <Typography color="error">حدث خطأ أثناء جلب البيانات</Typography>;
  if (!campaigns || campaigns.length === 0)
    return <Typography>لا توجد مشاريع متاحة</Typography>;
  return (
    <Box p={4}>
      <Grid
        container
        spacing={2}
        alignItems="stretch"
        justifyContent="space-between"
        direction={{ xs: "column-reverse", sm: "row" }}
      >
        {/* Right side content */}
        <Grid
          xs={12}
          sm={5.8}
          sx={{
            textAlign: "right",
            flex: 1,
            height: "100%",
            p: 2,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Typography variant="h5" mb={2}>
            أحدث المشاريع
          </Typography>
          <Typography py={4}>
            <strong>{campaign.name}</strong>{" "}
          </Typography>
          <Typography> {campaign.description || "لا يوجد وصف"}</Typography>
          <Button
            variant="contained"
            sx={{
              width: "50%",
              my: 4,
            }}
            onClick={() => navigate(`/campaigns/${campaign.id}`)}
          >
            تبرع الان
          </Button>
        </Grid>

        {/* Left side image */}
        <Grid
          xs={12}
          sm={5.8}
          sx={{
            flex: 1,
            height: "100%",
            borderRadius: 2,
            p: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {campaign.cover_image ? (
            <img
              src={campaign.cover_image}
              alt={campaign.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          ) : (
            <img
              src="./images/project.png"
              alt={campaign.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
