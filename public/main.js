let watches = {
  products: [
    {
      name: 'black and white wristwatch',
      description: 'This black and white wristwatch is black and white.',
      img:
        'photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=2251&q=80',
      price: 104.99,
      id: 1,
      stars: 3.5
    },
    {
      name: 'white faced wristwatch',
      description: 'This white faced wristwatch is white faced.',
      img:
        'photo-1508057198894-247b23fe5ade?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2250&q=80',
      price: 174.99,
      id: 2,
      stars: 1.6666666666666667
    },
    {
      name: 'stone finish analogue wristwatch',
      description:
        'This stone finish analogue wristwatch is stone, finish and analogue.',
      img:
        'photo-1507679622673-989605832e3d?ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=60',
      price: 144.99,
      id: 3,
      stars: 2.75
    }
  ],
  count: 8,
  pageNum: 2
};

import * as ReactDOM from  'https://unpkg.com/es-react@16.8.60/index.js';

import htm from 'https://unpkg.com/htm@2.2.1/dist/htm.mjs';
const html = htm.bind(ReactDOM.React.createElement);


function Watch (props) {
  const watch = props.watch;
  return html`
        <div key=${watch.id} className="col-lg-4 col-md-6 col-mb-4">
          <div className="card h-100">
            <img
              src=${'https://images.unsplash.com/' + watch.img}
              className="card-img-top"
              alt="bootstraplogo"
            />
            <div className="card-body">
              <h5 className="card-title">${watch.name}</h5>
              <p className="card-text">${watch.description}</p>
              <div
                onClick=${() => toggleExclaim(watch)}
                className="btn btn-primary"
                >Toggle Exclamation</div
              >
            </div>
          </div>
        </div>
      `;
}

function Watches (props) {
  return html`
    ${props.watches.map(function(watch) {
      return html`<${Watch} key=${watch.id} watch="${watch}" />`
    })}`;
};


function Search () {
  const [searchTerm, setSearchTerm] = ReactDOM.React.useState("");
  return html`
    <form id="search" onSubmit=${(e) => {
    e.preventDefault();
    filterWatches(searchTerm);
  }} className="form-inline my-2 my-lg-0">
          <input value=${searchTerm} onChange=${(eventData) => setSearchTerm(eventData.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </form>`;
}
// create a copy of watches;
let filteredWatches = watches.products.slice();
function filterWatches (searchTerm) {
  filteredWatches = watches.products.filter(watch => {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return watch.description.toLowerCase().includes(lowerSearchTerm) ||
      watch.name.toLowerCase().includes(lowerSearchTerm);
  });
  
  render();
}

window.render = function render() {
  const vdom = html`
      <${Watches} watches=${filteredWatches} />
    `;
  console.log("vdom", vdom);
  ReactDOM.ReactDOM.render(
    vdom,
    document.getElementById('displaywatchesdiv')
  );
  ReactDOM.ReactDOM.render(
    html`<${Search} />`,
    document.getElementById('search')
  );
}

function toggleExclaim (watch) {
  for(var i = 0; i < watches.products.length; ++i) {
    if(watches.products[i].id !== watch.id) {
      continue;
    }
    const description = watches.products[i].description;
    if(description.endsWith('.')) {
      watches.products[i].description = description.replace(".", "!");
    } else {
      watches.products[i].description = description.replace("!", ".");
    }
  }
  render();
}

render();
