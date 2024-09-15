"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_router_dom_1 = require("react-router-dom");
const Home_1 = __importDefault(require("./pages/Home"));
const About_1 = __importDefault(require("./pages/About"));
const SignIn_1 = __importDefault(require("./pages/SignIn"));
const SignUp_tsx_1 = __importDefault(require("./pages/SignUp.tsx"));
const Profile_tsx_1 = __importDefault(require("./pages/Profile.tsx"));
const Header_tsx_1 = __importDefault(require("./component/Header.tsx"));
const App = () => {
    return (<react_router_dom_1.BrowserRouter>
    <Header_tsx_1.default />
      <react_router_dom_1.Routes>
        <react_router_dom_1.Route path="/" element={<Home_1.default />}/>
        <react_router_dom_1.Route path="/about" element={<About_1.default />}/>
        <react_router_dom_1.Route path="/sign-in" element={<SignIn_1.default />}/>
        <react_router_dom_1.Route path="/sign-up" element={<SignUp_tsx_1.default />}/>
        <react_router_dom_1.Route path="/profile" element={<Profile_tsx_1.default />}/>
      </react_router_dom_1.Routes>
    </react_router_dom_1.BrowserRouter>);
};
exports.default = App;
