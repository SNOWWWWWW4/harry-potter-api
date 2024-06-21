import { Close } from '@mui/icons-material'
import { Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material'
import React from 'react'
import Character from '../characters/Character';

interface InfoModalProps{
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoModal: React.FC<InfoModalProps> = ({isModalOpen, setIsModalOpen}) => {
  return (
    <Dialog open={isModalOpen} fullWidth={true} maxWidth={'md'}>
      <DialogTitle>Character name goes here</DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={() => { setIsModalOpen(false) }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers className='h-[615px]'>
        <Character />
      </DialogContent>

      <DialogActions></DialogActions>
    </Dialog>
  );
}

export default InfoModal
