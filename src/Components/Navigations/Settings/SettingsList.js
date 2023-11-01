import React from "react";
import { AiFillSetting } from "react-icons/ai"; // Import the AiFillSetting icon from react-icons/ai
import { FaUserLock, FaPalette, FaLanguage } from "react-icons/fa"; // Import icons from react-icons/fa
import { FaLocationDot } from "react-icons/fa6"; // Import the FaLocationDot icon from react-icons/fa6
import { BsFillBoxSeamFill } from "react-icons/bs"; // Import the BsFillBoxSeamFill icon from react-icons/bs
import { IoNotifications } from "react-icons/io5"; // Import the IoNotifications icon from react-icons/io5

// Create an array called SettingsList with objects representing different settings and icons.
const SettingsList = [
  {
    label: "Users & permission", // Label for the setting
    icon: <FaUserLock />, // Icon for Users & permission (FaUserLock)
    path: "/settings/permission", // Path for navigation
  },
  {
    label: "General", // Label for the setting
    icon: <AiFillSetting />, // Icon for General (AiFillSetting)
    path: "/settings/general", // Path for navigation
  },
  {
    label: "Order", // Label for the setting
    icon: <BsFillBoxSeamFill />, // Icon for Order (BsFillBoxSeamFill)
    path: "/settings/order", // Path for navigation
  },
  {
    label: "Notification", // Label for the setting
    icon: <IoNotifications />, // Icon for Notification (IoNotifications)
    path: "/settings/notification", // Path for navigation
  },
  {
    label: "Theme", // Label for the setting
    icon: <FaPalette />, // Icon for Theme (FaPalette)
  },
  {
    label: "Language", // Label for the setting
    icon: <FaLanguage />, // Icon for Language (FaLanguage)
  },
  {
    label: "Serviceable Zones", // Label for the setting
    icon: <FaLocationDot />, // Icon for Serviceable Zones (FaLocationDot)
  },
];

export default SettingsList; // Export the SettingsList array for use in other parts of the application.
