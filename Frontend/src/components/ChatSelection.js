import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Zoom from '@mui/material/Zoom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import { green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import { useAppContext } from './providers/AppContext'
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DialogNewChatRoom from "./DialogNewChatRoom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Tooltip from '@mui/material/Tooltip';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`action-tabpanel-${index}`}
      aria-labelledby={`action-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `action-tab-${index}`,
    'aria-controls': `action-tabpanel-${index}`,
  };
}

const fabStyle = {
  position: 'absolute',
  bottom: 16,
  right: 16,
};

const fabGreenStyle = {
  color: 'common.white',
  bgcolor: green[500],
  '&:hover': {
    bgcolor: green[600],
  },
};

export default function ChatSelection() {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const {currentUser}=useAppContext();

  const [roomName, setRoomName] = React.useState("");
  const [chatPartner, setChatPartner] = React.useState("");
  const handleRoomNameChange = (friendshipt) => {
    setRoomName(friendshipt.id);  
    setChatPartner(friendshipt.userName)
  };


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const transitionDuration = {
    enter: theme.transitions.duration.enteringScreen,
    exit: theme.transitions.duration.leavingScreen,
  };

  const fabs = [
    {
      color: 'primary',
      sx: fabStyle,
      icon: <Tooltip title= "Neue Gruppe erstellen"><AddIcon /></Tooltip> ,
      label: 'Add',
      tooltip: 'Gruppe hinzufügen'
    },
    {
      color: 'secondary',
      sx: fabStyle,
      icon: <EditIcon />,
      label: 'Edit',
    },
    {
      color: 'inherit',
      sx: { ...fabStyle, ...fabGreenStyle },
      icon: <UpIcon />,
      label: 'Expand',
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        width: 500,
        position: 'relative',
        minHeight: 200,
      }}
    >
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="action tabs example"
        >
          <Tab label="Freunde und meine Gruppen" {...a11yProps(0)} />
          <Tab label="Öffentliche Gruppen " {...a11yProps(1)} />
          <Tab label="Gruppen in der Nähe" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Grid item xs={3} >
                <List>
                    {
                    currentUser.friends.length> 0
                    ?
                    currentUser.friends.map((e)=>
                    
                    <ListItem button key={e.userName} onClick={() => handleRoomNameChange(e)}>                        
                        <ListItemText primary={e.userName}>{e.userName}</ListItemText>
                    </ListItem>) 
                    : "Freunde hinzufügen, um zu chatten"}                   
                </List>
            </Grid>
            <DialogNewChatRoom />
        {
        roomName !== "" 
        ?
        <Link to={`/chatroom/${roomName}`} className="enter-room-button">
            öffne Chat mit {chatPartner}
        </Link>
        : null
        }
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          Öffentliche Gruppen 
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          Gruppen in der Nähe
        </TabPanel>
      </SwipeableViews>
      {fabs.map((fab, index) => (
        <Zoom
          key={fab.color}
          in={value === index}
          timeout={transitionDuration}
          style={{
            transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
          }}
          unmountOnExit
        >
          <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
            {fab.icon}
          </Fab>
        </Zoom>
      ))}
    </Box>
  );
}
