import style from "../../styles/OilInfo.module.scss";
import { initialOilInfoOfHalfYear, oilInfo } from "../../models/oilInfo.ts";

export type props = {
    period:string
    isSelectedPeriod:string
    setIsSelectedPeriod:React.Dispatch<React.SetStateAction<string>>
    setOilInfo:React.Dispatch<React.SetStateAction<oilInfo[]>>
}

export default function SelectPeriod ({period,isSelectedPeriod,setIsSelectedPeriod,setOilInfo}:props) {

    const update = ()=> {
        setIsSelectedPeriod(period);
        setOilInfo(initialOilInfoOfHalfYear);
    }

    return (
        <div className={style.underline} onClick={update} aria-selected={isSelectedPeriod===period}>
          {period}
        </div>
    )
}