var dog;
var happyDog;
var database;
var foodS;
var foodStock;
var addFood, feed;
var fedTime, lastFed;
var foodOb;


function preload(){
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(900, 400);
  
  dog = createSprite(750,200,50,50);
  dog.addImage(dogImg);
  dog.scale = 0.2;

  database = firebase.database();

  foodS = 1;


  feed = createButton("Feed Mocha");
  feed.position(700,90);
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.position(800,90);
  addFood.mousePressed(addFoods);

  foodStock = database.ref('Food');
  foodStock.on("value", readStock);

  foodObj = new Food();
 
}


function draw(){  
  background(46, 139, 87);

  foodObj.display();

    
  fedTime = database.ref('FeedTime');
  fedTime.on("value", function(data){
    lastFed = data.val();
  })

  drawSprites();

  fill(255,255,244);
  textSize(15);
  text(foodS, 20,20)
  if(lastFed>12){
    text("Last Feed : " + lastFed%12 + "PM", 350, 30);
  }
  else if(lastFed==12){
    text("Last Feed : 12 AM", 350, 30);
  }
  else{
    text("Last Feed : " + lastFed + "PM", 350, 30);
  }

}
function readStock(data) {
  foodS = data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog() {
  dog.addImage(happyDogImg);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
      Food: foodObj.getFoodStock(),
      FeedTime: hour()
  })
}
function addFoods() {
  foodS++;
  database.ref('/').update({
      Food: foodS
  })
}



