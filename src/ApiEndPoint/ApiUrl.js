export const API = {
  Admin_Login: "/api/admin/LoginAdmin",

 
    menadd: "/api/admin/MenProduct",
    menedit: "/api/admin/EditeMenProducts",
    mendelete: "/api/admin/DeletedMenProducts",
    menget: "/api/admin/ListMenProducts",
 

  // WOMEN
  women: {
    add: "/api/admin/WomenProduct",
    edit: "/api/admin/EditeWomenProducts",
    delete: "/api/admin/DeleteWomenProducts",
    get: "/api/admin/ListWomenProducts",
  },

 
    kidsadd: "/api/admin/AddkidProducts",
    kidsedit: "/api/admin/EditeKidProducts",
    kidsdelete: "/api/admin/DeleteKidProducts",
    kidsget: "/api/admin/GetKids",
 

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