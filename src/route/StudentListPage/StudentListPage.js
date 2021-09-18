import './StudentListPage.css'
import {useState} from "react";
import Header from "../../components/Header/Header";
import Dashboard from "../../components/Dashboard/Dashboard";
import ControlBar from "../../components/ControlBar/ControlBar";
import Table from "../../components/Table/Table";
import SeparateBar from "../../components/SeparateBar/SeparateBar";
import Detail from "../../components/Detail/Detail";
import Modal from "../../components/Modal/Modal";

const StudentListPage = () => {
    const [info, setInfo] = useState(0);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div className="StudentListPageWrapper">
            <Header />
            <Dashboard />
            <ControlBar search={search} setSearch={setSearch} setModalOpen={setModalOpen}/>
            <Table info={info} setInfo={setInfo} search={search} />
            <SeparateBar />
            <Detail info={info} setInfo={setInfo} />
            <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} setInfo={setInfo}/>
        </div>
    )
}

export default StudentListPage