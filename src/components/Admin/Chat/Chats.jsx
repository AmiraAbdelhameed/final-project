import { Grid, Typography } from '@mui/material'
import React from 'react'
import ChatOrganizations from './ChatOrganizations'
import Messages from './Messages'

const Chats = () => {
    return (
        <>
            <Typography variant="h4" textAlign="right" mt={4} mb={2}>
                محادثات مع المؤسسات
            </Typography>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Grid size={4} sx={{ border: '2px solid black', }}>
                    <ChatOrganizations />
                </Grid>
                <Grid size={8} sx={{ border: '2px solid black', padding: '20px' }}>
                    <Messages />
                </Grid>
            </Grid>

        </>
    )
}

export default Chats
