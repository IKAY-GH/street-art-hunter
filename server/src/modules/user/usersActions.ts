import argon2 from "argon2";
import type { RequestHandler } from "express";
import { generateToken } from "../../utils/jwt";

import usersRepository from "./usersRepository";
import type { User } from "./usersRepository";

// Controller to retrieve all users
const browse: RequestHandler = async (req, res, next) => {
  try {
    const users = await usersRepository.readAll();

    res.json(users);
  } catch (err) {
    next(err);
  }
};

// Controller to retrieve a single user by ID
const read: RequestHandler = async (req, res, next) => {
  try {
    const usersId = Number(req.params.id);
    const Users = await usersRepository.read(usersId);
    if (Users == null) {
      res.sendStatus(404);
    } else {
      res.json(Users);
    }
  } catch (err) {
    next(err);
  }
};

// Controller for user authentication (login)
const login: RequestHandler = async (req, res, next) => {
  try {
    // Fetch user from database by email (includes password hash)
    const user = await usersRepository.readByEmailWithPassword(req.body.email);

    // User not found - return generic error message (security)
    if (user == null) {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    // Verify password against stored hash using Argon2
    const verified = await argon2.verify(user.password_hash, req.body.password);

    // Password incorrect - return generic error message (security)
    if (!verified) {
      res.status(422).json({ message: "Email ou mot de passe incorrect" });
      return;
    }

    // Generate JWT token for authenticated user
    const token = generateToken(user);

    // Return token and user data (excluding password hash)
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo,
        role: user.is_admin ? "admin" : "user",
      },
    });
  } catch (err) {
    next(err);
  }
};

// Argon2id hashing configuration - optimized for security
const hashingOptions = {
  type: argon2.argon2id, // Argon2id variant (most secure)
  memoryCost: 19 * 2 ** 10, // 19 MB of memory
  timeCost: 2, // 2 iterations
  parallelism: 1, // 1 thread
};

// Middleware to hash password before storing in database
const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const { password } = req.body;

    // Hash password using Argon2
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Replace plain password with hash in request body
    req.body.password_hash = hashedPassword;

    // Remove plain password from request
    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};

// Controller to create a new user (registration)
const add: RequestHandler = async (req, res, next) => {
  try {
    // Build user object from request body (password already hashed by middleware)
    const newUsers = {
      email: req.body.email,
      avatar_url: req.body.avatar_url,
      zip_code: req.body.zip_code,
      last_name: req.body.last_name,
      first_name: req.body.first_name,
      password_hash: req.body.password_hash,
      pseudo: req.body.pseudo,
      is_admin: req.body.is_admin ?? false,
    };

    // Insert new user into database
    const insertId = await usersRepository.create(newUsers);

    // Generate JWT token for auto-login after registration
    const token = generateToken({
      id: insertId,
      email: newUsers.email,
      is_admin: newUsers.is_admin,
    });

    // Return token and user data for frontend authentication
    res.status(201).json({
      token,
      user: {
        id: insertId,
        email: newUsers.email,
        pseudo: newUsers.pseudo,
        role: newUsers.is_admin ? "admin" : "user",
      },
    });
  } catch (err) {
    next(err);
  }
};

// Controller to update user profile
const edit: RequestHandler = async (req, res, next) => {
  try {
    const userId = Number(req.params.id);

    // Fetch existing user from database
    const existingUser = await usersRepository.read(userId);

    // User not found
    if (!existingUser || existingUser.length === 0) {
      res.sendStatus(404);
      return;
    }

    const user = existingUser[0];

    // Only allow user to edit their own profile or admin to edit any
    if (req.user?.id !== userId && req.user?.role !== "admin") {
      res.status(403).json({ message: "Non autorisé" });
      return;
    }

    // Build updated user object (preserve password and admin status)
    const updatedUser: User = {
      ...user,
      email: req.body.email ?? user.email,
      avatar_url: req.body.avatar_url ?? user.avatar_url,
      zip_code: req.body.zip_code ?? user.zip_code,
      first_name: req.body.first_name ?? user.first_name,
      last_name: req.body.last_name ?? user.last_name,
      pseudo: req.body.pseudo ?? user.pseudo,
      password_hash: user.password_hash,
      is_admin: user.is_admin, //
    };

    // Update user in database
    await usersRepository.update(updatedUser, userId);

    // Fetch and return updated user data
    const updated = await usersRepository.read(userId);

    res.json(updated[0]);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, hashPassword, login, edit };
