import React, { useEffect, useState } from 'react'
import { 
  Typography,
  AppBar,
  Button,
  Card,
  CardActions,
  CardContent, 
  CardMedia,
  CssBaseline,
  Grid,
  Toolbar,
  Container,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
} from '@material-ui/core'
import { createMuiTheme, ThemeProvider, FormControlLabel } from '@material-ui/core'
import { AddCircleOutlined, PhotoCamera, SubjectOutlined } from '@material-ui/icons'
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import useStyles from './styles'

import { postData, getData } from './api/test'
// import { useHistory, useLocation } from 'react-router-dom'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e91e63'
    },
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
})

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const App = () => {
  const classes = useStyles()
  // const history = useHistory()
  // const location = useLocation()
  const [title, setTitle] = useState('')
  const [details, setDetails] = useState('')
  const [titleError, setTitleError] = useState(false)
  const [detailsError, setDetailsError] = useState(false)
  const [category, setCategory] = useState('todos')
  const [notes, setNotes] = useState([])
  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/'
    },
    {
      text: 'Create Note',
      icon: <AddCircleOutlined color="secondary" />,
      path: '/create'
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setTitleError(false)
    setDetailsError(false)

    if (title === '') {
      setTitleError(true)
    }
    if (details === '') {
      setDetailsError(true)
    }

    if (title && details) {
      console.log(title, details, category)
      const data = {
        title: title,
        details: details,
        category: category,
      }
      postData(data)
    }
  }

  useEffect(() => {
    getData().then(res => setNotes(res.data))
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <PhotoCamera className={classes.icon} />
          <Typography variant="h6">
            Photo Album
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <div className={classes.container}>
          <Container maxWidth="sm">
            <Typography variant="h2" align="center" color="textPrimary" gutterBottom>
              Photo Album
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Hello everyone This is a photo album and Lorem ipsum dolor, sit amet consectetur adipisicing elit. Amet nesciunt saepe dolore error architecto aperiam minus, nostrum deserunt fuga in quidem nobis aliquam, nihil molestiae, blanditiis eveniet voluptate! Dolores, alias?
            </Typography>
            <div className={classes.button}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    See my photos
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Secondary action
                  </Button>
                </Grid>
              </Grid>
            </div>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                onChange={(e) => setTitle(e.target.value)}
                className={classes.field}
                label="Note Title"
                variant="outlined"
                color="secondary"
                fullWidth
                required
                error={titleError}
              />
              <TextField
                onChange={(e) => setDetails(e.target.value)}
                className={classes.field}
                label="Details"
                variant="outlined"
                color="secondary"
                multiline
                rows={4}
                fullWidth
                required
                error={detailsError}
              />

              <FormControl className={classes.field}>
                <FormLabel>Note Category</FormLabel>
                <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                  <FormControlLabel value="money" control={<Radio />} label="Money" />
                  <FormControlLabel value="todos" control={<Radio />} label="Todos" />
                  <FormControlLabel value="reminders" control={<Radio />} label="Reminders" />
                  <FormControlLabel value="work" control={<Radio />} label="Work" />
                </RadioGroup>
              </FormControl>
              

              <Button
                // onClick={() => console.log('you clicked me')}
                type="submit"
                color="primary"
                variant="contained"
                endIcon={<KeyboardArrowRightIcon />}
              >
                Submit
              </Button>
            </form>
          </Container>
        </div>


        <div>
          <Container>
            {notes.map(note => (
              <Typography key={note.id}>{note.title}</Typography>
            ))}
          </Container>
        </div>

        {/* list / links */}
        <List>
          {menuItems.map(item => (
            <ListItem
              button
              key={item.text}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>



        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia 
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5">
                      Heading
                    </Typography>
                    <Typography>
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">View</Button>
                    <Button size="small" color="primary">Edit</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <footer className={classes.footer}>
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography variant="subtitle1" align="center" color="textSecondary">
          Something here to give the footer a purpose!
        </Typography>
      </footer>
    </ThemeProvider>
  )
}

export default App