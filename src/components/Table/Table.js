import './Table.css'
import TableList from "./TableList/TableList"

const Table = ({info, setInfo, tableList, search}) => (
    <div className="TableWrapper">
        <div className="TableHeaderWrapper">
            <div className="TableHeader">
                <div className="TableHeaderName">이름</div>
                <div className="TableHeaderGrade">학년</div>
            </div>
            <div className="TableContent">
                <TableList tableList={tableList} info={info} setInfo={setInfo} search={search}/>
            </div>
        </div>
    </div>
    )

export default Table