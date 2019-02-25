import testlist from "./testlist";
import createtest from "./createtest";
import questiontypes from "./questiontypes";

const Routes = [
  {
    path: "/:id?",
    name: "testlist",
    icon: "pe-7s-graph",
    component: App
  },
  {
    path: "/createtest/:id?",
    name: "createtest",
    icon: "pe-7s-graph",
    component: createtest
  }
];

export default Routes;
