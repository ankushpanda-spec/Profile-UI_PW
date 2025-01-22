import StudentMasterProgram from '@/features/shared-mf/student-master-program/ui';
import ErrorWrapper from '@/context/ErrorContext';
import LoaderWrapper from '@/context/LoaderContext';
import { ToastProvider } from '@pw-tech/omni-ui';
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
