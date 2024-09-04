import { ReactNode } from 'react';

export interface ActionProps {
  enable?: boolean;
  callback?: () => void;
}

export interface CohortActionProps extends ActionProps {
  cohortData?: Record<string, any>;
}
export interface AuthHeaderProps {
  menuActionConfig: ActionProps;
  cohortActionConfig: CohortActionProps;
  backActionConfig: ActionProps;
  userConfig: Record<string, any>;
  onAppDownloadClick?: () => void;
  onProfileClick?:()=>void
}
export interface AuthHeaderLayoutProps {
  menuAction: ReactNode;
  leftAction: ReactNode;
  rightAction: ReactNode;
}

export interface AvatarDropdownProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  userFirstName: string;
}

/**
 *  export interface AuthHeaderProps {
  menuActionConfig?:: {
    enable: boolean;
    callBack:()=>void
  }
  cohortActionConfig: {
    enable: boolean;
    callBack:()=>void
  },
  backActionConfig?: {
    enable: boolean;
    callBack:()=>void
  }
  onAppDownloadClick?: () => void;
  user?: Record<string, any>;
}
 *
 *
 *
 *
 */
