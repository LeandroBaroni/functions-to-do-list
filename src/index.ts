import "reflect-metadata";
import api from "./http/api";

const PORT = 3000;

api.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});