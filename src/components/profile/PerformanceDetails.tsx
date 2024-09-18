import { Typography } from "@pw-tech/omni-ui"
import {_PerformanceAsDoubtSolver} from '../../services/datalayer.service'
import { useEffect, useState } from "react";
import { InfoIcon } from "../icons";

const DoubtSolverCard = ({title, info, data}: {title: string, info: string, data: string}) => {
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const handleInfoClick = () => {
        setShowInfo(!showInfo)
    }
    return <div className={`flex flex-col rounded-lg p-2 w-full lg:w-52 ${showInfo ? 'bg-black/80 ' : 'bg-[#5a4bda0d]'}`}>
        <div className="flex justify-end "  onClick={handleInfoClick}>
            <InfoIcon height={10} width={10} className="cursor-pointer"/>
        </div>
        
        <div className="flex flex-col px-4 pb-4 pt-1 relative">
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
    useEffect(()=>{
        setTiles([
            {title: 'Total Doubts Solved:', value: '106', info: 'No. of doubts you have answered'},
            {title: 'Satisfactory Rate:', value: '100%', info: 'No. of likes/<br/>(No. of likes + dislikes)'}
        ])
    }, [_PerformanceAsDoubtSolver])
    return <div className="mt-5">
            <div className="flex align-bottom">
                <Typography variant="heading4" weight="semi-bold" color="static-black">
                    Performace as Doubt Solver
                </Typography>
                <div className="ml-2.5 mt-1 text-[10px] text-xs align-text-bottom">
                    <Typography color="primary" weight="semi-bold" variant="tiny">
                        Know more
                    </Typography>
                </div>
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-3">
                {tiles.map((tile: any)=>{
                    return <DoubtSolverCard title={tile.title} data={tile.value} info={tile.info}/>
                })}
            </div>

    </div>
}

export default PerformanceDetails