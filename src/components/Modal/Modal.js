import React, { useState } from 'react'
import './Modal.css'
import API from "../../api/API";
import {toast, ToastContainer} from "react-toastify";

const Modal = ({modalOpen, setModalOpen, setInfo}) => {
    const loginToken = localStorage.getItem('loginToken');
    const config = {
        headers: { Authorization: `Bearer ${loginToken}` }
    }

    const [inputs, setInputs] = useState({
        name: '',
        grade: '',
    });
    const {name, grade} = inputs;

    const closeModal = () => {
        setModalOpen(false)
        setInputs({
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

    const onCreate = async () => {
        await API.post("/student", {...inputs, grade: parseInt(grade)}, config)
            .then(res => res.data)
            .then(data => {
                setInfo(data.id)
                setInputs({
                    name:'',
                    grade:'',
                })
                setModalOpen(false)
            })
            .catch(data => {
                toast.error(data.message)
            })
    }

    return (
        <div className={modalOpen? "openModal modal":"modal"}>
            { modalOpen &&
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
                    </div>
                    <div className="closeModal" onClick={closeModal}>
                        <div className="closeModalText">닫기</div>
                    </div>
                    <div className="addUser" onClick={onCreate}>
                        <div className="addUserText">추가</div>
                    </div>
                </div>
            }
            <ToastContainer autoClose={2500} position="top-right" />
        </div>
    )
}

export default Modal