module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

  function validEmail(userEmail) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(userEmail);
  }

  function missingCredentials() {
    return res.status(401).json("Informations manquantes");
  }

  function invalidEmail() {
    return res.status(401).json("Cet email n'est pas valide");
  }


  if (req.path === "/register") {
    if (![email, name, password].every(Boolean)) {
      missingCredentials();
    } else if (!validEmail(email)) {
      invalidEmail();
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      missingCredentials();
    } else if (!validEmail(email)) {
      invalidEmail();
    }
  }

  next();

};