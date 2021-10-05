import { useState, useEffect } from 'react'
import './Detail.css'
import toBioIcon from '../../resource/toBio.png';
import {Link} from 'react-router-dom';

const Detail = ({info, userList}) => {
    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        grade: '',
        profile_img: ''
    });
    const {id, name, grade, profile_img} = inputs;

    useEffect(() => {
        if(info !== 0) {
            const student = userList.find(user => user.id === info)
            setInputs({
                id: "/student/".concat(info),
                name: student.name,
                grade: student.grade,
                profile_img: student.profile_img
            })
        }
    }, [info])

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const initialImg ="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-1024.png"
    return (
    info !== 0 ?
        <div className="DetailWrapper">
            <div className="DetailToBio">
                <Link to = {id} >
                    <div className="DetailToBioBox">
                        <img className="DetailToBioImg" src={toBioIcon} alt="" />
                    </div>
                </Link>
            </div>
            <img className="DetailUserImg" src= { profile_img != null ? profile_img :initialImg} alt="" />

            <div className="DetailUserContent">
                <div className="DetailUserContentName">
                    <div className="DetailUserContentText">이름</div>
                    <input type="text" name="name" value={name}
                           className="DetailUserContentInput" onChange={onChange} disabled/>
                </div>

                <div className="DetailUserContentGrade">
                    <div className="DetailUserContentText">학년</div>
                    <input type="text" name="grade" value={grade}
                           className="DetailUserContentInput" onChange={onChange} disabled/>
                </div>
            </div>

        </div>
        :
        <div className="DetailWrapper">
            <div className="DetailText">
                왼쪽 표에서<br/><br/> 학생을 선택해 주세요.
            </div>
        </div>
    )
}
export default Detail