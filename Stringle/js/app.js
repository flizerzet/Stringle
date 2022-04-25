(() => {
    "use strict";
    const body = document.body;
    const searchHeader = document.querySelector(".search-header");
    if (searchHeader) searchHeader.querySelector(".search-header__btn__wrapper").addEventListener("click", (e => {
        searchHeader.classList.toggle("active");
        searchHeader.querySelector(".search-header__btn").classList.toggle("active");
        document.querySelector(".search-header__input").classList.toggle("active");
    }));
    const months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
    const days = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
    let d = new Date;
    const year = d.getFullYear();
    const date = d.getDate();
    const dayName = days[d.getDay()];
    const monthName = months[d.getMonth()];
    const formatted = `${date} ${monthName} ${year}, ${dayName}`;
    document.querySelector(".header__date").textContent = formatted;
    const progresses = document.querySelectorAll(".result__progress");
    if (progresses) progresses.forEach((progress => {
        const progressElem = progress.querySelector("progress");
        const progressValue = progress.querySelector(".result__progress_value");
        if (progressValue) progressValue.textContent = 100 * progressElem.value + "%";
        if (progressElem.value <= 25 / 100) progress.classList.add("_red");
    }));
    const userBtn = document.querySelector(".header__user");
    const userMenu = document.querySelector(".user-menu");
    const closeUserMenuBtn = document.querySelector(".user-menu__close");
    if (userBtn && userMenu) {
        userBtn.addEventListener("click", (() => {
            userMenu.classList.toggle("_active");
            body.classList.toggle("_lock");
        }));
        closeUserMenuBtn.addEventListener("click", (() => {
            userMenu.classList.remove("_active");
            body.classList.remove("_lock");
        }));
    }
    const modules_body = document.body;
    function menuInit() {
        let burger = document.querySelector(".menu__icon");
        let menu = document.querySelector(".menu");
        if (burger && menu) {
            burger.onclick = () => {
                burger.classList.toggle("_active");
                menu.classList.toggle("_active");
                modules_body.classList.toggle("_locked");
            };
            menu.addEventListener("click", (e => {
                if (e.target.closest(".menu__body")) return;
                burger.classList.remove("_active");
                menu.classList.remove("_active");
                modules_body.classList.remove("_locked");
            }));
        }
    }
    const getTemplate = (data = [], placeholder, selectedID) => {
        let text = placeholder ?? "Placeholder по умолчанию";
        const htmlItems = data.map((item => {
            let cls = "";
            if (item.id === selectedID) {
                text = item.value;
                cls = "_selected";
            }
            return `\n\t\t\t<li class="select__item ${cls}" data-type="item" data-id="${item.id}">${item.value}</li>\n\t\t`;
        }));
        return `\n\t\t<div class="select__body">\n\t\t\t<div class="select__input" data-type="input">\n\t\t\t\t<span data-type="value">${text}</span>\n\t\t\t\t<div class="select__icon _icon-dropdown-arrow"></div>\n\t\t\t</div>\n\t\t\t<div class="select__dropdown">\n\t\t\t\t<ul class="select__list">\n\t\t\t\t\t${htmlItems.join("")}\n\t\t\t\t</ul>\n\t\t\t</div>\n\t\t</div>\n\t`;
    };
    class Select {
        constructor(selector, options) {
            this.elem = document.querySelector(selector);
            this.options = options;
            this.selectedID = options.selectedID;
            this.#render();
            this.#setup();
            console.log(this.current);
        }
        #render() {
            const {placeholder, data} = this.options;
            this.elem.classList.add("select");
            this.elem.innerHTML = getTemplate(data, placeholder, this.selectedID);
        }
        #setup() {
            this.clickHandler = this.clickHandler.bind(this);
            this.elem.addEventListener("click", this.clickHandler);
            this.elemValue = this.elem.querySelector('[data-type="value"]');
        }
        clickHandler(event) {
            const {type} = event.target.dataset;
            if ("input" === type || "value" === type || event.target.closest(".select__icon")) this.toggle(); else if ("item" === type) {
                const id = event.target.dataset.id;
                this.select(id);
            } else if ("backdrop" === type) this.close();
        }
        get isOpen() {
            return this.elem.classList.contains("_open");
        }
        get current() {
            return this.options.data.find((item => item.id === this.selectedID));
        }
        toggle() {
            this.isOpen ? this.close() : this.open();
        }
        select(id) {
            this.selectedID = id;
            this.elemValue.textContent = this.current.value;
            this.elem.querySelectorAll('[data-type="item"]').forEach((elem => elem.classList.remove("_selected")));
            this.elem.querySelector(`[data-id="${id}"]`).classList.add("_selected");
            this.options.onSelect ? this.options.onSelect(this.current) : null;
            this.close();
        }
        open() {
            this.elem.classList.add("_open");
        }
        close() {
            this.elem.classList.remove("_open");
        }
        destoy() {
            this.elem.removeEventListener("click", this.clickHandler);
            this.elem.innerHTML = "";
        }
    }
    menuInit();
    new Select("._select", {
        placeholder: "Select interval",
        selectedID: "1",
        data: [ {
            id: "1",
            value: "Last Week"
        }, {
            id: "2",
            value: "Last Month"
        }, {
            id: "3",
            value: "Last Day"
        } ],
        onSelect(item) {
            console.log("Selected item: ", item);
        }
    });
})();