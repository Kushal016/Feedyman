
const passport = require('passport')

module.exports = (app) => {

    //TODO Google OAUTH SECTION
    app.get(
        '/auth/google',
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );

    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    );


    //TODO Facebook OAUTH SECTION
    // app.get(
    //     '/auth/facebook',
    //     passport.authenticate('facebook')
    // );

    // app.get(
    //     '/auth/facebook/callback',
    //     passport.authenticate('facebook', { failureRedirect: '/login' }),
    //     function (req, res) {
    //         // Successful authentication, redirect home.
    //         res.redirect('/home');
    //     });

    app.get(
        '/auth/facebook',
        passport.authenticate('facebook')
    );

    app.get(
        '/auth/facebook/callback',
        passport.authenticate('facebook', { failureRedirect: '/login' }),
        function (req, res) {
            // Successful authentication, redirect home.
            res.redirect('/');
        });
    //*Logout Section
    app.get(
        '/api/logout',
        (req, res) => {
            req.logout();
            res.send(req.user);
        }

    );

    app.get(
        '/api/current_user',
        (req, res) => {
            res.send(req.user)
        }
    );
    app.get(
        '/home',
        (req, res) => {
            res.send({ hello: "yoo" })
        }
    )
}