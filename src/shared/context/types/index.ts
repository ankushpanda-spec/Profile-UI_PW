import { ReactNode } from "react";

export type ErrorContextType = {
    showError: (error:string) => void;
   
  };

export interface ErrorWrapperProps {
    children?: ReactNode;
  }
export interface LoaderWrapperProps {
    children?: ReactNode;
  }

export type LoaderContextType = {
    showLoader: (primaryMessage:string , secondaryMessage?:string) => void;
    hideLoader: () => void;
  };
  