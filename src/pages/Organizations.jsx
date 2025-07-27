import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrganizations } from "../redux/Slices/organizationsSlice";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BusinessIcon from "@mui/icons-material/Business";
import { Link } from "react-router-dom";

const Organizations = () => {
  const dispatch = useDispatch();
  const {
    data: organizations,
    loading,
    error,
  } = useSelector((state) => state.organizations);
  const theme = useTheme();

  useEffect(() => {
    dispatch(getOrganizations());
  }, [dispatch]);

  // Filter for approved organizations in render
  const approvedOrgs = (organizations || []).filter(
    (org) =>
      org.is_approved === true ||
      org.is_approved === "TRUE" ||
      org.is_approved === 1
  );

  return (
    <Box
      sx={{
        p: { xs: 1, sm: 3 },
        bgcolor: theme.palette.background.default,
        fontFamily: theme.typography.fontFamily,
        direction: "rtl",
        minHeight: "100vh",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} mb={4}>
        <BusinessIcon
          sx={{ color: theme.palette.primary.main, fontSize: 36 }}
        />
        <Typography
          variant="h4"
          fontWeight="bold"
          color={theme.palette.primary.main}
          fontFamily={theme.typography.fontFamily}
          textAlign="right"
        >
          المؤسسات المعتمدة
        </Typography>
      </Stack>
      {loading ? (
        <Typography
          color={theme.palette.text.secondary}
          fontFamily={theme.typography.fontFamily}
          textAlign="center"
        >
          جاري التحميل...
        </Typography>
      ) : error ? (
        <Typography color="error" textAlign="center">
          خطأ: {error}
        </Typography>
      ) : approvedOrgs.length === 0 ? (
        <Typography color={theme.palette.text.secondary} textAlign="center">
          لا توجد مؤسسات معتمدة حالياً.
        </Typography>
      ) : (
        <Box>
          {approvedOrgs.map((org) => (
            <React.Fragment key={org.id}>
              <Paper
                component={Link}
                to={`/organizations/${org.id}`}
                sx={{
                  cursor: "pointer",
                  textDecoration: "none",
                  "&, & *": { textDecoration: "none !important" },
                  p: { xs: 2, sm: 3 },
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  bgcolor: theme.palette.background.paper,
                  fontFamily: theme.typography.fontFamily,
                  mb: 2,
                  boxShadow: 3,
                  transition: "box-shadow 0.2s",
                  "&:hover": {
                    boxShadow: 8,
                    background: theme.palette.secondary.main,
                  },
                  borderRadius: 3,
                }}
                elevation={0}
              >
                <Avatar
                  src={org.profile_image || ""}
                  alt={org.name}
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: theme.palette.primary.main,
                    fontFamily: theme.typography.fontFamily,
                    ml: 2,
                    fontSize: 28,
                  }}
                >
                  {org.name && org.name[0]}
                </Avatar>
                <Box sx={{ textAlign: "right", flex: 1 }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ sm: "center" }}
                    justifyContent="space-between"
                  >
                    <Typography
                      variant="h6"
                      color={theme.palette.text.primary}
                      fontFamily={theme.typography.fontFamily}
                      sx={{ mb: { xs: 1, sm: 0 } }}
                    >
                      {org.name}
                    </Typography>
                    <Chip
                      label={"معتمدة"}
                      color="success"
                      size="small"
                      sx={{
                        fontFamily: theme.typography.fontFamily,
                        fontWeight: "bold",
                      }}
                    />
                  </Stack>
                  {org.description && (
                    <Typography
                      variant="body2"
                      color={theme.palette.text.secondary}
                      fontFamily={theme.typography.fontFamily}
                      mb={1}
                      mt={1}
                    >
                      {org.description}
                    </Typography>
                  )}
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    mt={1}
                  >
                    <Box>
                      <Typography
                        variant="body2"
                        color={theme.palette.text.primary}
                        fontFamily={theme.typography.fontFamily}
                      >
                        <strong>البريد الإلكتروني: </strong> {org.email}
                      </Typography>
                      {org.phone && (
                        <Typography
                          variant="body2"
                          color={theme.palette.text.primary}
                          fontFamily={theme.typography.fontFamily}
                        >
                          <strong>الهاتف : </strong> {org.phone}
                        </Typography>
                      )}
                    </Box>
                  </Stack>
                </Box>
              </Paper>
            </React.Fragment>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Organizations;
