const Application = require("../routes/applications/applications.model");

const ROLES = {
  USER: "user",
  ADMIN: "admin"
};

const RESOURCES = {
  USERS: "users",
  APPLICATIONS: "applications",
  COHORTS: "cohorts"
};

const permissions = {
  [ROLES.USER]: {
    [RESOURCES.USERS]: {
      create: "own",
      update: "own",
      delete: "own",
      read: "own"
    },
    [RESOURCES.APPLICATIONS]: {
      create: "own",
      update: "own",
      delete: "own",
      read: "own"
    },
    [RESOURCES.COHORTS]: {}
  },
  [ROLES.ADMIN]: {
    [RESOURCES.USERS]: {
      create: "all",
      update: "own",
      delete: "own",
      read: "all"
    },
    [RESOURCES.APPLICATIONS]: {
      create: "all",
      update: "all",
      delete: "all",
      read: "all"
    },
    [RESOURCES.COHORTS]: {
      create: "all",
      update: "all",
      delete: "all",
      read: "all"
    }
  }
};

const checkIfOwnResource = async (userId, resourceName, resourceId) => {
  const resourceToDbMap = {
    [RESOURCES.APPLICATIONS]: Application
  };

  const record = await resourceToDbMap[resourceName]
    .query()
    .findById(resourceId);
  const recordUserId =
    resourceName === RESOURCES.USERS ? record.id : record.user_id;

  return recordUserId === userId;
};

const isAuthorized = async (user, resource, method) => {
  const methodActionMap = {
    GET: "read",
    PUT: "update",
    POST: "create",
    DELETE: "delete"
  };
  const action = methodActionMap[method];
  const access = permissions[user.type][resource.name][action];

  if (access === "all") return true;

  if (access === "own") {
    return await checkIfOwnResource(user.id, resource.name, resource.id);
  }

  return false;
};

const authorizeRequest = (req, res, next) => {
  // const user = {
  //   type: ROLES.USER,
  //   id: 1
  // };
  // const resource = {
  //   name: req.
  // }
};
