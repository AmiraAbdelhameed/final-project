
import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PersonIcon from "@mui/icons-material/Person";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { supabase } from "../../services/supabase/supabaseClient";
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("md"));
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };
  const handleProfile = async () => {
    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError) {
      console.error("Failed to get user:", userError.message);
      return;
    }

    const userId = userData?.user?.id;
    if (!userId) {
      console.error("User ID is undefined — make sure you're logged in.");
      return;
    }
    const { data: profileData, error: profileError } = await supabase
      .from("users")
      .select("user_type")
      .eq("user_id", userId)
      .single();

    if (profileError) {
      console.error("Failed to fetch user profile:", profileError.message);
      return;

    } else {
      navigate("/profile");
    }
  };

  const navItems = [

    { label: 'الرئيسيه', path: '/' },
    { label: 'المؤسسات', path: '/organizations' },
    { label: 'المشاريع', path: '/campaigns' },
    { label: 'من نحن', path: '/about' },

  ];

  const mobileMenu = (
    <Box
      sx={{ width: "100vw", bgcolor: "#fff", height: "100%", p: 2 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        {navItems.map((item) => (
          <ListItem disablePadding key={item.path}>
            <ListItemButton component={Link} to={item.path}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton>
            <SearchIcon sx={{ mr: 1 }} />
            <ListItemText primary="بحث" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton onClick={handleProfile}>
            <ListItemText primary="الملف الشخصي" />
          </ListItemButton>
        </ListItem>
        <Divider sx={{ my: 2 }} />
        <ListItem disablePadding sx={{ mt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate("/login")}
          >
            تسجيل الدخول
          </Button>
        </ListItem>
      </List>
    </Box>
  );
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  useEffect(() => {
    if (!isHomePage) {
      setScrolled(false);
      return;
    }
    const handleScroll = () => {
      
      setScrolled(window.scrollY > 590);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);
  return (
    <>
      <Box sx={{ mx: "auto", mt: isHomePage ? 0 : 8, display: "flex" }}>
        <CssBaseline />
        <AppBar
          component="nav"
          position="fixed"
          elevation={isHomePage && !scrolled ? 0 : 4}     
          sx={{

            px: 6,
            backgroundColor: isHomePage
              ? (scrolled ? 'primary.main' : 'rgba(199, 209, 187, 0.1)')
              : 'primary.main',
            color: isHomePage && !scrolled ? 'white' : 'black',
            backdropFilter: isHomePage && !scrolled ? 'blur(8px)' : 'none',

          }}
        >
          <Toolbar
            sx={{
              bgcolor: "transparent",
              justifyContent: "space-between",
              flexDirection: isMobile ? "row-reverse" : "row",
            }}
          >
            {/* Mobile View */}
            {isMobile ? (
              <>
                <IconButton edge="start" onClick={toggleDrawer(true)}>
                  <MenuIcon />
                </IconButton>

                <Typography variant="h6" sx={{ fontWeight: 'bold',cursor:'p' }} onClick={()=>navigate('/')}>

                  أيادي
                </Typography>
              </>
            ) : (
              <>
                {/* Right Section - Navigation */}
                <Box display="flex" alignItems="center" gap={3}>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    أيادي
                  </Typography>
                  {navItems.map((item) => (
                    <Button
                      key={item.path}
                      component={Link}
                      to={item.path}
                      color="inherit"
                      sx={{ color: "white", fontWeight: "bold" }}
                    >
                      {item.label}
                    </Button>
                  ))}
                  <IconButton>
                    <SearchIcon className="white" />
                  </IconButton>
                </Box>

                {/* Left Section - Auth & Lang */}
                <Box display="flex" alignItems="center" gap={1}>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                  >
                    تسجيل الدخول
                  </Button>
                  <IconButton
                    sx={{ color: "secondary.main" }}
                    onClick={handleProfile}
                  >
                    <PersonIcon />
                  </IconButton>
                </Box>
              </>
            )}
          </Toolbar>
        </AppBar>

        {/* Full-width drawer on mobile */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={toggleDrawer(false)}
          PaperProps={{
            sx: { width: "100%" },
          }}
        >
          {mobileMenu}
        </Drawer>
      </Box>
    </>
  );
};

export default Navbar;
