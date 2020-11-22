const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, required: true, maxlength: 100 },
  family_name: { type: String, required: true, maxlength: 100 },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

//Virtual Function for Author's Full name
AuthorSchema.virtual("lifespan").get(() => {
  return (
    this.date_of_death.getYear() - this.date_of_birth.getYear()
  ).toString();
});

// Virtual Function for URL
AuthorSchema.virtual("url").get(function () {
  return "/catalog/author/" + this._id;
});

// Virtual Function for fromatting date of birth for author or return none of not
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
  return this.date_of_birth
    ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Virtual Function for fromatting date of death for author or return none if not
AuthorSchema.virtual("date_of_death_formatted").get(function () {
  return this.date_of_death
    ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED)
    : "";
});

// Export Model
module.exports = mongoose.model("Author", AuthorSchema);
