import app from "./app.ts";
import { envVars } from "./app/config/env.ts";

const bootstrap = async () => {
  try {
    app.listen(envVars.PORT, () => {
      console.log(
        `[CareOS] Core System running on http://localhost:${envVars.PORT}`,
      );
    });
  } catch (error) {
    console.error("[CareOS] System Failure:", error);
    process.exit(1);
  }
};

bootstrap();
