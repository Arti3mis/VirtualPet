var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var Feed,lastFed,FeedTime;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  FeedFood=createButton("Feed the dog");
  FeedFood.position(600,95);
  FeedFood.mousePressed(feedDog);
}

function draw() {
  background(46,139,87);
  foodObj.display();
  FeedTime=database.ref('FeedTime');
  FeedTime.on("value",function(data){
  lastFed=data.val();
});

  fill(255,255,255);
  if(lastFed>=12){
    text("Last Feed : "+lastFed + "AM", 200,30)
  } else if(lastFed==0){
     text("Last Feed : 12 AM",200,30);

  }else {text("Last Feed : "+lastFed + "PM", 200,30)}

  drawSprites();
}

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
  Food:foodObj.getFoodStock()
})
}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}