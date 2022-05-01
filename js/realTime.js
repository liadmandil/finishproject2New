  let times = [];    

  const colors = ["blue" , "red" , "yellow" , "green" , "pink"] 
  let allPrices = {}   
  let data = {} 
  let inter,myChart,config

  async function realTime(){   // started function 
      clearAll()
      createAllPrices(state.mark)
      config = {
        height:260,
        type: 'line',
        data: createData(),
        options: {}
      };
      await createChart()
      refreshInterval()


  }

  function createAllPrices(coins){  
      coins.map((c)=>{
        allPrices[c.symbol.toUpperCase()] = []
          return c
      })
  }


  async function refreshData(){    // call the api and sent the new data
    const currentPrice = await getCoinPrice()
    addNewPrices(currentPrice) 
}

 async function getCoinPrice(){  
    try{
        const symbols = _getSymbol()
        const result = await fetch(`${payload.fCoinPrice}=${symbols}&${payload.sCoinPrice}`)
        const jsonR = await result.json()
        return jsonR
    }
    catch(er){
        console.log(er)
    }


    function _getSymbol(){
        let symbol = ""
        const symbols = state.mark.map((c)=>{
            return c.symbol.toUpperCase()
        }) 
        for (let index = 0; index < symbols.length; index++) {
            symbol += `,${symbols[index]}`
        }
        const currect = symbol.slice(1 , symbol.length)
        return currect;
    }
}



  function createData(){  // create th data of the config 
    data.labels = times
    data.datasets = createDataSets()
    return data
}

function createDataSets(){
    const firstDatasets = []
    for (let index = 0; index < state.mark.length; index++) {
        const current = state.mark[index]
        firstDatasets.push({
            label: current.name,
		    backgroundColor: colors[index],
		    borderColor: colors[index],
		    data: allPrices[current.symbol.toUpperCase()],  // from all data-object -> the symbol=> array
        })
    }
    return firstDatasets    // return to createdata
}




 function refreshInterval(){  // the interval that refresh th echart
    inter = setInterval(() => {
        myChart.destroy()
         createChart()
    }, 4000);
 }





function addTime(){  // push the new time to the array
    const d = new Date()
    times.push(`${d.getHours()}h-${d.getMinutes()}m-${d.getSeconds()}s`)
    
}






function addNewPrices(pricesObj){  // push the new prices to the abject with the with the same coin-Symbol
    if(!isObject(pricesObj)) return
    state.mark.map((c)=>{
        allPrices[c.symbol.toUpperCase()].push(pricesObj[c.symbol.toUpperCase()]["USD"])
    })
}


function breakInterval(){
    clearInterval(inter)
}


async function createChart(){  // the function that print the chart
    addTime()
    await refreshData()
    myChart = new Chart(  
            $('#chart'),
            config
           );
}

function clearAll(){  // clear chart after get out this page
    times = [];
    allPrices = {}
    data = {}
    config = null
}








