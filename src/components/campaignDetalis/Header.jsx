import { ArrowBack, ArrowForward } from '@mui/icons-material';
import { Box, Fade, IconButton, Paper, Tooltip, useTheme, Zoom } from '@mui/material';
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { clearPaymentState } from "../../redux/Slices/paymentSlice";

import Content from './Content';
import { getCampaigns } from '../../redux/Slices/campaignsSlice';

const Header = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { data: campaigns} = useSelector((state) => state.campaigns);
    const {
        error: paymentError,
        data: paymentResponse,
    } = useSelector((state) => state.payment);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const theme = useTheme();
    const campaign = (campaigns || []).find((c) => String(c.id) === String(id));
    useEffect(() => {
        if (!campaigns || campaigns.length === 0) {
            dispatch(getCampaigns());
        }
    }, [dispatch, campaigns]);

    useEffect(() => {
        return () => {
            dispatch(clearPaymentState());
        };
    }, [dispatch]);

    useEffect(() => {
        if (paymentResponse?.iframe_url) {
            window.open(paymentResponse.iframe_url, "_blank");
            dispatch(clearPaymentState());
        } else if (paymentError) {
            setShowPaymentModal(true);
        }
    }, [paymentResponse, paymentError, dispatch]);

    return (
        <>
            <Box sx={{ maxWidth: 1400, mx: "auto", px: { xs: 2, sm: 4 }, mb: 4 }}>
                <Zoom in={true} timeout={800}>
                    <Tooltip title="العودة للقائمة" placement="left">
                        <IconButton
                            onClick={() => navigate("/campaigns")}
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                color: "white",
                                width: 60,
                                height: 60,
                                "&:hover": {
                                    bgcolor: theme.palette.primary.dark,
                                    transform: "scale(1.1)",
                                    boxShadow: `0 8px 25px ${theme.palette.primary.main}40`,
                                },
                                transition: "all 0.3s ease",
                                boxShadow: `0 4px 15px ${theme.palette.primary.main}30`,
                            }}
                            aria-label="العودة إلى قائمة الحملات"
                        >
                            <ArrowForward />
                        </IconButton>
                    </Tooltip>
                </Zoom>
            </Box>

            <Fade in={true} timeout={1200}>
                <Paper
                    elevation={12}
                    sx={{
                        maxWidth: 1400,
                        mx: "auto",
                        p: { xs: 3, sm: 6 },
                        // borderRadius: 4,
                        background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}03 100%)`,
                        border: `1px solid ${theme.palette.primary.main}20`,
                        boxShadow: `0 20px 60px ${theme.palette.primary.main}15`,
                    }}
                >
                    <Content campaign={campaign} />
                </Paper>
            </Fade>
        </>
    )
}

export default Header
