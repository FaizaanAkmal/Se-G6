const apiRoutes = {
  // User Routes
  user: {
    register: "/user/register",
    login: "/user/login",
    getUser: "/user/getUser/:id",
    changePassword: "/user/changePassword/:id"
  },

  // Job Routes
  job: {
    create: "/job/create",
    getAll: "/job/all",
    getRelatedJobs: "/job/related",
    edit: "/job/edit",
    delete: "/job/delete",
    updateBookmarks: "/job/updateBookmarks",
    individualBookmarks:"/job/individualBookmarks"
  },

  // Developer Routes
  dev: {
    register: "/dev/profileSetup",
    edit: "/dev/profileEdit",
    application: "/dev/application"
  },

  // Company Routes
  company: {
    register: "/company/profileSetup",
    edit: "/company/profileEdit/:id",
    getProfile: "/company/getProfile"
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