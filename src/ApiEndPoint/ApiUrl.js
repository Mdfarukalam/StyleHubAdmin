export const API = {
  Admin_Login: "/api/admin/LoginAdmin",

  // MEN
  men: {
    add: "/api/admin/MenProduct",
    edit: "/api/admin/EditeMenProducts",
    delete: "/api/admin/DeletedMenProducts",
    get: "/api/admin/ListMenProducts",
  },

  // WOMEN
  women: {
    add: "/api/admin/WomenProduct",
    edit: "/api/admin/EditeWomenProducts",
    delete: "/api/admin/DeleteWomenProducts",
    get: "/api/admin/ListWomenProducts",
  },

  // KIDS
  kids: {
    add: "/api/admin/AddkidProducts",
    edit: "/api/admin/EditeKidProducts",
    delete: "/api/admin/DeleteKidProducts",
    get: "/api/admin/GetKids",
  },

  // USERS
  users:"/api/admin/GetAllUsers",

  // TOP PRODUCTS
  topProducts: {
    add: "/api/admin/AddTopProducts",
    edit: "/api/admin/EditeTopProducts",
    delete: "/api/admin/DeletedTopProducts",
    get: "/api/admin/GetTopProducts",
  },

  // NEW ARRIVALS
  arrivals: {
    add: "/api/admin/AddArrivalsProducts",
    edit: "/api/admin/EditArrivalsProducts",
    get: "/api/admin/ListArrivalsProducts",
    delete: "/api/admin/DeleteArrivalsProducts",
  },
};

export default API;