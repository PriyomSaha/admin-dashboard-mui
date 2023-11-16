import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TableContainer,
  Divider,
  Box,
  Tab,
} from "@mui/material";
import { CustomSwitch } from "Components/UI/GlobalStyles";
import { getNotificationEvents } from "Components/Assets/UIServices";
import { theme } from "Components/UI/themes";
import { BsThreeDotsVertical } from "react-icons/bs";
import React, { useState } from "react";
import EventSettings from "../../EventSettingsModal/EventSettings";

function NotificationTable() {
  const columns = [
    {
      id: "events",
      label: "Events",
      minwidth: "50000000",
    },
    {
      id: "sms",
      label: "SMS",
      minwidth: "100",
    },
    {
      id: "email",
      label: "EMail",
      minwidth: "100",
    },
    {
      id: "notifications",
      label: "Notifications",
      minwidth: "100",
    },
    {
      id: "action",
      label: "     ",
      minwidth: "50",
    },
  ];
  const [events, setEvents] = useState(getNotificationEvents());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");

  return (
    <>
      <Paper
        sx={{
          overflowX: "auto",
          mt: 2,
          width: "100%",
          // background: theme.palette.grey[200],
        }}
      >
        <TableContainer
          sx={{
            maxHeight: "auto",
            overflowX: "auto",
            // border: `1px solid ${theme.palette.grey[900]}`,
          }}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell
                    sx={{
                      fontWeight: 700,
                      backgroundColor: theme.palette.grey[900],
                      color: theme.palette.grey[100],
                      borderRight: `1px solid ${
                        index === columns.length - 1
                          ? theme.palette.grey[900]
                          : theme.palette.grey[100]
                      }`,
                      minWidth: columns.minWidth,
                    }}
                    key={column.id}
                    align={column.align}
                    minWidth={columns.minWidth}
                  >
                    <Typography sx={{ fontWeight: 700 }} noWrap>
                      {column.label}
                    </Typography>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {events.map((item, index) => (
                <TableRow key={index}>
                  {/* Add table cells for each property in your data object */}
                  <TableCell>
                    <Typography variant="body1" fontWeight={600} noWrap>
                      {item.name}
                    </Typography>
                    <Typography
                      fontWeight={300}
                      fontSize={13}
                      sx={{ color: theme.palette.grey[600] }}
                      noWrap
                    >
                      {item.description}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <CustomSwitch
                      checked={item.sms}
                      // onChange={() => setEnabled(!enabled)}
                      inputProps={{ "aria-label": "ant design" }}
                    />
                  </TableCell>
                  <TableCell>
                    <CustomSwitch
                      checked={item.email}
                      // onChange={() => setEnabled(!enabled)}
                      inputProps={{ "aria-label": "ant design" }}
                    />
                  </TableCell>
                  <TableCell>
                    {item.notification === null ? (
                      <Typography>NA</Typography>
                    ) : (
                      <CustomSwitch
                        checked={item.notification}
                        // onChange={() => setEnabled(!enabled)}
                        inputProps={{ "aria-label": "ant design" }}
                      />
                    )}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      setEventName(item.name);
                      setEventDescription(item.description);
                      setIsModalOpen(true);
                    }}
                  >
                    <BsThreeDotsVertical size={25} />
                  </TableCell>
                  <hr />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <EventSettings
        eventName={eventName}
        eventDescription={eventDescription}
        setEventDescription={setEventDescription}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </>
  );
}

export default NotificationTable;
