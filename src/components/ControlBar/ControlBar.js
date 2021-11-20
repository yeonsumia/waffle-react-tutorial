import './ControlBar.css'
import {useHistory} from "react-router-dom";
import {useRef, useState} from "react";
import {toast} from "react-toastify";

const ControlBar = () => {

    const history= useHistory();
    const searchName = useRef();
    const searchGrade = useRef();
    const [prevGrade, setPrevGrade] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        const name = searchName.current?.value;
        const grade = searchGrade.current?.value;
        if(name !== "" && grade !== "") history.push(`/students?name=${name}&grade=${grade}`);
        else if(name !== "" && grade === "") history.push(`/students?name=${name}`);
        else if(name === "" && grade !== "") history.push(`/students?grade=${grade}`);
        else history.push(`/students`);
    }

    const onChange = (e) => {
        const grade = e.target.value;
        if(grade !== ""){
            if(grade < 1){
                if(prevGrade === "1") e.target.value = 1;
                else e.target.value = '';
                toast.error("학년은 1,2,3 중 하나입니다.");
            }
            else if(grade > 3){
                if(grade >= 10) e.target.value = parseInt(grade / 10);
                else if(prevGrade === "3") e.target.value = 3;
                else e.target.value = '';
                toast.error("학년은 1,2,3 중 하나입니다.");
            }
            else setPrevGrade(grade);
        }
    }

    return (
    <div className="ControlBarWrapper">
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="이름" className="ControlBarSearchName" ref={searchName} />
            <input type="number" placeholder="학년" className="ControlBarSearchGrade" ref={searchGrade} onChange={onChange} />
            <button className="ControlBarSearch">
                <div className="ControlBarSearchText">검색</div>
            </button>
        </form>
    </div>
    )
}

export default ControlBar