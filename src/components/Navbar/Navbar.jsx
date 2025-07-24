import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  useMediaQuery,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import CssBaseline from '@mui/material/CssBaseline';
import { Link } from 'react-router-dom'; 

// RTL setup
// const cacheRtl = createCache({
//   key: 'muirtl',
//   stylisPlugins: [prefixer, rtlPlugin],
// });

// const theme = createTheme({
//   direction: 'rtl',
//   typography: {
//     fontFamily: 'Arial, sans-serif',
//   },
// });

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [langMenuAnchor, setLangMenuAnchor] = React.useState(null);
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('md'));

  const handleLangClick = (event) => {
    setLangMenuAnchor(event.currentTarget);
  };

  const handleLangClose = () => {
    setLangMenuAnchor(null);
  };

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
    console.log("User ID:", userId);

    if (!userId) {
      console.error("User ID is undefined — make sure you're logged in.");
      return;
    }


    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('user_type')
      .eq('user_id', userId)
      .single();

    if (profileError) {
      console.error("Failed to fetch user profile:", profileError.message);
      return;
    }

    console.log("User Type:", profileData.user_type);


    if (profileData.user_type === 'admin') {
      navigate('/admin');
    } else {
      navigate('/profile');
    }
  };

  const navItems = [
    { label: 'الرئيسيه', path: '/' },
    { label: 'المؤسسات', path: '/organizations' },
    { label: 'المشاريع', path: '/Campaigns' },
    { label: 'من نحن', path: '/about' },
  ];

  const mobileMenu = (
    <Box
      sx={{ width: '100vw', bgcolor: '#fff', height: '100%', p: 2 }}
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
        <Divider sx={{ my: 2 }} />
        <ListItem disablePadding>
          <Button fullWidth variant="outlined" color="inherit">
            الاشتراك
          </Button>
        </ListItem>
        <ListItem disablePadding sx={{ mt: 1 }}>
          <Button fullWidth variant="contained" color="inherit">
            تسجيل الدخول
          </Button>
        </ListItem>
        <ListItem disablePadding sx={{ mt: 2 }}>
          <Button
            fullWidth
            color="inherit"
            endIcon={<ArrowDropDownIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleLangClick(e);
            }}
          >
            AR
          </Button>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className="navbar">
      {/* <CacheProvider value={cacheRtl}> */}
        {/* <ThemeProvider theme={theme}> */}
          <CssBaseline />
          <AppBar position="static" color="primary.main" elevation={0}>
            <Toolbar
              sx={{
                justifyContent: 'space-between',
                flexDirection: isMobile ? 'row-reverse' : 'row',
              }}
            >
              {/* Mobile View */}
              {isMobile ? (
                <>
                  <IconButton edge="start" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                   أيادي
                  </Typography>
                </>
              ) : (
                <>
                  {/* Right Section - Navigation */}
                  <Box display="flex" alignItems="center" gap={3}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                     أيادي
                    </Typography>
                    {navItems.map((item) => (
                      <Button
                        key={item.path}
                        component={Link}
                        to={item.path}
                        color="inherit"
                        sx={{ color: 'white', fontWeight: 'bold' }}
                      >
                        {item.label}
                      </Button>
                    ))}
                    <IconButton>
                      <SearchIcon className='white'/>
                    </IconButton>
                  </Box>

                  {/* Left Section - Auth & Lang */}
                  <Box display="flex" alignItems="center" gap={1}>
                    <Button variant="outlined" color="inherit">
                      الاشتراك
                    </Button>
                    <Button variant="contained" className='text-black' color="inherit">
                      تسجيل الدخول
                    </Button>
                    <Button
                      color="inherit"
                      endIcon={<ArrowDropDownIcon />}
                      onClick={handleLangClick}
                    >
                      AR
                    </Button>
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
              sx: { width: '100%' },
            }}
          >
            {mobileMenu}
          </Drawer>
        {/* </ThemeProvider> */}
      {/* </CacheProvider> */}
    </div>
  );
};

export default Navbar;
