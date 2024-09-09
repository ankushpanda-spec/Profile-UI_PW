import React from 'react'
import { Typography } from '@pw-tech/omni-ui'
import s from './SideNavbar.module.css'
import {LogoSectionProps} from './Types'

function LogoSection(props: LogoSectionProps) {
  const {
    logo,
    logoText,
    url,
  } = props;

  const redirectToHome = (url: string | undefined) => {
    alert("Redirecting to HomePage")
}
  return (
    <div className={s.logoContainer} onClick = {() => redirectToHome(url)}>  
          {logo && (<div>{logo}</div>)}
            {logoText && (
          <Typography weight="semi-bold" color="static-black" className={s.logoText}>{logoText}
          </Typography>
            )}
      </div>
  )
}

export default LogoSection