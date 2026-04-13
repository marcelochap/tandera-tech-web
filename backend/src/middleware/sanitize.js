// Minimal xss sanitization stub
const sanitizeObj = (obj) => {
    // Basic recursion simple sanitization
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            obj[key] = obj[key].replace(/</g, "&lt;").replace(/>/g, "&gt;");
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            sanitizeObj(obj[key]);
        }
    }
    return obj;
};

const sanitizeMiddleware = (req, res, next) => {
    if (req.body) req.body = sanitizeObj(req.body);
    if (req.query) req.query = sanitizeObj(req.query);
    if (req.params) req.params = sanitizeObj(req.params);
    next();
};

module.exports = sanitizeMiddleware;
