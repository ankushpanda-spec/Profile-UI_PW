import { useUser } from '@pw-tech/omni-context';
import { useEffect, useState } from 'react';
import EditProfileModal from './EditProfile';
import s from '../styles/index.module.css';
import TermsAndConditionsModal from './TermsAndConditionsModal';
import OldPhoneNumberModal from './OldPhoneNumberComponent';
import OTPVerificationModal from './OtpVerification';
import NewNumberVerification from './NewNumberVerification';
import LoaderModal from './components/loader/LoaderModalComponent';
import { ModalTypes } from '../types/constants';
import localStorageService from '../services/localStorageService';
import SnackBar from './components/snack-bar/SnackBar';
import UpdateSuccessModal from './UpdateSuccess';

const UserDetails = () => {
  const [sections, setSections] = useState<any>([]);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false); // State to manage active modal
  const { user: _User, setUser: _setUser } = useUser();


  useEffect(() => {
    const _sections: any = [];
    _sections.push({
      sectionName: 'Personal Details',
      values: [
        { key: 'Name', value: _User?.firstName + ' ' + _User?.lastName },
        { key: 'Mobile No', value: _User?.primaryNumber },
        { key: 'Email', value: _User?.email },
        {
          key: 'Living City/Village/Town',
          value: _User?.profileId?.address?.city || 'N/A',
        },
      ],
    });

    _sections.push({
      sectionName: 'Academic Details',
      values: [
        { key: 'Class', value: _User?.profileId.class },
        { key: 'Board/State Board', value: _User?.profileId.board },
        { key: 'Exams', value: _User?.profileId.exams.join('') },
        { key: 'Language', value: _User?.profileId.language },
      ],
    });
    setSections(_sections);
  }, [_User]);

  return (
    <div className={s.userDetailsContainer}>
      <div className={s.udOne}>
        <h4 className={s.udOneTitle}>Profile Detail</h4>
        <span className={s.udEditText} onClick={() => setEditModalOpen(true)}>
          Edit
        </span>
      </div>
      {sections.map((section: any, index: number) => (
        <div key={index}>
          <div className={s.udTwo}>
            <h5 className={s.udTwoSection}>{section.sectionName}</h5>
            <div className={s.udLine}>
              <hr />
            </div>
          </div>
          <div className={s.udSectionContainer}>
            {section.values.map((data: any, index: number) => (
              <div key={index} className={s.udSectionWrapper}>
                <div className={s.udSectionKey}>{data.key}</div>
                <div className={s.udSectionValue}>{data.value}</div>
              </div>
            ))}
          </div>
        </div>
      ))}

        <EditProfileModal
          editModalOpen={editModalOpen}
          handleEditModalClose= {() => setEditModalOpen(false)}
          handleEditModalOpen = {() => setEditModalOpen(true)}
          />
    </div>
  );
};

export default UserDetails;
