import React from 'react'
import s from "./SideNavbar.module.css"
import { SideNavbarProps } from './Types'
import { sideNavbarOptions } from './SideNavbar.config'
import LogoIcon from "@/assets/icons/LogoIcon"
function SideNavbar(props: SideNavbarProps) {
  const {
    isSideNavOpen = true,
    logo =  <LogoIcon/>,
    logoText = "Physics Wallah",
    section = sideNavbarOptions,
  } = props;

  return (
    <>
     
        <div className={s.sideBar}>
          {/* Logo Container */}
          <div className={s.logoContainer}>
          {logo && (<div>{logo}</div>)}
            {logoText && (
              <div>{logoText}</div>
            )}
          </div>
          {/* Content Wrapper */}
          <div className={s.contentWrapper}>
            {section.map((category, categoryIndex) => (
                <>
                {/* Category Title */}
                <div key={categoryIndex} className={s.categoryTitle}>
                  {category.customHeader}
                </div>
                {category.menuOptions.map((option, optionIndex) => {
                  return (
                    <div key={optionIndex} className={s.menuOption}>
                      <div className={s.optionWrapper}>
                        <div className={s.leftOptions}>
                          {option.icon}
                        </div>
                        <div className={s.optionTitle}>{option.title}</div>
                        <div className={s.rightOptions}>
                         {option.isNew &&  (<div>New</div>)}
                          {option.badgeNo &&
                            (
                            <div className={s.badges}>
                             <div className={s.badgeAtom}>
                                {option.badgeNo}
                              </div>
                          </div>)}
                          
                       </div>
                      </div>
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
    </>
  )
}

export default SideNavbar;
