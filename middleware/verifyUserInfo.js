module.exports = function(req, res, next) {
  // destructure email, name, pass to extract that data
  const { email, name, password } = req.body;

  // checks if email is valid by making sure it follows the regex pattern
  function validEmail(userEmail) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    // check if email, name, and pass are empty 
    if (email === '' || name === '' || password === '') {
      return res.json("Missing Credentials");
      // verifies email is valid
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  } else if (req.path === "/login") {
    // checks just email and pass if empty
    if (email === '' || password === '') {
      return res.json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }

  next(); // continues on to the route after everything has been verified
};