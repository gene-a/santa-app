/**
 * Calculates the age of an individual based on their birthdate.
 *
 * @param {string} birthdate - A string representing the birthdate in the format "YYYY/MM/DD".
 * @returns {number} The age of the individual in years.
 * @throws {Error} If the input birthdate is invalid or cannot be parsed.
 *
 * @example
 * // Calculate the age of a person born on "1990/05/15"
 * const age = calculateAge("1990/05/15");
 * // age will be a number representing the person's age in years.
 */
const calculateAge = function (birthdate) {
  // Parse the birthdate string into a Date object
  const birthDate = new Date(birthdate)

  // Get the current date
  const currentDate = new Date()

  // Calculate the difference between current date and birthdate
  const ageDiff = currentDate - birthDate

  // Convert ageDiff to a Date object
  const ageDate = new Date(ageDiff)

  // Extract the year from ageDate
  const age = ageDate.getUTCFullYear() - 1970

  return age
}

export const utils = {
  calculateAge: calculateAge,
}
