const Application = require("./applications.model");

exports.list = async (req, res, next) => {
  try {
    const applications = await Application.query().eager("user");
    res.json({ data: applications });
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const application = await Application.getApplicationById(req.params.id);
    res.json({ data: application });
  } catch (error) {
    next(error);
  }
};

exports.create = async (req, res, next) => {
  try {
    const application = await Application.insertApplication(req.body);
    res.json({ data: application });
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const application = await Application.updateApplication(
      req.params.id,
      req.body
    );
    res.json({ data: application });
  } catch (error) {
    next(error);
  }
};

exports.remove = async (req, res, next) => {
  try {
    await Application.deleteApplication(req.params.id);
    res.json({ data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
};
