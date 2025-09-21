export function normalizeQuotePayload(payload) {
  const numericFields = [
    "specific_budget",
    "down_payment",
    "annual_revenue",
    "trade_in_value"
  ];

  const integerFields = [
    "trade_in_year",
    "trade_in_hours"
  ];

  const dateFields = [
    "delivery_date",
    "preferred_date",
    "latest_date"
  ];

  // Convert numeric
  numericFields.forEach((field) => {
    if (payload[field] === "" || payload[field] == null) {
      payload[field] = null;
    } else {
      payload[field] = Number(payload[field]);
    }
  });

  // Convert integers
  integerFields.forEach((field) => {
    if (payload[field] === "" || payload[field] == null) {
      payload[field] = null;
    } else {
      payload[field] = parseInt(payload[field], 10);
    }
  });

  // Convert dates
  dateFields.forEach((field) => {
    if (payload[field] === "" || payload[field] == null) {
      payload[field] = null;
    }
  });

  // Add a generic pass to convert any remaining empty strings to null
  Object.keys(payload).forEach((field) => {
    if (payload[field] === "") {
      payload[field] = null;
    }
  });

  return payload;
}
