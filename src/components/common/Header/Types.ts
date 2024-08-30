import {ReactNode} from 'react';

export interface AuthHeaderProps {
  onMenuClick?: () => void;
  onCohortClick?: () => void;
  onBackClick?: () => void;
  toggleCohortVisibility?: boolean;
  onProfileClick?: () => void;
  onAppDownloadClick?: () => void;
  user?: Record<string, any>;
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
