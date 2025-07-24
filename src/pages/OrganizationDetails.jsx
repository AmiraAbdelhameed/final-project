import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase/supabaseClient";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Chip,
  Stack,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import { useTheme } from "@mui/material/styles";

const OrganizationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [org, setOrg] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchOrg = async () => {
      const { data } = await supabase
        .from("organizations")
        .select("*")
        .eq("id", id)
        .single();
      setOrg(data);
      setLoading(false);
    };
    fetchOrg();
  }, [id]);

  if (loading)
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        جاري تحميل بيانات المؤسسة...
      </Typography>
    );
  if (!org)
    return (
      <Typography sx={{ textAlign: "center", mt: 4 }}>
        عذراً، لم يتم العثور على هذه المؤسسة.
      </Typography>
    );

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily,
        direction: "rtl",
      }}
    >
      {/* زر الرجوع العائم */}
      <IconButton
        onClick={() => navigate("/organizations")}
        sx={{
          position: "fixed",
          top: { xs: 16, sm: 32 },
          right: { xs: 16, sm: 32 },
          bgcolor: theme.palette.background.paper,
          boxShadow: 2,
          zIndex: 100,
          color: theme.palette.primary.main,
          border: `2px solid ${theme.palette.primary.main}`,
          "&:hover": { bgcolor: theme.palette.secondary.main },
        }}
      >
        <ArrowBackIcon />
        <Typography
          sx={{
            fontWeight: "bold",
            ml: 1,
            display: { xs: "none", sm: "inline" },
          }}
        >
          العودة إلى قائمة المؤسسات
        </Typography>
      </IconButton>

      {/* الهيدر */}
      <Box
        sx={{
          width: "100%",
          bgcolor: theme.palette.primary.main,
          color: "#fff",
          py: { xs: 5, sm: 7 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Avatar
          src={org.profile_image || ""}
          alt={org.name}
          sx={{
            width: 100,
            height: 100,
            bgcolor: "#fff",
            color: theme.palette.primary.main,
            fontSize: 44,
            mb: 2,
            fontFamily: theme.typography.fontFamily,
            border: `4px solid ${theme.palette.secondary.main}`,
          }}
        >
          {org.name && org.name[0]}
        </Avatar>
        <Typography
          variant="h3"
          fontWeight="bold"
          fontFamily={theme.typography.fontFamily}
          textAlign="center"
          sx={{ mb: 1 }}
        >
          {org.name}
        </Typography>
        <Chip
          label={org.is_approved ? "مؤسسة معتمدة" : "مؤسسة غير معتمدة"}
          color={org.is_approved ? "success" : "warning"}
          sx={{
            fontFamily: theme.typography.fontFamily,
            fontWeight: "bold",
            fontSize: 18,
            px: 2,
            py: 1,
            mt: 1,
          }}
        />
      </Box>

      {/* التفاصيل */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: { xs: -6, sm: -8 },
          px: 2,
        }}
      >
        <Paper
          sx={{
            width: "100%",
            maxWidth: 600,
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            boxShadow: 4,
            fontFamily: theme.typography.fontFamily,
            zIndex: 2,
          }}
        >
          {org.description && (
            <Typography
              variant="body1"
              color={theme.palette.text.secondary}
              fontFamily={theme.typography.fontFamily}
              mb={3}
              textAlign="center"
              sx={{ fontSize: 18 }}
            >
              {org.description}
            </Typography>
          )}
          <Stack spacing={2} mt={2} alignItems="flex-start">
            <Stack direction="row" spacing={1} alignItems="center">
              <EmailIcon color="primary" />
              <Typography
                variant="body1"
                color={theme.palette.text.primary}
                fontFamily={theme.typography.fontFamily}
                sx={{ fontSize: 17 }}
              >
                <strong>البريد الإلكتروني:</strong> {org.email}
              </Typography>
            </Stack>
            {org.phone && (
              <Stack direction="row" spacing={1} alignItems="center">
                <PhoneIcon color="primary" />
                <Typography
                  variant="body1"
                  color={theme.palette.text.primary}
                  fontFamily={theme.typography.fontFamily}
                  sx={{ fontSize: 17 }}
                >
                  <strong>رقم الهاتف:</strong> {org.phone}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Paper>
      </Box>
    </Box>
  );
};

export default OrganizationDetails;
