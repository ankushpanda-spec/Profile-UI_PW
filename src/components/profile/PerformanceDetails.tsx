import { Typography } from "@pw-tech/omni-ui"
import { useEffect, useState } from "react";
import { InfoIcon } from "../icons";
import { useFeedbackData } from "@/hooks/useGetFeedbackPerformance";

const DoubtSolverCard = ({title, info, data}: {title: string, info: string, data: string}) => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const handleInfoClick = () => {
        setShowInfo(!showInfo)
    }
    return <div className={`flex flex-col rounded-lg p-8 w-full lg:w-52 ${showInfo ? 'bg-black ' : 'bg-[#5a4bda0d]'}`}>
        <div className="flex justify-end "  onClick={handleInfoClick}>
            <InfoIcon height={10} width={10} className="cursor-pointer"/>
        </div>
        
        <div className="flex flex-col px-16 pb-16 pt-4 relative">
            <Typography variant="tiny">
                {title}
            </Typography>
            <Typography variant="heading4" weight="bold">
                {data}
            </Typography>
            {
            showInfo && <div className="flex justify-center items-center absolute top-1/2 left-1/2 w-full pb-2 -translate-x-1/2 -translate-y-1/2">
<span className="body-2 text-white text-center " dangerouslySetInnerHTML={{__html: info}} />

            </div>
        }
        </div>

        

    </div>
}

const PerformanceDetails = () => {
    const [tiles, setTiles] = useState<any>([]);
    const {data: _PerformanceAsDoubtSolver} = useFeedbackData()
    useEffect(()=>{
        setTiles([
            {title: 'Total Doubts Solved:', value: _PerformanceAsDoubtSolver?.totalSolved, info: 'No. of doubts you have answered'},
            {title: 'Satisfactory Rate:', value: _PerformanceAsDoubtSolver?.satisfactoryRate+'%', info: 'No. of likes/<br/>(No. of likes + dislikes)'}
        ])
    }, [_PerformanceAsDoubtSolver])
    return <div className="mt-20">
            <div className="flex align-bottom">
                <Typography variant="heading4" weight="semi-bold" color="static-black">
                    Performace as Doubt Solver
                </Typography>
                <div className="ml-10 mt-4 text-[10px] text-xs align-text-bottom">
                    <Typography color="primary" weight="semi-bold" variant="tiny">
                        Know more
                    </Typography>
                </div>
            </div>
            <div className="mt-16 flex flex-col sm:flex-row gap-12">
                {tiles.map((tile: any)=>{
                    return <DoubtSolverCard title={tile.title} data={tile.value} info={tile.info}/>
                })}
            </div>

    </div>
}

export default PerformanceDetails