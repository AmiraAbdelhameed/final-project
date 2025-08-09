import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Hero from "../components/Home/Hero";
import Article from "../components/Home/Article";
import Charities from "../components/Home/Charities";
import OrganizationSection from "../components/Home/OrganizationSection";
import ProjectsSection from "../components/Home/ProjectsSection";
import {
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const Home = () => {
  const theme = useTheme();
  const { search } = useLocation();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Check for success parameter in URL
  useEffect(() => {
    console.log("🔍 Home component mounted");
    console.log("🔍 Current URL search:", search);
    console.log("🔍 Current URL:", window.location.href);

    const queryParams = new URLSearchParams(search);
    const success = queryParams.get("success");
    console.log("🔍 Success parameter:", success);

    if (success === "true") {
      console.log("✅ Success parameter is true - showing modal");
      setShowSuccessModal(true);
    } else {
      console.log("❌ Success parameter is not true:", success);
    }
  }, [search]);

  // Additional check on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const successFromURL = urlParams.get("success");
    console.log("🔍 Component mount check - success:", successFromURL);
    
    if (successFromURL === "true") {
      console.log("✅ Component mount - showing modal");
      setShowSuccessModal(true);
    }
  }, []);

  // Test function to manually show modal
  const handleTestModal = () => {
    console.log("🧪 Test button clicked - showing modal");
    setShowSuccessModal(true);
  };

  // Test function to simulate URL with success parameter
  const handleTestURL = () => {
    console.log("🧪 Test URL button clicked");
    window.history.pushState({}, "", "/?success=true");
    // Force re-render
    window.location.reload();
  };

  return (
    <>
      <Hero />
      <Container maxWidth="lg">
        <Article />
        <Charities />
        <ProjectsSection />

        {/* Test Buttons - Remove these later */}
        <Box
          sx={{
            textAlign: "center",
            py: 4,
            display: "flex",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleTestModal}
            variant="outlined"
            color="primary"
            sx={{ fontFamily: "Tajawal, Arial, sans-serif" }}
          >
            اختبار Modal النجاح
          </Button>
          <Button
            onClick={handleTestURL}
            variant="outlined"
            color="secondary"
            sx={{ fontFamily: "Tajawal, Arial, sans-serif" }}
          >
            اختبار URL مع success=true
          </Button>
        </Box>
      </Container>

      {/* Success Modal */}
      <Dialog
        open={showSuccessModal}
        onClose={() => {
          console.log("🔒 Closing modal");
          setShowSuccessModal(false);
        }}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.success.main}05 100%)`,
            border: `2px solid ${theme.palette.success.main}30`,
          },
        }}
      >
        <DialogTitle
          sx={{
            textAlign: "center",
            fontFamily: "Tajawal, Arial, sans-serif",
            fontWeight: "bold",
            color: "success.main",
            borderBottom: `2px solid ${theme.palette.success.main}30`,
          }}
        >
          تم التبرع بنجاح! 🎉
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CheckCircle
              sx={{
                color: theme.palette.success.main,
                fontSize: 60,
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              color="success.main"
              fontWeight="bold"
              sx={{ mb: 2, fontFamily: "Tajawal, Arial, sans-serif" }}
            >
              شكراً لك على تبرعك! 🙏
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ fontFamily: "Tajawal, Arial, sans-serif", lineHeight: 1.6 }}
            >
              تم استلام تبرعك بنجاح. سيساعد هذا التبرع في تحقيق أهداف الحملة
              ومساعدة المحتاجين.
              <br />
              <br />
              <strong>
                شكراً لك على إيمانك بالخير ومساهمتك في بناء مستقبل أفضل للجميع.
              </strong>
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 3, justifyContent: "center" }}>
          <Button
            onClick={() => {
              console.log("🔒 Modal close button clicked");
              setShowSuccessModal(false);
            }}
            variant="contained"
            color="success"
            sx={{
              fontWeight: "bold",
              fontFamily: "Tajawal, Arial, sans-serif",
              px: 4,
              py: 1.5,
              borderRadius: 2,
            }}
            aria-label="إغلاق نافذة النجاح"
          >
            تم
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
