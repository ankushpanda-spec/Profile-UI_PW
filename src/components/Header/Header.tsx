import Auth from './Auth';
import NonAuth from './NonAuth';
import { HeaderProps } from './Types';

function Header(props: HeaderProps) {
    const { isUserLoggedIn = false } = props;

    if (isUserLoggedIn) {
        return <Auth />;
    }
    return <NonAuth />;
}

export default Header;