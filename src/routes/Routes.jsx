import React from "react";
// import Product from "../activities/product/Product";
import Product from "../activities/product/Product";
import ProductAdd from "../activities/product/AddProduct"
import Order from "../activities/order/Order";
import LiveStream from "../activities/livestream/LiveStream";
// import Order from "../../Feature/OrderComponents/Order";
import Dashboard from "../activities/dashboard/Dashboard";
import Campaign from "../activities/campaign/Campaign";
// import Report from "../../Feature/ReportComponents/Report";
// import Promotion from "../../Feature/PromotionComponents/Promotion";
// import Campaign from "../../Feature/CampaignComponents/Campaign";
// import Contact from "../../Feature/ContactComponents/Contact";
// import Setting from "../../Feature/SettingComponents/Setting";
import ComingSoon from "../activities/comingSoon/ComingSoon";
import { Switch, Route } from "react-router-dom";

export default function MainComponents() {
  const checkSession = 0;
  return (
    <>
      {checkSession === 0 ? (
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/product" exact component={Product} />
          <Route path="/product/addproduct" exact component={ProductAdd} />
          <Route path="/order" exact component={Order} />
          <Route path="/promotion" exact component={ComingSoon} />
          <Route path="/campaign" component={Campaign} />
          <Route path="/report" exact component={ComingSoon} />
          <Route path="/contact" exact component={ComingSoon} />
          <Route path="/setting" exact component={ComingSoon} />
          <Route path="/livestream" exact component={LiveStream} />

        </Switch>
      ) : (
        "hello"
      )}
    </>
  );
}
