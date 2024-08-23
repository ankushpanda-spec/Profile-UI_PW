import {AuthHeaderLayoutProps} from '../Types';

function Layout(props: AuthHeaderLayoutProps) {
  const {leftAction, menuAction, rightAction} = props;
  return (
    <header className="flex h-[64px] w-[360px] items-center justify-between border-b bg-white px-24 sm:w-[480px] md:h-[72px] md:w-[768px] lg:h-[80px] lg:w-[1024px] xl:w-[1200px] xl:px-82">
      <div className="flex items-center gap-12">
        {/* Menu Action */}
        {menuAction}
        {/* Left Action */}
        {leftAction}
      </div>

      {/* Right Action */}
      <div>{rightAction}</div>
    </header>
  );
}

export default Layout;
