import { useState } from "react";
import { Box, Typography, useTheme, Menu, MenuItem } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const handleMenuClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setSelectedId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedId(null);
  };

  const handleEditVideo = () => {
    // Implement edit video functionality
    console.log("Editing video with id:", selectedId);
    handleClose();
  };

  const handleDeleteVideo = () => {
    // Implement delete video functionality
    console.log("Deleting video with id:", selectedId);
    handleClose();
  };
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "views",
      headerName: "Views",
      type: "number",
      flex: 1,
    },
    {
      field: "likes",
      headerName: "Likes",
      type: "number",
      flex: 1,
    },
    {
      field: "subscribers",
      headerName: "subscribers",
      type: "number",
      flex: 1,
    },
    {
      field: "edit video",
      headerName: "edit video",
      flex: 1,
      renderCell: ({ row: { access, id } }) => {
        return (
          <Box>
            <Typography
              color={colors.grey[100]}
              sx={{ cursor: "pointer" }}
              onClick={(e) => handleMenuClick(e, id)}
            >
              Edit/Delete
            </Typography>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleEditVideo}>
                <EditOutlinedIcon sx={{ mr: 1 }} />
                Edit Video
              </MenuItem>
              <MenuItem onClick={handleDeleteVideo}>
                <DeleteOutlineOutlinedIcon sx={{ mr: 1 }} />
                Delete Video
              </MenuItem>
            </Menu>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={mockDataTeam} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
