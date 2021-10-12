import './Table.css'
import TableContent from "./TableContent/TableContent"

const Table = ({info, setInfo, search, userList}) => (
    <div className="TableWrapper">
        <div className="TableHeaderWrapper">
            <div className="TableHeader">
                <div className="TableHeaderName">이름</div>
                <div className="TableHeaderGrade">학년</div>
            </div>
            <div className="TableContent">
                <TableContent info={info} setInfo={setInfo} search={search} userList={userList} />
            </div>
        </div>
    </div>
    )

export default Table