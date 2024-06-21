'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';
import InfoModal from '@/components/modal/InfoModal';
import { Button } from '@mui/material';
import { IPotterCharacter } from '@/interface/interface';
import { callAPI } from '@/utils/data';
import Image from 'next/image';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCharNames, setAllCharNames] = useState<IPotterCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<IPotterCharacter | null>(null);

  const saveData = async () => {
    const data: IPotterCharacter[] = await callAPI('api/characters');
    setAllCharNames(data);
  };

  useEffect(() => {
    saveData();
  }, []);

  const handleOpenModal = (character: IPotterCharacter) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  return (
    <main className={styles.mainContainer}>
      <div className='min-h-screen'>
        <h1 className='text-4xl text-center text-white'>Characters</h1>
      </div>
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-16 lg:grid-cols-4 lg:gap-24 mx-20'>
        {allCharNames.length > 0 ? (
          allCharNames.map((char) => (
            <div
              key={char.name}
              className='bg-slate-800/30 rounded-3xl p-4 flex flex-col justify-center items-center '
            >
              <h1 className='text-white'>{char.name}</h1>

              {char.image ? (
                <Image
                  src={char.image}
                  alt='image'
                  width={250}
                  height={250}
                  className='aspect-square object-contain my-4'
                />
              ) : (
                <Image
                  src={''}
                  alt='has no image'
                  width={250}
                  height={250}
                  className='aspect-square object-contain my-4 bg-slate-600'
                />
              )}
              <Button variant='outlined' onClick={() => handleOpenModal(char)}>
                Learn More
              </Button>
            </div>
          ))
        ) : (
          <div>
            <h1>Loading...</h1>
          </div>
        )}
      </div>

      {selectedCharacter && (
        <InfoModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          character={selectedCharacter}
        />
      )}
    </main>
  );
}