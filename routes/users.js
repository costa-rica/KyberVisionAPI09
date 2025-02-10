var express = require("express");
var router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const { authenticateToken } = require("../middleware/auth");
const jwt = require("jsonwebtoken");

const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

// Register user Login=username(string)
// Route pour créer un utilisateur
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const { Login, Password, EmailAddress } = req.body;

    if (!Login || !Password || !EmailAddress) {
      return res.status(400).json({ error: "Tous les champs sont requis." });
    } else {
      console.log(`Login: ${Login}, ${Password}, ${EmailAddress}`);
    }
    const existing_user = await User.findOne({
      where: { EmailAddress: EmailAddress },
    });
    if (existing_user) {
      return res
        .status(400)
        .json({ result: false, error: "User exists already" });
    }
    const hashedPassword = await bcrypt.hash(Password, 10);

    const user = await User.create({
      Login,
      Password: hashedPassword,
      EmailAddress,
      Created: new Date(),
    });

    res.status(201).json({ message: "Utilisateur créé avec succès.", user });
  })
);

// Route pour obtenir tous les utilisateurs
// curl -X GET http://localhost:5000/api/users/ | jq .
router.get(
  "/",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const users = await User.findAll();
    res.status(200).json(users);
  })
);

// Route pour obtenir l'id d'un utilisateur selon son token
router.get(
  "/me",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({
        error: "Utilisateur non trouvé.",
        userId: userId,
        reqUser: req.user,
      });
    }
    res
      .status(200)
      .json({ id: user.id, login: user.Login, email: user.EmailAddress });
  })
);

// Route pour obtenir un utilisateur par ID
router.get(
  "/:id",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    res.status(200).json(user);
  })
);

// Route pour supprimer tous les utilisateurs
router.delete(
  "/",
  authenticateToken,
  asyncHandler(async (req, res) => {
    await User.destroy({ where: {} });
    res
      .status(200)
      .json({ message: "Tous les utilisateurs ont été supprimés." });
  })
);

// Route pour supprimer un utilisateur par ID
router.delete(
  "/:id",
  authenticateToken,
  asyncHandler(async (req, res) => {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    await user.destroy();
    res.status(200).json({ message: "Utilisateur supprimé avec succès." });
  })
);

// Route pour la connexion
/*
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email": "default@example.com", "password": "adminpassword"}'
*/
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: "Email et mot de passe requis." });
      }

      const user = await User.findOne({ where: { EmailAddress: email } });
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé." });
      }

      const isPasswordValid = await bcrypt.compare(password, user.Password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Mot de passe incorrect." });
      }

      await user.update({ Last_Access_Date: new Date() });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "5h",
      });
      res.status(200).json({ message: "Connexion réussie.", token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Erreur serveur." });
    }
  })
);

module.exports = router;
