import React from 'react'
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from "uuid";
import { FilePicker  } from 'react-file-picker'
import { useAppContext } from './providers/AppContext';
import Grid from '@mui/material/Grid';
import SendIcon from '@mui/icons-material/Send';


function EditProfil() {
  const defaultInterests = [
    { id: "1", label: "Festivals", users: []},
    { id: "2", label: "Politik", users: [] },
    { id: "3", label: "Sport" , users: []},
    { id: "4", label: "Programmieren", users: [] },
  ]
  const defaultLanguages = [
    { id: "10001", label: "Deutsch", users: [] },
    { id: "10002", label: "Englisch", users: [] },
    { id: "10003", label: "Spanisch", users: [] },
    { id: "10004", label: "Portugiesisch", users: [] },
  ]
  const [selected, setSelected] = React.useState(new Set());
  const [selectedLang, setSelectedLang] = React.useState(new Set());
  const [interests, setInterests] = React.useState(defaultInterests);
  const [languagues, setLanguagues] = React.useState(defaultLanguages);
  const refInterestInput = React.useRef();
  const refLanguagueInput = React.useRef();
  const {uploadImg, verifyWord}=useAppContext(); 

  const [image, setImage] = React.useState({ preview: '', data: '' })
  const [status, setStatus] = React.useState('')
  
  const handleClickLanguage=(id) => {
    // treat state as immutable
   // React only does a shallow comparison so we need a new Set
   const newSet = new Set(selectedLang);
   if (newSet.has(id)) newSet.delete(id);
   else newSet.add(id);
   setSelectedLang(newSet);
 }
  const handleClickInterest=(id) => {
     // treat state as immutable
    // React only does a shallow comparison so we need a new Set
    const newSet = new Set(selected);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelected(newSet);
  }
  const newImg = (file) => {
    console.log(file);
    let formData = new FormData()
    formData.append('file', file.data)
    console.log(formData);
    uploadImg(file);
  }

  const addInterest = async () => {
    if (refInterestInput.current.value !== "") {

      const found = interests.find(obj => {
        return obj.label.toLowerCase() === refInterestInput.current.value.toLowerCase();
      });
      console.log(found);
      if (found === undefined){
        // Eintrag existiert noch nicht und muss neu angelegt werden
        let isWord = await verifyWord(refInterestInput.current.value);
        
        if (isWord){
          let newID = uuidv4()
          setInterests([... interests, { id:newID , label: refInterestInput.current.value}]);
          handleClickInterest(newID);
        }
       
      }else
      {
        console.log(found.id)
        handleClickInterest(found.id);
      }
      }
      refInterestInput.current.value = "";
  }
const addLanguage = async () => {
  if (refLanguagueInput.current.value !== "") {
    
    //languagues.find(label: refLanguagueInput.current.value)
    const found = languagues.find(obj => {
      return obj.label.toLowerCase() === refLanguagueInput.current.value.toLowerCase();
    });
    console.log(found);
    if (found === undefined){
      // Eintrag existiert noch nicht und muss neu angelegt werden
      let isWord = await verifyWord(refLanguagueInput.current.value);
        
      if (isWord){
        let newID = uuidv4()
        setLanguagues([... languagues, { id:newID , label: refLanguagueInput.current.value}]);
        handleClickLanguage(newID);
      }
    }else
    {
      console.log(found.id)
      handleClickLanguage(found.id);
    }
    }
    refLanguagueInput.current.value = "";
   
}

  const handleSave = () => {
    
  }

  const handleSubmit = async (e) => {
    console.log("handleSubmit")
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', image.data)
    uploadImg(formData);
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImage(img)
  }

  return (<div>
            
              <div>
                {
                  interests.map((interest) => (
                    <Chip
                      key={interest.id}
                      onClick={() => handleClickInterest(interest.id)}
                      variant={selected.has(interest.id) ? "filled" : "outlined"}
                      label= {interest.label}
                    >
                    </Chip>))
                }
                
              </div>
              
             
              <Grid container style={{padding: '20px'}}>
                  <Grid item xs={11}>
                      <TextField id="outlined-basic-email" 
                                  label="Type Something" fullWidth
                                  inputRef={refInterestInput} />
                  </Grid>
                  <Grid  align="right">
                      <SendIcon onClick={addInterest}/>
                  </Grid>
              </Grid>

             
           
            
              <div>
                {
                  languagues.map((lang) => (
                    <Chip
                      key={lang.id}
                      onClick={() => handleClickLanguage(lang.id)}
                      variant={selectedLang.has(lang.id) ? "filled" : "outlined"}
                      label= {lang.label}
                    >   
                    </Chip>))
                }
                
              </div>
              <Grid container style={{padding: '20px'}}>
                  <Grid item xs={11}>
                      <TextField id="outlined-basic-email" 
                                  label="Type Something" fullWidth
                                  inputRef={refLanguagueInput} />
                  </Grid>
                  <Grid  align="right">
                      <SendIcon onClick={addLanguage}/>
                  </Grid>
              </Grid>
           
              <div>
                <h1>Upload to server</h1>
                {image.preview && <img src={image.preview} width='100' height='100' />}
                <hr></hr>
                <form onSubmit={handleSubmit}>
                  <input type='file' name='file' onChange={handleFileChange}></input>
                  <button type='submit'>Submit</button>
                </form>
                {status && <h4>{status}</h4>}
              </div>
              <FilePicker
                extensions={['jpg', 'jpeg', 'png']}
                onChange={FileObject =>newImg (FileObject)}
              >
                <button>
                  Click to upload Image
                </button>
              </FilePicker>

             

            <Button onClick={handleSave}>Speichern</Button>
          </div>
  )
}

export default EditProfil