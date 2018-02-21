
                 for(var i = 1;i<=4;i++){
                        $("#checkBox" + i).attr("selection",1);
                        
                        $("#checkBox" + i).click(function(){
                            
                             if($(this).attr("selection") == 1){
                                 $(this).find(".markCheck").css("display","none");
                                 $(this).attr("selection",0)
                             }else{
                                 $(this).find(".markCheck").css("display","block");
                                 $(this).attr("selection",1)
                             }
                        });
                    }
                
                
                var totalSum = 
                    [
                    "X+X=? Max Sum 9",
                    "X+?=X Max Sum 9",
                    "X+X=? Max Sum 19",
                    "10+X=? Max Sum 19",
                    "XX+X=? Max Sum 104",
                    "XX+?=X Max Sum 104",
                    "XX+X=? Min 11 Max Sum 108",
                    "XX+?=X Min 11 Max Sum 108 "    
                    ]
                
                //var totalSum =  easy.sum
                /*
                function printRule(rule){
                    rule.    
                }
                */
                
                for(var p = 0;p<=totalSum.length-1;p++){
                    $(".choiceOptions").append(`
                    <div id="operation`+p+`" class="optionOperations">
                            <div class="operation">` +totalSum[p] + `</div>
                            <div class="checkChoice">
                                <img src="assets/images/blank_check.png"> 
                                <img class="markCheck" src="assets/images/mark_check.png">
                            </div>
                        </div>
                    `);
                    
                    
                    if(p % 2 == 0){
                        console.log(p)
                       $("#operation"+ p).addClass("optionPar");
                    }
                }
                
                $("#modalDifficulty").hide();
                $(".showModal").click(function(){
                    $("#modalDifficulty").show();  
                });
                
                $(".closeButton").click(function(){
                    $("#modalDifficulty").hide();  
                });