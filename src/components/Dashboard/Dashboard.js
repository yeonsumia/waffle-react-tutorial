import './Dashboard.css'
import {PieChart, Pie} from "recharts";
import {useEffect, useState} from "react";
import API from "../../api/API"
import {useUserContext} from "../../context/UserContext";
import {toast} from "react-toastify";
import {useHistory} from "react-router-dom";

const Dashboard = () => {
    const {loginToken} = useUserContext();
    const history= useHistory();
    const [stat, setStat] = useState({
        firstGradeNum : 0,
        secondGradeNum : 0,
        thirdGradeNum : 0
    });
    const fetchStat = () => {
        if(loginToken === "") {
            const token = localStorage.getItem('loginToken');
            API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        }
        API.get("/student/stat")
            .then(({data}) => {
                return data.count;
            })
            .then(stat => setStat({ firstGradeNum : stat["1"], secondGradeNum: stat["2"], thirdGradeNum: stat["3"] }))
            .catch(() => {
                toast.error("서버와 연결이 끊겼습니다.")
                history.push("/login");
            })
    }
    useEffect(() => {
        const startInterval = setInterval(fetchStat, 3000);
        return () => clearInterval(startInterval);
    }, []);
    const totalNum = stat.firstGradeNum + stat.secondGradeNum + stat.thirdGradeNum;
    const data = [
        {name: '1학년', value: stat.firstGradeNum},
        {name: '2학년', value: stat.secondGradeNum},
        {name: '3학년', value: stat.thirdGradeNum}
    ];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.25;
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
                        <div className="DashboardTextFirst">1학년: {stat.firstGradeNum}</div>
                        <div className="DashboardTextSecond">2학년: {stat.secondGradeNum}</div>
                        <div className="DashboardTextThird">3학년: {stat.thirdGradeNum}</div>
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