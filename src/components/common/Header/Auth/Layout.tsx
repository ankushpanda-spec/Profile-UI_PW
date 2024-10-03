import {AuthHeaderLayoutProps} from '../Types';

function Layout(props: AuthHeaderLayoutProps) {
  const {leftAction, menuAction, rightAction} = props;
  return (
    <header
      style={{
        borderBottomWidth: '1px',
      }}
      className="flex min-h-[64px] w-full min-w-[360px] items-center justify-center border-b-light bg-white px-16 sm:px-32 md:min-h-[72px] lg:min-h-[80px]"
    >
      <div className="flex max-w-[1180px] flex-1 basis-0 items-center justify-between">
        <div className="flex items-center gap-12">
          {/* Menu Action */}
          {menuAction}
          {/* Left Action */}
          {leftAction}
        </div>

        {/* Right Action */}
        <div>{rightAction}</div>
      </div>
    </header>
  );
}

export default Layout;
