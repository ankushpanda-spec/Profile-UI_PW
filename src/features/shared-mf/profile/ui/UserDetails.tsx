import {useUser} from '@pw-tech/omni-context';
import {useEffect, useMemo, useState} from 'react';
import s from '../styles/index.module.css';
import EditProfileFrom from './EditProfile';
import { webSDK } from '@/integration';

const UserDetails = () => {
  const [sections, setSections] = useState<any>([]);
  const [isEditFormOpen, setIsEditFormOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const _User:any = webSDK.user;
  
  
    const _sections: any = [];
    _sections.push({
      sectionName: 'Personal Details',
      values: [
        {key: 'Name', value: _User?.firstName + ' ' + _User?.lastName},
        {key: 'Mobile No', value: _User?.primaryNumber},
        {key: 'Email', value: _User?.email},
        {
          key: 'Living City/Village/Town',
          value: _User?.profileId?.address?.city || 'N/A',
        },
      ],
    });

    _sections.push({
      sectionName: 'Academic Details',
      values: [
        {key: 'Class', value: _User?.profileId?.class},
        {key: 'Board/State Board', value: _User?.profileId?.board},
        {key: 'Exams', value: _User?.profileId?.exams.join('')},
        {key: 'Language', value: _User?.profileId?.language},
      ],
    });
   
 

  return (
    <div className={s.userDetailsContainer}>
      <div className={s.udOne}>
        <h4 className={s.udOneTitle}>Profile Detail</h4>
        <span
          className={s.udEditText}
          onClick={() => {
            setIsEditFormOpen(!isEditFormOpen);
            setEditModalOpen(true);
          }}
        >
          Edit
        </span>
      </div>
      {_sections.map((section: any, index: number) => (
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
     {isEditFormOpen && 
      <EditProfileFrom
        editModalOpen={editModalOpen}
        handleEditModalClose={() => setEditModalOpen(false)}
        handleEditModalOpen={() => setEditModalOpen(true)}
        userInfo = {_User}
      /> }
    </div> 
  );
};

export default UserDetails;
