"use client";
import React, { FC, useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, Modal } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/styles";
import toast from "react-hot-toast";
type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [userId, setUserId] = useState("");

  const { isLoading, data, error, refetch } = useGetAllUsersQuery(
    {},
    { refetchOnMountOrArgChange: true }
  );
  const [
    updateUserRole,
    { error: updateUserRoleError, isSuccess },
  ] = useUpdateUserRoleMutation();
  const [
    deleteUser,
    { isSuccess: deleteSuccess, error: deleteError },
  ] = useDeleteUserMutation({});
  useEffect(() => {
    if (updateUserRoleError) {
      if ("data" in updateUserRoleError) {
        const errorData = updateUserRoleError as any;
        toast.error(errorData.data.message);
      }
    }

    if (isSuccess) {
      toast.success("User role updated successfully");
      setActive(false);
    }
    if (deleteSuccess) {
      refetch();
      toast.success("Delete user successfully!");
      setOpen(false);
    }
    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, updateUserRoleError, deleteError, refetch]);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "emailAction",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <a>
              <AiOutlineMail className="dark:text-white text-black" size={20} />
            </a>
          </>
        );
      },
    },
    {
      field: "deleteAction",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => {
        return (
          <>
            <Button
              onClick={() => {
                setOpen(!open);
                setUserId(params.row.id);
              }}
            >
              <AiOutlineDelete
                className="dark:text-white text-black"
                size={20}
              />
            </Button>
          </>
        );
      },
    },
  ];

  const handleSubmit = async () => {
    const userToUpdate =
      data && data.users
        ? data.users.find((user: any) => user.email === email)
        : undefined;

    if (userToUpdate) {
      await updateUserRole({ id: userToUpdate._id, role });
    } else {
      toast.error("User not found with this email");
    }
  };
  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
  };
  // Grid Rows And Colunms
  const rows: any = [];
  if (isTeam) {
    const teamData =
      data && data.users.filter((user: any) => user.role === "admin");
    teamData?.forEach((user: any) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user?.courses?.length || 0,
        created_at: format(user.createdAt),
      });
    });
  } else {
    data?.users.forEach((user: any) => {
      rows.push({
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        courses: user?.courses?.length || 0,
        created_at: format(user.createdAt),
      });
    });
  }

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="mt-[120px]">
          <Box m="20px">
            <div className="w-full flex justify-end">
              <div
                className={`${styles.button} !w-[220px] dark:bg-[#57c7a3] !h-[35px] dark:border-[#ffffffa8]`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </div>
            </div>
            <Box
              m="40px 0 0 0"
              height="80vh"
              sx={{
                "& .MuiDataGrid-root": {
                  border: "none",
                  outline: "none",
                  backgroundColor: theme === "dark" ? "#1a1b2e" : "#A4A9FC",
                },
                "& .css-pqjvzy-MuiSvgIcon-root-MuiSelect-icon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-sortIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-row": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderBottom:
                    theme === "dark" ? "#1a1b2e" : "1px solid #ccc!important",
                  backgroundColor: theme === "dark" ? "#1e2134" : "#fff",
                  "&:hover": {
                    backgroundColor: theme === "dark" ? "#252644" : "#f3f4f6",
                  },
                },
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-cell": {
                  borderBottom: "none!important",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .name-column--cell": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: theme === "dark" ? "#000" : "#A4A9FC",
                  borderBottom: "none",
                  color: theme === "dark" ? "##fff" : "#000",
                  fontWeight: "600",
                },
                "& .MuiDataGrid-columnHeaderTitle": {
                  color: theme === "dark" ? "#000" : "#000",
                  fontWeight: "600",
                },
                "& .MuiDataGrid-columnHeader": {
                  color: theme === "dark" ? "#000" : "#000",
                  backgroundColor: theme === "dark" ? "#4338ca" : "#A4A9FC",
                  "&:focus, &:focus-within": {
                    outline: "none",
                  },
                },
                "& .MuiDataGrid-virtualScroller": {
                  backgroundColor: theme === "dark" ? "#1a1b2e" : "#F2F0F0",
                },
                "& .MuiDataGrid-footerContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                  borderTop: "none",
                  backgroundColor: theme === "dark" ? "#4338ca" : "#A4A9FC",
                },

                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                  color:
                    theme === "dark" ? "#fff !important" : "#000 !important",
                },
                "& .MuiDataGrid-toolbar": {
                  backgroundColor: theme === "dark" ? "#4338ca" : "#A4A9FC",
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-toolbarContainer": {
                  backgroundColor: theme === "dark" ? "#4338ca" : "#A4A9FC",
                },
                "& .MuiDataGrid-selectedRowCount": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-menuIcon": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
                "& .MuiDataGrid-iconButtonContainer": {
                  color: theme === "dark" ? "#fff" : "#000",
                },
              }}
            >
              <DataGrid
                checkboxSelection
                rows={rows}
                columns={columns}
                sx={{
                  border:
                    theme === "dark"
                      ? "1px solid rgba(255, 255, 255, 0.1)"
                      : "1px solid #ccc",
                }}
              />
            </Box>
            {/* Update User Role Model */}
            {active && (
              <Modal
                open={active}
                onClose={() => setActive(!active)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <h1 className={`${styles.title}`}>Add New Member</h1>
                  <div className="mt-4">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email..."
                      className={`${styles.input}`}
                    />
                    <select
                      name=""
                      id=""
                      className={`${styles.input} !mt-6`}
                      onChange={(e: any) => setRole(e.target.value)}
                    >
                      <option value="admin">admin</option>
                      <option value="user">user</option>
                    </select>
                    <br />
                    <div
                      className={`${styles.button} my-6 !h-[30px]`}
                      onClick={handleSubmit}
                    >
                      Submit
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
            {/* Delete User Model */}
            {open && (
              <Modal
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[450px] bg-white dark:bg-slate-900 rounded-[8px] shadow p-4 outline-none">
                  <h1 className={`${styles.title}`}>
                    Are you sure you want to delete this User?
                  </h1>
                  <div className="flex w-full items-center justify-between mb-6 mt-4">
                    <div
                      className={`${styles.button} !w-[120px] h-[30px] bg-[#47d097]`}
                      onClick={() => setOpen(!open)}
                    >
                      Cancel
                    </div>
                    <div
                      className={`${styles.button} !w-[120px] h-[30px] bg-[#d63f3f]`}
                      onClick={handleDelete}
                    >
                      Delete
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
          </Box>
        </div>
      )}
    </>
  );
};

export default AllUsers;
