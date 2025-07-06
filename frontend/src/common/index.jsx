const backendDomain = "http://localhost:8080";

const SummaryApi = {
  // Auth
  signUp: {
    url: `${backendDomain}/api/signup`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signin`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/user-details`,
    method: "get",
  },
  logout_user: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },

  // Users
  allusers: {
    url: `${backendDomain}/api/all-user`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/update-user`,
    method: "post",
  },

  // Job
  uploadJob: {
    url: `${backendDomain}/api/upload-job`,
    method: "post",
  },
  upDateJob: {
    url: `${backendDomain}/api/update-job`,
    method: "post",
  },
  allJob: {
    url: `${backendDomain}/api/get-job`,
    method: "get",
  },
  cardPosition: {
    url: `${backendDomain}/api/card-position`,
    method: "post",
  },

  // Customers
  addCustomer: {
    url: `${backendDomain}/api/add-customer`,
    method: "post",
  },
  updateCustomer: (customerId) => ({
    url: `${backendDomain}/api/update-customer/${customerId}`,
    method: "put",
  }),
  allCustomer: {
    url: `${backendDomain}/api/all-customer`,
    method: "get",
  },
};

export default SummaryApi;
