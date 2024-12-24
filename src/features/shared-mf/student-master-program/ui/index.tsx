import Vector from '@/assets/icons/Vector';
import {AP_SIR, BANNER_IMG} from '@/assets/images';
import {Typography} from '@pw-tech/omni-ui';
import {useEffect, useState} from 'react';
import {FaqModel, STUDENT_MASTER_PROGRAM} from '../types';
import {getFaqs} from '../api';
import {useSnackbar} from '@/hooks/showSnackBar';
import PlayIcon from '@/assets/icons/PlayIcon';
import {useError} from '@/hooks/showError';
import getErrorMessage from '../../profile/services/showErrorService';
import {Storage} from '@pw-tech/web-sdk';
import {useLocation} from 'react-router-dom';
import s from "../styles/index.module.css"

const StudentMasterProgram = () => {
  const showSnackBar = useSnackbar();
  const showError = useError();
  const location = useLocation();
  const routeUrl = `${location.pathname}${location.search}`;
  const [bannerVideo, setBannerVideo] = useState<FaqModel | null>(null);
  const [bannerImg, setBannerImg] = useState<string | null>(null);
  const [description, setDescription] = useState<FaqModel | null>(null);

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
      showSnackBar('No Preview Available');
    } else {
      const videoObject = {
        embedCode: bannerVideo?.videoUrl,
        name: 'Student Master Program',
        image: bannerImg || BANNER_IMG,
        type: bannerVideo.videoType,
      };
      Storage.set('VIDEO_DETAILS', videoObject, {plain: true});
      Storage.set('videoBackUrl', routeUrl, {plain: true});
      //Video Player
    }
  };

  return (
    <div className={s.studentMaster}>
      <div className={s.smTitle}>
        <Typography weight="semi-bold" variant="heading3">
          PW Student Master Program
        </Typography>
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
          ></div>
          <div className={s.smIcon}>
            <Vector />
          </div>
        </div>
      </div>

      <div className={s.smHowItWork}>
        <Typography variant="heading4" weight="bold">
          How it works?
        </Typography>
        <div
          className={s.smVideoWrapper}
          onClick={howItWorkVideo}
        >
          <div className={s.smPlayButton}>
            <PlayIcon className={s.smPlayIcon} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentMasterProgram;
