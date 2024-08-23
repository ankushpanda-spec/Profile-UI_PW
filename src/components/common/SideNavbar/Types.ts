export interface SideNavbarProps {
    isSideNavOpen?: boolean;
    logo?: React.ReactNode;
    logoText?: string;
    section?: MenuSection[];
}

interface SubItem {
   title: string;
   icon: React.ReactNode;
   url: string;
   isActive: boolean;
  isNew: boolean;
  badgeNo: number;
}

interface MenuOption {
  title: string;
  icon:React.ReactNode;
  url: string;
  isActive: boolean;
  isNew: boolean;
  badgeNo: number;
  subMenuOption: SubItem[];
}

interface MenuSection {
    customHeader: string;
    menuOptions: MenuOption[];
}
