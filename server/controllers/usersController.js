const pool = require("../config/db");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const supersecret = process.env.SUPER_SECRET;

const getAllUsers = async (req, res) => {};

const registerUser = async (req, res) => {};

const login = async (req, res) => {};

const getProfile = async (req, res) => {};

const deleteUser = async (req, res) => {};

module.exports = {
  getAllUsers,
  registerUser,
  login,
  getProfile,
  deleteUser,
};
