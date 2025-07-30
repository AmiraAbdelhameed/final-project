import { Grid, Typography, Box } from '@mui/material'
import React from 'react'

const Ayady = () => {
    return (
        <>

            <Grid container sx={{
                my: 4,
                display: 'flex',
                justifyContent: "space-between",
                flexDirection: {
                    xs: 'column-reverse',
                    sm: 'row'
                },
                alignItems: "center"
            }} >
                {/* Text Section */}
                <Grid size={5} xs={10} sx={{
                    width: {
                        xs: '80%',
                        sm: "45%"
                    }

                }}>
                    <Typography component={"h2"} variant='h5' sx={{
                        my: 3,
                        color: 'primary.main',
                        fontWeight: 'bold'
                    }} >عن ايادي</Typography>
                    <Typography sx={{
                        color: 'text.secondary'
                    }}>
                        بدأت فكرة "أيادي" من إيماننا العميق بأن العطاء يستحق أن يكون أسهل، أصدق،
                        وأقرب. في ظل التحديات التي تواجهها الجمعيات الخيرية والمتبرعين على حد سواء،
                        ظهرت الحاجة إلى منصة تجمع بين الموثوقية والتكنولوجيا والنية الطيبة.
                        ولأننا نؤمن أن كل تبرع – مهما كان بسيطًا – قادر على صنع فرق حقيقي،
                        أنشأنا "أيادي" كبيئة رقمية تُسهّل الوصول إلى الخير وتزيد أثره.
                        نحن لا نقدم مجرد وسيلة تبرع، بل تجربة إنسانية قائمة على الثقة والشفافية؛
                        نراجع الجمعيات بعناية قبل إدراجها، ونُظهر لك الاحتياجات الواقعية للمجتمع،
                        ونربطك مباشرة بالمبادرات التي تلامس قلبك، مع استخدام أحدث التقنيات لحماية بياناتك ومتابعة أثر عطائك.
                    </Typography>
                </Grid>

                {/* Image Section */}
                <Grid size={5} xs={10} sx={{
                    width: {
                        xs: '80%',
                        sm: "45%"
                    }
                }}>
                    <Box
                        component="img"
                        src="./images/adminlogin.jpg"
                        alt="أيادي"
                        sx={{
                            width: '100%',
                            height: 'auto',
                            borderRadius: 2,
                            boxShadow: 3,
                        }}
                    />
                </Grid>
            </Grid>

        </>
    )
}

export default Ayady
