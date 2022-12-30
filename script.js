let studentData;

$.getJSON('mockData.json', function(data) {
    studentData = data;
    getStudentData();
});

  $(function(){
    $("#search").on('change', function(){
      getStudentData();
    });

    $("#Sort_Button").on('click', function(){
        getStudentData();
    });

    $(".Sort_Buttons").on('click', function(){
        let sortBy = $(this).attr("id");
        getStudentData(sortBy);
    });

   });
function getStudentData(sort='') {
    let sortResultData = [];
    sortResultData = searchStudentData(sort);
   
    let text= '';
    if (sort != 'sort_gender') {
        text +='<table class="Table_main">';
        text += tableHeader();
        for(var i=0; i<sortResultData.length; i++) {
            let sno = i+1;
            let passStatus = sortResultData[i].passing == true ? "Passing" : "Failed";
            text+='<tr class="data_row">';
            text+='<td class="data_column">'+sno+'.</td>';
            text+='<td><img src="'+sortResultData[i].img_src+'" alt=""><span>'+sortResultData[i].first_name+' '+sortResultData[i].last_name+'</span></td>';
            text+='<td>'+sortResultData[i].gender+'</td>';
            text+='<td>'+sortResultData[i].class+'</td>';
            text+='<td>'+sortResultData[i].marks+'</td>';
            text+='<td>'+passStatus+'</td>';
            text+='<td>'+sortResultData[i].email+'</td>';
            text+='</tr>';
        } 
       text=="</table>"; 
    }
    else {
    var maleData = [];
    var femaleData = [];
    for (i=0;i<sortResultData.length;i++) {
        if (sortResultData[i].gender.toLowerCase() == 'male') {
            maleData.push(sortResultData[i]); 
        }
         if(sortResultData[i].gender.toLowerCase() == 'female') {
            femaleData.push(sortResultData[i]);
        }
    }
    if(maleData.length!=0) {
        text +='<table class="Table_main">';
        text += tableHeader();
        for(var i=0; i<maleData.length; i++) {
            let sno = i+1;
            let passStatus = maleData[i].passing == true ? "Passing" : "Failed";
            text+='<tr class="data_row">';
            text+='<td class="data_column">'+sno+'.</td>';
            text+='<td><img src="'+maleData[i].img_src+'" alt=""><span>'+maleData[i].first_name+' '+maleData[i].last_name+'</span></td>';
            text+='<td>'+maleData[i].gender+'</td>';
            text+='<td>'+maleData[i].class+'</td>';
            text+='<td>'+maleData[i].marks+'</td>';
            text+='<td>'+passStatus+'</td>';
            text+='<td>'+maleData[i].email+'</td>';
            text+='</tr>';
        } 
       text+="</table>"; 
    }

    if(femaleData.length!=0) {
        text +='<table class="Table_main">';
        text += tableHeader();
        for(var i=0; i<femaleData.length; i++) {
            let sno = i+1;
            let passStatus = femaleData[i].passing == true ? "Passing" : "Failed";
            text+='<tr class="data_row">';
            text+='<td class="data_column">'+sno+'.</td>';
            text+='<td><img src="'+maleData[i].img_src+'" alt=""><span>'+femaleData[i].full_name+'</span></td>';
            text+='<td>'+femaleData[i].gender+'</td>';
            text+='<td>'+femaleData[i].class+'</td>';
            text+='<td>'+femaleData[i].marks+'</td>';
            text+='<td>'+passStatus+'</td>';
            text+='<td>'+femaleData[i].email+'</td>';
            text+='</tr>';
        } 
       text+="</table>"; 
    }
    }

if(sortResultData.length===0) {
    document.getElementById("filter_data_div").innerHTML='<div id="filter_data"><div><h3>No student data found.</h3></div></div>';
}else
    document.getElementById("filter_data_div").innerHTML=text;

}

function searchStudentData(sort) {
    let searchStr = document.getElementById("search").value;
    searchStr= searchStr.toLowerCase();
    let data = studentData;
    let regex = new RegExp(searchStr, "i");
    let resultData = [];
    $.each(data, function(key, value) {
        if ((value.first_name.search(regex) != -1) || (value.last_name.search(regex) != -1) || (value.email.search(regex) != -1)) {
            value.full_name = value.first_name+' '+value.last_name;
            resultData.push(value);
        }
    });

    if (sort=="sort_az") {
        resultData = sortAZ(resultData, true);
    }

    if (sort=="sort_za") {
        resultData = sortAZ(resultData, false);
    }

    if (sort=="sort_marks") {
        resultData = sortMarks(resultData, true);
    }

    if (sort=="sort_passing") {
        resultData = sortPassing(resultData);
    }

    if (sort=="sort_class") {
        resultData = sortClass(resultData, true);
    }

    return resultData;
}


function sortAZ(data, asc) {
    data = data.sort((a, b) => {
        if (asc) { 
            if (a.full_name < b.full_name) {
                return -1;
                }
        } else {
            if (a.full_name > b.full_name) {
                return -1;
                }
        }
      });
      return data;
}

function sortMarks(data, asc) {
    data = data.sort((a, b) => {
        if (asc) { 
            if (a.marks < b.marks) {
                return -1;
                }
        }
      });
      return data;
}

function sortPassing(data) {
    let resultData = [];
    $.each(data, function(key, value) {
        if (value.passing == true) {
            resultData.push(value);
        }
    });
      return resultData;
}

function sortClass(data, asc) {
    data = data.sort((a, b) => {
        if (asc) { 
            if (a.class < b.class) {
                return -1;
                }
        }
      });
      return data;
}


function tableHeader() {
    let tableHeader ='<tr>';
    tableHeader+='<td>ID</td>';
    tableHeader+='<td>Name</td>';
    tableHeader+='<td>Gender</td>';
    tableHeader+='<td>Class</td>';
    tableHeader+='<td>Marks</td>';
    tableHeader+='<td>Passing</td>';
    tableHeader+='<td>Email</td>';
    tableHeader+='</tr>';

    return tableHeader;
}