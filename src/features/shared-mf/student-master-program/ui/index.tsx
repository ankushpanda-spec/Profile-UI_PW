import Vector from '@/assets/icons/Vector';
import {AP_SIR} from '@/assets/images';
import {Typography} from '@pw-tech/omni-ui';
import { useEffect, useState } from 'react';
import { FaqModel, STUDENT_MASTER_PROGRAM } from '../types';
import { getFaqs } from '../api';
import { useSnackbar } from '@/hooks/showSnackBar';
import PlayIcon from '@/assets/icons/PlayIcon';
import { useError } from '@/hooks/showError';
import getErrorMessage from '../../profile/services/showErrorService';


const StudentMasterProgram = () => {
  const showSnackBar = useSnackbar();
  const showError = useError();
  const [bannerVideo ,setBannerVideo  ] = useState<FaqModel | null>(null);
  const [bannerImg, setBannerImg] = useState<string | null>(null);
  const [description, setDescription] = useState<FaqModel | null>(null);
  
  useEffect(() => {
    const fetchFaq = async () => {
      const faqId = STUDENT_MASTER_PROGRAM;
      let list: Array<FaqModel> = [];
      try {
        const res = await getFaqs(faqId);
        if (res) {
          list = res.map((item : FaqModel) => new FaqModel(item)); 
          const video : FaqModel = list.find((o:FaqModel) => o.title.toLowerCase() === 'video') || new FaqModel({});
          setBannerVideo(video);

          const desc : FaqModel = list.find((o:FaqModel) => o.title.toLowerCase() === 'description') || new FaqModel({});
          setDescription(desc);

          setBannerImg(video.imageId.baseUrl + video.imageId.key);
        }
      } catch (e) {
        const errorObj = getErrorMessage(e);
        showError(errorObj.message);
      }
    };

    fetchFaq();
  }, [])

  const howItWorkVideo =() => {
    if (bannerVideo?.videoUrl === '' || !bannerVideo?.videoUrl) {
      showSnackBar("No Preview Available");
    } else {
      const videoObject = {
        embedCode: bannerVideo?.videoUrl,
        name: 'Student Master Program',
        image: bannerImg,
        type: bannerVideo.videoType,
      };
     
    }
  };


  return (
    <div className="flex flex-col items-start gap-24 rounded-lg bg-white p-16 md:px-24 md:py-32 lg:p-32">
      
        <div className="flex items-start gap-24 self-stretch">
         
            <Typography weight="semi-bold" variant="heading3">
              PW Student Master Program
            </Typography>
         
        </div>
        <div className="flex flex-col gap-12 self-stretch rounded-2xl bg-violet-50 px-16 pt-16 md:flex-row md:rounded-3xl md:pl-24 md:pt-24 lg:pl-32 lg:pt-32">
          <div className="flex flex-col items-start gap-12 md:pb-32">
            <Typography variant="heading4" weight="bold">
              {' '}
              About
            </Typography>
            <div className="flex flex-col items-start justify-center gap-14 self-stretch">
              <Typography variant="regular" weight="medium">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque porta pellentesque faucibus sit urna duis ut dictum
                faucibus. Lorem ipsum dolor sit amet, consectetur adipiscing
                elit.
              </Typography>
              <ul className="ml-5 list-disc">
                <li>
                  <Typography variant="regular" weight="medium">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque porta pellentesqu. Pellentesque porta
                    pellentesqu.
                  </Typography>
                </li>
                <li>
                  <Typography variant="regular" weight="medium">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Pellentesque porta pellentesqu. Pellentesque porta
                    pellentesqu.
                  </Typography>
                </li>
              </ul>
             
            </div>
             {/* <Typography dangerouslySetInnerHTML={{__html : description?.description || ''}}/> */}
          </div>
         
          <div className="relative flex-shrink-0 flex justify-center self-stretch h-auto lg:w-[298px] overflow-y-clip">
          <div
              className="z-20 min-w-[150px] min-h-[218px] md:min-w-[218px] md:min-h-[317px] lg:min-h-[249px] lg:min-w-[172px] bg-cover bg-center"
              style={{backgroundImage: `url(${AP_SIR})`}}
            ></div>
            <div className="z-10 absolute  flex min-h-[229px] min-w-[251px] items-center justify-center">
              <Vector />
            </div>
            
          </div>
          </div>
       
        
        <div className="flex flex-col items-center gap-16 self-stretch rounded-3xl px-12 md:px-24 py-16">
          <Typography variant="heading4" weight="bold">
            How it works?
          </Typography>
          <div className=" w-[304px] md:w-[608px] lg:w-[880px] h-[171px] md:h-[342px] lg:h-[495px] flex-shrink-0 rounded-xl bg-[#D9D9D9] justify-center items-center flex">
            <div className='w-32 h-32  md:w-[72px] md:h-[71px] flex items-center justify-center rounded-full bg-black'>
               <PlayIcon className='w-14 h-14 md:w-[29px] md:h-[28px] justify-center items-center flex' /></div>
          </div>
        </div>
     
    </div>
  );
};

export default StudentMasterProgram;
