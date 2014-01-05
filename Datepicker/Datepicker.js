
(function( window ) {
var 
    target,
    picked,
    view,
    isMouseover,
    calyear,
    calmonth,
    today = new Date(),
    lang = { day_of_week : ['Su','Mo','Tu','We','Th','Fr','Sa'], today : 'Today' },
    
    getElementOffset = function( el ) {
        var offset = { top: 0, left: 0 };
        do {
            offset.top  += el.offsetTop;
            offset.left += el.offsetLeft;
        } while ( el = el.offsetParent );
        return offset;
    },
    hasClass = function( el, cn ) {
        return (' ' + el.className + ' ').indexOf(' ' + cn + ' ') !== -1;
    },
    parseDateStr = function( str, delimiter ) {
        var date = new Date(), y, m, d;
        str = str.split(delimiter);
        if( str.length == 3 ) {
            y = parseInt(str[0]) || date.getFullYear();
            m = parseInt(str[1]) || date.getMonth() + 1;
            d = parseInt(str[2]) || date.getDate();
            date = new Date(y,m-1,d);
        }
        return {
            year : date.getFullYear(),
            month : date.getMonth() + 1,
            day : date.getDate()
        };
    },
    getCalHead = function() {
        return '<tr class="head">'
            + '<td class="prevyear">◄</td>'
            + '<td class="calyear" colspan="2">' + calyear + '</td>'
            + '<td class="nextyear">►</td>'
            + '<td class="prevmonth">◄</td>'
            + '<td class="calmonth">' + calmonth + '</td>'
            + '<td class="nextmonth">►</td>'
            + "</tr>\n"
            + '<tr class="wday" align="center">'
            + '<td>' + lang.day_of_week[0] + '</td>'
            + '<td>' + lang.day_of_week[1] + '</td>'
            + '<td>' + lang.day_of_week[2] + '</td>'
            + '<td>' + lang.day_of_week[3] + '</td>'
            + '<td>' + lang.day_of_week[4] + '</td>'
            + '<td>' + lang.day_of_week[5] + '</td>'
            + '<td>' + lang.day_of_week[6] + '</td>'
            + "</tr>\n";
    },
    getCalBody = function() {
        var wd = 0, i, td, calbody,
            firstwday = (new Date(calyear,calmonth-1,1)).getDay(),
            lastday = (new Date(calyear,calmonth,0)).getDate();

        if(today.getFullYear() == calyear && today.getMonth() + 1 == calmonth) {
            td = today.getDate();
        }
        if(firstwday) {
            calbody = '<tr><td class="weekend"></td>';
            for(i=1,wd=1; i<firstwday ;i++,wd++) {
                calbody += '<td class="weekday"></td>';
            }
        } else {
            calbody = '<tr>';
        }
        for(i=1;i<=lastday;i++,wd++,wd%=7) {
            if(wd==0 && i>1) {
                calbody += "</tr>\n<tr>"
            }
            calbody += '<td class="' + ( i==td ? 'today' : ( wd==0 || wd==6 ? 'weekend' : 'weekday' ) );
            calbody += ( calyear==picked.year && calmonth==picked.month && i==picked.day ? ' picked' : ' day');
            calbody += '">'+i+'</td>';
        }
        calbody += "</tr>\n";
        return calbody;
    },
    drawCalTable = function() {
        return "<table>\n" + getCalHead() + getCalBody()
            + '<tr><td class="gotoday" colspan="7">'
            + lang.today + ' : '
            + today.getFullYear()
            + '-' + ( today.getMonth() < 9 ? '0' : '' ) + ( today.getMonth() + 1 )
            + '-' + ( today.getDate() < 10 ? '0' : '' ) + today.getDate()
            + "</td></tr>\n"
            + '</table>';
    },
    createView = function() {
        var div = document.createElement('div');
        div.className = 'datepicker';
        div.style.visibility = 'hidden';
        div.onmouseover = function(e) {
            isMouseover = true;
        }
        div.onmouseout = function(e) {
            isMouseover = false;
        }
        div.onclick = function(e) {
            target.focus();
            e = e || window.event;
            if(e.target || e.srcElement) {
                triggerAction(e.target || e.srcElement);
            }
        }
        div.draw = function() {
            var offset = getElementOffset(target);
            this.style.left = offset.left;
            this.style.top = offset.top + target.offsetHeight;
            this.style.visibility = 'visible';
            this.innerHTML = drawCalTable();
        }
        div.hide = function() {
            this.style.visibility = 'hidden';
        }
        document.body.appendChild(div);
        view = div;
    },
    prevYear = function() {
        calyear--;
        view.draw();
    },
    nextYear = function() {
        calyear++;
        view.draw();
    },
    prevMonth = function() {
        if(calmonth == 1){
            calmonth = 12;
            calyear--;
        } else {
            calmonth--;
        }
        view.draw();
    },
    nextMonth = function() {
        if(calmonth == 12){
            calmonth = 1;
            calyear++;
        } else {
            calmonth++;
        }
        view.draw();
    },
    pickDay = function(d) {
        picked.year = calyear;
        picked.month = calmonth;
        picked.day = d;
        target.draw();
        view.draw();
    },
    pickToday = function() {
        picked.year = calyear = today.getFullYear();
        picked.month = calmonth = today.getMonth() + 1;
        picked.day = today.getDate();
        target.draw();
        view.draw();
    },
    triggerAction = function( el ) {
        if( hasClass(el, 'day') ) {
            pickDay(el.innerHTML);
        }else if( hasClass(el, 'gotoday') ) {
            pickToday();
        }else if( hasClass(el, 'prevmonth') ) {
            prevMonth();
        }else if( hasClass(el, 'nextmonth') ) {
            nextMonth();
        }else if( hasClass(el, 'prevyear') ) {
            prevYear();
        }else if( hasClass(el, 'nextyear') ) {
            nextYear();
        }
    },
    bindTatget = function( tar ) {
        target = tar;
        picked = parseDateStr(tar.value, '-');
        calyear = picked.year;
        calmonth = picked.month;
    }
    DatePicker = {
        bind : function( el_input ) {
            if( typeof el_input === 'string' ) {
                el_input = document.getElementById(el_input);
            }
            if( !el_input || el_input.tagName != 'INPUT' ) return;
            bindTatget(el_input);
            el_input.onclick = function() {
                bindTatget(this);
                DatePicker.show();
            }
            el_input.onblur = function() {
                if( !isMouseover ) {
                    DatePicker.hide();
                }
            }
            el_input.draw = function() {
                this.value = picked.year
                    + '-' + (picked.month < 10 ? '0' : '') + picked.month
                    + '-' + (picked.day   < 10 ? '0' : '') + picked.day;
            }
        },
        show : function() {
            if( !view ) {
                createView();
            }
            view.draw();
            target.draw();
        },
        hide : function() {
            view.hide();
        },
        lang : lang
    };
    
    window.DatePicker = DatePicker;
})(window);
