/*DIEGO ROJAS 2018*/
    /*LOAD THEME*/
    //append THEME STYLE
   var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'assets/themes/' + config.theme +'/css/' + config.theme +'.css';
    document.body.appendChild(link);
    
    var fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href = 'assets/themes/' + config.theme +'/css/' + config.fonts +'.css';
    document.body.appendChild(fonts);
    
    //append THEME SCRIPT
    var script = document.createElement("script");
    script.type = "text/javascript";
    script.src = 'assets/themes/' + config.theme +'/js/' + config.theme +'.js';
    document.body.appendChild(script);    


    var gradeSelection = 1;
    var totalQuestions = 98;

//    for(var d = 0;d<= question.length-1 ; d++){
//        if(question[d].grade == gradeSelection){
//            totalQuestions++;
//        }
//    }

    selectQuestion = 0;

    var showAnswer = false;
    var confirmAnswer = true;
    var buttonSelect;
    var sesionSaveQuestion = new Array;
    var counter = 0;
    //RANDOM FUNCTION
    function randomNumbers(max) {
        function range(upTo) {
            var result = [];
            for(var i = 0; i < upTo; i++) result.push(i);
            return result;
        }
        function shuffle(o){
            for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
            return o;
        }
        var myArr = shuffle(range(max));
        return function() {
            return myArr.shift();
        };
    }
    //SAVE QUESTION AND ANSWER
    function saveAnswer(question,answer){
        sesionSaveQuestion[counter] = [{Question:"",Answer:""}]
        sesionSaveQuestion[counter].Question = question;
        sesionSaveQuestion[counter].Answer  = answer; 
    }
    

    
    //SHOW ANSWER 
    function sendAnswer(btn){
        for(var b = 0;b< question[selectQuestion].Correct.length;b++){
        if($(btn).attr("index") == question[selectQuestion].Correct[b]){
                    $(btn).removeClass("incorrect-button");
                    $(btn).addClass("correct-button");
                    $("#retro").html("<b>¡Correcto!</b>");
                    $("#retro").show();
                    break;
                }else{
                    $(btn).addClass("incorrect-button");
                    if(question[selectQuestion].includeImages){
                        $("#retro").html("<b>¡Incorrecto!</b><br>" + '<img src="assets/images/grade' + question[selectQuestion].grade  + '/' + question[selectQuestion]["image" + question[selectQuestion].Correct[b]] + '.png" /><br>'  + question[selectQuestion]["answer" + question[selectQuestion].Correct[b]] );
                    }else{
                        $("#retro").html("<b>" + question[selectQuestion]["answer" + question[selectQuestion].Correct[b]]  + "</b>");
                    }
                    $("#retro").show();
                } 
        }
    }
    //NEXT QUESTION
    function nextQuestion(){
        $(".answer").removeClass("incorrect-button");
        $(".answer").removeClass("correct-button");
        $(".answer").removeClass("select-button");
        saveAnswer(question[selectQuestion].Question,buttonSelect.id)
        console.log(sesionSaveQuestion[counter].Answer );
        console.log(counter);
        $("#canvasYogotar")[0].contentWindow.yogotar.setAnimationByName(0, "WIN", true);
        if(counter == totalQuestions-1){
            console.log("completed");
            resultsScene()
            
        }else{
            counter++;
            //HARDCOREADA
            //selectQuestion = result[counter];
            selectQuestion = counter
            
            questionAnimation();
            //loadQuestion();  
        }

    }
    
    //INCLUDE LETTERS IN ANSWERS
    if(config.includeOptionsLetters){ 
        var optionsLetters = ["A","B","C","D"]
        for(var i = 1;i<=config.NumberOptions;i++){
            $("#answer" + i).html("<div class='optionLetters'>"+ optionsLetters[i-1]  +"</div>");
            $("#answer" + i).append("<span></span>");
        }
    }
    //LOAD QUESTION
    function loadQuestion(){
        
        $("#retro").hide();
        $("#buttonForward").hide();
        //HARDCOREADA
        $("#counter-page").html([counter + 1] + "/" + totalQuestions);
        $(".section-gradeText").html('<span>' + question[counter].grade+' grado</span>')
        //FIN HARDCOREADA
        $("#question").find("span").html(question[selectQuestion].Question);  
        
        if(question[selectQuestion].useImageQuestion){
            TweenMax.fromTo($("#imageQuestion"),1,{alpha:0},{alpha:1});
           $("#imageQuestion").find("img").attr('src','assets/images/grade'+question[selectQuestion].grade +'/' + question[selectQuestion].imageQuestion + '.png');
           }else{
               $("#imageQuestion").find("img").attr('src','assets/images/' +  'blank.png');
               $("#imageQuestion").css("opacity",0);
           }
        
        for(var a= 1;a<=4;a++){
            $("#answer" + a).attr("index",a);
            //Include Images or only answers
            if(question[selectQuestion].includeImages){
                $("#answer" + a).find("span").html('<img src="assets/images/grade'+question[selectQuestion].grade +'/' + question[selectQuestion]["image" + a] + '.png" />'  + question[selectQuestion]["answer" + a] );
            }else{
                
                
                $("#answer" + a).find("span").html(question[selectQuestion]["answer" + a] );
                var limitCharacters = $("#answer" + a).find("span")
                
                if(limitCharacters.text().length == 0){
                    
                    $(".optionLetters").addClass("optionOnlyLetters");
                }else if(limitCharacters.text().length < 5){
                    $(".optionLetters").removeClass("optionOnlyLetters");
                    limitCharacters.css("font-size","3vw");
                }else if(limitCharacters.text().length > 6 && limitCharacters.text().length < 10){
                    limitCharacters.css("font-size","1.5vw"); 
                    $(".optionLetters").removeClass("optionOnlyLetters");
                }else{
                    limitCharacters.css("font-size","1.2vw");
                    $(".optionLetters").removeClass("optionOnlyLetters");
                }
                
            }
            //Buttons
            $("#answer" + a).click(function(){
                    if(confirmAnswer){
                        $(".answer").removeClass("select-button");
                        $(this).addClass("select-button");
                        $("#buttonForward").show();
                        buttonSelect = this;
                    }else{
                        if(showAnswer){
                            buttonSelect = this;
                            sendAnswer(this);
                            $("#buttonForward").show();
                        }else{
                            buttonSelect = this;
                            nextQuestion();   
                        }
                    }

            }); 
        }        
    }
    //RANDOM QUESTIONS
    var randoms = randomNumbers(question.length),
        rand = randoms(),
        result = [];
    while(rand != null) {
        result.push(rand);
        rand = randoms();
    }
    //CONFIRM BUTTON
    //selectQuestion = result[counter];
    selectQuestion = counter;
    
    $("#buttonForward").click(function(){
            if(showAnswer){
                sendAnswer(buttonSelect);
                nextQuestion();
            }else{
                nextQuestion();
            }
        });


    //LOAD FIRST QUESTION
    loadQuestion();






/**TEST MODE***/
if(config.testMode){
  $("body").keydown(function(e) {
  if(e.keyCode == 37) { // left
            //HARDCOREADA
            //selectQuestion = result[counter];
      if(counter != 0){
          counter--
            selectQuestion = counter;
            loadQuestion()
      }
            
  }
  else if(e.keyCode == 39) { // right
            //HARDCOREADA
            //selectQuestion = result[counter];
            counter++
            selectQuestion = counter;
            loadQuestion()
  }
});  
}



