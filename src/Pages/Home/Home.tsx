import React from 'react'
import { motion } from 'framer-motion'
import { PAGE_STYLE, TRANSITION_DURATION, } from '../PageStyle'
import { useTheme, IconButton } from '@mui/material'
import { LayoutContext } from '../../Context';
import { LandingSection } from './Sections';

import { ContentWindow } from '../../Components/ContentWindow';


export function Home() {
  const theme = useTheme();
  const sections = 1;
  const styles = {

    section: {
      borderRadius: '25px',
      height: '100%'
    }
  }

  return (
    <ContentWindow style={{/* background: 'linear-gradient(to right, #141e30, #243b55)' */ }}>
      <LandingSection transitionDuration={.5} />
    </ContentWindow>
  )
}
