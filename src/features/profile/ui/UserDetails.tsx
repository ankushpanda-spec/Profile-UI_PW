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
import {Scholar} from '@/shared/assets/icons';
import {LogAnalyticsEvent} from '@/shared/lib/analytics';

const UserDetails = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([]);
  const [isScholar, setIsScholar] = useState<boolean>(false);
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
    const getBatchUserSegment = async () => {
      try {
        const res = await webSDK.getUserSegment();
        setIsScholar(res?.data?.isScholar);
      } catch (error) {
        const errorObj = getErrorMessage(error);
        showError(errorObj.message);
      }
    };
    getBatchUserSegment();
  }, []);

  useEffect(() => {
    const updatedSections: Section[] = [];

    updatedSections.push({
      sectionName: 'Personal Details',
      values: [
        {key: 'Name', value: `${user?.firstName} ${user?.lastName}`},
        {key: 'Mobile Number', value: user?.primaryNumber},
        {key: 'E-mail', value: user?.email || '-'},
        {
          key: 'City/Village/Town',
          value: user?.profileId?.address?.city || '-',
        },
      ],
    });

    updatedSections.push({
      sectionName: 'Academic Details',
      values: [
        {key: 'Class', value: user?.profileId?.class || '-'},
        {key: 'Board/State Board', value: user?.profileId?.board || '-'},
        {key: 'Exams', value: user?.profileId?.exams.join('') || '-'},
        {key: 'Language', value: user?.profileId?.language || '-'},
      ],
    });

    setSections(updatedSections);
  }, [user]);

  const navigateToStudentMaster = () => {
    navigate('/student-master-program?cameFrom=Profile');
  };

  const onEditIconClick = () => {
    setIsEditFormOpen(!isEditFormOpen);
    setEditModalOpen(true);
    LogAnalyticsEvent.profileEdit();
  };
  return (
    <div className={s.userDetailsContainer}>
      <div className={s.udOne}>
        <Typography variant="heading3" color="static-black" weight="semi-bold">
          Profile Details
        </Typography>
        <div
          className={s.editIconWrapper}
          role="button"
          tabIndex={0}
          onClick={() => {
            onEditIconClick();
          }}
          onKeyPress={e => {
            if (e.key === 'Enter') {
              onEditIconClick();
            }
          }}
        >
          <EditIcon className={s.editIconClassName} />
          <Typography
            className={s.editText}
            variant="regular"
            color="primary"
            weight="semi-bold"
          >
            Edit
          </Typography>
        </div>
      </div>
      <div className={s.profileDetailsContainer}>
        {sections.map((section: Section, index: number) => (
          <div className={s.udContainer} key={index}>
            <div className={s.udTwo}>
              <Typography
                variant="small"
                weight="bold"
                color="text-body-1"
                className={s.udTwoSection}
              >
                {section.sectionName}
              </Typography>

              <div className={s.udLine}>
                <hr />
              </div>
            </div>

            <div className={s.udSectionContainer}>
              {section.values.map((data: SectionValue, indexNum: number) => (
                <div key={indexNum} className={s.udSectionWrapper}>
                  <Typography
                    variant="regular"
                    weight="medium"
                    color="text-body-2"
                  >
                    {'  '}
                    {data.key}
                  </Typography>
                  {data.key === 'Name' ? (
                    <div className={s.udNameSection}>
                      <Typography
                        weight="semi-bold"
                        variant="regular"
                        color="text-heading"
                      >
                        {'  '}
                        {data.value}
                      </Typography>
                      <div className={s.udVerifiedSection}>
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
                          <Typography
                            weight="semi-bold"
                            variant="regular"
                            color="primary"
                          >
                            PW Student Master
                          </Typography>
                        </div>
                      </div>
                      {isScholar && <img src={Scholar} alt="ScholarIcon" />}
                    </div>
                  ) : (
                    <Typography
                      weight="semi-bold"
                      variant="regular"
                      color="text-body-1"
                      className={s.udSectionValue}
                    >
                      {data.value}
                    </Typography>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {isEditFormOpen && (
        <EditProfile
          editModalOpen={editModalOpen}
          handleEditModalClose={() => {
            setIsEditFormOpen(false);
            setEditModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default UserDetails;
