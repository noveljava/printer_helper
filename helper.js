class Helper {
    // 입력된 값.
    add_page_str = "";
    color_page_str = "";
    black_page_str = "";

    total_page_count = 0;
    add_page_count = 0;
    color_page_count = 0;
    black_page_count = 0;

    double_option = false;

    re_color_page_str = "";

    replaceAll(str, searchStr, replaceStr) {
        return str.split(searchStr).join(replaceStr);
    }

    checkFormat(str) {
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

    calculate_all_page() {
        calculate_add_page()
        calculate_color_page()

        // black page 계산
    }

    calculate_color_page() {
        var replaced_total_page = this.checkFormat(this.replaceAll(this.color_page_str, " ", ""))
        console.log(replaced_total_page)
    }
}