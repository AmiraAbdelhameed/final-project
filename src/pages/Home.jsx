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

  return (
    <>
      <Hero />
      <Container maxWidth="lg">
        <Article />
        <Charities />
        <ProjectsSection />
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
            fontSize: "1.5rem",
            py: 2,
          }}
        >
          تم التبرع بنجاح! 🎉
        </DialogTitle>
        <DialogContent sx={{ pt: 3, px: 4 }}>
          <Box sx={{ textAlign: "center", py: 2 }}>
            <CheckCircle
              sx={{
                color: theme.palette.success.main,
                fontSize: 80,
                mb: 3,
              }}
            />
            <Typography
              variant="h5"
              color="success.main"
              fontWeight="bold"
              sx={{ 
                mb: 3, 
                fontFamily: "Tajawal, Arial, sans-serif",
                fontSize: "1.3rem"
              }}
            >
              شكراً لك على تبرعك! 🙏
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              sx={{ 
                fontFamily: "Tajawal, Arial, sans-serif", 
                lineHeight: 1.8,
                fontSize: "1.1rem",
                mb: 2
              }}
            >
              تم استلام تبرعك بنجاح وسيتم تحويله للمستفيدين.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ 
                fontFamily: "Tajawal, Arial, sans-serif", 
                lineHeight: 1.6,
                fontSize: "1rem"
              }}
            >
              سيساعد هذا التبرع في تحقيق أهداف الحملة ومساعدة المحتاجين.
            </Typography>
            <Box sx={{ mt: 3, p: 2, bgcolor: "success.main", borderRadius: 2, color: "white" }}>
              <Typography
                variant="body1"
                sx={{ 
                  fontFamily: "Tajawal, Arial, sans-serif",
                  fontWeight: "bold",
                  fontSize: "1rem"
                }}
              >
                شكراً لك على إيمانك بالخير ومساهمتك في بناء مستقبل أفضل للجميع 🌟
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 4, justifyContent: "center" }}>
          <Button
            onClick={() => {
              console.log("🔒 Modal close button clicked");
              setShowSuccessModal(false);
            }}
            variant="contained"
            color="success"
            size="large"
            sx={{
              fontWeight: "bold",
              fontFamily: "Tajawal, Arial, sans-serif",
              px: 6,
              py: 2,
              borderRadius: 3,
              fontSize: "1.1rem",
              boxShadow: 3,
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
            aria-label="إغلاق نافذة النجاح"
          >
            تم 👍
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Home;
