import React from 'react';
import {Typography, Tooltip} from '@pw-tech/omni-ui';
import Mode from '../icons/pdf-viewer/Mode';
import FullScreen from '../icons/pdf-viewer/FullScreen';
import AntiClockwiseIcon from '../icons/pdf-viewer/AntiClockwiseIcon';
import ClockwiseIcon from '../icons/pdf-viewer/ClockwiseIcon';
import {MenuIcon, ZoomIn, ZoomOut} from '../icons';
import {ChevronLeft, ChevronRight} from '@/assets/icons';
import {HeaderProps, TooltipProps} from './types';
import Download from '../icons/pdf-viewer/Download';
import s from './index.module.css';
import cn from 'clsx';

const CustomTooltip: React.FC<TooltipProps> = ({label, title, variant}) => (
  <Tooltip label={label} origin="center" position="bottom" variant={variant}>
    <Typography className={s.tooltip}> {title} </Typography>
  </Tooltip>
);

const Toolbar: React.FC<HeaderProps> = ({
  pdfFile,
  title,
  pageNumber,
  numPages,
  scale,
  darkMode,
  inputPageNumber,
  setPageNumber,
  setScale,
  onDarkModeToggle,
  setRotation,
  setInputPageNumber,
  onScrollToPage,
  onSidebarToggle,
}) => {
  const tooltipVariant = darkMode ? 'dark' : 'light';
  const iconClassName = cn(s.icon, {[s.darkMode]: darkMode})

  const changeScale = (delta: number) => {
    setScale(prevScale => {
      const newScale = prevScale + delta;
      return Math.max(0.25, Math.min(newScale, 5));
    });
  };

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const newPageNumber = Math.min(
        Math.max(1, prevPageNumber + offset),
        numPages
      );
      onScrollToPage(newPageNumber);
      return newPageNumber;
    });
  };
 
  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setInputPageNumber(value);
  };

  const handlePageInputBlur = () => {
    const newPage = parseInt(inputPageNumber, 10);
    if (!isNaN(newPage) && newPage >= 1 && newPage <= numPages) {
      onScrollToPage(newPage);
    } else {
      setInputPageNumber(pageNumber.toString());
    }
  };
  const rotateClockwise = () => {
    setRotation((prevRotation) => (prevRotation + 90) % 360);
  };

  const rotateAnticlockwise = () => {
    setRotation((prevRotation) => (prevRotation - 90) % 360);
  };
  const handlePageInputKeyPress = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      handlePageInputBlur();
    }
  };
  const handleDownload = async () => {
    const pdfLink = pdfFile.toString();
    const response = await fetch(pdfLink);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', title || 'book.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };
  
  return (
    <header className={cn(s.headerWrapper, {[s.darkMode]: darkMode})}>
      <div className="flex flex-row items-center justify-center gap-8">
        <MenuIcon
          className={iconClassName}
          onClick={onSidebarToggle}
        />
        {title && (
          <Typography className="text-nowrap" weight="semi-bold">
            {title}
          </Typography>
        )}
      </div>
      <div className={s.headerCenter}>
        <CustomTooltip
          label={
            <ChevronLeft
              className={cn(iconClassName, {
                [s.disabled]: pageNumber === 1,
                
              })}
              onClick={() => changePage(-1)}
            />
          }
          variant={tooltipVariant}
          title="Previous Page"
        />

        <input
          value={inputPageNumber}
          onChange={handlePageInputChange}
          onBlur={handlePageInputBlur}
          onKeyUp={handlePageInputKeyPress}
          className={cn(s.pageInput, {[s.darkMode]: darkMode})}
          type="text"
          size={2}
        />
        <Typography> / {numPages} </Typography>
        <CustomTooltip
          label={
            <ChevronRight
              className={cn(iconClassName, {
                [s.disabled]: pageNumber === numPages,
                
              })}
              onClick={() =>changePage(1)}
            />
          }
          variant={tooltipVariant}
          title="Next Page"
        />

        <Typography color="text-body-2">|</Typography>
        <CustomTooltip
          label={
            <ZoomOut
              className={cn(iconClassName, {
                [s.disabled]: scale === 0.25,
               
              })}
              onClick={() => changeScale(-0.05)}
            />
          }
          variant={tooltipVariant}
          title="Zoom Out"
        />

        <Typography>{Math.round(scale * 100)}%</Typography>
        <CustomTooltip
          label={
            <ZoomIn
              className={cn(iconClassName, {
                [s.disabled]: scale === 2,
                
              })}
              onClick={() => changeScale(0.05)}
            />
          }
          variant={tooltipVariant}
          title="Zoom In"
        />

        <Typography color="text-body-2">|</Typography>
        <CustomTooltip
          label={
            <AntiClockwiseIcon
              className={iconClassName}
              onClick={rotateAnticlockwise}
            />
          }
          variant={tooltipVariant}
          title="Rotate CounterClockwise"
        />
        <CustomTooltip
          label={
            <ClockwiseIcon
              className={iconClassName}
              onClick={rotateClockwise}
            />
          }
          variant={tooltipVariant}
          title="Rotate Clockwise"
        />
       
      </div>
      <div className='flex flex-row items-center justify-center gap-8'>
      <CustomTooltip
          label={
            <Mode
              className={iconClassName}
              onClick={onDarkModeToggle}
            />
          }
          variant={tooltipVariant}
          title={`Switch to the ${darkMode ? 'light' : 'dark'} theme`}
        />
        <CustomTooltip
          label={
            <FullScreen
              className={iconClassName}
              onClick={toggleFullScreen}
            />
          }
          variant={tooltipVariant}
          title="Full Screen"
        />
        <CustomTooltip
          label={
            <Download
              className={iconClassName}
              onClick={handleDownload}
            />
          }
          variant={tooltipVariant}
          title="Download"
        />
        </div>
    </header>
  );
};

export default Toolbar;
