import LevelUpContainer from './LevelUpContainer';
import PerformanceDetails from './PerformanceDetails';
import UserDetails from './UserDetails';

const ProfileDetails = () => {
  return (
    <div className="flex flex-col">
      <LevelUpContainer />
      <UserDetails />
      <PerformanceDetails />
    </div>
  );
};

export default ProfileDetails;
