"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
function Header() {
    return (<div className="bg-slate-200">
        <div className="flex justify-between itmes-center max-w-6xl mx-auto p-3">
        <span className="font-bold">Authentra</span>
       <ul className="flex gap-4">
        <react_router_dom_1.Link to="/"> <li>Home</li></react_router_dom_1.Link>
        <react_router_dom_1.Link to="/about"> <li>About</li></react_router_dom_1.Link>
        <react_router_dom_1.Link to="/sign-in"> <li>Sign In</li></react_router_dom_1.Link> 
       </ul>
        </div> 
    </div>);
}
exports.default = Header;
