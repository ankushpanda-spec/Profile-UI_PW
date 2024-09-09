export interface SideNavbarProps extends LogoSectionProps {
    isSideNavOpen?: boolean;
    section?: MenuSection[];
    className?: string;
    bottomStroke?: boolean;
}

interface MenuItem {
  title?: string;
  icon?: React.ReactNode;
  url?: string;
  isActive?: boolean;
  external?: boolean;
  isEnabled?: boolean;
  configName?: string;
  isNew?: boolean;
  badge?: string;
}
export interface MenuItemProps extends MenuItem {
  subMenuOption?: MenuItem[]
  activeItem?:string
  onMenuItemClick?: () => void
  onSubMenuClick?: () => void
}

interface MenuOption extends MenuItem {
  subMenuOption: MenuItem[];
}

interface MenuSection {
  customHeader: string;
  menuOptions: MenuOption[];
}

export interface LogoSectionProps {
  logo?: React.ReactNode;
  logoText?: string;
  url?: string;
}

export interface MenuCategoryProps{
  category: MenuSection;
  bottomStroke?: boolean;
  activeItem?: string;
  onItemClick?:() => void;
}

export interface SubMenuItemProps{
  subMenuOption?: MenuItem[]
  isSubmenuOpen?: boolean;
  activeItem?: string;
  onSubMenuItemClick?:() => void;
}
