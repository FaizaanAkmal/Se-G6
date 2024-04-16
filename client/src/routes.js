import JobPost from "./pages/company/CompanyIndividualJob";

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
    getAllApplicants: "/job/allApplicants",
    edit: "/job/edit",
    close: "/job/close",
    delete: "/job/delete",
    deleteApplicant: "/job/deleteApplicant",
    updateBookmarks: "/job/updateBookmarks",
    individualBookmarks:"/job/individualBookmarks",
    acceptOffer:"/job/acceptOffer",
    rejectOffer: "/job/rejectOffer"
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
    getMyJobs: (userId) => `/company/myJobs/${userId}`,
    updateBookmark: "/company/bookmark",
    getProfile: "/company/getProfile",
    delete: "/company/deleteCompany",
    getApplicants: "/company/getApplicants"
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
  companySettings: "/company/settings",
  devIndividualJob: "/dev/job",
  companyIndividualJob:"/company/job" 
};

export { apiRoutes, clientRoutes };