import React from "react";
import { AiFillSetting } from "react-icons/ai";
import { FaUserLock, FaPalette, FaLanguage } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

const SettingsList = [
  {
    label: "Users & permission",
    icon: <FaUserLock />,
    path: "/settings/permission",
  },
  { label: "General", icon: <AiFillSetting />, path: "/settings/general" },
  { label: "Theme", icon: <FaPalette /> },
  { label: "Language", icon: <FaLanguage /> },
  { label: "Serviceable Zones", icon: <FaLocationDot /> },
];

export default SettingsList;
