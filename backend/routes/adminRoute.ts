import express from 'express'
const router = express()
import { isAdminLoggedIn, isAdminLoggedOut, verifyLogin, verifyLogout } from '../controllers/adminCtrl.js'
 



router.post('/login', verifyLogin)
 
router.get('/admin', (req: any, res: any) => {
    if (req.session.admin) {
      res.json({ success: true, redirect: '/admin' });
    } else {
      res.json({ success: false, redirect: '/admin/login' });
    }
  });

  

  router.get('/admin/login', isAdminLoggedOut, (req: any, res: any) => {
    res.json({ success: false, redirect: '/admin/login' });
  });



router.post('/verifyLogout', verifyLogout);

router.get('/api/admin/check-session', (req: any, res: any) => {
    if (req.session.admin) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  });

export default router
