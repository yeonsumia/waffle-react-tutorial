import './ControlBar.css'
import {useState} from "react";

const ControlBar = ({search, setSearch, setModalOpen}) => {
    const openModal = () => { setModalOpen(true) };
    const onChange = (e) => (
        setSearch(e.target.value)
    )
    return (
    <div className="ControlBarWrapper">
        <input type="text" placeholder="검색" className="ControlBarSearch" value={search} onChange={onChange}/>
        <div className="ControlBarAdd" onClick={openModal}>
            <div className="ControlBarAddText" >추가</div>
        </div>
    </div>
    )
}

export default ControlBar