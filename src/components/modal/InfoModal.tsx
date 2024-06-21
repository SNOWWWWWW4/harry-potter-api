import { Close } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import React from 'react';
import { IPotterCharacter } from '@/interface/interface';

interface InfoModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  character: IPotterCharacter;
}

const InfoModal: React.FC<InfoModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  character,
}) => {
  return (
    <Dialog open={isModalOpen} fullWidth={true} maxWidth={'md'}>
      <DialogTitle>{character.name}</DialogTitle>
      <IconButton
        sx={{
          position: 'absolute',
          top: 8,
          right: 8,
          color: (theme) => theme.palette.grey[500],
        }}
        onClick={() => {
          setIsModalOpen(false);
        }}
      >
        <Close />
      </IconButton>
      <DialogContent dividers className='h-[615px]'>
        <div className='flex flex-col items-center'>
          <img
            src={character.image}
            alt={character.name}
            className='w-48 h-48 object-cover rounded-xl mb-4'
          />
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>House:</strong> {character.house}
          </p>
          <p>
            <strong>Date of Birth:</strong> {character.dateOfBirth}
          </p>
          <p>
            <strong>Ancestry:</strong> {character.ancestry}
          </p>
          <p>
            <strong>Eye Colour:</strong> {character.eyeColour}
          </p>
          <p>
            <strong>Hair Colour:</strong> {character.hairColour}
          </p>
          <p>
            <strong>Wand:</strong> {character.wand.wood} wood,{' '}
            {character.wand.core} core, {character.wand.length} inches
          </p>
          <p>
            <strong>Patronus:</strong> {character.patronus}
          </p>
          <p>
            <strong>Actor:</strong> {character.actor}
          </p>
          <p>
            <strong>Alive:</strong> {character.alive ? 'Yes' : 'No'}
          </p>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;
