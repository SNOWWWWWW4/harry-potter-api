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
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 '>
          <div className='flex flex-col'>
            <p className='text-pretty my-2'>
              <strong>Species:</strong> {character.species}
            </p>
            <p className='text-pretty my-2'>
              <strong>Gender:</strong> {character.gender}
            </p>
            <p className='text-pretty my-2'>
              <strong>House:</strong> {character.house}
            </p>
            <p className='text-pretty my-2'>
              <strong>Date of Birth:</strong> {character.dateOfBirth}
            </p>
            <p className='text-pretty my-2'>
              <strong>Ancestry:</strong> {character.ancestry}
            </p>
            <p className='text-pretty my-2'>
              <strong>Eye Colour:</strong> {character.eyeColour}
            </p>
            <p className='text-pretty my-2'>
              <strong>Hair Colour:</strong> {character.hairColour}
            </p>
            <p className='text-pretty my-2'>
              <strong>Wand:</strong> {character.wand.wood} wood,{' '}
              {character.wand.core} core, {character.wand.length} inches
            </p>
            <p className='text-pretty my-2'>
              <strong>Patronus:</strong> {character.patronus ? (character.patronus) : 'N/A'}
            </p>
            <p className='text-pretty my-2'>
              <strong>Actor:</strong> {character.actor}
            </p>
            <p className='text-pretty my-2'>
              <strong>Alive:</strong> {character.alive ? 'Yes' : 'No'}
            </p>
          </div>
          <div>
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                className='w-full h-full object-cover mr-2 my-2 rounded-xl'
              />
            ) : (
              <div className='w-full h-full object-cover mr-2 my-2 bg-slate-600 rounded-xl'>
                No Image Available
              </div>
            )}
          </div>
        </div>
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setIsModalOpen(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InfoModal;
