import { List, ListItem, ListItemText} from '@material-ui/core'
import React, { useState } from 'react'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { db } from '../firebase';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { Box, Button, Input, Modal } from '@mui/material';

const CreateTodo = ({ listItem }) => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  
  const handleUpdate = async (event) => {
    event.preventDefault();
    const Id = listItem.id;
    const userDoc = doc(db, "Todo",Id );
    const newInput = {text: input }
    await updateDoc(userDoc, newInput);
    setInput('');
    setOpen(false);
  }
  const deleteMe = async (Id) => {
    const deleteUser = doc(db, "Todo", Id);
    await deleteDoc(deleteUser);
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={e => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <center>
            <form style={{display:"flex",flexDirection:"column"}}>
              <Input type='text' placeholder={listItem.text} value={input} onChange={(e) => {setInput(e.target.value)}} />
              <Button type='submit' onClick={handleUpdate}>Update</Button>
            </form>
          </center>
        </Box>
      </Modal>
      <List>
        <ListItem>
          <ListItemText primary="Todo" secondary={listItem.text} />
          <Button variant="contained" onClick={e => setOpen(true)}>
            EDIT
          </Button>
          <DeleteForeverIcon onClick={() => { deleteMe(listItem.id) }} />
        </ListItem>
      </List>
    </div>
  )
}

export default CreateTodo