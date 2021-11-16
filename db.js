class DB {
    myStorage = window.localStorage;

    title_list = new Array(0);

    save_data(title, info) {
        localStorage.setItem(title, info)
        var saved_title_list = this.get_title_list()
        if(saved_title_list != null) {
            this.title_list = saved_title_list
        }

        this.title_list.push(title)
        localStorage.setItem("title_list", JSON.stringify(this.title_list))
    }

    get_title_list() {
        return JSON.parse(localStorage.getItem("title_list"))
    }

    get_title_info(title) {
        return localStorage.getItem(title)
    }
}
