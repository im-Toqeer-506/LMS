import { styles } from "../../../styles/styles";
import {
  Bar,
  BarChart,
  Label,
  LabelList,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import Loader from "../../Loader/Loader";
import { useGetCoursesAnalyticsQuery } from "@/redux/features/analytics/analyticsApi";
import { FC } from "react";
type Props = object;

const CourseAnalytics: FC<Props> = () => {
  const { data, isLoading } = useGetCoursesAnalyticsQuery({});
  // const analyticsData: any = [];

  // if (data && data.courses && data.courses.last12Months) {
  //   data.courses.last12Months.forEach((item: any) => {
  //     analyticsData.push({
  //       name: item.month,
  //       uv: item.count,
  //     });
  //   });
  // }

  //Once with Dumy Data
  const analyticsData = [
  { name: "January 2024", uv: 3 },
  { name: "February 2024", uv: 2 },
  { name: "March 2024", uv: 5 },
  { name: "April 2024", uv: 7 },
  { name: "May 2024", uv: 2 },
  { name: "June 2024", uv: 5 },
  { name: "July 2024", uv: 7 },
  { name: "August 2024", uv: 4 },
  { name: "September 2024", uv: 6 },
  { name: "October 2024", uv: 3 },
  { name: "November 2024", uv: 5 },
  { name: "December 2024", uv: 6 },
];

  const minValue = 0;

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="h-screen">
          <div className="mt-[50px]">
            <h1 className={`${styles.title} px-5 !text-start`}>
              Courses Analytics
            </h1>
            <p className={`${styles.label} px-5`}>
              Last 12 Months Analytics Data
            </p>
          </div>

          <div className="w-full h-[90%] flex items-center justify-center">
            <ResponsiveContainer width="90%" height="50%">
              <BarChart width={150} height={300} data={analyticsData}>
                <XAxis dataKey="name">
                  <Label offset={0} position="insideBottom" />
                </XAxis>
                <YAxis domain={[minValue, "auto"]} />
                <Bar dataKey="uv" fill="#3faf82">
                  <LabelList dataKey="uv" position="top" />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
};

export default CourseAnalytics;
