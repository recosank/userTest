export const PhoneRE = new RegExp(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm
);

export const EmailRE = new RegExp(
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);

export const crumbDataAddUser = [
  {
    title: "Home",
    href: "/",
    last: false,
  },
  {
    title: "Add User",
    href: "",
    last: true,
  },
];

export const countries = [
  {
    value: "India",
  },
  {
    value: "USA",
  },
  {
    value: "Brazil",
  },
  {
    value: "Argentina",
  },
];

export const cities = [
  {
    value: "Delhi",
  },
  {
    value: "Las Vegas",
  },
  {
    value: "Tokyo",
  },
  {
    value: "Paris",
  },
];
export const homeCrumb = [
  {
    title: "Home",
    href: "/",
    last: true,
  },
];
