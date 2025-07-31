import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'

const OurValues = () => {
    const values=[
        {
            title:'الشفافية',
            content:'نؤمن أن الشفافية تبني الثقة، ولذلك نحرص في "أيادي" على تقديم كل معلومة بوضوح كامل — من تفاصيل الجمعيات وأنشطتها، إلى وجهة كل تبرع يتم عبر منصتنا. نتيح للمتبرعين الاطلاع على تقارير دورية، ونوفر أدوات تساعدهم على تتبع أثر مساهماتهم بسهولة واطمئنان.'
        },
        {
            title:'الإنسانية',
            content:'الإنسان هو جوهر رسالتنا. نحن لا نتعامل مع التبرعات كأرقام، بل كقصص ومصائر. نُصمم كل خاصية في منصتنا بهدف تعزيز الكرامة، وتخفيف المعاناة، وإيصال الأمل لكل مستفيد بطريقة تحفظ إنسانيته وتراعي خصوصيته.'
        },
        {
            title:'الابتكار',
            content:'نستفيد من قوة التكنولوجيا لبناء منصة تبرعات ذكية، سهلة، وآمنة. من خلال أدوات البحث، والتصفية، والتبرع السريع، نقدم تجربة استخدام متطورة، تجعل من فعل الخير شيئًا يوميًا وسلسًا للجميع — في أي وقت ومن أي مكان.'
        },
        {
            title:'الثقة',
            content:'ثقة المتبرع أولوية لا تُساوم. نستخدم أحدث معايير الأمان والتشفير لحماية بيانات المستخدمين وضمان عدم إساءة استخدام التبرعات. كل عملية تتم داخل "أيادي" تمر من خلال نظام مراقبة داخلي صارم يضمن النزاهة في كل خطوة.'
        },
        {
            title:'العدالة',
            content:'نحن نُؤمن أن التبرع العادل لا يقتصر على من يطلب، بل على من يحتاج حقًا. لذلك نعمل مع جمعيات تم التحقق منها، ونتأكد من أن التبرعات تصل للفئات الأشد احتياجًا بناءً على معايير دقيقة، مما يحقق التوازن ويمنع التحيز.'
        }
    ]
  return (
    <>
    <Box sx={{
              my: 4,
              py: 4
    }}>
              <Typography component={"h2"} variant='h5' sx={{
                  mb: 3,
                  color: 'primary.main',
                  fontWeight: 'bold',
                  textAlign: 'center',

              }}>
        قيمنا
        </Typography>    

              <Box
                  sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 2,
                      justifyContent: 'center',
                      px: 2,
                  }}
              >
                  {values.map((value, index) => (
                      <Card
                          key={index}
                          sx={{
                              minWidth: 350,
                              maxWidth: 400,
                              flex: '1 1 250px',
                              textAlign: 'center',
                              borderRadius: 3,
                              boxShadow: 3,
                              transition: 'transform 0.3s',
                              '&:hover': {
                                  transform: 'scale(1.03)',
                              },
                          }}
                      >
                    
                          <CardContent>
                              <Typography color='primary' variant="h6" fontWeight="bold">
                                  {value.title}
                              </Typography>
                              <Typography color='text.secondary' mt={1}>
                                  {value.content}
                              </Typography>
                          </CardContent>
                      </Card>
                  ))}
              </Box>
    </Box> 
    </>
  )
}

export default OurValues
