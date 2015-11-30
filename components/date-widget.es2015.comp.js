(function() {
    let template = `
        <style>
            @import url(http://fonts.googleapis.com/css?family=Roboto+Condensed:400,300,700);
            .container {
                position: relative;
                min-height: 100px;
                border-radius: 5px;
                box-shadow: 0 0 5px #dadada;
                margin: 10px 0;
                background-color: #fff;
                font-family: 'Roboto Condensed', sans-serif;
            }
            .container .left {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                width: 30%;
                padding: 18px 0 0;
                border-radius: 5px 0 0 5px;
                text-align: center;
            }
            .container .left .month {
                font-weight: 300;
                line-height: 20px;
            }
            .container .left .day {
                font-size: 40px;
            }
            .container .right {
                 padding: 10px 10px 10px 15px;
                 margin-left: 30%;
                 color: #333;
            }
            .container .right .day-long {
                font-weight: 300;
                font-size: 18px;
                line-height: 35px;
            }
            .container .right .time {
                font-weight: bold;
                font-size: 35px;
                line-height: 40px;
            }
            /* Theme Code */
            .container.green .left {
                background-color: #37bc9b;
            }
            .container.green .day-long {
                color: #278b70;
            }
            .container.red .left {
                background: #bc2751;
            }
            .container.red .day-long {
                color: #922146;
            }
            .container.blue .left {
                background-color: #356dbc;
            }
            .container.blue .day-long {
                color: #2d5ea3;
            }
            .container.gold .left {
                background-color: #bc9600;
            }
            .container.gold .day-long {
                color: #9a7b00;
            }
        </style>
        <div class="container">
            <div class="left">
                <div class="month"></div>
                <div class="day"></div>
            </div>
            <div class="right">
                <div class="day-long"></div>
                <div class="time"></div>
            </div>
        </div>
    `;

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    class DateWidget extends HTMLElement {

        // Fires when an instance of the element is created.
        createdCallback() {
            this.createShadowRoot().innerHTML = template;

            this.$container = this.shadowRoot.querySelector('.container');
            this.$month = this.shadowRoot.querySelector('.month');
            this.$day = this.shadowRoot.querySelector('.day');
            this.$dayLong = this.shadowRoot.querySelector('.day-long');
            this.$time = this.shadowRoot.querySelector('.time');

            this.updateTheme(this.getAttribute('theme'));

            // Call the draw function initially
            this.draw();

            // Call the draw function every second to update the time
            setInterval(() => {
                this.draw();
            }, 1000);
        }

        // Fires when an instance was inserted into the document.
        attachedCallback() {

        }

        // Fires when an attribute was added, removed or updated.
        attributeChangedCallback(attrName, oldVal, newVal) {
            switch (attrName) {
                case 'theme':
                    this.updateTheme(newVal);
                    break;
            }
        }

        draw() {
            this.date = new Date();
            this.$month.innerHTML = months[this.date.getMonth()];
            this.$day.innerHTML = this.date.getDate();
            this.$dayLong.innerHTML = days[this.date.getDay()].toUpperCase();
            this.$time.innerHTML = this.date.toLocaleTimeString();
        }

        updateTheme(theme) {
            var val = "green";

            if (['green', 'red', 'blue', 'gold'].indexOf(theme) > -1) {
                val = theme;
            }

            this.$container.className = "container " + val;
        }
    }

    document.registerElement('date-widget', DateWidget);
})();
