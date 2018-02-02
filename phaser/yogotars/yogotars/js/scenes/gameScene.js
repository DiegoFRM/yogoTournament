var soundsPath = "../../shared/minigames/sounds/"
var gameScene = function(){

	assets = {
        atlases: [                
			{
				//name: "atlas.jump",
                //json: "images/spinwheel/atlas.json",
                //image: "images/spinwheel/atlas.png"
			}],
        images: [],
		sounds: [],
	}
    
	var background;
    var sceneGroup;
	
    function preload() {
		game.load.image("fondo", "images/game/fondo.png");
        game.load.spine("dinamita", "images/spines/dinamita.json");
	}
	
	function loadSounds(){
	}
    
	function initialize(){
	}	
    
	var canvas = document.getElementById("canvas");
  

function resize () {
	var w = game.width;
	var h = game.height;
	if (game.width != w || game.height != h) {
		game.width = w;
		game.height = h;
	}

	// magic
	var centerX = game.width / 200;
	var centerY = game.height/ 200;
	var scaleX = 400 / game.width;
	var scaleY = 400 / game.height;
	var scale = Math.max(scaleX, scaleY) * 1.2;
	if (scale < 1){
        scale = 1;
    } 
	var width = game.width * scale;
	var height = game.height * scale;
    yogotar.scale.setTo(1 / scale, 1 / scale);
}     
    
	
	/*CREATE SCENE*/
    function createScene(){
		sceneGroup = game.add.group();        
        yogotar = game.add.spine(game.world.centerX - 100 , game.height, "dinamita");
        yogotar.scale.setTo(1);
        yogotar.setAnimationByName(0, "IDLE", true);
        yogotar.setSkinByName("normal");
        sceneGroup.add(yogotar);
        
        
      
        
	}
	
	function update() {
		//background.tilePosition.x += 1;
	}
	
	return {
		assets: assets,
		name: "gameScene",
		create: createScene,
        preload: preload,
		update:update,
		show: function(event){
			//loadSounds()
			initialize()
		}		
	}
}()