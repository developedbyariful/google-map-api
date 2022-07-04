const db = require('../database/database'); // db

// ! All data
const getAllData = async (req, res) => {
  const query = `
                  SELECT * FROM locations
                  `;
  const [data] = await db.query(query);
  // console.log(data);
  res.status(200).json(data);
  // res.status(200).render('index', {data : data})
};
// !Get Walton Plaza Data
const getWaltonPlaza = async (req, res) => {
  const query = `
                SELECT * FROM locations WHERE category='Walton Plaza'
                `;
  const [data] = await db.query(query);
  res.status(200).json(data);
};
// !Get Walton Service Centre
const getWaltonServiceCentre = async (req, res) => {
  const query = `
                SELECT * FROM locations WHERE category='Walton Service Centre'
                `;
  const [data] = await db.query(query);
  res.status(200).json(data);
};
// !Get Walton Smart Zone
const getWaltonSmartZone = async (req, res) => {
  const query = `
                SELECT * FROM locations WHERE category='Smart Zone'
                `;
  const [data] = await db.query(query);
  res.status(200).json(data);
};

// ! Home
const getHome = async (req, res) => {
  res.render('index', {
    title: `Google Map Api`,
    lat: `23.8103`,
    lon: `90.4125`,
  });
};
module.exports = {
  getAllData: getAllData,
  getHome: getHome,
  getWaltonPlaza: getWaltonPlaza,
  getWaltonServiceCentre: getWaltonServiceCentre,
  getWaltonSmartZone: getWaltonSmartZone
};
