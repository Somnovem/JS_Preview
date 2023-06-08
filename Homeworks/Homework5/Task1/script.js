(()=>{
    var pifTable = document.getElementById('myTable');
    pifTable.style.borderCollapse = 'collapse';
    if(pifTable != null){
        var rows = pifTable.getElementsByTagName('tr');
        for (let i = 0; i < rows.length; ++i) {
           var thcells = rows[i].getElementsByTagName('th');
           for (let j = 0; j < thcells.length; ++j) {
                thcells[j].classList.add('pyfTableHeaderCell');
                thcells[j].classList.add('pyfTableCell');
                thcells[j].classList.add('textWhiteItalic');
                if (i == 0 && j !=0 ) thcells[j].innerHTML = j;
                else if (i != 0) thcells[j].innerHTML = i;
           }
        }
        var allContentCells = [];
        for(let i = 1; i< rows.length; ++i) {
            var tdcells = rows[i].getElementsByTagName('td');
            allContentCells[i-1] = [];
            for(let j = 0;j < tdcells.length; ++j) {
                tdcells[j].innerHTML = i*(j+1);
                tdcells[j].classList.add('pyfTableContentCell');
                tdcells[j].classList.add('pyfTableCell');
                tdcells[j].addEventListener('click',(e)=>{
                    e.target.classList.toggle('active');
                });
                tdcells[j].addEventListener('mouseout',(e)=>{
                    for (let m = 0;m < allContentCells.length; ++m)
                    {
                        for (let g = 0; g < allContentCells[m].length; ++g){
                            if(allContentCells[m][g].style.backgroundColor == 'yellow'){
                                allContentCells[m][g].style.backgroundColor = 'white'; //clear all already yellow cells
                            }
                        }
                    }
                    e.target.classList.remove('lighted'); 
                });
                tdcells[j].addEventListener('mouseover',(e)=>{

                    //find the hovered on cell and get its row and column
                    var row = 0;
                    var column = 0;
                    for (let m = 0;m < allContentCells.length; ++m)
                    {
                        let g = 0;
                        for (; g < allContentCells[m].length; ++g){
                            if(allContentCells[m][g] == e.target){
                                row = m;
                                column = g;
                                break;
                            }
                        }
                        if(g != allContentCells[m].length){
                            break;
                        }
                    }

                    //paint all cells previous to the hovered on in its row and column
                    for(let m = 0; m < column; ++m){
                        allContentCells[row][m].style.backgroundColor = 'yellow';
                    }
                    for(let m = 0; m < row; ++m){
                        allContentCells[m][column].style.backgroundColor = 'yellow';
                    }


                    //highlight the hovered on cell
                    e.target.classList.add('lighted');
                });
                allContentCells[i-1][j] = tdcells[j];
            }
        }
    }
})()