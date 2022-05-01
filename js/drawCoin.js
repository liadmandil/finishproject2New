function drawCoin (coin){
  if (!isObject(coin)) return

    const card = $("<div>").addClass("card col-auto")

    const face1 = $("<div>").addClass("face face1").appendTo(card)
  
    const content = $("<div>").addClass("content").appendTo(face1)

    const checkbox = $("<input>").attr(
      "type" , "checkbox",
      "class" , "markButton",
      ).val(coin.id).appendTo(content)
  
    const img = $("<img />").attr("src" , coin.image.large).appendTo(content)
    const h3 = $("<h3>").text(coin.name).appendTo(content)
  
    const face2 = $("<div>").addClass("face face2").attr("id" , `${coin.symbol}`).appendTo(card)

    card.mouseenter(() =>{
        
        drawCoin2(coin , face2)
    }).mouseleave(() =>{DeleteCoin2(face2)})
    
    
  checkbox.on("change" , (event)=> {
    console.log(checkbox.val())
    checkboxF(checkbox.val())})
  
    $("#content").append(card)
    
  }


  async function drawCoin2(coin , face2){
    if (!isObject(coin) || !face2) return
      face2.html(`<div style='margin-top:'10px' '>${drawLoader()}</div>`)
      try{
        const a = await getCoinData(coin.id)
        const usd = `${a.market_data.current_price.usd}$`
        const ils = `${a.market_data.current_price.ils}₪`
        const eur = `${a.market_data.current_price.eur}€`
  
        const content2 = $("<div>").addClass("content")
    
        const usdP = $("<p>").text(usd).appendTo(content2)
        const ilsP = $("<p>").text(ils).appendTo(content2)
        const eurP = $("<p>").text(eur).appendTo(content2)
        const button = $("<button>").text("click here").on("click" , () => {drawCoinData(coin.id)}).appendTo(content2)
        DeleteCoin2(face2)
        content2.appendTo(face2)
      }
      catch(er){
          console.log(er)
      }
  }

  function DeleteCoin2(face2){
    face2.html("")
  }