import {useEffect, useState} from 'react';
import s from '../styles/index.module.css';
import {useNavigate} from 'react-router-dom';
import VerifiedIcon from '@/shared/assets/icons/Verified';
import EditIcon from '@/shared/assets/icons/EditIcon';
import {Typography} from '@pw-tech/omni-ui';
import EditProfile from './EditProfile';
import {Section, SectionValue} from '../types';
import {useUser} from '@pw-tech/omni-context';
import {getUserProfileInfo} from '../api';
import {updateUserLocally} from '../lib';
import getErrorMessage from '@/shared/services/showErrorService';
import useError from '@/shared/hooks/showError';
import {webSDK} from '@/shared/services/sdk';

const UserDetails = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([]);
  const {user, setUser} = useUser();
  const showError = useError();
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      const query = {
        fields: [
          'cohortId',
          'exams',
          'class',
          'stream',
          'language',
          'board',
        ].join(','),
      };

      try {
        const res = await getUserProfileInfo(query);
        updateUserLocally(res, user, setUser);
      } catch (error) {
        const errorObj = getErrorMessage(error);
        showError(errorObj.message);
      }
    };
    getUserData();
  }, [JSON.stringify(webSDK.cohortConfig)]);

  useEffect(() => {
    const updatedSections: Section[] = [];

    updatedSections.push({
      sectionName: 'Personal Details',
      values: [
        {key: 'Name', value: `${user?.firstName} ${user?.lastName}`},
        {key: 'Mobile No', value: user?.primaryNumber},
        {key: 'Email', value: user?.email},
        {
          key: 'Living City/Village/Town',
          value: user?.profileId?.address?.city || 'N/A',
        },
      ],
    });

    updatedSections.push({
      sectionName: 'Academic Details',
      values: [
        {key: 'Class', value: user?.profileId?.class || 'N/A'},
        {key: 'Board/State Board', value: user?.profileId?.board || 'N/A'},
        {key: 'Exams', value: user?.profileId?.exams.join('') || 'N/A'},
        {key: 'Language', value: user?.profileId?.language || 'N/A'},
      ],
    });

    setSections(updatedSections);
  }, [user]);

  const navigateToStudentMaster = () => {
    navigate('/student-master-program?cameFrom=Profile');
  };

  return (
    <div className={s.userDetailsContainer}>
      <div className={s.udOne}>
        <h4 className={s.udOneTitle}>Profile Detail</h4>
        <div
          className={s.editIconWrapper}
          role="button"
          tabIndex={0}
          onClick={() => {
            setIsEditFormOpen(!isEditFormOpen);
            setEditModalOpen(true);
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              setIsEditFormOpen(!isEditFormOpen);
              setEditModalOpen(true);
            }
          }}
        >
          <EditIcon className={s.editIconClassName} />
          <Typography variant="regular" color="primary" weight="medium">
            Edit
          </Typography>
        </div>
      </div>
      {sections.map((section: Section, index: number) => (
        <div key={index}>
          <div className={s.udTwo}>
            <h5 className={s.udTwoSection}>{section.sectionName}</h5>
            <div className={s.udLine}>
              <hr />
            </div>
          </div>
          <div className={s.udSectionContainer}>
            {section.values.map((data: SectionValue, indexNum: number) => (
              <div key={indexNum} className={s.udSectionWrapper}>
                <div className={s.udSectionKey}>{data.key}</div>
                {data.key === 'Name' ? (
                  <div className={s.udNameSection}>
                    <div>{data.value}</div>
                    <VerifiedIcon className={s.verifiedIcon} />
                    <div
                      className={s.studentMaster}
                      role="button"
                      tabIndex={0}
                      onClick={navigateToStudentMaster}
                      onKeyPress={e => {
                        if (e.key === 'Enter') {
                          navigateToStudentMaster();
                        }
                      }}
                    >
                      PW Student Master
                    </div>
                  </div>
                ) : (
                  <div className={s.udSectionValue}>{data.value}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
      {isEditFormOpen && (
        <EditProfile
          editModalOpen={editModalOpen}
          handleEditModalClose={() => setEditModalOpen(false)}
          handleEditModalOpen={() => setEditModalOpen(true)}
        />
      )}
    </div>
  );
};

export default UserDetails;
