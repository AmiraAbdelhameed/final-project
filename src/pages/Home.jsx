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
    const queryParams = new URLSearchParams(search);
    const success = queryParams.get("success");
    console.log("🔍 Current URL search:", search);
    console.log("🔍 Success parameter:", success);
    if (success === "true") {
      console.log("✅ Success parameter is true");
      setShowSuccessModal(true);
    }
  }, [search]);

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
        onClose={() => setShowSuccessModal(false)}
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
            onClick={() => setShowSuccessModal(false)}
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
