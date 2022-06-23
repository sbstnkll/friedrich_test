
import React from "react";
import { Link } from "react-router-dom";
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useAppContext } from './providers/AppContext';
import DialogNewChatRoom from "./DialogNewChatRoom";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

const WebsocketChat = () => {

    const {currentUser}=useAppContext();

  const [roomName, setRoomName] = React.useState("");
  const [chatPartner, setChatPartner] = React.useState("");
  const handleRoomNameChange = (friendshipt) => {
    setRoomName(friendshipt.id);  
    setChatPartner(friendshipt.userName)
  };

  return (


    
    <div className="home-container">
      
      <ButtonGroup variant="text" aria-label="text button group">
        <Button>Freunde und meine</Button>
        <Button>öffentliche Gruppen</Button>
        <Button>Gruppen in der Nähe</Button>
      </ButtonGroup>
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
        :null
      }
     
    </div>
  );
};

export default WebsocketChat;