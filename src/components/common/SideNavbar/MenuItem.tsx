import ChevronDown from '@/assets/icons/ChevronDown';
import IsNew from '@/assets/icons/IsNew';
import { Badge, Typography } from '@pw-tech/omni-ui';
import cn from "clsx";
import React, { useState } from 'react';
import s from './SideNavbar.module.css';
import SubMenuItem from './SubMenuItem';
import { MenuItemProps } from './Types';

function MenuItem(props: MenuItemProps) {
  const {
    title,
    icon,
    url,
    isActive,
    isNew,
    badge,
    subMenuOption,
    external,
    isEnabled,
    activeItem,
    onMenuItemClick,
    onSubMenuClick,
  } = props;

  const isNested = (subMenuOption && subMenuOption.length > 0);
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

  const showSubmenu = () => {
    setIsSubmenuOpen(!isSubmenuOpen)
  };

  const handleClick = () => {
    if (isNested) {
      showSubmenu();
    }
    else {
      onMenuItemClick?.(url, external);
    }

  };
  const menuOptionClassName = cn(s.menuOption, {
    [s.active]: isActive,
  })

  const toggleIconClassName = cn(s.toggleIcon, {
    [s["isSubmenuOpen"]]: isSubmenuOpen
  })


  return (
    <React.Fragment>
      {isEnabled && (
        <>
          <div className={menuOptionClassName} onClick={handleClick}>
            <div className={s.optionWrapper}>
              <div className={s.leftOptions}>
                {icon}
              </div>

              <Typography component='div' variant='small' className={s.optionTitle}>
                {title}
              </Typography>
              <div className={s.rightOptions}>
                {isNew && (<IsNew />)}

                {badge && (<Badge label={badge} size="small" emphasis='high' intent='error' />)}
                {isNested && (<ChevronDown className={toggleIconClassName} />)}
              </div>
            </div>
          </div>
          {isNested && (
            <SubMenuItem subMenuOption={subMenuOption} isSubmenuOpen={isSubmenuOpen} activeItem={activeItem}
              onSubMenuItemClick={onSubMenuClick} />
          )}
        </>)}
    </React.Fragment>
  )
}

export default MenuItem
