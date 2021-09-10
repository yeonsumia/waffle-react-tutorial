import { useState, useEffect } from 'react'
import './Detail.css'

const Detail = ({info, setInfo, tableList, setTableList}) => {
    const [inputs, setInputs] = useState({
        name: '',
        grade: '',
        profileImg: '',
    });
    const {name, grade, profileImg} = inputs;
    useEffect(() => {
        if(info !== 0){
            setInputs({
                ...inputs,
                name: tableList.find(user => user.id === info).name,
                grade: tableList.find(user => user.id === info).grade,
                profileImg: tableList.find(user => user.id === info).profileImg
            })
        }
    }, [info]);

    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onToggle = () => {
        const gradeList = ['1','2','3']
        if(name.length > 3 || name.length < 2 || gradeList.find(num => num === grade) === undefined ){
            alert("이름 또는 학년이 올바르지 않습니다.")
            return null;
        }
        setTableList(
            tableList.map(user =>
                user.id === info ? {...user, name, grade:parseInt(grade), profileImg}: user)
        )
    }

    const onRemove = () => {
        setTableList(
            tableList.filter(user => user.id !== info)
        )
        setInputs({name:'', grade: '', profileImg: ''})
        setInfo(0)
    }
    const initialImg ="https://cdn4.iconfinder.com/data/icons/small-n-flat/24/user-alt-1024.png"
    return (
    info !== 0 ?
        <div className="DetailWrapper">
            <div className="DetailUserHeader">
                <div className="DetailUserSave">
                    <div onClick={onToggle} className="DetailUserSaveText">저장</div>
                </div>
                <div className="DetailUserDelete">
                    <div onClick={onRemove} className="DetailUserDeleteText">삭제</div>
                </div>
            </div>
            <img className="DetailUserImg" src= {tableList.find(user => user.id === info).profileImg !== '' ? tableList.find(user => user.id === info).profileImg :initialImg} />

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