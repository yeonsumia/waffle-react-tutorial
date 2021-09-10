import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Dashboard from "./components/Dashboard/Dashboard"
import ControlBar from "./components/ControlBar/ControlBar"
import Table from "./components/Table/Table"
import SeparateBar from "./components/SeparateBar/SeparateBar"
import Detail from "./components/Detail/Detail"
import Modal from "./components/Modal/Modal"
import dummyData from './dummyData/dummy'

function App() {
  const [info, setInfo] = useState(0);
  const [tableList, setTableList] = useState(dummyData);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);


  return (
    <div className="AppWrapper">
        <Header />
        <Dashboard />
        <ControlBar search={search} setSearch={setSearch} setModalOpen={setModalOpen}/>
        <Table info={info} setInfo={setInfo} tableList={tableList} search={search} />
        <SeparateBar />
        <Detail info={info} setInfo={setInfo} tableList={tableList} setTableList={setTableList}/>
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen} tableList={tableList} setTableList={setTableList} setInfo={setInfo}/>
    </div>
  );
}

export default App;
