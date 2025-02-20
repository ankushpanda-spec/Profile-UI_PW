import StudentMasterProgram from '@/features/student-master-program/ui';
import ErrorWrapper from '@/shared/context/ErrorContext';
import LoaderWrapper from '@/shared/context/LoaderContext';
import {ToastProvider} from '@pw-tech/omni-ui';

const StudentMaster = () => {
  return (
    <ToastProvider>
      <LoaderWrapper>
        <ErrorWrapper>
          <StudentMasterProgram />
        </ErrorWrapper>
      </LoaderWrapper>
    </ToastProvider>
  );
};

export default StudentMaster;
