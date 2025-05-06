console.log(1);
import "reflect-metadata";
console.log(2);

import api from "./http/api";
console.log(3);

const PORT = 3000;
console.log(4);

api.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});