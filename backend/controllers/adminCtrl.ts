import express from 'express';
import session from 'express-session';

const app = express();

app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

export const verifyLogin = (req: any, res: any) => {
  console.log("Starts ")
  const username1: string = 'adminau'
  const password1: string = 'admin123'

  try {
    

    if (req.body.username == username1 && req.body.password == password1) {
      req.session.admin = true
 
      res.json({ success: true, redirect: 'http://localhost:5173/admin' })
    } else {
      res.json({ success: false, redirect: 'http://localhost:5173/admin/login' });
    }
  } catch (err: any) {
    console.log(err)
  }
}



export const verifyLogout = (req: any, res: any) => {
  try {
    req.session.destroy((err: any) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ success: true, redirect: 'http://localhost:5173/admin/login' });
      }
    });
  } catch (err: any) {
    console.log(err)
  }
};

export const isAdminLoggedIn = (req: any, res: any, next: any) => {
  if (req.session.admin) {
    next();
  } else {
    res.json({ success: false, redirect: 'http://localhost:5173/admin/login' });
  }
};

export const isAdminLoggedOut = (req: any, res: any, next: any) => {
  if (!req.session.admin) {
    next();
  } else {
    res.json({ success: false, redirect: 'http://localhost:5173/admin' });
  }
};