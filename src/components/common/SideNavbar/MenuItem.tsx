import React , {useState} from 'react'
import s from './SideNavbar.module.css'
import { MenuItemProps } from './Types'
import { Badge, Typography } from '@pw-tech/omni-ui';
import cn from "clsx";
import ChevronDown from '@/assets/icons/ChevronDown';
import SubMenuItem from './SubMenuItem';

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


  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);

    const showSubmenu = () => {
        setIsSubmenuOpen(!isSubmenuOpen)
    };

  const handleClick = () => {
    if (subMenuOption) {
      showSubmenu();
    }
    else {
      onMenuItemClick();
    }

  };
  const menuOptionClassName = cn(s.menuOption, {
    [s.active]: isActive,
  })

  const toggleIconClassName = cn(s.toggleIcon, {
    [s["isSubmenuOpen"]]:  isSubmenuOpen
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
          {isNew && (<img src="https://s3-alpha-sig.figma.com/img/bc50/fe82/484193813421ae9212624b50e2fb21df?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=TjVwBCKo2xa4iwGrpuy9lrLdpMYWJiHpPN7pekbdKOqcz2G7bhmYpDa2zbtyjjFyvt54dMgB5aj3-1YBPW0u0riTticiqXewMFrh78gHyi0DG6HGNP84LvqiMHgRPwdd7oMDP0OFmOBtSBjxCC8hmAKtVDS5KFF4ortf03XEc4eP~5dz68tLGvw0l2wZRhxGOw5h201FwAVujBJvwIO8uQHLsAUF~HX6IRYtIH3OtP5Fg9fLEAa8dJibisZakGxZ91MUn54amaLsXQ1fooPuJnKEaI9t0Y6hUJ7hSB5gW~8x5OVFeoTvH0jWDy3Ovwad6zFPRwqnUvOoY~P5w5zPcg__" alt="New" className="w-40 h-16 shrink-0" />)}

        {badge &&(<Badge label={ badge} size ="small" emphasis='high' intent ='error' />)}
        {subMenuOption && (<ChevronDown className={toggleIconClassName} />)}
        </div>
        </div>
        </div>
          {subMenuOption && (
            <SubMenuItem subMenuOption={subMenuOption} isSubmenuOpen = {isSubmenuOpen}  activeItem={activeItem}
            onSubMenuItemClick={onSubMenuClick} />
      )}
      </>)}
  </React.Fragment>
  )
}

export default MenuItem
