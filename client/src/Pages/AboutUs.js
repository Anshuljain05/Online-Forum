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
                Every age it has passed through has been based on beliefs and new technologies, responding to the needs of individuals anxious to adjust to new forms of socialization. A time of great change is a period in which society looks for meaning. Information is already a tool, the principal tool that people use to perceive and understand their environment.
            </Typography>
            <Typography variant="h5" align="justify" color="textSecondary" paragraph>
                Social media is a form of electronic communication that facilitates interaction based on certain interests and characteristics. Social media are media for social interaction, using highly accessible and scalable publishing techniques. Social media use web-based technologies to transform and broadcast media monologues into social dialogues.
            </Typography>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
}