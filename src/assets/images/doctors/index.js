// Doctor avatar images
import Avatar from "./Avatar.png";
import Avatar1 from "./Avatar-1.png";
import Avatar2 from "./Avatar-2.png";
import Avatar3 from "./Avatar-3.png";
import Avatar4 from "./Avatar-4.png";
import Avatar5 from "./Avatar-5.png";
import Avatar6 from "./Avatar-6.png";
import Avatar7 from "./Avatar-7.png";
import Avatar8 from "./Avatar-8.png";
import Avatar9 from "./Avatar-9.png";
import Avatar10 from "./Avatar-10.png";
import Avatar11 from "./Avatar-11.png";
import Avatar12 from "./Avatar-12.png";
import Avatar13 from "./Avatar-13.png";
import Avatar14 from "./Avatar-14.png";
import Avatar15 from "./Avatar-15.png";
import Avatar16 from "./Avatar-16.png";
import Avatar17 from "./Avatar-17.png";
import Avatar18 from "./Avatar-18.png";
import Avatar19 from "./Avatar-19.png";
import Avatar20 from "./Avatar-20.png";
import Avatar21 from "./Avatar-21.png";

// Named doctors with their images
export const doctors = {
  "James Wilson": { image: Avatar, initials: "JW" },
  "Sarah Chen": { image: Avatar1, initials: "SC" },
  "Michael Roberts": { image: Avatar2, initials: "MR" },
  "Emily Thompson": { image: Avatar3, initials: "ET" },
  "David Kim": { image: Avatar4, initials: "DK" },
  "Jessica Martinez": { image: Avatar5, initials: "JM" },
  "Robert Johnson": { image: Avatar6, initials: "RJ" },
  "Amanda Lee": { image: Avatar7, initials: "AL" },
  "Christopher Davis": { image: Avatar8, initials: "CD" },
  "Michelle Brown": { image: Avatar9, initials: "MB" },
  "Daniel Garcia": { image: Avatar10, initials: "DG" },
  "Stephanie Miller": { image: Avatar11, initials: "SM" },
  "Kevin Anderson": { image: Avatar12, initials: "KA" },
  "Rachel Taylor": { image: Avatar13, initials: "RT" },
  "Brian White": { image: Avatar14, initials: "BW" },
  "Jennifer Moore": { image: Avatar15, initials: "JM" },
  "Andrew Jackson": { image: Avatar16, initials: "AJ" },
  "Laura Harris": { image: Avatar17, initials: "LH" },
  "Thomas Clark": { image: Avatar18, initials: "TC" },
  "Nicole Lewis": { image: Avatar19, initials: "NL" },
  "William Young": { image: Avatar20, initials: "WY" },
  "Katherine Hall": { image: Avatar21, initials: "KH" },
};

// Get doctor by name
export const getDoctor = (name) => {
  return doctors[name] || null;
};

// Get doctor image by name
export const getDoctorImageByName = (name) => {
  return doctors[name]?.image || null;
};

// Get all doctor names
export const getDoctorNames = () => {
  return Object.keys(doctors);
};

// Array of all doctor images for easy random selection
export const doctorImages = [
  Avatar,
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14,
  Avatar15,
  Avatar16,
  Avatar17,
  Avatar18,
  Avatar19,
  Avatar20,
  Avatar21,
];

// Array of all doctors as objects
export const doctorList = Object.entries(doctors).map(([name, data]) => ({
  name,
  ...data,
}));

// Helper to get a random doctor
export const getRandomDoctor = () => {
  const names = Object.keys(doctors);
  const randomName = names[Math.floor(Math.random() * names.length)];
  return { name: randomName, ...doctors[randomName] };
};

// Helper to get a random doctor image
export const getRandomDoctorImage = () => {
  return doctorImages[Math.floor(Math.random() * doctorImages.length)];
};

// Helper to get a doctor image by index (wraps around if out of bounds)
export const getDoctorImage = (index) => {
  return doctorImages[index % doctorImages.length];
};

// Named exports for individual images
export {
  Avatar,
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
  Avatar11,
  Avatar12,
  Avatar13,
  Avatar14,
  Avatar15,
  Avatar16,
  Avatar17,
  Avatar18,
  Avatar19,
  Avatar20,
  Avatar21,
};

export default doctors;
