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
import {toast} from "react-toastify";
import PopUp from "../../components/PopUp/PopUp";
import {useUserContext} from "../../context/UserContext";

const StudentListPage = () => {
    const [info, setInfo] = useState(0);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [userList, setUserList] = useState([]);
    const {loginToken} = useUserContext();

    useEffect(() => {
        // 새로고침 시에는 state 변수가 모두 초기화되므로 여기선 storage 에 직접 접근해야함.
        if(loginToken === "") {
            const token = localStorage.getItem('loginToken');
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            API.get("/student")
                .then(({data}) => {
                    setUserList(data);
                    toast.success("환영합니다!");
                })
                .catch(() => toast.error("명단을 불러올 수 없습니다."))
        } else {
            API.get("/student")
                .then(({data}) => {
                    setUserList(data);
                    toast.success("환영합니다!");
                })
                .catch(() => toast.error("명단을 불러올 수 없습니다."))
        }

    }, []);

    return (
        <div className="StudentListPageWrapper">
            <Header />
            <Dashboard userList={userList} />
            <ControlBar search={search} setSearch={setSearch} setModalOpen={setModalOpen}/>
            <Table info={info} setInfo={setInfo} search={search} userList={userList} />
            <SeparateBar />
            <Detail info={info} userList={userList} />
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} setInfo={setInfo}/>
            <PopUp />
        </div>
    )
}

export default StudentListPage