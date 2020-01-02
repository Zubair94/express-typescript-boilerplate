import app from "@src/app";
import { PORT } from "@config/index";
const port = PORT ? PORT : 3000;
app.listen(port, () => {
    console.log('Express server listening on PORT ' + port);
});