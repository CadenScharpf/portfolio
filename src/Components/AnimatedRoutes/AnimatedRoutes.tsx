import { Route, Routes, useLocation } from 'react-router-dom';
import { Home, Resume, Works } from '../../Pages';
import { AnimatePresence, motion, PanInfo, Variants } from 'framer-motion';
import { WebApplications } from '../../Pages/Works/Components';
import { BackendApps } from '../../Pages/Works/Components/BackendApps';
import { TestPage } from '../../Pages/TestPage/TestPage';
import React, { useState } from 'react';
import { ContentWindow } from '../ContentWindow';
import { Box, Container } from '@mui/material';
import { wrap } from '@popmotion/popcorn';

interface Page {
  path: string;
  component: React.ComponentType;
}

const PAGES: Page[] = [
  { path: '/', component: Home },
  { path: '/resume', component: Resume },
  { path: '/works', component: Works },
  { path: '/testpage', component: TestPage },
];

const sliderVariants: Variants = {
  incoming: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    scale: 1.2,
    opacity: 0,
  }),
  active: { x: 0, scale: 1, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    scale: 1,
    opacity: 0.2,
  }),
};

const sliderTransition = {
  duration: 2,
  ease: [0.56, 0.03, 0.12, 1.04],
};

export function AnimatedRoutes() {
  const location = useLocation();
  const [[itemCount, direction], setItemCount] = useState<[number, number]>([0, 0]);
  const activeItemIndex = wrap(0, PAGES.length, itemCount);

  const swipeToItem = (swipeDirection: number) => {
    setItemCount([itemCount + swipeDirection, swipeDirection]);
  };

  const dragEndHandler = (dragInfo: PanInfo) => {
    const draggedDistance = dragInfo.offset.x;
    const swipeThreshold = 50;
    if (draggedDistance > swipeThreshold) {
      swipeToItem(-1);
    } else if (draggedDistance < -swipeThreshold) {
      swipeToItem(1);
    }
  };

  const skipToItem = (imageId: number) => {
    let changeDirection = 0;
    if (imageId > activeItemIndex) {
      changeDirection = 1;
    } else if (imageId < activeItemIndex) {
      changeDirection = -1;
    }
    setItemCount([imageId, changeDirection]);
  };

  return (
    <AnimatePresence initial={true}  mode='wait'>
      <Container sx={{width: '80%', height: '90%'}}>
      <button onClick={() => swipeToItem(-1)}>Prev</button>

        <Box
          key={activeItemIndex}
          component={motion.div}
          variants={sliderVariants}
          custom={direction}
          initial="incoming"
          animate="active"
          exit="exit"
          transition={sliderTransition}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, dragInfo) => dragEndHandler(dragInfo)}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '25px',
            alignItems: 'center',
            height: '90%',
            overflow: 'scroll',
            margin: '1vh',
            border: '4px solid transparent',
            background: 'linear-gradient(white, white) padding-box, linear-gradient(to right, darkblue, darkorchid) border-box',
          }}
        >
          {React.createElement(PAGES[activeItemIndex].component)}
        </Box>
      <button onClick={() => swipeToItem(1)}>Next</button>
      </Container>
    </AnimatePresence>
  );
}
