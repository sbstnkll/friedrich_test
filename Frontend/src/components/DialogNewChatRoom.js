import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useGeolocated } from "react-geolocated";

export default function DialogNewChatRoom() {
  const [open, setOpen] = React.useState(false);
  const refSaveGPSdata =React.useRef (false);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
  useGeolocated({
      positionOptions: {
          enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
  });
  const handleClickChip = () => {
    console.info('You clicked the Chip.');
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        neuen Chatroom erstellen
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Neuen Chatroom erstellen</DialogTitle>
        <DialogContent>
          <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name der Gruppe"
              fullWidth
              variant="standard"
            />
          <FormGroup>
            <FormControlLabel control={<Switch defaultChecked />} label="privat" />
            {isGeolocationEnabled 
            ? <FormControlLabel control={<Switch inputRef={refSaveGPSdata}/>} label="GPS-Daten speichern" />             
            : "Der Browser unterstützt keine Geo-Location"
            }
            
          </FormGroup>
          {coords !== undefined && refSaveGPSdata.current.value ===true
            ? <DialogContentText>
                "Koordinaten: Latitude:" {coords.latitude} " Longitude: " {coords.longitude}
              </DialogContentText>
            : null
           }
            <DialogContentText>Interessen der Gruppe</DialogContentText>
            <Stack>
              <Chip label="Festivals" variant="outlined" onClick={handleClickChip} />
              <Chip label="Politik" variant="outlined" onClick={handleClickChip} />
              <Chip label="Sport" variant="outlined" onClick={handleClickChip} />
              <Chip label="Programmieren" variant="outlined" onClick={handleClickChip} />
              <TextField label="neue Interessen hinzufügen"></TextField>
            </Stack>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          <Button onClick={handleClose}>Gruppe erstellen</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
