import { api } from "../../services/api";
class Model {
  constructor() {}
  sendTestLinkToUsers(testID, dls, emails) {
    emails = (emails || "").split(",");
    if (emails.length > 1) {
      emails = (function(emails) {
        let re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        emails = emails.filter(email => {
          email = email.trim();
          return re.test(String(email).toLowerCase());
        });
        return emails;
      })(emails);
    }
    return api.getData(
      "/sendTestLinkToUsers",
      { dls: dls, emails: emails, testID: testID },
      {}
    );
  }
}

export default new Model();
