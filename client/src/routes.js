const apiRoutes = {
  // User Routes
  user: {
    register: "/user/register",
    login: "/user/login",
  },

  // Job Routes
  job: {
    create: "/job/create",
    get: "/job/",
    getAll: "/job/all",
    edit: "/job/edit",
    delete: "/job/delete",
    updateBookmarks: "/job/updateBookmarks",
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
    edit: "/company/profileEdit",
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
};

export { apiRoutes, clientRoutes };