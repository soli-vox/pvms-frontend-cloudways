const bankMenu = [
  {
    title: "Dashboard",
    path: "dashboard",
    icon: "🏠",
  },
  {
    title: "Account Settings",
    icon: "⚙️",
    subItems: [
      { title: "Change Password", path: "settings" },
      { title: "Update Profile", path: "profile" },
    ],
  },
  {
    title: "Branch Management",
    icon: "⚙️",
    subItems: [
      { title: "Add Branch", path: "settings" },
      { title: "Add ", path: "profile" },
    ],
  },
  {
    title: "Valuer Management",
    icon: "⚙️",
    subItems: [{ title: "Add Valuer", path: "valuers" }],
  },
];

export default bankMenu;
