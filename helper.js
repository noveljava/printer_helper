class Helper {
    // 입력된 값.
    total_page_count = 0;
    add_page_count = 0;

    color_page_str = "";
    black_page_str = "";

    color_page_count = 0;
    black_page_count = 0;

    double_option = false;

    re_color_page_str = "";
    total_page_info;

    replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    checkFormat(str) {
        console.log(str)
        if( "," == str[0])
            str = str.substr(1, str.length-1)

        if( "," == str[str.length-1])
            str = str.substr(0, str.length-1)

        // 정규식으로 검사.
        // 숫자, '-', ',' 만 허용 한다.
        var re = new RegExp("[0-9,-~]+")
        if(str.match(re) == str)
            return str
        else
            throw "Format이 올바르지 않습니다."
    }

    setting_total_page() {
        this.total_page_info = new Array(this.total_page_count+2).fill(true);
    }

    is_possible_calculate() {
        return this.total_page_count != 0 && this.color_page_str != ""
    }

    calculate_all_page() {
        var is_calculated = false;
        if(this.is_possible_calculate()) {
            this.setting_total_page()
            this.calculate_color_page()
            this.calculate_black_page()
            this.calculate_page_count()
            is_calculated = true;
        }

        return is_calculated
    }

    calculate_color_page() {
        this.re_color_page_str = this.checkFormat(this.replaceAll(this.color_page_str, " ", ""))
        
        this.re_color_page_str.split(",").forEach(e => {
            if(e.includes("-") || e.includes("~")) {
                var start = parseInt( (e.includes("-")? e.split("-")[0] : e.split("~")[0]) )
                var end = parseInt( (e.includes("-")? e.split("-")[1] : e.split("~")[1]) )
                
                for(var i=start; i<=end; i++) {
                    this.total_page_info[i] = false
                }
            } else {
                var idx = e
                this.total_page_info[idx] = false
            }
        })

        if(this.double_option) {
            var start = 1;
            for(var i=1; i<=this.total_page_count; i+=2) {
                if(!this.total_page_info[i]) {
                    this.total_page_info[i+1] = false
                } else if(!this.total_page_info[i+1]) {
                    this.total_page_info[i] = false
                }
            }
        }

        var color_page_list = []
        for(var i=1; i<=this.total_page_count; i++) {
            if(!this.total_page_info[i]) {
                color_page_list.push(i)
            }
        }
        
        color_page_list.reverse().forEach(e => {
            var add_idx = e + this.add_page_count
            this.total_page_info[e] = true
            this.total_page_info[add_idx] = false
        })

        this.re_color_page_str = this.calculate_str(false)
    }

    calculate_black_page() {
        this.black_page_str = this.calculate_str(true)
        console.log("Yooooooo", this.black_page_str)
    }

    calculate_str(check_value) {
        var str = ""
        this.total_page_info[this.add_page_count] = (!check_value)
        this.total_page_info[this.total_page_count+1] = (!check_value)

        for(var i=this.add_page_count+1; i<=this.total_page_count; i++) {
            if(this.total_page_info[i-1] != check_value && this.total_page_info[i] == check_value) {
                str += i
                if(this.total_page_info[i+1] == check_value) {
                    str += "-"
                } else {
                    str += ", "
                }

            } else if (this.total_page_info[i] == check_value && this.total_page_info[i+1] != check_value) {
                str += i
                str += ", "
            }
        }
        return str.substr(0, str.length-2)
    }

    calculate_page_count() {
        this.black_page_count = 0
        this.color_page_count = 0

        for(var i=this.add_page_count+1; i<=this.total_page_count; i++) {
            if(this.total_page_info[i]) {
                this.black_page_count += 1
            } else {
                this.color_page_count += 1
            }
        }
    }
}


// a = new Helper()
// a.total_page_count = 30
// a.add_page_count = 5
// a.double_option = true
// a.color_page_str = "1, 2, 3, 5~7, 10"
// a.calculate_all_page()
// console.log(a)

