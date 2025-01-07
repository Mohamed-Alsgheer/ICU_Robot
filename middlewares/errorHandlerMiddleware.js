const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { username: '', email: '', password: '' };
  
    // incorrect email
    if (err.message === 'incorrect email') {
      errors.email = 'That email is not registered';
    }
  
    // incorrect password
    if (err.message === 'incorrect password') {
      errors.password = 'That password is incorrect';
    }
  
    // duplicate email or username error
    if (err.code === 11000) {
      if (err.keyValue.email) {
        errors.email = 'That email is already registered';
      }
      if (err.keyValue.username) {
        errors.username = 'That username is already taken';
      }
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      Object.values(err.errors).forEach(({ properties }) => {
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
}

export default handleErrors;