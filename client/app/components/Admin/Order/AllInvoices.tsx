import React, { FC, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useTheme } from "next-themes";
import { useGetAllCourseQuery } from "@/redux/features/courses/courseApi";
import { useGetAllUsersQuery } from "@/redux/features/user/userApi";
import { useGetAllOrdersQuery } from "@/redux/features/Orders/ordersApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import CourseData from "../Course/CourseData";
import { AiOutlineMail } from "react-icons/ai";
type Props = {
  isDashboard?: boolean;
};

const AllInvoices: FC<Props> = ({ isDashboard }) => {
  const { theme } = useTheme();
  const { isLoading: ordersLoading, data: OrdersData } = useGetAllOrdersQuery(
    {}
  );
  const { isLoading: usersLoading, data: UsersData } = useGetAllUsersQuery({});
  const { isLoading: coursesLoading, data: CoursesData } = useGetAllCourseQuery(
    {}
  );
  const [orderData, setOrderData] = useState<any[]>([]);
  const isLoading = ordersLoading || usersLoading || coursesLoading;
  useEffect(() => {
    if (OrdersData && UsersData && CoursesData) {
      const temp = OrdersData.orders.map((order: any) => {
        const user = UsersData.users.find((u: any) => u._id === order.userId);
        const course = CoursesData.courses.find((c: any) => c._id === order.courseId);
        return {
          ...order,
          userName: user?.name,
          userEmail: user?.Email,
          title: user?.name,
          price: "$" + course.price,
        };
      });
      setOrderData(temp);
    }
  }, [UsersData, OrdersData, CourseData]);

  const columns: any = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "userName", headerName: "Name", flex: isDashboard ? 0.6 : 0.5 },
    ...(isDashboard
      ? []
      : [
          { field: "userEmail", headerName: "Email", flex: 1 },
          { field: "title", headerName: "Course Title", flex: 1 },
        ]),
    { field: "price", headerName: "Price", flex: 0.5 },
    ...(isDashboard
      ? [{ field: "formattedDate", headerName: "Created At", flex: 0.5 }]
      : [
          {
            field: " ",
            headerName: "Email",
            flex: 0.2,
            renderCell: (params: any) => (
              <a href={`mailto:${params.row.userEmail}`}>
                <AiOutlineMail
                  className="dark:text-white text-black"
                  size={20}
                />
              </a>
            ),
          },
        ]),
  ];
  const rows = orderData.map((item: any) => ({
    id: item._id,
    userName: item.userName,
    userEmail: item.userEmail,
    title: item.title,
    price: item.price,
    formattedDate: item.createdAt,
  }));
  return (
    <div className={!isDashboard ? "mt-[120px]" : "mt-[0px]"}>
      {isLoading ? (
        <Loader />
      ) : (
        <Box m={isDashboard ? "0" : "40px"}>
          <Box
            m={isDashboard ? "0" : "40px 0 0 0"}
            height={isDashboard ? "35vh" : "82.49vh"}
            overflow={"hidden"}
            sx={{
              "& .MuiDataGrid-root": { border: "none", outline: "none" },
              "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#fff" : "#000",
                borderBottom:
                  theme === "dark"
                    ? "1px solid #ffffff30!important"
                    : "1px solid #ccc!important",
              },
              "& .MuiTablePagination-root": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none!important",
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#fff" : "#000",
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
                borderBottom: "none",
                color: "#000",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" ? "#1F2A40" : "#F2F0F0",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#fff" : "#000",
                borderTop: "none",
                backgroundColor: theme === "dark" ? "#3e4396" : "#A4A9FC",
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark" ? `#b7ebde !important` : `#000 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme === "dark" ? "#fff" : "#000"} !important`, // Fixed toolbar color
              },
            }}
          >
            <DataGrid
              checkboxSelection={!isDashboard}
              rows={rows}
              columns={columns}
              slots={isDashboard ? {} : { toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      )}
    </div>
  );
};

export default AllInvoices;
