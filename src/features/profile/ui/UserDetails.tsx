import {useEffect, useState} from 'react';
import {Typography} from '@pw-tech/omni-ui';
import {useUser} from '@pw-tech/omni-context';
import s from '../styles/index.module.css';
import EditProfile from './EditProfile';
import {Section, SectionValue} from '../types';
import {getUserProfileInfo} from '../api';
import {updateUserLocally} from '../lib';
import getErrorMessage from '@/shared/services/showErrorService';
import useError from '@/shared/hooks/showError';
import {webSDK} from '@/shared/services/sdk';
import {LogAnalyticsEvent} from '@/shared/lib/analytics';

const UserDetails = () => {
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([]);
  const {user, setUser} = useUser();
  const showError = useError();

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
    setSections([
      {
        sectionName: 'Personal Details',
        showEdit: true,
        values: [
          {key: 'Name', value: `${user?.firstName} ${user?.lastName}`},
          {key: 'Mobile Number', value: user?.primaryNumber},
          {key: 'E-mail', value: user?.email || '-'},
          {
            key: 'City / Village / Town',
            value: user?.profileId?.address?.city || '-',
          },
        ],
      },
      {
        sectionName: 'Academic Details',
        values: [
          {key: 'Class', value: user?.profileId?.class || '-'},
          {key: 'Board / State Board', value: user?.profileId?.board || '-'},
          {key: 'Exams', value: user?.profileId?.exams.join('') || '-'},
          {key: 'Language', value: user?.profileId?.language || '-'},
        ],
      },
    ]);
  }, [user]);

  const onEditIconClick = () => {
    setIsEditFormOpen(!isEditFormOpen);
    setEditModalOpen(true);
    LogAnalyticsEvent.profileEdit();
  };

  return (
    <>
      <div className={s.detailsGrid}>
        {sections.map((section: Section) => (
          <div className={s.detailsCard} key={section.sectionName}>
            <div className={s.detailsHeader}>
              <Typography
                className={s.detailsTitle}
                variant="heading4"
                weight="semi-bold"
                color="text-heading"
              >
                {section.sectionName}
              </Typography>
              {section.showEdit && (
                <div
                  className={s.editButton}
                  role="button"
                  tabIndex={0}
                  onClick={onEditIconClick}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      onEditIconClick();
                    }
                  }}
                >
                  <Typography
                    className={s.editText}
                    variant="small"
                    weight="semi-bold"
                    color="primary"
                  >
                    Edit
                  </Typography>
                </div>
              )}
            </div>
            <div className={s.detailsList}>
              {section.values.map((data: SectionValue) => (
                <div key={data.key} className={s.detailRow}>
                  <Typography
                    className={s.detailLabel}
                    variant="small"
                    weight="medium"
                    color="text-body-1"
                  >
                    {data.key}
                  </Typography>
                  <Typography
                    className={s.detailValue}
                    variant="regular"
                    weight="semi-bold"
                    color="text-heading"
                  >
                    {data.value}
                  </Typography>
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
    </>
  );
};

export default UserDetails;
