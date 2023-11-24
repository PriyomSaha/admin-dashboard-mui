import Notification1 from "Components/Assets/Sounds/1.mp3";
import Notification2 from "Components/Assets/Sounds/2.mp3";
import Notification3 from "Components/Assets/Sounds/3.mp3";
import Notification4 from "Components/Assets/Sounds/4.wav";
import Notification5 from "Components/Assets/Sounds/5.wav";
import Notification6 from "Components/Assets/Sounds/6.wav";
import Notification7 from "Components/Assets/Sounds/7.wav";
import Notification8 from "Components/Assets/Sounds/8.wav";
import Notification9 from "Components/Assets/Sounds/9.mp3";

export const getNotificationSound = (value) => {
  if (value === "1") return new Audio(Notification1);
  if (value === "2") return new Audio(Notification2);
  if (value === "3") return new Audio(Notification3);
  if (value === "4") return new Audio(Notification4);
  if (value === "5") return new Audio(Notification5);
  if (value === "6") return new Audio(Notification6);
  if (value === "7") return new Audio(Notification7);
  if (value === "8") return new Audio(Notification8);
  if (value === "9") return new Audio(Notification9);
};
