import app from "./app.js";
import { envVars } from "./app/config/env.js";
const bootstrap = async () => {
    try {
        app.listen(envVars.PORT, () => {
            console.log(`[CareOS] Core System running on http://localhost:${envVars.PORT}`);
        });
    }
    catch (error) {
        console.error("[CareOS] System Failure:", error);
        process.exit(1);
    }
};
bootstrap();
