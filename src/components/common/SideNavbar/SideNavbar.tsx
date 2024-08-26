import React from 'react'
import { useState } from 'react'
import s from "./SideNavbar.module.css"
import { SideNavbarProps } from './Types'
import { sideNavbarOptions } from './SideNavbar.config'
import LogoIcon from "@/assets/icons/LogoIcon"
import { Typography } from '@pw-tech/omni-ui'
import MenuItem from './MenuItem'



function SideNavbar(props: SideNavbarProps) {
  const {
    // isSideNavOpen = true,
    logo =  <LogoIcon/>,
    logoText = "Physics Wallah",
    section = sideNavbarOptions,
  } = props;


// Nested state structure: categoryIndex -> { optionIndex: boolean }
  const [openSubmenus, setOpenSubmenus] = useState<{ [categoryIndex: number]: { [optionIndex: number]: boolean } }>({});
 

// Function to toggle submenu visibility using nested structure
  const handleSubmenuToggle = (categoryIndex: number, optionIndex: number) => {
   console.log("Toggling submenu:", { categoryIndex, optionIndex });
  setOpenSubmenus((prev) => ({
    ...prev,
    [categoryIndex]: {
      ...prev[categoryIndex],
      [optionIndex]: !prev[categoryIndex]?.[optionIndex], // Toggle the specific submenu's open state
    },
  }));
  };
  
  return (
    <div className={s.sideBar}>

      {/* Logo Section */}

        <div className={s.logoContainer}>  
          {logo && (<div className={s.logo}>{logo}</div>)}
            {logoText && (
          <Typography weight="semi-bold" color="static-black" className={s.logoText}>{logoText}
          </Typography>
            )}
      </div>

      {/* Content Section */}
      
          <div className={s.contentWrapper}>
            {section.map((category, categoryIndex) => (
                <React.Fragment  key={categoryIndex}>
                <div className={s.categoryTitle}>
                <Typography variant='tiny' component='div'> {category.customHeader.toUpperCase()}</Typography> 
                </div>
                {category.menuOptions.map((option, optionIndex) => {
                  const subMenuOptions = option.subMenuOption;
                  const isSubmenuOpen = openSubmenus[categoryIndex]?.[optionIndex] || false; // Nested access to submenu state
                  return (
                  
                    <React.Fragment key={optionIndex}>
                           {/* Main Menu Item */}
                      <MenuItem title={option?.title} icon={option?.icon} isActive={option?.isActive} isNew={option?.isNew} url={option?.url} subMenuOption={option?.subMenuOption} badge={option?.badge}
                        isSubmenuOpen = {isSubmenuOpen}
                        onClick={() => handleSubmenuToggle(categoryIndex, optionIndex)} // Toggle using category and option index
                      />

                      {/* Submenu Items (if any)  */}
                    {subMenuOptions && isSubmenuOpen && (
                    <div className='w-full'>
                      {subMenuOptions.map((subOption, subOptionIndex) => (
                        <React.Fragment key={subOptionIndex}>
                          <MenuItem
                            title={subOption.title}
                            isActive={subOption.isActive}
                            isNew={subOption.isNew}
                            url={subOption.url}
                            badge={subOption.badge}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  )}   
                   
                      
                    </React.Fragment>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
)}

export default SideNavbar;
