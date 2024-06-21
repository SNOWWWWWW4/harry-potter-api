'use client';
import { useState, useEffect, useRef } from 'react';
import styles from './page.module.css';
import InfoModal from '@/components/modal/InfoModal';
import { Button } from '@mui/material';
import { IPotterCharacter } from '@/interface/interface';
import { callAPI } from '@/utils/data';
import Image from 'next/image';
import Lenis from 'lenis';
import { MotionValue, motion, useScroll, useTransform } from 'framer-motion';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allCharNames, setAllCharNames] = useState<IPotterCharacter[]>([]);
  const [selectedCharacter, setSelectedCharacter] =
    useState<IPotterCharacter | null>(null);
  const container = useRef<HTMLElement>(null);

  const saveData = async () => {
    const data: IPotterCharacter[] = await callAPI('api/characters');
    setAllCharNames(data);
  };

  const handleOpenModal = (character: IPotterCharacter) => {
    setSelectedCharacter(character);
    setIsModalOpen(true);
  };

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end'],
  });

  useEffect(() => {
    saveData();

    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);

      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [isModalOpen]);

  return (
    <main className={styles.mainContainer} ref={container}>
      <Landing scrollYProgress={scrollYProgress} />

      <Table
        allCharNames={allCharNames}
        handleOpenModal={handleOpenModal}
        scrollYProgress={scrollYProgress}
      />

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

const Landing = ({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) => {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <motion.section
      className='min-h-screen flex flex-col justify-center items-center top-0 sticky bg-[#5d5d66]'
      style={{ scale, rotate }}
    >
      <h1 className='text-4xl text-white font-black'>
        Learn More About Harry Potter Characters
      </h1>

      <h2 className='text-white text-xl font-semibold p-4'>
        Scroll down to see all the characters
      </h2>
    </motion.section>
  );
};

interface TableProps {
  allCharNames: IPotterCharacter[];
  handleOpenModal: (character: IPotterCharacter) => void;
  scrollYProgress: MotionValue<number>;
}

const Table = ({
  allCharNames,
  handleOpenModal,
  scrollYProgress,
}: TableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const charsPerPage = 8;

  const totalChars = allCharNames.length;
  const totalPages = Math.ceil(totalChars / charsPerPage);

  const startIdx = (currentPage - 1) * charsPerPage;
  const endIdx = startIdx + charsPerPage;
  const currentChars = allCharNames.slice(startIdx, endIdx);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [5, 0]);

  return (
    <motion.section
      style={{ scale, rotate }}
      className='bg-[#090923] min-h-screen relative'
    >
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-4 pb-4 pt-12'>
        {currentChars.length > 0 ? (
          currentChars.map((char) => (
            <div
              key={char.name}
              className='bg-slate-800/30 rounded-3xl p-4 flex flex-col justify-center items-center'
            >
              <h1 className='text-white'>{char.name}</h1>

              {char.image ? (
                <Image
                  src={char.image}
                  alt='image'
                  width={200}
                  height={200}
                  className='aspect-square object-contain my-4'
                />
              ) : (
                <Image
                  src={''}
                  alt='has no image'
                  width={200}
                  height={200}
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

        {/* Pagination Controls */}
      </div>
      <div className='flex justify-center items-center w-full mt-2'>
        <Button
          variant='contained'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className='mx-4 text-white'>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant='contained'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </motion.section>
  );
};