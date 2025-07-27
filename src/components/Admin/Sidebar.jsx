import React from 'react'
import { NavLink, useNavigate} from 'react-router-dom';
import { ListItemText, ListItemButton, List, ListItem, Button, Typography } from '@mui/material';
import { supabase } from "../../services/supabase/supabaseClient"

const Sidebar = () => {
  const navigate = useNavigate()
  const items = [{
    label: "المؤسسات" ,
    path:'/admin/main'
  },{
    label: "المشاريع",
    path:'/admin/main/campaigns'
  } ];
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      console.log('Signed out successfully');
    }
    navigate('/admin')
  };
  return (
    <>
   
      <List >
        {items.map((item, index) => (
          <ListItem key={index}  >
            <ListItemButton component={NavLink} to={item.path} sx={{ textAlign: 'Right' }}>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem  >
          <ListItemButton component={Button} onClick={handleSignOut} sx={{ textAlign: 'Right' }}>
            <ListItemText primary={"تسجيل الخروج"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}

export default Sidebar
