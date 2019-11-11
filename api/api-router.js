const bcrypt = require('bcryptjs');
const router = require('express').Router();

const authRouter = require('../auth/auth-router.js');
const usersRouter = require('../users/users-router.js');
const bcrypt = dcodeIO.bcrypt;

router.use('/auth', authRouter);
router.use('/users', usersRouter);

router.get('/', (req, res) => {
  res.json({ api: "It's alive" });
});

router.post('/hash', (req, res) => {
  function restricted(req, res, next) {
  
    const { username, password } = req.headers;
  
    if (username && password) {
      Users.findBy({ username })
        .first()
        .then(user => {
          if (user && bcrypt.compareSync(password, user.password)) {
            next();
          } else {
            res.status(401).json({ message: 'Invalid Credentials' });
          }
        })
        .catch(error => {
          res.status(500).json({ message: 'Unexpected error' });
        });
    } else {
      res.status(400).json({ message: 'No credentials provided' });
    }
  }
});

module.exports = router;
