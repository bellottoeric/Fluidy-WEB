const host = process.env.REACT_APP_NODE_ENV === "local" ? "http://localhost:3001" : "http://api.fluidy.news"

exports.host = host