import { Typography, Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getOrganizations } from '../../../redux/Slices/organizationsSlice';
import { Person } from '@mui/icons-material';

const ChatOrganizations = () => {
    const dispatch = useDispatch();
    const { data: organizations, loading, error } = useSelector((state) => state.organizations);

    useEffect(() => {
        dispatch(getOrganizations());

    }, [dispatch])
    return (
        <>
            <Typography variant="h4" textAlign="right" mt={4} mb={2}>
                محادثات مع المؤسسات
            </Typography>
            {organizations.map((org) => (
                <Box key={org.id} 
                onClick={()=>console.log(org.id)}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap:1,
                    p:1,
                    "&:hover": {
                        backgroundColor: '#f0f0f0',
                        cursor: 'pointer',
                    },

                    mb: 2,

                }}>
                    {org.profile_image ? (
                        <Box component={"img"} src={org.profile_image} alt={org.name} sx={{ width: 50, height: 50, borderRadius: '50%', overflow: "hidden" }} />

                    ) : (
                        <Box sx={{ width: 50, height: 50, borderRadius: '50%', overflow: "hidden", bgcolor: 'secondary.main', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Person />
                        </Box>
                    )}
                    <Typography variant="p">{org.name}</Typography>
                </Box>
            ))}
        </>
    )
}

export default ChatOrganizations
