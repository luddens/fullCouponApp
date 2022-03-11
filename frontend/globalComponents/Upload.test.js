import React from "react";
import Component, {decVal, incVal} from "./Upload";
import {expect} from "chai";

it(`${Component.name} renders without crashing`, () => {
  shallow(<Component />);
}); 