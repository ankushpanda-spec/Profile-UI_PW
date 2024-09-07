import React from 'react'
import { useState} from 'react'
import s from "./SideNavbar.module.css"
import { SideNavbarProps} from './Types'
import { sideNavbarOptions } from './SideNavbar.config'
import LogoIcon from "@/assets/icons/LogoIcon"
import cn from 'clsx'
import {useScreen} from '@/context';
import LogoSection from './LogoSection'
import MenuCategory from './MenuCategory'


function SideNavbar(props: SideNavbarProps) {
  const {
    // isSideNavOpen = true,
    logo = <LogoIcon className={s.logo } />,
    logoText = "Physics Wallah",
    section = sideNavbarOptions,
    className,
    bottomStroke = false,
    url ='/',
  } = props;

  const { isMobile } = useScreen();

  // State to manage the currently active menu item
  const [activeItem, setActiveItem] = useState<string | undefined>("/study");

  const handleItemClick = (url: string) => {

    setActiveItem(url);
    alert(`Item is clicked , url: ${url}`)
    
  };
  
 const sideBarClassName = cn(s.sideBar, className, {
    [s.isMobile]: isMobile,
});

return (
  <div className={sideBarClassName}>

    {/* logo section */}
    
    <LogoSection logo={logo} logoText={ logoText} url = {url} />
        
    {/* content section */}
     <div className={s.contentWrapper}>
        {section.map((category, categoryIndex) => (
          <MenuCategory
          key={categoryIndex}
          category={category}
          bottomStroke={bottomStroke}
          activeItem={activeItem}
          onItemClick={handleItemClick} 
          />
        ))}
     </div>
    </div>
)}

export default SideNavbar;
