import React from "react";
import Product from "../activities/product/Product";
import Order from "../activities/order/Order";

// import LiveStream from "../../Feature/LiveStreamComponents/LiveStream";
// import Order from "../../Feature/OrderComponents/Order";
import Dashboard from "../activities/dashboard/Dashboard";
// import Report from "../../Feature/ReportComponents/Report";
// import Promotion from "../../Feature/PromotionComponents/Promotion";
// import Campaign from "../../Feature/CampaignComponents/Campaign";
// import Contact from "../../Feature/ContactComponents/Contact";
// import Setting from "../../Feature/SettingComponents/Setting";
import { Switch, Route } from "react-router-dom";

export default function MainComponents() {
  const checkSession = 0;
  return (
    <>
      {checkSession === 0 ? (
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/dashboard" exact component={Dashboard} />
          <Route path="/product" component={Product} />
          <Route path="/order" exact component={Order} />
          {/*
              <Route path="/livestream" exact component={LiveStream} />
              <Route path="/promotion" exact component={Promotion} />
              <Route path="/campaign" component={Campaign} />
              <Route path="/report" exact component={Report} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/setting" exact component={Setting} />  */}
        </Switch>
      ) : (
        "hello"
      )}
    </>
  );
}
