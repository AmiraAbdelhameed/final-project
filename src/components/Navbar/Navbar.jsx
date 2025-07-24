import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { NavLink, useNavigate, useNavigation } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import PersonIcon from "@mui/icons-material/Person";

const Navbar = (props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const drawerWidth = 240;
  const navItems = [
    { label: "الرئيسيه", path: "/" },
    { label: "المؤسسات", path: "/organizations" },
    { label: "المشاريع", path: "/projects" },
    { label: "من نحن", path: "/about" },
  ];
  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Ayady
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItemButton
              component={NavLink}
              to={item.path}
              sx={{ textAlign: "left" }}
            >
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  return (
    <>
      <Container sx={{}}>
        <Box sx={{ mx: "auto", mt: 8, display: "flex" }}>
          <CssBaseline />
          <AppBar component="nav">
            <Toolbar
              sx={{
                backgroundColor: "secondary.main",
                justifyContent: "space-between",
              }}
            >
              {/* Icon appear in small screens */}
              <IconButton
                color="text.primary"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
              {/* Logo */}
              <Typography
                variant="h6"
                component={NavLink}
                to={"/"}
                sx={{
                  display: { xs: "none", sm: "block", textDecoration: "none" },
                  color: "primary.main",
                }}
              >
                Ayady
              </Typography>
              {/* Menu links  */}
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button
                    key={item.label}
                    component={NavLink}
                    to={item.path}
                    sx={{ color: "text.primary" }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
              {/* Login button */}
              <Box>
                <IconButton
                  sx={{ color: "text.primary" }}
                  onClick={() => navigate("/profile")}
                >
                  <PersonIcon />
                </IconButton>
                {/* <LoginButton /> */}
              </Box>
            </Toolbar>
          </AppBar>
          {/* Drawer appear in small screens */}
          <nav>
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true,
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </nav>
        </Box>
      </Container>
    </>
  );
};

export default Navbar;
