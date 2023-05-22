import React from 'react';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import { createTheme } from '@mui/material';

const theme = createTheme();

const useStyles = makeStyles(() => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default function AboutUs() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <main>
        <div className={classes.heroContent}>
          <Container maxWidth="md">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              About Us
            </Typography>
            <Typography variant="h5" align="justify" color="textSecondary" paragraph>
            Our mission is to cultivate a thriving digital hub tailored for college and university students, where they can confidently seek and receive authoritative information and solutions to their academic challenges. By facilitating direct interaction with esteemed faculty members from their own institutions, we aspire to illuminate pathways to knowledge and foster a vibrant community of intellectual curiosity and scholarly excellence.
            </Typography>
            <Typography variant="h5" align="justify" color="textSecondary" paragraph>
            Our platform elegantly bridges the gap between students and teachers, harnessing the wealth of knowledge and experience from educators to address student queries. Not only does it empower students with access to expert guidance, it also offers teachers a rewarding way to utilize their spare time, fostering a dynamic, supportive learning community.
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}