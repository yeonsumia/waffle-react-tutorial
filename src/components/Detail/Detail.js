import { useState, useEffect } from 'react'
import './Detail.css'
import {useUserContext} from "../../context/UserContext";
import toBioIcon from '../../resource/toBio.png';
import {Link} from 'react-router-dom';

const Detail = ({info}) => {
    const {tableList} = useUserContext();
    const [inputs, setInputs] = useState({
        id: '',
        name: '',
        grade: '',
        profileImg: '',
    });
    const {id, name, grade, profileImg} = inputs;
    useEffect(() => {
        if(info !== 0){
            setInputs({
                ...inputs,
                id:  "/student/" + info,
                name: tableList.find(user => user.id === info).name,
                grade: tableList.find(user => user.id === info).grade,
                profileImg: tableList.find(user => user.id === info).profileImg
            })
        }
    }, [info, inputs, tableList]);

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    // const onToggle = () => {
    //     const gradeList = ['1','2','3']
    //     if(name.length > 3 || name.length < 2 || gradeList.find(num => num === grade) === undefined ){
    //         alert("이름 또는 학년이 올바르지 않습니다.")
    //         return null;
    //     }
    //     setTableList(
    //         tableList.map(user =>
    //             user.id === info ? {...user, name, grade:parseInt(grade), profileImg}: user)
    //     )
    // }
    //
    // const onRemove = () => {
    //     setTableList(
    //         tableList.filter(user => user.id !== info)
    //     )
    //     setInputs({name:'', grade: '', profileImg: ''})
    //     setInfo(0)
    // }
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
            <img className="DetailUserImg" src= {tableList.find(user => user.id === info).profileImg !== '' ? tableList.find(user => user.id === info).profileImg :initialImg} alt="" />

            <div className="DetailUserContent">
                <div className="DetailUserContentName">
                    <div className="DetailUserContentText">이름</div>
                    <input type="text" name="name" value={name}
                           className="DetailUserContentInput" onChange={onChange}/>
                </div>

                <div className="DetailUserContentGrade">
                    <div className="DetailUserContentText">학년</div>
                    <input type="text" name="grade" value={grade}
                           className="DetailUserContentInput" onChange={onChange}/>
                </div>
                <div className="DetailUserContentProfile">
                    <div className="DetailUserContentProfileText">프로필</div>
                    <input type="text" name="profile" value={profileImg}
                           className="DetailUserContentInput" onChange={onChange}/>
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