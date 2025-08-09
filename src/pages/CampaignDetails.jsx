import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCampaigns } from "../redux/Slices/campaignsSlice";
import { makePayment, clearPaymentState } from "../redux/Slices/paymentSlice";
import {
  Box,
  Typography,
  Chip,
  CircularProgress,
  Stack,
  Paper,
  Grid,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  LinearProgress,
  Avatar,
  Badge,
  Fade,
  Zoom,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
  PhotoLibrary,
  Flag,
  TrendingUp,
  ArrowBack,
  Campaign,
  AttachMoney,
  Group,
  CheckCircle,
  ZoomIn,
  Close,
  NavigateNext,
  NavigateBefore,
  Description,
  Info,
  Build,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/campaignDetalis";

const FALLBACK_IMAGE = "/default-image.png";

const CampaignDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { data: campaigns, loading } = useSelector((state) => state.campaigns);
  const {
    loading: paymentLoading,
    error: paymentError,
    data: paymentResponse,
  } = useSelector((state) => state.payment);
  const [donationAmount, setDonationAmount] = useState(100);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imageGalleryOpen, setImageGalleryOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const theme = useTheme();

  useEffect(() => {
    if (!campaigns || campaigns.length === 0) {
      dispatch(getCampaigns());
    }
  }, [dispatch, campaigns]);

  useEffect(() => {
    return () => {
      dispatch(clearPaymentState());
    };
  }, [dispatch]);

  useEffect(() => {
    const originalOpen = window.open;
    window.open = function (url, target, features) {
      if (url) {
        window.location.replace(url);
        return null;
      }
      return originalOpen.call(this, url, target, features);
    };

    return () => {
      window.open = originalOpen;
    };
  }, []);

  const campaign = (campaigns || []).find((c) => String(c.id) === String(id));

  const handleDonation = useCallback(() => {
    if (campaign && donationAmount > 0) {
      dispatch(
        makePayment({
          campaign_id: campaign.id,
          amount: donationAmount,
        })
      );
    }
  }, [campaign, donationAmount, dispatch]);

  useEffect(() => {
    if (paymentResponse?.iframe_url) {
      window.location.replace(paymentResponse.iframe_url);
      dispatch(clearPaymentState());
    } else if (paymentError) {
      setShowPaymentModal(true);
    }
  }, [paymentResponse, paymentError, dispatch]);

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    dispatch(clearPaymentState());
  };

  const handleCloseGallery = () => {
    setImageGalleryOpen(false);
    setSelectedImage(null);
  };

  const handleNextImage = () => {
    const allImages = [
      campaign?.cover_image,
      ...(campaign?.campaign_images || []),
    ];
    const nextIndex = (currentImageIndex + 1) % allImages.length;
    setCurrentImageIndex(nextIndex);
    setSelectedImage(allImages[nextIndex]);
  };

  const handlePrevImage = () => {
    const allImages = [
      campaign?.cover_image,
      ...(campaign?.campaign_images || []),
    ];
    const prevIndex =
      currentImageIndex === 0 ? allImages.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(prevIndex);
    setSelectedImage(allImages[prevIndex]);
  };

  const getAllImages = () => {
    const images = [];
    if (campaign?.cover_image) images.push(campaign.cover_image);
    if (campaign?.campaign_images && Array.isArray(campaign.campaign_images)) {
      images.push(...campaign.campaign_images);
    }
    return images;
  };

  if (loading || !campaign) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
          background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.secondary.main}15 100%)`,
        }}
      >
        <Fade in={true} timeout={1000}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress
              sx={{
                color: theme.palette.primary.main,
                width: 80,
                height: 80,
                mb: 2,
              }}
            />
            <Typography variant="h6" color="text.secondary">
              جاري تحميل تفاصيل الحملة...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: "100vh",
        direction: "rtl",
        py: 6,
        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, ${theme.palette.secondary.main}08 100%)`,
      }}
    >
      {/* Header with back button */}
      <Header />

      {/* Image Gallery Modal */}
      {/* <Dialog
        open={imageGalleryOpen}
        onClose={handleCloseGallery}
        maxWidth="lg"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: "rgba(0,0,0,0.95)",
            border: "none",
            boxShadow: "none",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            p: 2,
          }}
        >
          <IconButton
            onClick={handleCloseGallery}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              zIndex: 10,
            }}
            aria-label="إغلاق معرض الصور"
          >
            <Close />
          </IconButton>
          <IconButton
            onClick={handlePrevImage}
            sx={{
              position: "absolute",
              left: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              zIndex: 10,
            }}
            aria-label="الصورة السابقة"
          >
            <NavigateBefore />
          </IconButton>
          <IconButton
            onClick={handleNextImage}
            sx={{
              position: "absolute",
              right: 16,
              top: "50%",
              transform: "translateY(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.5)",
              "&:hover": {
                bgcolor: "rgba(0,0,0,0.7)",
              },
              zIndex: 10,
            }}
            aria-label="الصورة التالية"
          >
            <NavigateNext />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt={`صورة ${currentImageIndex + 1}`}
              style={{
                maxWidth: "100%",
                maxHeight: "80vh",
                objectFit: "contain",
                borderRadius: 8,
              }}
              onError={(e) => {
                e.target.src = FALLBACK_IMAGE;
              }}
              loading="lazy"
            />
          )}
          <Box
            sx={{
              position: "absolute",
              bottom: 16,
              left: "50%",
              transform: "translateX(-50%)",
              color: "white",
              bgcolor: "rgba(0,0,0,0.7)",
              px: 2,
              py: 1,
              borderRadius: 2,
              fontSize: "0.9rem",
            }}
          >
            {currentImageIndex + 1} من {getAllImages().length}
          </Box>
        </Box>
      </Dialog> */}

      {/* Payment Response Modal */}
      <Dialog
        open={showPaymentModal}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
            border: `2px solid ${theme.palette.primary.main}30`,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontFamily: "Tajawal, Arial, sans-serif",
            fontWeight: "bold",
            color: "error.main",
            borderBottom: `2px solid ${theme.palette.error.main}30`,
          }}
        >
          خطأ في الدفع
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Typography
              variant="h6"
              color="error.main"
              fontWeight="bold"
              sx={{ mb: 2, fontFamily: "Tajawal, Arial, sans-serif" }}
            >
              حدث خطأ أثناء معالجة الدفع
            </Typography>
            <Typography
              variant="body1"
              color="error.dark"
              sx={{ fontFamily: "Tajawal, Arial, sans-serif" }}
            >
              {paymentError}
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "center" }}>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            color="error"
            sx={{
              fontWeight: "bold",
              fontFamily: "Tajawal, Arial, sans-serif",
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
            aria-label="إغلاق نافذة خطأ الدفع"
          >
            إغلاق
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CampaignDetails;
