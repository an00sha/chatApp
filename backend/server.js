// node --watch --env-file=config.env server.js
//  --env-file is loaded by Node itself before any JS executes, 
import app from "./app.js";
import db from "./config/dbConfig.js";
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
