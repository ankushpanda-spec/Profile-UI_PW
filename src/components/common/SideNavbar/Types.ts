export interface SideNavbarProps {
    isSideNavOpen?: boolean;
    logo?: React.ReactNode;
    logoText?: string;
    section?: MenuSection[];
}


interface MenuItem {
  title?: string;
  icon?: React.ReactNode;
  url?: string;
  isActive?: boolean;
  isNew?: boolean;
  badge?: string;
}



export interface MenuItemProps extends MenuItem {
  subMenuOption?: MenuItem[]
  isSubmenuOpen?: boolean;
  onClick?: () => void;
}

interface MenuOption extends MenuItem {
  subMenuOption: MenuItem[];
}

interface MenuSection {
    customHeader: string;
    menuOptions: MenuOption[];
}
