import LogoIcon from "@/assets/icons/LogoIcon"
import { useScreen } from '@/context'
import cn from 'clsx'
import { useState } from 'react'
import LogoSection from './LogoSection'
import MenuCategory from './MenuCategory'
import { sideNavbarOptions } from './SideNavbar.config'
import s from "./SideNavbar.module.css"
import { SideNavbarProps } from './Types'
import { useNavigate } from "react-router-dom";

function SideNavbar(props: SideNavbarProps) {
  const {
    // isSideNavOpen = true,
    logo = <LogoIcon className={s.logo} />,
    logoText = "Physics Wallah",
    section = sideNavbarOptions,
    className,
    bottomStroke = false,
    url = '/',
  } = props;


  // State to manage the currently active menu item
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<string | undefined>("/study");

  const handleItemClick = (url: string) => {

    setActiveItem(url);
    navigate(url);

  };

  const sideBarClassName = cn(s.sideBar, className, 
  );

  return (
    <div className={sideBarClassName}>

      {/* logo section */}

      <LogoSection logo={logo} logoText={logoText} url={url} />

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
  )
}

export default SideNavbar;
