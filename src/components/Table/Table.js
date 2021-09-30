import './Table.css'
import TableContent from "./TableList/TableContent"

const Table = ({info, setInfo, search}) => (
    <div className="TableWrapper">
        <div className="TableHeaderWrapper">
            <div className="TableHeader">
                <div className="TableHeaderName">이름</div>
                <div className="TableHeaderGrade">학년</div>
            </div>
            <div className="TableContent">
                <TableContent info={info} setInfo={setInfo} search={search}/>
            </div>
        </div>
    </div>
    )

export default Table