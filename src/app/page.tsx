'use client'
import Character from '@/components/characters/Character';
import styles from './page.module.css';
import InfoModal from '@/components/modal/InfoModal';
import { useState } from 'react';
import { Button } from '@mui/material';

export default function Home() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <main className={styles.mainContainer}>

      <Button variant="outlined" onClick={() => setIsModalOpen(true)}>Click me</Button>
      <InfoModal  isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
    </main>
  );
}
