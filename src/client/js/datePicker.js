export function datePicker(datestart, datend) {
  // Convert input strings to Date objects
  const departing = new Date(datestart);
  const returning = new Date(datend);

  // Get the current date
  const today = new Date();

  // Calculate days until departure and trip duration
  const countdown = Math.ceil((departing - today) / (1000 * 60 * 60 * 24));
  const duration = Math.ceil((returning - departing) / (1000 * 60 * 60 * 24));

  // Determine if the trip is in the future
  const infuture = countdown >= 15;

  // Create the result object
  const result = {
    departing: datestart,
    duration,
    countdown: countdown,
    infuture,
  };

  return result;
}
