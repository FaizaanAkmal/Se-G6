const apiRoutes = {
  // User Routes
  user: {
    register: "/user/register",
    login: "/user/login",
    getUser: "/user/getUser",
    changePassword: "/user/changePassword",
    delete: "/user/deleteUser"
  },

  // Job Routes
  job: {
    create: "/job/create",
    getAll: "/job/all",
    getRelatedJobs: "/job/related",
    edit: "/job/edit",
    delete: "/job/delete",
    deleteApplicant: "/job/deleteApplicant",
    updateBookmarks: "/job/updateBookmarks",
    individualBookmarks:"/job/individualBookmarks"
  },

  // Developer Routes
  dev: {
    register: "/dev/profileSetup",
    edit: "/dev/profileEdit",
    application: "/dev/application",
    getProfile: "/dev/getProfile",
    delete: "/dev/deleteDev"
  },

  // Company Routes
  company: {
    register: "/company/profileSetup",
    edit: "/company/profileEdit",
    getProfile: "/company/getProfile",
    delete: "/company/deleteCompany"
  },
};

// Client-Side Navigation (React Router Routes)
const clientRoutes = {
  signup: "/",
  login: "/login",
  companyProfileSetup: "/company/profileSetup",
  devProfileSetup: "/dev/profileSetup",
  companyDashboard: "/company/dashboard",
  devDashboard: "/dev/dashboard",
  postAJob: "/postAJob",
  searchJobs: "/dev/search",
  devSettings: "/dev/settings",
  devIndividualJob: "/dev/job",
  companySettings: "/company/settings",
};

export { apiRoutes, clientRoutes };