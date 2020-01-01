import app from "./app";
import {PORT} from "./config";
const port = PORT ? PORT : 3000;
app.listen(port, () => {
    console.log('Express server listening on PORT ' + port);
});