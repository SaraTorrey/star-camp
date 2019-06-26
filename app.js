let express     = require( "express" );
let app         = express();
let bodyParser  = require( "body-parser" );
let mongoose    = require ("mongoose");

mongoose.connect( "mongodb://localhost/star_camp" );
app.use(bodyParser.urlencoded({extended: true}));
app.set( "view engine", "ejs" );

//Schema setup
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String
    });

let Campgounrd = mongoose.model( "Campground", campgroundSchema );

Campgounrd.create(
    {
        name: "Lake Del Valle",
        image: "https://assets3.roadtrippers.com/uploads/poi_gallery_image/image/362476307/-quality_60_-interlace_Plane_-resize_1024x480_U__-gravity_center_-extent_1024x480/place_image-image-1ca09651-17c8-45d0-87a7-884177213b93.jpg"
    }, function ( err, campground ) {
        if(err){
            console.log(err);
        }else {
            console.log("Newly created campground");
            console.log(campground)
        }
    });

Campgounrd.create(
    {
        name: "Brushy Peak",
        image: "http://www.redwoodhikes.com/MtDiablo/BrushyPeak1.jpg"
    }, function ( err, campground ) {
        if(err){
            console.log(err);
        }else {
            console.log("Newly created campground");
            console.log(campground)
        }
    });

let campgrounds = [


    {name: "Lake Del Valle", image: "https://assets3.roadtrippers.com/uploads/poi_gallery_image/image/362476307/-quality_60_-interlace_Plane_-resize_1024x480_U__-gravity_center_-extent_1024x480/place_image-image-1ca09651-17c8-45d0-87a7-884177213b93.jpg"},
    {name: "Sycamore Grove", image: "https://www.cleanwaterprogram.org/images/stories/sycamore-bridge-sm.jpg"},
    {name: "Brushy Peak", image: "http://www.redwoodhikes.com/MtDiablo/BrushyPeak1.jpg"},
    {name: "Lake Del Valle", image: "https://assets3.roadtrippers.com/uploads/poi_gallery_image/image/362476307/-quality_60_-interlace_Plane_-resize_1024x480_U__-gravity_center_-extent_1024x480/place_image-image-1ca09651-17c8-45d0-87a7-884177213b93.jpg"},
    {name: "Sycamore Grove", image: "https://www.cleanwaterprogram.org/images/stories/sycamore-bridge-sm.jpg"},
    {name: "Brushy Peak", image: "http://www.redwoodhikes.com/MtDiablo/BrushyPeak1.jpg"},
    {name: "Lake Del Valle", image: "https://assets3.roadtrippers.com/uploads/poi_gallery_image/image/362476307/-quality_60_-interlace_Plane_-resize_1024x480_U__-gravity_center_-extent_1024x480/place_image-image-1ca09651-17c8-45d0-87a7-884177213b93.jpg"},
    {name: "Sycamore Grove", image: "https://www.cleanwaterprogram.org/images/stories/sycamore-bridge-sm.jpg"},
    {name: "Brushy Peak", image: "http://www.redwoodhikes.com/MtDiablo/BrushyPeak1.jpg"},
];



app.get( "/", function ( req, res ) {
    res.render("landing");
} );

app.get( "/campgrounds", function ( req, res ) {
    res.render( "campgrounds", {campgrounds: campgrounds} );
} );

app.get( "/campgrounds/new",function (req, res) {
    res.render( "new" );
} );


app.post( "/campgrounds", function ( req, res ) {
    //get data from form & add to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let newCampground = {name: name, image: image};
    campgrounds.push( newCampground );
    //redirect to campground page
    res.redirect( "/campgrounds" );
} );

app.listen(3000, process.env.IP, function (  ) {
    console.log("star-camp has started!")
});