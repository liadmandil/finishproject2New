
let globalTimeOut = null


  const payload = {
      coin: 'https://api.coingecko.com/api/v3/coins',
      fCoinPrice: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms',
      sCoinPrice: 'tsyms=USD'
  }

   const state = {mark:[] , }

   let list = []

  $(document).ready(init) 

   function init(){
    changeBodyCoins()
       $("#about").on("click" , changeBodyAbout)
       $("#realTime").on("click" , changeBodyRealTime)
       $("#coins").on("click" , changeBodyCoins)
  }
 

  function clearSearchInput(){
    console.log("kj")
      $("#searchInput").val("")
  }

  async function drawAllCoins(){
      $("#content").html(drawLoader())
      const coins = await getCoinsList()
      if(!coins) return
      $("#content").html("")
      coins.map( (c) => {
         list.push(c) 
         drawCoin(c)
      })
}


  async function getCoinsList(){

      try{
        const result = await fetch(payload.coin)
        const jsonR = await result.json()
        return jsonR
      }
      catch(er){
          console.log(er)
      }
  }

  function checkboxF(value){
    if (!isString(value)) return
    clearTimeout(globalTimeOut)
    globalTimeOut = setTimeout(()=>{
      alertToMuchTime()
      changeBodyRealTime()
    },120000)
    const currentCheckbox = getCheckbox(value)
    const currentCoin = getCheckboxCoin(currentCheckbox)
    if(!currentCheckbox.checked ){
        deleteMark(currentCoin);
      }  
      else{
        if(state.mark.length === 5 ){
            _toMuchMarked()
            currentCheckbox.checked = false
        }  
          else {
              _addMark(currentCoin);
          }
      } 
    }


  function _toMuchMarked(){
    Swal.fire({
        icon: 'error',
        title: 'you can only mark 5 coins',
        text: 'delete one for add another!',
      })
    }


  function _addMark(coin){
    if (!isObject(coin)) return
      state.mark.push(coin)

  }


  function getCheckboxCoin(checkbox){
    if(!checkbox) return
    return list.find((c) => {
      return c.id === checkbox.value;
    })
  }

  function getCheckbox(value){
    if(!isString(value)) return
    const a =  $(`input:checkbox[value^=${value}]` )
    return a[0]
  }

  function deleteMark(coin){
    if (!isObject(coin)) return
    const index = state.mark.findIndex((c) =>{
        return coin.id === c.id
    })
    state.mark.splice(index , 1)

}

  async function drawCoinData(id){ 
    if(!isString(id)) return
    const coinData = await getCoinData(id)
      _swelData(coinData)


      function _swelData(coinData){
        Swal.fire({
          title: coinData.name,
          text: coinData.description.en,
          imageUrl: coinData.image.large,
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: 'Custom image',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'mark',
          denyButtonText: `Don't mark`,
      }).then((result) => {
          const a = state.mark.find((c) => {
            return c.id === coinData.id
          })
          if (result.isConfirmed) {
            if (!a){
              checkCoin(coinData.id)  
              clearTimeout(globalTimeOut)
              globalTimeOut = setTimeout(()=>{
                alertToMuchTime()
                changeBodyRealTime()
              },120000)
              Swal.fire('add to your list!', '', 'success')
            }
            else{
              Swal.fire('already marked', '', 'error')
            }
          }
          else if (result.isDenied) {
            if(a){
              const check = getCheckbox(a.id)
              check.checked = false
              deleteMark(a)
              Swal.fire('dont', '', 'error')
              
            }
         Swal.fire('dont', '', 'error')
       }
        })
      }
      
    }

    function checkCoin(id){
      if(!isString(id)) return
      const currentCheckbox = getCheckbox(id)
      currentCheckbox.checked = true;
      checkboxF(id)
    }




  async function getCoinData(name){
    if(!isString(name)) return
      const result = await fetch(`${payload.coin}/${name}`)
      const jsonR = await result.json()
      return jsonR
  }

  
  function searchCoin() {
    $("#content").html("")
    const current = $("#searchInput").val().toLowerCase().replace(" ","")
    if(!current|| current === ""){
        list.map((c)=> {
            drawCoin(c)
        })
    }
    const search = list.filter((c) => {
        return c.name.toLowerCase().replace(" ","") === current
    })
    console.log(search)
    search.map( (c)=> {
        drawCoin(c)
    })                
  }




 function alertToMuchTime(){
  Swal.fire({
    icon: 'error',
    title: 'you are more then 2 minutes without check any coin.. i send you to the real time data for the card you already checked',
    
  })
 }

      

   
  




  
      