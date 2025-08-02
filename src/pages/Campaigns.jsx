import React, { useEffect, useState } from "react";
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
  Tabs,
  Tab,
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
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    dispatch(getCampaigns());
  }, [dispatch]);

  // Filter for approved campaigns only
  const approvedCampaigns = (campaigns || []).filter((c) =>
    [true, "TRUE", 1].includes(c.is_approved)
  );

  // Filter campaigns based on active tab
  const getFilteredCampaigns = () => {
    switch (activeTab) {
      case 0: // All campaigns
        return approvedCampaigns;
      case 1: // Completed campaigns
        return approvedCampaigns.filter((campaign) => {
          const isCompleted =
            campaign.is_completed ||
            (campaign.goal_amount &&
              campaign.current_amount &&
              campaign.current_amount >= campaign.goal_amount);
          return isCompleted;
        });
      case 2: // Not completed campaigns
        return approvedCampaigns.filter((campaign) => {
          const isCompleted =
            campaign.is_completed ||
            (campaign.goal_amount &&
              campaign.current_amount &&
              campaign.current_amount >= campaign.goal_amount);
          return !isCompleted;
        });
      default:
        return approvedCampaigns;
    }
  };

  const filteredCampaigns = getFilteredCampaigns();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

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
        {/* Tabs Filter */}
        <Box sx={{ mb: 4 }}>
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              bgcolor: theme.palette.background.paper,
              borderRadius: 2,
              boxShadow: 2,
              "& .MuiTab-root": {
                fontFamily: "Tajawal, Arial, sans-serif",
                fontWeight: "bold",
                fontSize: "1rem",
                textTransform: "none",
                minHeight: 56,
              },
              "& .Mui-selected": {
                color: theme.palette.primary.main,
              },
              "& .MuiTabs-indicator": {
                backgroundColor: theme.palette.primary.main,
                height: 3,
              },
            }}
          >
            <Tab
              label={`جميع المشاريع (${approvedCampaigns.length})`}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
            <Tab
              label={`المشاريع المكتملة (${
                approvedCampaigns.filter((campaign) => {
                  const isCompleted =
                    campaign.is_completed ||
                    (campaign.goal_amount &&
                      campaign.current_amount &&
                      campaign.current_amount >= campaign.goal_amount);
                  return isCompleted;
                }).length
              })`}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
            <Tab
              label={`المشاريع النشطة (${
                approvedCampaigns.filter((campaign) => {
                  const isCompleted =
                    campaign.is_completed ||
                    (campaign.goal_amount &&
                      campaign.current_amount &&
                      campaign.current_amount >= campaign.goal_amount);
                  return !isCompleted;
                }).length
              })`}
              sx={{
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            />
          </Tabs>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">خطأ في تحميل المشاريع: {error}</Alert>
        ) : filteredCampaigns.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              {activeTab === 0 && "لا توجد مشاريع معتمدة حالياً."}
              {activeTab === 1 && "لا توجد مشاريع مكتملة حالياً."}
              {activeTab === 2 && "لا توجد مشاريع نشطة حالياً."}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {activeTab === 0 && "تحقق لاحقاً من المشاريع الجديدة."}
              {activeTab === 1 && "جميع المشاريع المكتملة ستظهر هنا."}
              {activeTab === 2 && "المشاريع النشطة ستظهر هنا."}
            </Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {filteredCampaigns.map((campaign) => (
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
                    {(campaign.is_completed ||
                      (campaign.goal_amount &&
                        campaign.current_amount &&
                        campaign.current_amount >= campaign.goal_amount)) && (
                      <Chip label="مكتمل" color="warning" size="small" />
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
