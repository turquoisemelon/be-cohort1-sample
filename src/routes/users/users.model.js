const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const IdentifyingInfo = require("../identifyingInfo/identifyingInfo.model");
    return {
      identifying_info: {
        relation: Model.ManyToManyRelation,
        modelClass: IdentifyingInfo,
        join: {
          from: "users.id",
          through: {
            from: "user_identifying_info.user_id",
            to: "user_identifying_info.identifying_info_id"
          },
          to: "identifying_info.id"
        }
      }
    };
  }
}

module.exports = User;
