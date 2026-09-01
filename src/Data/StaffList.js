import bcrypt from "bcryptjs";

// ចំណាំ: password ពិតប្រាកដសម្រាប់ demo នេះគឺ "123456" សម្រាប់គ្រប់គ្នា
// hashSync ជា function ធ្វើពេល build ដើម្បីកុំឱ្យ password ជា plain text
const StaffList = [
  {
    id: 1,
    fullName: "vin van",
    username: "vinvan",
    passwordHash: bcrypt.hashSync("123456", 10),
    gender: "male",
    birthDate: "10/02/2002",
    placeOfBirth: "PP",
  },
  {
    id: 2,
    fullName: "chab thia",
    username: "chabthia",
    passwordHash: bcrypt.hashSync("123456", 10),
    gender: "female",
    birthDate: "11/02/2002",
    placeOfBirth: "CPC",
  },
  {
    id: 3,
    fullName: "van dara",
    username: "vandara",
    passwordHash: bcrypt.hashSync("123456", 10),
    gender: "male",
    birthDate: "11/04/2002",
    placeOfBirth: "CPCH",
  },
];

export default StaffList;