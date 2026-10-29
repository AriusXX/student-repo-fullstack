require("dotenv").config({ quiet: true });
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "pug");
app.use(express.static("public"));

const API_URL = "https://api.restcountries.com/countries/v5";
const FIELDS =
  "names.common,codes.alpha_2,capitals,region,population,leaders,flag.url_png";

// saved after the first request so we don't use up our API requests
let allCountries = null;

// The API only gives 100 countries per request, so keep asking until there are no more
async function getCountries() {
  if (allCountries) {
    return allCountries;
  }

  const countries = [];
  let offset = 0;
  let more = true;

  while (more) {
    const url = `${API_URL}?response_fields=${FIELDS}&limit=100&offset=${offset}`;
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${process.env.RESTCOUNTRIES_API_KEY}` },
    });

    if (!response.ok) {
      throw new Error(
        `API request failed with status ${response.status} (check the API key in .env)`,
      );
    }

    const json = await response.json();
    countries.push(...json.data.objects);
    more = json.data.meta.more;
    offset = offset + 100;
  }

  allCountries = countries;
  return countries;
}

// Some countries are missing data, so these helpers give a default value
function getName(country) {
  if (country.names && country.names.common) {
    return country.names.common;
  }
  return "Unknown";
}

function getCapital(country) {
  if (country.capitals && country.capitals.length > 0) {
    return country.capitals.map((capital) => capital.name).join(", ");
  }
  return "No capital listed";
}

// Leaders are a paid field, so on the free plan this will say "Not available"
function getLeader(country) {
  if (
    country.leaders &&
    country.leaders.length > 0 &&
    country.leaders[0].name
  ) {
    return country.leaders
      .map((leader) =>
        leader.title ? `${leader.name} (${leader.title})` : leader.name,
      )
      .join(", ");
  }
  return "Not available";
}

function getFlag(country) {
  if (country.flag && country.flag.url_png) {
    return country.flag.url_png;
  }
  return null;
}

app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home");
});

app.get("/countries", async (req, res) => {
  try {
    const countries = await getCountries();

    const rows = countries.map((country) => ({
      name: getName(country),
      capital: getCapital(country),
      leader: getLeader(country),
    }));
    rows.sort((a, b) => a.name.localeCompare(b.name));

    res.render("countries", { rows });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.get("/populous", async (req, res) => {
  try {
    const countries = await getCountries();

    const big = countries.filter((country) => country.population >= 50000000);
    big.sort((a, b) => b.population - a.population);

    const cards = big.map((country) => ({
      name: getName(country),
      population: country.population.toLocaleString(),
      flag: getFlag(country),
    }));

    res.render("populous", { cards });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.get("/regions", async (req, res) => {
  try {
    const countries = await getCountries();

    // group the country names by region
    const regions = {};
    countries.forEach((country) => {
      const region = country.region || "No region listed";
      if (!regions[region]) {
        regions[region] = [];
      }
      regions[region].push(getName(country));
    });

    const regionList = Object.keys(regions)
      .sort()
      .map((name) => ({
        name: name,
        count: regions[name].length,
        countries: regions[name].sort((a, b) => a.localeCompare(b)),
      }));

    res.render("regions", { regionList });
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`listening on http://localhost:${PORT}`);
});
