import React from 'react'
import { MenuCategoryProps } from './Types'
import { Typography } from '@pw-tech/omni-ui';
import s from './SideNavbar.module.css'
import MenuItem from './MenuItem';

function MenuCategory(props: MenuCategoryProps) {
    const {
        bottomStroke,
        category,
        activeItem,
        onItemClick,
    } = props;


return (
    <React.Fragment>
        <div className={s.categoryTitle}>
            <Typography variant='tiny' component='div'>
                {category.customHeader.toUpperCase()}
            </Typography> 
        </div>
        {category?.menuOptions.map((option, optionIndex) => {
                return (
                <React.Fragment key={optionIndex}>
                    <MenuItem
                        title={option.title}
                        icon={option.icon}
                        isNew={option.isNew}
                        url={option.url}
                        subMenuOption={option.subMenuOption}
                        badge={option.badge}
                        isEnabled={option.isEnabled}
                        isActive={activeItem === option.url}
                        external={option.external}
                        configName={option.configName}
                        onMenuItemClick={() => onItemClick(option.url , option.external)}
                        onSubMenuClick={onItemClick}
                        activeItem={activeItem}
                        />   
                    </React.Fragment>
                );
                })}
                {bottomStroke && <hr className={s.bottomStroke } />}
            </React.Fragment>
)
}

export default MenuCategory