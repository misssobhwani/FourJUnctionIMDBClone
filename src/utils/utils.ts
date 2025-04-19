type MovieFormData = {
  title: string;
  year: number;
  producer: string;
  actors: string[];
};

export const validateMovieForm = (formData:  MovieFormData) => {
  const errors: string[] = [];

  if (!formData.title.trim()) {
    errors.push('Title is required.');
  }

  if (!/^\d{4}$/.test(formData.year.toString()) || formData.year < 1900 || formData.year > new Date().getFullYear()) {
    errors.push('Year must be a valid 4-digit number.');
  }



  if (!formData.producer.trim() || /\d/.test(formData.producer)) {
    errors.push('Producer name is required and must not contain numbers.');
  }

  const actorWithNumbers = formData.actors.find(actor => /\d/.test(actor));
  if (actorWithNumbers) {
    errors.push(`Actor "${actorWithNumbers}" should not contain numbers.`);
  }

  return errors;
};
