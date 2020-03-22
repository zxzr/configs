const axios = require("axios");
axios.get("https://yesno.wtf/api").then(function(response) {
  console.log(response);
});
