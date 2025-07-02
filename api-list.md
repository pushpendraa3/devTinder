# DevTinder API
authRouter
- POST /signup
- POST /login
- POST /logout

profileRouter
- GET /profile/view
- PATCH /profile/edit (except email, password)
- PATCH /profile/password (forgot password)


connection status: pass, like, accepted, rejected, 

connectionRequestRouter
- POST /request/send/like/:userId
- POST /request/send/pass/:userId

- POST /request/send/:status/:userId
- 
- POST /request/review/accepted/:userId
- POST /request/review/rejected/:userId

userRouter
- GET /user/connections
- GET /user/requests/recieved
- GET /user/feed (20 profiles at a time)

