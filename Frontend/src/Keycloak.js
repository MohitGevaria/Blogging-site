import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
 url: "http://localhost:8081/auth/",
 realm: "blogging-app-auth",
 clientId: "react-blogging-app-client1",
 onLoad: "login-required"
});

export default keycloak;