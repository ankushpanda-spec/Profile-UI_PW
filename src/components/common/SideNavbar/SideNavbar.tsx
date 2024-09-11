import LogoIcon from "@/assets/icons/LogoIcon"
import {fetchCohortConfig} from '@/api';
import cn from 'clsx'
import { useState , useEffect } from 'react'
import LogoSection from './LogoSection'
import MenuCategory from './MenuCategory'
import { sideNavbarOptions as initialSideNavbarOptions } from './SideNavbar.config'
import s from "./SideNavbar.module.css"
import { SideNavbarProps } from './Types'
import { useNavigate, useLocation } from "react-router-dom";
import { MenuSection } from "./Types";

function SideNavbar(props: SideNavbarProps) {
  const {
    // isSideNavOpen = true,
    logo = <LogoIcon className={s.logo} />,
    logoText = "Physics Wallah",
    section = initialSideNavbarOptions,
    className,
    bottomStroke = false,
    url = '/',
  } = props;


  // State to manage the currently active menu item
  const navigate = useNavigate();
  const location = useLocation();
  const currentUrl = location.pathname;
  
  const [activeItem, setActiveItem] = useState("");
  const [sideNavbarOptions, setSideNavbarOptions] = useState<MenuSection[]>(initialSideNavbarOptions);

  const [webConfig , setWebConfig] = useState<Record<string , boolean> | null>(null);
    
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cohortData = await fetchCohortConfig();
        setWebConfig(cohortData.webConfig);
      } catch (error) {
        console.error("Error fetching cohort data:", error);
      }
    };

    fetchData();
  }, []);

  const updateMenuOptions = ():MenuSection[] => {
  return initialSideNavbarOptions.map(category => ({
    ...category,
    menuOptions: category.menuOptions.map(option => {
      const isOptionEnabled = option.configName
        ? webConfig?.[option.configName] ?? option.isEnabled
        : option.isEnabled;

      const updatedSubMenuOptions = option.subMenuOption?.map(subOption => {
        const isSubOptionEnabled = subOption.configName
          ? webConfig?.[subOption.configName] ?? subOption.isEnabled
          : subOption.isEnabled;

        return { ...subOption, isEnabled: isSubOptionEnabled };
      });

      return {
        ...option,
        isEnabled: isOptionEnabled,
        subMenuOption: updatedSubMenuOptions,
      };
    }),
  }));
  };

   useEffect(() => {
    setSideNavbarOptions(updateMenuOptions());
  }, [webConfig]);

  console.log("sideNavbarOptions: ", sideNavbarOptions);
  useEffect(() => {
    const isActive = sideNavbarOptions.some(category =>
    category.menuOptions.some(option => 
      option.url === currentUrl || 
      (option.subMenuOption?.some(subOption => subOption.url === currentUrl))
    )
  );
  
  if (isActive) {
    setActiveItem(currentUrl);
  }
  else {
    setActiveItem("");
  }
}, [location]);
  
  const handleItemClick = (url: string | undefined , external:boolean | undefined) => {
  
    if (url) {
      if (external) {
        window.open(url, '_blank');
        navigate('/')
      }
      else {
        navigate(url);
        setActiveItem(url)
      }
      
    }
  
};

  const sideBarClassName = cn(s.sideBar, className,
  );

  return (
    <div className={sideBarClassName}>

      {/* logo section */}

      <LogoSection logo={logo} logoText={logoText} url={url} />

      {/* content section */}
      <div className={s.contentWrapper}>
        {sideNavbarOptions.map((category, categoryIndex) => (
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
