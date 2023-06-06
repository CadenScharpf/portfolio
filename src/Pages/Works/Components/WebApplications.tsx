import { Grid } from '@mui/material'
import React from 'react'
import { Work } from './Work'
import ManimCsWebPreview from '../Assets/ManimCSWebPreview.png'
import ManimCsPreview from '../Assets/ManimCsPreview.png'
import PortfolioPreview from '../Assets/PortfolioPreview.png'

interface App {
  img: string,
  title: string,
  description: string,
  site?: string,
  github?: string,
}

const APPS = [
  {img: ManimCsWebPreview, title: 'Manim CS Web Demo', description: 'Web interfaced demonstration of the manim-cs animation library for python(github.com/CadenScharpf/manim-cs)', site: 'https://manimcs-demo.cadenscharpf.tech/', github: 'https://github.com/CadenScharpf/manim-cs-web'},
  {img: PortfolioPreview, title: 'Portfolio', description: 'Personal developer portfolio website developed using Typescript and ReactJS', site: 'https://manimcs-demo.cadenscharpf.tech/', github: 'https://github.com/CadenScharpf/manim-cs-web'},

]

export function WebApplications() {
  return (
    <>
      {APPS.map((app: App) => {
        return(<Grid key={app.title} item xs={6}><Work img={app.img} title={app.title} description={app.description} site={app.site} github={app.github} /></Grid>)
      })}
    </>
  )
}
