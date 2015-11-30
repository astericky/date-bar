import 'webcomponents.js';
import dateWidget from './date-widget.es2015.comp';

function main() {
    let header = document.createElement('header');
    let main   = document.createElement('main');
    let footer = document.createElement('footer');
    let dateWidget = document.createElement('date-widget');

    header.className = 'header';
    main.className = 'main';
    footer.className = 'footer';

    main.appendChild(dateWidget);

    document.body.appendChild(header);
    document.body.appendChild(main);
    document.body.appendChild(footer);
}

main();
