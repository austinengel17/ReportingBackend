//Author: Haoru Song
Vue.createApp({
    
    data() {
        //center
        <div class="container">
            <div class="item">I am centered!</div>
        </div>

        //start date
        var dateControl = document.querySelector('input[type="date"]');
        dateControl.value = '2017-06-01';
        console.log(dateControl.value); // prints "2017-06-01"
        console.log(dateControl.valueAsNumber); // prints 1496275200000, a JavaScript timestamp (ms)

        //end date
        var dateControl = document.querySelector('input[type="date"]');
        dateControl.value = '2017-06-01';
        console.log(dateControl.value); // prints "2017-06-01"
        console.log(dateControl.valueAsNumber); // prints 1496275200000, a JavaScript timestamp (ms)

        // button
        const button = document.querySelector('input');
        const paragraph = document.querySelector('p');

        button.addEventListener('click', updateButton);

        function updateButton() {
            if (button.value === 'Start machine') {
                button.value = 'Stop machine';
                paragraph.textContent = 'The machine has started!';
            } else {
                button.value = 'Start machine';
                paragraph.textContent = 'The machine is stopped.';
            }
        }
        }
}).mount("#app");
background - color: lightblue;
