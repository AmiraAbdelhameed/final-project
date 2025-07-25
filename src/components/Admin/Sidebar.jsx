import React from 'react'
import { NavLink} from 'react-router-dom';
import { ListItemText, ListItemButton, List, ListItem } from '@mui/material';

const Sidebar = () => {
  const items = [{
    label: "المؤسسات" ,
    path:'/admin'
  },{
    label: "المشاريع",
    path:'/admin/projects'
  } ];

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
      </List>
    </>
  )
}

export default Sidebar
