import Vector from '@/shared/assets/icons/Vector';
import {Typography, useToast} from '@pw-tech/omni-ui';
import {useEffect, useState} from 'react';
import {FaqModel, STUDENT_MASTER_PROGRAM} from '../types';
import getFaqs from '../api';
import PlayIcon from '@/shared/assets/icons/PlayIcon';
import useError from '@/shared/hooks/showError';
import {Storage} from '@pw-tech/web-sdk';
import {useLocation} from 'react-router-dom';
import s from '../styles/index.module.css';
import {webSDK} from '@/shared/services/sdk';
import {AP_SIR, BANNER_IMG} from '../constants';
import getErrorMessage from '@/shared/services/showErrorService';

const StudentMasterProgram = () => {
  const showError = useError();
  const location = useLocation();
  const routeUrl = `${location.pathname}${location.search}`;
  const [bannerVideo, setBannerVideo] = useState<FaqModel | null>(null);
  const [bannerImg, setBannerImg] = useState<string | null>(null);
  const [description, setDescription] = useState<FaqModel | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const {toast} = useToast();

  const RANDOM_ID = webSDK.randomId;
  const ACCESS_TOKEN = webSDK.accessToken;

  useEffect(() => {
    const fetchFaq = async () => {
      const faqId = STUDENT_MASTER_PROGRAM;
      let list: Array<FaqModel> = [];
      try {
        const res = await getFaqs(faqId);
        if (res) {
          list = res.map((item: FaqModel) => new FaqModel(item));
          const video: FaqModel =
            list.find((o: FaqModel) => o.title.toLowerCase() === 'video') ||
            new FaqModel({});
          setBannerVideo(video);

          const desc: FaqModel =
            list.find(
              (o: FaqModel) => o.title.toLowerCase() === 'description'
            ) || new FaqModel({});
          setDescription(desc);

          setBannerImg(video.imageId.baseUrl + video.imageId.key);
        }
      } catch (e) {
        const errorObj = getErrorMessage(e);
        showError(errorObj.message);
      }
    };

    fetchFaq();
  }, []);

  const howItWorkVideo = () => {
    if (bannerVideo?.videoUrl === '' || !bannerVideo?.videoUrl) {
      toast({
        message: 'No Preview Available',
        variant: 'error',
        anchorOrigin: {
          horizontal: 'center',
          vertical: 'top',
        },
      });
    } else {
      const videoObject = {
        embedCode: bannerVideo?.videoUrl,
        name: 'Student Master Program',
        image: bannerImg || BANNER_IMG,
        type: bannerVideo.videoType,
      };
      Storage.set('VIDEO_DETAILS', videoObject, {plain: true});
      Storage.set('videoBackUrl', routeUrl, {plain: true});
      setIsPlaying(true);
    }
  };

  return (
    <div className={s.studentMaster}>
      <div className={s.smTitle}>
        <Typography weight="semi-bold" variant="heading3">
          PW Student Master Program
        </Typography>
        <button
          onClick={() => {
            throw new Error('This is your third error!');
          }}
        >
          Break the world
        </button>
      </div>
      <div className={s.smAbout}>
        <div className={s.smAboutTitle}>
          <Typography variant="heading4" weight="bold">
            {' '}
            About
          </Typography>
          <div className={s.smDescription}>
            <Typography
              dangerouslySetInnerHTML={{__html: description?.description || ''}}
            />
          </div>
        </div>

        <div className={s.smImage}>
          <div
            className={s.smApSir}
            style={{backgroundImage: `url(${AP_SIR})`}}
          />
          <div className={s.smIcon}>
            <Vector />
          </div>
        </div>
      </div>

      <div className={s.smHowItWork}>
        <Typography variant="heading4" weight="bold">
          How it works?
        </Typography>

        {isPlaying ? (
          <iframe
            title="Student Master Program Video"
            src={`${process.env.PUBLIC_VIDEO_PLAYER_URL}?type=youtube&src=${bannerVideo?.videoUrl}&token=${ACCESS_TOKEN}&random_id=${RANDOM_ID}&back_button=false&three_dots=false`}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
            className={s.smVideoWrapper}
          />
        ) : (
          <div
            className={s.smVideoWrapper}
            onClick={howItWorkVideo}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                howItWorkVideo();
              }
            }}
            role="button"
            tabIndex={0}
            style={{
              backgroundImage: `url(${bannerImg || BANNER_IMG})`,
              backgroundPosition: 'center',
              backgroundSize: '100% 100%',
              backgroundRepeat: 'no-repeat',
            }}
          >
            <div className={s.smPlayButton}>
              <PlayIcon className={s.smPlayIcon} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMasterProgram;
