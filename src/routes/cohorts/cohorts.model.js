const { Model } = require("objection");

class Cohort extends Model {
  static insertCohort({
    name,
    cohort_type,
    start_date,
    end_date,
    welcome_text,
    thank_you_text
  }) {
    return Cohort.query()
      .insert({
        name,
        cohort_type,
        start_date,
        end_date,
        welcome_text,
        thank_you_text
      })
      .returning("*");
  }
  static get tableName() {
    return "cohorts";
  }

  static updateCohort(id, update_params) {
    return Cohort.query()
    .findById(id)
    .patch(update_params)
    .returning("*");
  }
}

module.exports = Cohort;
