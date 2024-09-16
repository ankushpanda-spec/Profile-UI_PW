import {Menu as MenuIcon} from '@/assets/icons';

function Menu(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props}>
      <MenuIcon className="size-24" />
    </button>
  );
}

export default Menu;
