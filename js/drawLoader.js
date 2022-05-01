
function drawLoader(){
    const middle = $("<div>").addClass("middle")

    const bar1 = $("<div>").addClass("bar bar1").appendTo(middle)
    const bar2 = $("<div>").addClass("bar bar2").appendTo(middle)
    const bar3 = $("<div>").addClass("bar bar3").appendTo(middle)
    const bar4 = $("<div>").addClass("bar bar4").appendTo(middle)
    const bar5 = $("<div>").addClass("bar bar5").appendTo(middle)
    const bar6 = $("<div>").addClass("bar bar6").appendTo(middle)
    const bar7 = $("<div>").addClass("bar bar7").appendTo(middle)
    const bar8 = $("<div>").addClass("bar bar8").appendTo(middle)

    return middle
}