import { AttachMoney, CheckCircle, PhotoLibrary, ZoomIn } from '@mui/icons-material';
import { Box, Card, Fade, Grid, Stack, useTheme, Zoom, Typography, CardContent, Chip } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react'
import Progress from './Progress';
import BasicInfo from './BasicInfo';
import { useDispatch, useSelector } from 'react-redux';
import { makePayment, clearPaymentState } from "../../redux/Slices/paymentSlice";

const Content = ({ campaign }) => {
    const theme = useTheme();
    const dispatch = useDispatch();

    const [donationAmount, setDonationAmount] = useState(100);
    const {
        loading: paymentLoading,
        error: paymentError,
        data: paymentResponse,
    } = useSelector((state) => state.payment);
    const isAutomaticallyCompleted =
        campaign?.goal_amount &&
        campaign?.current_amount &&
        campaign.current_amount >= campaign.goal_amount;


    const isCampaignCompleted =
        campaign?.is_completed || isAutomaticallyCompleted;

    const handleImageClick = (image, index) => {
        setSelectedImage(image);
        setCurrentImageIndex(index);
        setImageGalleryOpen(true);
    };

    const handleDonation = useCallback(() => {
        if (campaign && donationAmount > 0) {
            dispatch(
                makePayment({
                    campaign_id: campaign.id,
                    amount: donationAmount,
                })
            );
        }
    }, [campaign, donationAmount, dispatch]);
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
            <Grid container spacing={4}>
                {/* Right Section: Images */}
                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        {" "}
                        {/* Reduced spacing for compactness */}
                        {/* Main Image */}
                        <Zoom in={true} timeout={1000}>
                            <Card
                                elevation={8}
                                sx={{
                                    borderRadius: 4,
                                    overflow: "hidden",
                                    border: `3px solid ${theme.palette.primary.main}50`,
                                    transition: "all 0.3s ease",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: `0 12px 30px ${theme.palette.primary.main}40`,
                                    },
                                    background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${theme.palette.primary.main}05 100%)`,
                                }}
                            >
                                <Box sx={{ position: "relative" }}>
                                    <Box
                                        sx={{
                                            position: "relative",
                                            cursor: "pointer",
                                            overflow: "hidden",
                                            borderRadius: 2,
                                            "&:hover .image-overlay": {
                                                opacity: 1,
                                            },
                                            "&:hover .zoom-icon": {
                                                transform: "scale(1.1)",
                                            },
                                        }}
                                        onClick={() =>
                                            handleImageClick(campaign.cover_image, 0)
                                        }
                                        role="button"
                                        aria-label="عرض الصورة الرئيسية"
                                    >
                                        <img
                                            src={campaign.cover_image}
                                            alt={campaign.name}
                                            style={{
                                                width: "100%",
                                                height: "200px",
                                                objectFit: "cover",
                                                display: "block",
                                                transition: "transform 0.3s ease",
                                            }}
                                            // onError={(e) => {
                                            //     e.target.src = FALLBACK_IMAGE;
                                            // }}
                                            loading="lazy"
                                        />
                                        <Box
                                            className="image-overlay"
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                right: 0,
                                                bottom: 0,
                                                bgcolor: "rgba(0,0,0,0.4)",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                opacity: 0,
                                                transition: "opacity 0.3s ease",
                                            }}
                                        >
                                            <ZoomIn
                                                className="zoom-icon"
                                                sx={{
                                                    color: "white",
                                                    fontSize: 48,
                                                    transition: "transform 0.3s ease",
                                                }}
                                            />
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 16,
                                            right: 16,
                                            bgcolor: "rgba(0,0,0,0.8)",
                                            borderRadius: 3,
                                            p: 1.5,
                                            backdropFilter: "blur(10px)",
                                        }}
                                    >
                                        <PhotoLibrary sx={{ color: "white", fontSize: 24 }} />
                                    </Box>
                                    {campaign.is_approved && (
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 16,
                                                left: 16,
                                                bgcolor: theme.palette.success.main,
                                                borderRadius: 3,
                                                p: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                            }}
                                        >
                                            <CheckCircle sx={{ color: "white", fontSize: 20 }} />
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "white", fontWeight: "bold" }}
                                            >
                                                معتمدة
                                            </Typography>
                                        </Box>
                                    )}
                                    {isCampaignCompleted && (
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: campaign.is_approved ? 60 : 16,
                                                left: 16,
                                                bgcolor: theme.palette.warning.main,
                                                borderRadius: 3,
                                                p: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 0.5,
                                            }}
                                        >
                                            <CheckCircle sx={{ color: "white", fontSize: 20 }} />
                                            <Typography
                                                variant="caption"
                                                sx={{ color: "white", fontWeight: "bold" }}
                                            >
                                                مكتمل
                                            </Typography>
                                        </Box>
                                    )}
                                </Box>
                            </Card>
                        </Zoom>
                        {/* Additional Images */}
                        {Array.isArray(campaign.campaign_images) &&
                            campaign.campaign_images.length > 0 && (
                                <Fade in={true} timeout={1200}>
                                    <Card
                                        elevation={6}
                                        sx={{
                                            borderRadius: 4,
                                            p: 2, // Reduced padding for compactness
                                            border: `3px solid ${theme.palette.primary.main}50`,
                                            background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, transparent 100%)`,
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: `0 12px 30px ${theme.palette.primary.main}40`,
                                            },
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{
                                                mb: 2, // Reduced margin
                                                fontFamily: "Tajawal, Arial, sans-serif",
                                                color: theme.palette.primary.main,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                            }}
                                        >
                                            <PhotoLibrary />
                                            صور إضافية ({campaign.campaign_images.length})
                                        </Typography>
                                        <Stack
                                            direction="row"
                                            spacing={1} // Reduced spacing
                                            sx={{ overflowX: "auto", pb: 1 }} // Reduced padding
                                        >
                                            {campaign.campaign_images.map((img, idx) => (
                                                <Box
                                                    key={idx}
                                                    sx={{
                                                        minWidth: { xs: 60, sm: 80 }, 
                                                        minHeight: { xs: 60, sm: 80 },
                                                        maxWidth: 80,
                                                        maxHeight: 80,
                                                        borderRadius: 3,
                                                        overflow: "hidden",
                                                        border: `3px solid ${theme.palette.primary.main}80`,
                                                        transition: "all 0.3s ease",
                                                        cursor: "pointer",
                                                        position: "relative",
                                                        "&:hover": {
                                                            transform: "scale(1.05)",
                                                            boxShadow: `0 8px 25px ${theme.palette.primary.main}50`,
                                                            borderColor: theme.palette.primary.dark,
                                                        },
                                                        "&:hover .image-overlay": {
                                                            opacity: 1,
                                                        },
                                                    }}
                                                    onClick={() => handleImageClick(img, idx + 1)}
                                                    role="button"
                                                    aria-label={`عرض الصورة الإضافية ${idx + 1}`}
                                                >
                                                    <img
                                                        src={img}
                                                        alt={`صورة إضافية ${idx + 1}`}
                                                        style={{
                                                            width: "100%",
                                                            height: "100%",
                                                            objectFit: "cover",
                                                            display: "block",
                                                            transition: "transform 0.3s ease",
                                                        }}
                                                        // onError={(e) => {
                                                        //     e.target.src = FALLBACK_IMAGE;
                                                        // }}
                                                        loading="lazy"
                                                    />
                                                    <Box
                                                        className="image-overlay"
                                                        sx={{
                                                            position: "absolute",
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            bgcolor: "rgba(0,0,0,0.5)",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            opacity: 0,
                                                            transition: "opacity 0.3s ease",
                                                        }}
                                                    >
                                                        <ZoomIn
                                                            sx={{
                                                                color: "white",
                                                                fontSize: 20, // Reduced icon size
                                                            }}
                                                        />
                                                    </Box>
                                                </Box>
                                            ))}
                                        </Stack>
                                    </Card>
                                </Fade>
                            )}
                    </Stack>
                </Grid>

                {/* Left Section: Info, Donation, Progress */}
                <Grid item xs={12} md={6}>
                    <Stack spacing={3}>
                        {" "}
                        {/* Reduced spacing for compactness */}
                        {/* Basic Info */}
                        <BasicInfo campaign={campaign} />
                        {/* Donation Section */}
                        {campaign.type === "money" && !isCampaignCompleted && (
                            <Fade in={true} timeout={1000}>
                                <Card
                                    elevation={6}
                                    sx={{
                                        borderRadius: 4,
                                        border: `1px solid ${theme.palette.primary.main}20`,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main}08 0%, transparent 100%)`,
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: `0 12px 30px ${theme.palette.primary.main}30`,
                                        },
                                    }}
                                >
                                    <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                                        {" "}
                                        {/* Reduced padding */}
                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            sx={{
                                                mb: 2, // Reduced margin
                                                fontFamily: "Tajawal, Arial, sans-serif",
                                                color: theme.palette.primary.main,
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                            }}
                                        >
                                            <AttachMoney />
                                            تبرع الآن
                                        </Typography>
                                        <Box sx={{ mb: 2 }}>
                                            {" "}
                                            {/* Reduced margin */}
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 1, // Reduced margin
                                                    fontFamily: "Tajawal, Arial, sans-serif",
                                                }}
                                            >
                                                اختر مبلغ التبرع:
                                            </Typography>
                                            <Stack
                                                direction="row"
                                                spacing={1} // Reduced spacing
                                                flexWrap="wrap"
                                                useFlexGap
                                            >
                                                {[50, 100, 200, 500, 1000].map((amount) => (
                                                    <Chip
                                                        key={amount}
                                                        label={`${amount} جنيه`}
                                                        onClick={() => setDonationAmount(amount)}
                                                        color={
                                                            donationAmount === amount
                                                                ? "primary"
                                                                : "default"
                                                        }
                                                        variant={
                                                            donationAmount === amount
                                                                ? "filled"
                                                                : "outlined"
                                                        }
                                                        sx={{
                                                            fontWeight: "bold",
                                                            cursor: "pointer",
                                                            transition: "all 0.3s ease",
                                                            "&:hover": {
                                                                transform: "scale(1.05)",
                                                            },
                                                            height: 28, // Reduced height
                                                            fontSize: "0.85rem", // Reduced font size
                                                        }}
                                                    />
                                                ))}
                                            </Stack>
                                        </Box>
                                        <Box sx={{ mb: 2 }}>
                                            {" "}
                                            {/* Reduced margin */}
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    mb: 1, // Reduced margin
                                                    fontFamily: "Tajawal, Arial, sans-serif",
                                                }}
                                            >
                                                أو أدخل مبلغ مخصص:
                                            </Typography>
                                            <Box sx={{ position: "relative", width: "100%" }}>
                                                <input
                                                    type="text"
                                                    inputMode="decimal"
                                                    value={donationAmount}
                                                    onChange={(e) => {
                                                        const value = e.target.value;
                                                        if (value === "" || /^\d*\.?\d*$/.test(value)) {
                                                            const numValue =
                                                                value === "" || value === "."
                                                                    ? 0
                                                                    : parseFloat(value);
                                                            if (
                                                                !isNaN(numValue) &&
                                                                numValue >= 0 &&
                                                                numValue <= 1000000
                                                            ) {
                                                                setDonationAmount(numValue);
                                                            }
                                                        }
                                                    }}
                                                    onKeyPress={(e) => {
                                                        if (!/[\d.]/.test(e.key)) {
                                                            e.preventDefault();
                                                        }
                                                        if (
                                                            e.key === "." &&
                                                            e.target.value.includes(".")
                                                        ) {
                                                            e.preventDefault();
                                                        }
                                                    }}
                                                    placeholder="أدخل المبلغ"
                                                    style={{
                                                        width: "100%",
                                                        padding: "10px 14px", // Reduced padding
                                                        borderRadius: "6px", // Reduced radius
                                                        border: `2px solid ${theme.palette.primary.main}30`,
                                                        fontSize: "14px", // Reduced font size
                                                        fontFamily: "Tajawal, Arial, sans-serif",
                                                        outline: "none",
                                                        transition: "all 0.3s ease",
                                                        backgroundColor: "white",
                                                        direction: "ltr",
                                                        textAlign: "left",
                                                    }}
                                                    onFocus={(e) => {
                                                        e.target.style.borderColor =
                                                            theme.palette.primary.main;
                                                        e.target.style.boxShadow = `0 0 0 2px ${theme.palette.primary.main}20`;
                                                    }}
                                                    onBlur={(e) => {
                                                        e.target.style.borderColor = `${theme.palette.primary.main}30`;
                                                        e.target.style.boxShadow = "none";
                                                    }}
                                                    aria-label="أدخل مبلغ التبرع المخصص"
                                                />
                                            </Box>
                                        </Box>
                                        <Box sx={{ textAlign: "center" }}>
                                            <button
                                                onClick={handleDonation}
                                                disabled={paymentLoading || donationAmount <= 0}
                                                style={{
                                                    backgroundColor: theme.palette.primary.main,
                                                    color: "white",
                                                    border: "none",
                                                    borderRadius: "10px", // Reduced radius
                                                    padding: "12px 24px", // Reduced padding
                                                    fontSize: "16px", // Reduced font size
                                                    fontWeight: "bold",
                                                    fontFamily: "Tajawal, Arial, sans-serif",
                                                    cursor: paymentLoading
                                                        ? "not-allowed"
                                                        : "pointer",
                                                    opacity: paymentLoading ? 0.7 : 1,
                                                    transition: "all 0.3s ease",
                                                    boxShadow: `0 4px 15px ${theme.palette.primary.main}40`,
                                                }}
                                                onMouseEnter={(e) => {
                                                    if (!paymentLoading) {
                                                        e.target.style.transform = "translateY(-2px)";
                                                        e.target.style.boxShadow = `0 8px 25px ${theme.palette.primary.main}50`;
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = "translateY(0)";
                                                    e.target.style.boxShadow = `0 4px 15px ${theme.palette.primary.main}40`;
                                                }}
                                                aria-label="تبرع الآن"
                                            >
                                                {paymentLoading ? "جاري المعالجة..." : "تبرع الآن"}
                                            </button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Fade>
                        )}
                        {/* Campaign Completed Message */}
                        {isCampaignCompleted && (
                            <Fade in={true} timeout={1000}>
                                <Card
                                    elevation={6}
                                    sx={{
                                        borderRadius: 4,
                                        border: `1px solid ${theme.palette.warning.main}30`,
                                        background: `linear-gradient(135deg, ${theme.palette.warning.main}08 0%, transparent 100%)`,
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: `0 12px 30px ${theme.palette.warning.main}30`,
                                        },
                                    }}
                                >
                                    <CardContent
                                        sx={{ p: { xs: 2, sm: 3 }, textAlign: "center" }}
                                    >
                                        {" "}
                                        {/* Reduced padding */}
                                        <Box sx={{ mb: 1 }}>
                                            {" "}
                                            {/* Reduced margin */}
                                            <CheckCircle
                                                sx={{
                                                    color: theme.palette.warning.main,
                                                    fontSize: 40, // Reduced size
                                                    mb: 1, // Reduced margin
                                                }}
                                            />
                                        </Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="bold"
                                            sx={{
                                                mb: 1, // Reduced margin
                                                fontFamily: "Tajawal, Arial, sans-serif",
                                                color: theme.palette.warning.main,
                                            }}
                                        >
                                            تم إكمال هذه الحملة
                                        </Typography>
                                        <Typography
                                            variant="body1"
                                            color="text.secondary"
                                            sx={{
                                                fontFamily: "Tajawal, Arial, sans-serif",
                                                lineHeight: 1.6,
                                                fontSize: "0.95rem", // Reduced font size
                                            }}
                                        >
                                            {isAutomaticallyCompleted && !campaign.is_completed
                                                ? `تم الوصول للهدف المالي المطلوب (${Number(campaign.goal_amount).toLocaleString()} جنيه). شكراً لجميع المتبرعين والمتطوعين الذين ساهموا في نجاح هذه الحملة.`
                                                : "شكراً لجميع المتبرعين والمتطوعين الذين ساهموا في نجاح هذه الحملة."}
                                            لم تعد التبرعات مقبولة لهذه الحملة.
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Fade>
                        )}
                        {/* Progress and Status Sections */}
                        <Progress campaign={campaign} />

                    </Stack>
                </Grid>
            </Grid>
        </>
    )
}

export default Content
