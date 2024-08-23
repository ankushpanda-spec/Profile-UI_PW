import './styles/base/App.css';
import { Button, Typography } from '@pw-tech/omni-ui';

const App = () => {
  //  throw new Error('Test');

  const throwError = () => {
    throw new Error('Test');
  };
  return (
    <div className="content">
      <h1>Rsbuild with React</h1>
      <p>Start building amazing things with Rsbuild.</p>
      <input type="button" value={'Throw Error'} onClick={throwError} />
      <Typography
  color="primary"
  decoration="none"
  onClick={function noRefCheck(){}}
  variant="heading2"
  weight="medium"
>
  This is Typography
</Typography>
Copy

      <Button
        onClick={function noRefCheck() {}}
        size="medium"
        variant="primary"
      >Omni UI Button</Button>
    </div>
  );
};

export default App;
