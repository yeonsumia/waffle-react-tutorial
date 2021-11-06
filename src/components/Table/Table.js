import './Table.css'
import TableContent from "./TableContent/TableContent"

const Table = ({info, setInfo, userList, searchGrade, searchName}) => (
    <div className="TableWrapper">
        <div className="TableHeaderWrapper">
            <div className="TableHeader">
                <div className="TableHeaderName">이름</div>
                <div className="TableHeaderGrade">학년</div>
            </div>
            <div className="TableContent">
                <TableContent info={info} setInfo={setInfo} userList={userList} searchGrade={searchGrade} searchName={searchName} />
            </div>
        </div>
    </div>
    )

export default Table