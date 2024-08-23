import {ReactNode} from 'react';

export interface AuthHeaderProps {
  onMenuClick: () => void;
  onCohortClick: () => void;
  onBackClick: () => void;
  toggleCohortVisibility: boolean;
  onProfileClick: () => void;
  onAppDownloadClick: () => void;
}
export interface AuthHeaderLayoutProps {
  menuAction: ReactNode;
  leftAction: ReactNode;
  rightAction: ReactNode;
}
