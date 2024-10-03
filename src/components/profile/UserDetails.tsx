import {useUser} from '@pw-tech/omni-context';
import {useEffect, useState} from 'react';
import EditProfileModal from './EditProfile';
const UserDetails = () => {
  const [sections, setSections] = useState<any>([]);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const {user: _User} = useUser();
  function handleCloseEditModal() {}
  function handleCancel() {
    setOpenEditModal(false);
  }

  function handleOpenEditModal() {
    setOpenEditModal(true);
  }
  useEffect(() => {
    const _sections: any = [];

    _sections.push({
      sectionName: 'Personal Details',
      values: [
        {
          key: 'Name',
          value: _User?.firstName + _User?.lastName,
        },
        {key: 'Mobile No', value: _User?.primaryNumber},
        {
          key: 'Email',
          value: _User?.email,
        },
        {
          key: 'Living City/Village/Town',
          value: _User?.profileId?.address?.city || 'N/A',
        },
      ],
    });

    _sections.push({
      sectionName: 'Academic Details',
      values: [
        {
          key: 'Class',
          value: _User?.profileId.class,
        },
        {
          key: 'Board/State Board',
          value: _User?.profileId.board,
        },
        {
          key: 'Exams',
          value: _User?.profileId.exams.join(''),
        },
        {
          key: 'Language',
          value: _User?.profileId.language,
        },
      ],
    });
    setSections(_sections);
  }, [_User]);
  return (
    <div className="w-full">
      <div className="my-12 flex w-full items-center justify-between">
        <h4 className="text-base font-bold lg:text-xl">Profile Detail</h4>
        <span
          className="caption-1 semibold cursor-pointer text-xs"
          onClick={handleOpenEditModal}
        >
          Edit
        </span>
      </div>
      {sections.map((section: any, index: number) => {
        return (
          <div key={index}>
            <div className="mb-12 flex w-full items-center justify-between lg:w-4/5">
              <h5 className="text-[10px] font-semibold text-[#dcdcdc]">
                {section.sectionName}
              </h5>
              <div className="w-3/5">
                <hr />
              </div>
            </div>
            <div className="my-8">
              {section.values.map((data: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="mb-12 flex w-full items-center justify-between font-semibold lg:w-4/5"
                  >
                    <div className="text-xs font-semibold text-[#878787] lg:text-sm">
                      {data.key}
                    </div>
                    <div className="w-3/5 text-xs text-[#333333] lg:text-sm">
                      {data.value}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <EditProfileModal
        modalHeader={'Edit Details'}
        modalBody={''}
        onCancel={handleCancel}
        isOpen={openEditModal}
        onClose={handleCloseEditModal}
      />
    </div>
  );
};

export default UserDetails;
