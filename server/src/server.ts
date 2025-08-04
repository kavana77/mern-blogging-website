import app from "./app";
import connectDB from "./config/db";
import env from "./utils/validation";

const PORT = env.PORT || 5001;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
