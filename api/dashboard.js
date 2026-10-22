const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");

let cachedBookings = null;

function loadBookings() {
  return new Promise((resolve, reject) => {
    if (cachedBookings) {
      resolve(cachedBookings);
      return;
    }

    const bookings = [];

    // CSV is outside frontend, so go one level up to project root,
    // then into backend/data if your CSV is there.
    const possiblePaths = [
      path.join(process.cwd(), "src", "data", "hotel_bookings.csv"),
      path.join(process.cwd(), "data", "hotel_bookings.csv"),
      path.join(process.cwd(), "..", "backend", "data", "hotel_bookings.csv"),
    ];

    const csvPath = possiblePaths.find((p) => fs.existsSync(p));

    if (!csvPath) {
      reject(new Error("hotel_bookings.csv not found"));
      return;
    }

    fs.createReadStream(csvPath)
      .pipe(csv())
      .on("data", (row) => bookings.push(row))
      .on("end", () => {
        cachedBookings = bookings;
        resolve(bookings);
      })
      .on("error", reject);
  });
}

module.exports = async (req, res) => {
  try {
    const bookings = await loadBookings();

    const total = bookings.length;

    const canceled = bookings.filter(
      (row) => Number(row.is_canceled) === 1
    ).length;

    const totalAdr = bookings.reduce(
      (sum, row) => sum + (Number(row.adr) || 0),
      0
    );

    const monthly = {};

    for (const row of bookings) {
      const month = row.arrival_date_month || "Unknown";
      monthly[month] = (monthly[month] || 0) + 1;
    }

    const monthlyBookings = Object.entries(monthly).map(
      ([month, count]) => ({
        month,
        bookings: count,
      })
    );

    res.status(200).json({
      totalBookings: total,
      canceledBookings: canceled,
      cancellationRate: total
        ? Number(((canceled / total) * 100).toFixed(2))
        : 0,
      averageDailyRate: total
        ? Number((totalAdr / total).toFixed(2))
        : 0,
      monthlyBookings,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to load dashboard data",
      message: error.message,
    });
  }
};