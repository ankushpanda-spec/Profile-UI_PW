import React , {useRef} from 'react'
import s from './SideNavbar.module.css'
import MenuItem from './MenuItem';
import { SubMenuItemProps } from './Types';
import cn from 'clsx'

function SubMenuItem(props: SubMenuItemProps) {
    const {
        subMenuOption,
        isSubmenuOpen,
        activeItem,
        onSubMenuItemClick,
    } = props;

    const subMenucontentRef = useRef<HTMLDivElement>(null);
    const maxHeight = isSubmenuOpen ? `${subMenucontentRef.current?.scrollHeight}px` : '0px';
    
    const subMenuClassName = cn(s.subMenu,
        {
        [s["isSubmenuOpen"]]: isSubmenuOpen,
            
        })
return (
    <div className={subMenuClassName} style={{maxHeight}}  ref = {subMenucontentRef} >
    {subMenuOption?.map((subOption, subOptionIndex) => (
        <MenuItem
        key={subOptionIndex}
        title={subOption.title}
        isNew={subOption.isNew}
        isActive={subOption.url === activeItem}
        url={subOption.url}
        badge={subOption.badge}
        isEnabled={subOption.isEnabled}
        onMenuItemClick={() => onSubMenuItemClick?.(subOption.url , subOption.external)} 
        />
    ))}
    </div>
);

}

export default SubMenuItem