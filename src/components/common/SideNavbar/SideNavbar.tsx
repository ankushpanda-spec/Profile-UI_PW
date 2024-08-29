import React from 'react'
import { useState , useRef} from 'react'
import s from "./SideNavbar.module.css"
import { SideNavbarProps} from './Types'
import { sideNavbarOptions } from './SideNavbar.config'
import LogoIcon from "@/assets/icons/LogoIcon"
import { Typography } from '@pw-tech/omni-ui'
import MenuItem from './MenuItem'
import cn from 'clsx'



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


const [activeItem, setActiveItem] = useState<{ categoryIndex: number | null, optionIndex: number | null, subOptionIndex: number | null }>({
  categoryIndex: 0,
  optionIndex: 0,
  subOptionIndex: null
});


// Nested state structure: categoryIndex -> { optionIndex: boolean }
  const [openSubmenus, setOpenSubmenus] = useState<{ [categoryIndex: number]: { [optionIndex: number]: boolean } }>({});
 

// Function to toggle submenu visibility using nested structure
  const handleMenuItemClick = (categoryIndex: number, optionIndex: number) => {
   
      setOpenSubmenus((prev) => ({
        ...prev,
        [categoryIndex]: {
          ...prev[categoryIndex],
          [optionIndex]: !prev[categoryIndex]?.[optionIndex], // Toggle the specific submenu's open state
        },
      }));   
    // Set active item to the clicked menu item  
    alert(`The Menu Option is clicked  categoryIndex - ${categoryIndex} optionIndex - ${optionIndex} `)
      setActiveItem((prev) => ({
        ...prev,
        categoryIndex,
        optionIndex,
        subOptionIndex: null,
      }));
    
  };

  const handleSubMenuItemClick = (categoryIndex: number, optionIndex: number, subOptionIndex: number) => {
   
    setActiveItem((prev) => ({
        ...prev,
        categoryIndex,
        optionIndex,
        subOptionIndex,
      }));
 }
  const redirectToHome = (url: string) => {
    alert("Redirecting to HomePage")
}
  const subMenucontentRef = useRef<HTMLDivElement>(null);

  const sideBarClassName = cn(s.sideBar, className);

  return (
    <div className={sideBarClassName}>

      {/* Logo Section */}

        <div className={s.logoContainer} onClick={() => redirectToHome(url)}>  
          {logo && (<div>{logo}</div>)}
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
                  const maxHeight = isSubmenuOpen?`${subMenucontentRef.current?.scrollHeight}px`: "0px";
                  const subMenuClassName = cn(s.subMenu,
                    { [s["isSubmenuOpen"]]: isSubmenuOpen })
                  return (
                    <React.Fragment key={optionIndex}>
                           {/* Main Menu Item */}
                      <MenuItem title={option?.title} icon={option?.icon}  isNew={option?.isNew} url={option?.url} subMenuOption={option?.subMenuOption} badge={option?.badge}
                        isSubmenuOpen={isSubmenuOpen}
                        isActive={activeItem.categoryIndex === categoryIndex && activeItem.optionIndex === optionIndex && option?.subMenuOption == null
                        }
                        onClick={() => handleMenuItemClick(categoryIndex, optionIndex )} // Toggle using category and option index
                      />
                      {/* Submenu Items (if any)  */}
                    {subMenuOptions && (
                        <div className={subMenuClassName} ref={subMenucontentRef} style={{ maxHeight }}>
                      {subMenuOptions.map((subOption, subOptionIndex) => (
                        <React.Fragment key={subOptionIndex}>
                          <MenuItem
                            title={subOption.title}
                            isNew={subOption.isNew}
                            url={subOption.url}
                            badge={subOption.badge}
                            isActive={activeItem.categoryIndex === categoryIndex && activeItem.optionIndex === optionIndex && activeItem.subOptionIndex === subOptionIndex
                        }
                            onClick={() => handleSubMenuItemClick(categoryIndex , optionIndex , subOptionIndex)}
                          />
                        </React.Fragment>
                      ))}
                    </div>
                  )}                         
                    </React.Fragment>
                  );
                })}
                {bottomStroke && <hr className={s.bottomStroke } />}
              </React.Fragment>
            ))}
          </div>
        </div>
)}

export default SideNavbar;
