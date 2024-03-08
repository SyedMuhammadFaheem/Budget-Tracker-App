import { gapi } from "gapi-script";
function start() {
  gapi.client.init({
    clientId:
      "637568304248-85h5n2gvvjahf6ajralrnn0ab1kcofap.apps.googleusercontent.com",
    scope: "",
  });
}

function auth() {
  gapi.load("client:auth2", start);
}

export default auth;
