import { useSelector } from "react-redux";
import { BarChart } from "../../components/admin/Charts";
import { useGetDashboardStatsQuery } from "../../redux/api/adminApi";
import { userInitialState } from "../../types/types";



const today = new Date()
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(today.getDate()-6);


const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
const last7Days:string[] = []

for (let i = 0; i < 7; i++) {
    last7Days.push(days[sevenDaysAgo.getDay()]);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate()+1);
}


interface CategoryItemProps {
    color: string;
    value: number;
    heading: string;
  }

const CategoryItem = ({ color, value, heading }: CategoryItemProps) => (
    <div className="category-item">
      <h5>{heading}</h5>
      <div>
        <div
          style={{
            backgroundColor: color,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span>{value}%</span>
    </div>
  );
  

const BarCharts = () => {

    const {user} = useSelector((state:{userReducer:userInitialState})=>state.userReducer)
    const {data} = useGetDashboardStatsQuery(user?.owner!)
  return (
    <div className="admin-container flex justify-around flex-wrap">
      <main className="chart-container sm:w-[400px] lg:w-[40%]">
        <h1 className="text-center">Bar Charts</h1>
        <section>
          <BarChart
            data_1={data?.dashboard.numberOfOrders!}
            title_1="Products"
            title_2="Users"
            bgColor_1={`hsl(260,50%,30%)`}
            bgColor_2={`hsl(360,90%,90%)`}
            labels={last7Days}
          />
          <h2></h2>
        </section>
      </main>
      <div className="dashboard-categories">
            <h2>Inventory</h2>
            <div>
              {data?.dashboard.cuisineCount.map((i) => (
                <CategoryItem
                  key={i._id}
                  heading={i._id}
                  value={(i.count/data?.dashboard.cuisineCount.length)*100}
                  color={`hsl(${i.count * 4},${i.count}%,50%)`}
                />
              ))}
            </div>
          </div>
    </div>
  );
};

export default BarCharts;