let  express        = require( "express" );
     app            = express();
     bodyParser     = require( "body-parser" );
     mongoose       = require( "mongoose" );
     Campground     = require ("./models/campground");
     Comment        = require ("./models/comment");
     seedDB         = require ("./seeds");
     passport       = require("passport");
     LocalStrategy  = require("passport-local");
     User           = require("./models/user");


mongoose.connect( "mongodb://localhost:27017/star_camp", {useNewUrlParser: true} );app.use( express.static( "public" ) );
app.use( bodyParser.urlencoded( {extended: true} ) );
app.set( "view engine", "ejs" );
app.use(express.static(__dirname + "/public"));

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next ();
});
//app.use( expressSanitizer() );
//app.use( methodOverride( "_method" ) );

seedDB();

app.use(require("express-session")({
    secret: "Houston is humid!",
    resave: false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get( "/", function ( req, res ) {
    res.render( "landing" );
} );

// //INDEX route
app.get( "/campgrounds", function ( req, res ) {

    Campground.find( {}, function ( err, allCampgrounds ) {
        if ( err ) {
            console.log( err );
        }
        else {
            res.render( "campgrounds/index", {campgrounds: allCampgrounds} );
        }
    } );
} );

//NEW route
app.get( "/campgrounds/new", function ( req, res ) {
    res.render( "campgrounds/new" );
} );

// CREATE route - is a POST route
app.post( "/campgrounds", function ( req, res ) {
    //get data from form & add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let desc = req.body.description;
    let newCampground = {name: name, image: image, description: desc};
    //create a new campground & save to DB
    Campground.create( newCampground, function ( err, newlyCampground ) {
        if ( err ) {
            console.log( err );
        }
        else {
            res.redirect( "/campgrounds" );
        }
    } );
} );

//Show template
app.get( "/campgrounds/:id", function ( req, res ) {
    Campground.findById(req.params.id).populate("comments").exec(function (err, foundCampground) {
        if (err) {
            console.log(err);
        } else {
            console.log("Found campground");
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//***********************
// Comments Routs
//***********************

app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {

    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
        } else {
            res.render("comments/new", {campground: campground});
        }
    });
});

app.post("/campgrounds/:id/comments", isLoggedIn, function (req, res) {
    //lookup campground using ID
    Campground.findById(req.params.id, function (err, campground) {
        if(err){
            console.log(err);
            res.redirect("/campground");
        } else {
            Comment.create(req.body.comment, function (err, comment) {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            })
        }
    })
    //create new comment

    //connect mew comment to campground
    //redirect campground to show page
});

// Show Register form
app.get("/register", function (req, res) {
    res.render("register");
});

app.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function (err, user) {
        if (err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/campgrounds");
        });
    });
});

// Show Login form
app.get("/login", function(req, res){
    res.render("login");
});

//login logic
//middleware
app.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
    failureRedirect: "/login",
}), function(req, res){
});

app.get("/logout", function(req, res){
    req.logout();
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}


app.listen( 3000, process.env.IP, function () {
    console.log( "star-camp has started!" );
} );