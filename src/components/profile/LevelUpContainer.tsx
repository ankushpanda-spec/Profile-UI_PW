import { Button, Tooltip, Typography } from "@pw-tech/omni-ui";
import LevelUpOverviewData from "@/services/datalayer.service";
import { InfoIcon } from "../icons";
import { XPIcon } from "@/assets/images";
import { useState } from "react";
const LevelUpContainer = () => {
    const data = LevelUpOverviewData;
    const [showTooltip, setShowTooltip] = useState<boolean>(false)
    function handleToolTipClose() {
        setShowTooltip(false)
    }
    return <div className="p-16 flex flex-col rounded-lg bg-[#f1f5fe] my-12 mb-40">

        <div className="text-black font-bold text-xl">
           Level Up Overview
        </div>
        <div className="grid grid-cols-2 gap-16 mt-8">
        {data.map((el: any)=>{
            return <div className="flex flex-col border-1 p-4 mt-2.5 rounded-lg bg-white">
            <div className="flex justify-between">
                <div className="text-pw-grey-500" >
                    <Typography weight="semi-bold" variant="small">
                    {el.title}
                    </Typography>
                </div>
                <div className="block lg:hidden">
                    <Tooltip

                    label={<InfoIcon/>}
                    open={showTooltip}
                    onClose={handleToolTipClose}
                    origin="center"
                    position="bottom"
                    variant="dark"
                    >
                        <div className="p-16">
                            <div className="font-semibold text-base lg:text-lg">{el.tooltip.title}</div>
                            <div dangerouslySetInnerHTML={{
                                __html: el.tooltip.content
                            }}/>
                        </div>
                    </Tooltip>
                    
                </div>
                <div className="hidden lg:block">
                    <Tooltip

                    label={<InfoIcon/>}
                    open={showTooltip}
                    onClose={handleToolTipClose}
                    origin="center"
                    position="left"
                    variant="dark"
                    >
                        <div className="p-4">
                        <div className="font-semibold text-base lg:text-lg">{el.tooltip.title}</div>
                        <div dangerouslySetInnerHTML={{
                            __html: el.tooltip.content
                        }}/>
                        </div>
                        
                    </Tooltip>
                    
                </div>
            </div>
            <div className="flex pt-2">
                {el.score} <img src={XPIcon} height={18} width={18} className="ml-1"/>
            </div>
        </div>
        })}
        
            {/* Total XP */}
        </div>
    </div>
}

export default LevelUpContainer