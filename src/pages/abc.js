import axios from "axios";

const data = etch(
  "https://phplaravel-1445513-5414881.cloudwaysapps.com/api/admin/roles",
  {
    method: "GET",
    headers: {
      Authorization: "Bearer YOUR_TOKEN_HERE",
      "Content-Type": "application/json",
    },
  }
)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
