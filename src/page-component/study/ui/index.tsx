import {useAuth, useScreen} from '@pw-tech/omni-context';
import {Button, Typography} from '@pw-tech/omni-ui';
import {dependencies} from '../../../../package.json';

const Study = () => {
  const {width} = useScreen();
  const {isLoggedIn, login, logout} = useAuth();
  return (
    <div className="bg-premium-100">
      <div className="p-20">
        <Typography variant="heading1">
          OMNI CONTEXT SCREEN PROVIDER WIDTH:{width}
        </Typography>
        <Typography variant="heading4">Hello From Study</Typography>
        <button
          onClick={() => {
            throw new Error('This is your first error!');
          }}
        >
          Break the world
        </button>
        ;
        <Button variant="dark" size="small" className="h-auto">
          Click me
        </Button>
        <Typography variant="regular">
          This is a simplified version of the content. The original lorem ipsum
          text has been reduced to this brief paragraph to demonstrate the use
          of Typography components.
        </Typography>
        <div className="h-1 bg-green" />
        <h1 className="text-6xl">
          {isLoggedIn ? 'Welcome PW Member' : 'You are not logged in'}
          <div>
            {isLoggedIn ? (
              <Button className="h-auto" onClick={logout}>
                Logout
              </Button>
            ) : (
              <Button className="h-auto" onClick={login}>
                Login
              </Button>
            )}
          </div>
        </h1>
        <div className="my-10">
          <Typography variant="heading1">Installed Dependencies</Typography>
          {Object.entries(dependencies).map(([dependency, version]) => (
            <Typography
              variant="regular"
              component="div"
              key={dependency}
            >{`${dependency}: ${version}`}</Typography>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Study;
