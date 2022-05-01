

function changeBodyAbout(){
    clearTimeout(globalTimeOut)
    breakInterval()
    $("#changingContent").html(`<div class='first-parallax col-12'></div>
    <div id='aboutMe' class='col-12 '>Hello and welcome to the coins data website. This site displays, with the help of api calls to a variety of servers, a variety of cryptocurrencies that exist in the world, and for each currency you can get the dollar, euro, and shekel exchange rate. You can get a background on the currency, and even get a real-time price using the canvas-Js table</div>
    <div class='parallax'></div>
    <div class='photoOfMe'></div>
    <div class='lastParallax'></div>
    `)   
}

function changeBodyRealTime(){
    clearTimeout(globalTimeOut)
    if (state.mark.length === 0){
        noState()
        return
    } 
    $("#changingContent").html("<div id='chartContainer'><canvas id='chart'></canvas></div>")
    realTime()

    
    
}

function changeBodyCoins(){
    clearTimeout(globalTimeOut)
    breakInterval()
    clearState()
    $("#changingContent").html("<div class='form'><input id='searchInput' type='search' required><button id='searchButton'>search</button><button id='clearButton'>clear</button></div><div id='content'></div> ")
    $("#searchButton").on("click" , searchCoin)
    $("#clearButton").on("click" , clearSearchInput)
    clearList()
    drawAllCoins()
    
}



function noState(){
    Swal.fire({
        icon: 'error',
        title: 'error',
        text: 'you must mark at list one coin for real time!',
      })
    }

 function clearState(){
     if (state.mark.length === 0) return
    for (let index = 0; index <= state.mark.length; index++) {
        state.mark.pop()
    }
    console.log(state.mark)
 }   

 function clearList(){
     list = []   
     }
     
 
    