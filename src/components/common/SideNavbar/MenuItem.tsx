import React from 'react'
import s from './SideNavbar.module.css'
import { MenuItemProps } from './Types'
import { Badge, Typography } from '@pw-tech/omni-ui';
import cn from "clsx";
import ChevronDown from '@/assets/icons/ChevronDown';

function MenuItem(props: MenuItemProps) {
const {
  title,
  icon,
  url,
  isActive,
  isNew,
  badge,
  subMenuOption,
  isSubmenuOpen,
  onClick,
    } = props;
    const menuOptionClassName = cn(s.menuOption, {
        [s.active] : isActive
    })
  const toggleIconClassName = cn(s.toggleIcon, {
    [s.isSubmenuOpen]:  isSubmenuOpen
  })

    return (
        <div className={menuOptionClassName} onClick={onClick}>
                      <div className={s.optionWrapper}>
          <div className={s.leftOptions}>
                          {icon}
                </div>
          <div className={s.optionTitle} >
                  <Typography component='div' variant='small'> {title }</Typography>
                </div>
              
                        
              <div className={s.rightOptions}>
                  
                   {isNew &&  (<div>New</div>)}
                     {badge&&(
                        <Badge label={ badge} size ="small" emphasis='high' intent ='error' />
                    )}
                  {subMenuOption && ( <ChevronDown className= {toggleIconClassName} />
                         )}
                       </div>
                      </div>
                    </div>
  )
}

export default MenuItem