import React, { useState } from 'react'
import './Modal.css'
import {useUserContext} from "../../context/UserContext";

const Modal = ({modalOpen, setModalOpen, setInfo}) => {
    const { tableList, setTableList } = useUserContext();
    const [inputs, setInputs] = useState({
        id: tableList.length+1,
        name: '',
        grade: '',
    });
    const {id, name, grade} = inputs;

    const closeModal = () => {
        setModalOpen(false)
        setInputs({
            ...inputs,
            name:'',
            grade: '',
        })
    };
    // window.addEventListener('click', closeModal)
    const onChange = (e) => {
        const {value, name} = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    }

    const onCreate = () => {

        const gradeList = ['1','2','3']
        if(name.length > 3 || name.length < 2 || gradeList.find(num => num === grade) === undefined ){
            alert("이름 또는 학년이 올바르지 않습니다.")
            return null;
        }
        for(const user of tableList){
            if(user.name === name && user.grade === parseInt(grade)) {
                alert("같은 학년에 동명이인이 " + tableList.filter(user => user.name === name && user.grade === parseInt(grade)).length + "명 있습니다.")
                break;
            }
        }

        setTableList([...tableList, {...inputs, grade: parseInt(grade), profileImg:'', email:'', phone:'', major:''}]);
        // setstate 는 비동기적으로 동작하므로,, 배열에 추가하더라도 바로 적용되지 X --> id: length+2 해주어야 함.
        setInputs({
            ...inputs,
            id: tableList.length+2,
            name:'',
            grade:'',
            profileImg: ''
        })
        setInfo(id)
        setModalOpen(false)
    }
    return (
        <div className={modalOpen? "openModal modal":"modal"}>
            { modalOpen ? (
                <div className="modalWrapper">
                    <div className="modalBox">
                        <div className="modalBoxName">
                            <div className="modalBoxText" >이름</div>
                            <input type="text" name="name" value={name}
                                   className="modalBoxInput" onChange={onChange} />
                        </div>
                        <div className="modalBoxGrade">
                            <div className="modalBoxText">학년</div>
                            <input type="text" name="grade" value={grade}
                                   className="modalBoxInput" onChange={onChange}/>
                        </div>
                        {/*<div className="modalBoxProfile">*/}
                        {/*    <div className="modalBoxProfileText">프로필</div>*/}
                        {/*    <input type="text" name="profileImg" value={profileImg}*/}
                        {/*           className="modalBoxInput" onChange={onChange}/>*/}
                        {/*</div>*/}
                    </div>
                    <div className="closeModal" onClick={closeModal}>
                        <div className="closeModalText">닫기</div>
                    </div>
                    <div className="addUser" onClick={onCreate}>
                        <div className="addUserText">추가</div>
                    </div>
                </div>
            ) : null }
        </div>
    )
}

export default Modal