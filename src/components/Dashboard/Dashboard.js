import './Dashboard.css'
import {PieChart, Pie} from "recharts";
import {useUserContext} from "../../context/UserContext";

const Dashboard = ({users}) => {
    const {tableList} = useUserContext();
    const firstGradeNum = tableList.filter(user => user.grade === 1).length;
    const secondGradeNum = tableList.filter(user => user.grade === 2).length;
    const thirdGradeNum = tableList.filter(user => user.grade === 3).length;
    const totalNum = tableList.length;
    const data = [
        {name: '1학년', value: firstGradeNum},
        {name: '2학년', value: secondGradeNum},
        {name: '3학년', value: thirdGradeNum}
    ];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.15;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            percent !== 0 ?
                <text style={{fontSize: 10}} x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                    {data[index].name} ({`${(percent * 100).toFixed(0)}%`})
                </text>
                : null
        );
    };
    return (
        <div className="DashboardWrapper">
            <div className="Dashboard">
                <div className="DashboardText">
                    <div className="DashboardTextTitle">와플 고등학교</div>
                    <div className="DashboardTextInfo">
                        <div className="DashboardTextFirst">1학년: {firstGradeNum}</div>
                        <div className="DashboardTextSecond">2학년: {secondGradeNum}</div>
                        <div className="DashboardTextThird">3학년: {thirdGradeNum}</div>
                        <div className="DashboardTextTotal">전교생: {totalNum}</div>
                    </div>
                    <div className="DashboardPieChartWrapper">
                        <div className="DashboardPieChart">
                            <PieChart width={250} height={250}>
                                <Pie data={data}
                                     dataKey="value"
                                     cx="50%"
                                     cy="50%"
                                     outerRadius={65}
                                     fill="grey"
                                     labelLine={false}
                                     label={renderCustomizedLabel}/>
                            </PieChart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard