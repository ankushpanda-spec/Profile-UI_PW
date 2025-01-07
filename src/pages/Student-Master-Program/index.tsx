import StudentMasterProgram from '@/features/shared-mf/student-master-program/ui';
import ErrorWrapper from '@/context/ErrorContext';
import LoaderWrapper from '@/context/LoaderContext';
import SnackbarWrapper from '@/context/SnackbarContext';
const StudentMaster = () => {
  return (
    <SnackbarWrapper>
      <LoaderWrapper>
        <ErrorWrapper>
          <StudentMasterProgram />
        </ErrorWrapper>
      </LoaderWrapper>
    </SnackbarWrapper>
  );
};

export default StudentMaster;
