import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCampaigns } from "../redux/Slices/campaignsSlice";
import {
  Paper,
  Typography,
  Chip,
  Box,
  CircularProgress,
  Alert,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";

const FALLBACK_IMAGE = "/default-image.png";

const Campaigns = () => {
  const dispatch = useDispatch();
  const {
    data: campaigns,
    loading,
    error,
  } = useSelector((state) => state.campaigns);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  // Filter for approved campaigns only
  const approvedCampaigns = (campaigns || []).filter((c) =>
    [true, "TRUE", 1].includes(c.is_approved)
  );

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        direction: "rtl",
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          width: "100%",
          py: 6,
          mb: 4,
          background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
          color: "white",
          textAlign: "center",
          borderRadius: 0,
          boxShadow: 2,
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          sx={{
            mb: 1,
            letterSpacing: 1,
            fontFamily: "Tajawal, Arial, sans-serif",
          }}
        >
          المشاريع
        </Typography>
        <Typography
          variant="h6"
          sx={{ opacity: 0.85, fontFamily: "Tajawal, Arial, sans-serif" }}
        >
          استكشف أحدث حملات التبرع والتطوع
        </Typography>
      </Box>
      {/* Content Section */}
      <Box sx={{ px: { xs: 1, sm: 3 }, maxWidth: 1000, mx: "auto" }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">خطأ في تحميل المشاريع: {error}</Alert>
        ) : approvedCampaigns.length === 0 ? (
          <Typography align="center">لا توجد مشاريع معتمدة حالياً.</Typography>
        ) : (
          <Stack spacing={3}>
            {approvedCampaigns.map((campaign) => (
              <Paper
                key={campaign.id}
                elevation={3}
                component={Link}
                to={`/campaigns/${campaign.id}`}
                sx={{
                  p: { xs: 2, sm: 3 },
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  alignItems: { xs: "flex-start", md: "center" },
                  gap: 3,
                  borderRadius: 4,
                  boxShadow: 4,
                  transition: "box-shadow 0.2s, background 0.2s",
                  "&:hover": {
                    boxShadow: 8,
                    background: theme.palette.action.hover,
                  },
                  bgcolor: theme.palette.background.paper,
                  textDecoration: "none",
                  cursor: "pointer",
                }}
              >
                {/* Image */}
                <Box
                  sx={{
                    width: { xs: "100%", md: 180 },
                    height: { xs: 180, md: 180 },
                    flexShrink: 0,
                    borderRadius: 2,
                    overflow: "hidden",
                    mb: { xs: 2, md: 0 },
                    alignSelf: { xs: "center", md: "flex-start" },
                  }}
                >
                  <img
                    src={campaign.cover_image || FALLBACK_IMAGE}
                    alt={campaign.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                    onError={(e) => {
                      e.target.src = FALLBACK_IMAGE;
                    }}
                  />
                </Box>
                {/* Info */}
                <Box sx={{ flex: 1, textAlign: "right" }}>
                  <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ fontFamily: "Tajawal, Arial, sans-serif" }}
                    >
                      {campaign.name}
                    </Typography>
                    <Chip
                      label={campaign.type === "money" ? "تبرع مالي" : "تطوع"}
                      color={
                        campaign.type === "money" ? "primary" : "secondary"
                      }
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                    {campaign.is_approved && (
                      <Chip label="معتمدة" color="success" size="small" />
                    )}
                  </Stack>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      fontFamily: "Tajawal, Arial, sans-serif",
                      whiteSpace: "pre-line",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {campaign.description}
                  </Typography>
                </Box>
              </Paper>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Campaigns;
