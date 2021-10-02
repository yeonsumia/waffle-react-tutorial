import './StudentListPage.css'
import {useState, useEffect} from "react";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import ControlBar from "../../components/ControlBar/ControlBar";
import Table from "../../components/Table/Table";
import SeparateBar from "../../components/SeparateBar/SeparateBar";
import Detail from "../../components/Detail/Detail";
import Modal from "../../components/Modal/Modal";
import API from "../../api/API";
import {toast, ToastContainer} from "react-toastify";
import PopUp from "../../components/PopUp/PopUp";

const StudentListPage = () => {
    const loginToken = localStorage.getItem('loginToken');
    const [info, setInfo] = useState(0);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const config = {
        headers: { Authorization: `Bearer ${loginToken}` }
    };

    useEffect(() => {
        toast.success("환영합니다!");
    }, [])

    useEffect(() => {
        async function getUsers() {
            await API.get("/student", config)
                .then(({data}) => {
                    setUserList(data)
                })
        }

        getUsers();
    }, [info, loginToken])
    return (
        <div className="StudentListPageWrapper">
            <Header />
            <Dashboard userList={userList} />
            <ControlBar search={search} setSearch={setSearch} setModalOpen={setModalOpen}/>
            <Table info={info} setInfo={setInfo} search={search} userList={userList} />
            <SeparateBar />
            <Detail info={info} userList={userList} />
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} setInfo={setInfo}/>
            <ToastContainer autoClose={2500} position="top-right" />
            <PopUp />
        </div>
    )
}

export default StudentListPage