const Handlebars = require("handlebars");
const fs = require("fs");
Handlebars.registerHelper("hex-pie", function(percent,name="",moreInfo="") {
    var ret = "";
    if(percent){
        var rotateLeft = 0;
        var rotateRight = 0;
        if(percent <= 50 && percent >= 0){
            rotateLeft = (percent/100) * 180;
        }else if(percent > 50 && percent <=100 ){
            rotateLeft = 180;
            rotateRight = ((percent-50)/100) * 180;
        }//<i class="text-muted text-small fas fa-info-circle"></i>
        tooltip = ` data-toggle="tooltip" title="${moreInfo}" data-placement="top"`
        popover = ` <a tabindex='0' class="hex-popover hex-info" data-placement="top" role='button' data-trigger="focus" data-container="body" data-toggle='popover' data-content='${moreInfo}'><i class="fas fa-info-circle"></i></a>`
        ret =  `
<div class="hex hex-pie">
<div class="hex-mask"><div class="hex-mask"><div class="hex-mask">
    <div class="hex-mask"><div class="hex-mask"><div class="hex-mask">
        <div class="hex-content">
            <div class="hex-left">
                <div class="hex-fill" style="transform: rotate(-${rotateLeft}deg);"></div>
            </div>
            <div class="hex-right">
                <div class="hex-fill" style="transform: rotate(-${rotateRight}deg);"></div>
            </div>
            <div tabindex=0 class="hex-name-plate" ${moreInfo?tooltip:''}><span class="hex-title">${name}</span> ${moreInfo?'<i class="d-print-none hex-info fas fa-info-circle"></i>':''}</div>
        </div>
    </div></div></div>
</div></div></div>
</div>`;
    }

  return ret;
});
const months = ["Jan","Feb","Mar","Apr","May","June","July","August","Sept","Oct","Nov","Dec"];
Handlebars.registerHelper("monthRange",function(entry){
    var ret = "";
    var start = "";
    var end = "";
    if(entry.startDate){
        let d = new Date(entry.startDate);
        if(d){
            start = months[d.getUTCMonth()] +" "+d.getUTCFullYear();
        }
    }
    if(entry.endDate){
        let d = new Date(entry.endDate);
        if(d){
            end = months[d.getUTCMonth()] +" "+d.getUTCFullYear();
        }
    }
    if(entry.endDate && entry.startDate){
        ret = start + " - " + end;
    }else{
        ret = start + end;
        //since the one that hasn't changed is an empty string this will work out with unnneccary checks
    }
    return ret;

});

Handlebars.registerPartial("position",fs.readFileSync("position.html","utf8"));
Handlebars.registerPartial("education",fs.readFileSync("education.html","utf8"));
Handlebars.registerPartial("volunteering",fs.readFileSync("volunteering.html","utf8"));
Handlebars.registerPartial("interest",fs.readFileSync("interest.html","Utf8"));

var template = Handlebars.compile(fs.readFileSync("template.html","utf8"));
fs.readFile('resume.json','utf8',function(err,contents){
    if(err){
        console.log(err);
    }else{
        var resume = JSON.parse(contents);
        console.log(template(resume));
    }
})
