import React from 'react';
import 'devextreme-react/text-area';

import ArrayStore from 'devextreme/data/array_store';
import List , { SearchEditorOptions } from 'devextreme-react/list';
import TileView from 'devextreme-react/tile-view';

const formatCurrency = new Intl.NumberFormat(
  'en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  },
).format;

class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      current: null,
      selectedItemKeys: [],
    };

    this.state.current = {
      Categoria: "NombreCategoria",
      Color: "Color",
      Id: 1,
      IdCategoria: 1,
      Nombre: "Nombre",
      Precio: 1121,
      Referencia: "Referencia",
      Talla: "Talla",
      UrlImages: "http:/example"
    }

    this.dataSourceOptions = {
      store: new ArrayStore({
        data: this.state.data,
        key: 'Id',
      }),
      group: 'Categoria',
      searchExpr: ['Nombre', 'Categoria', 'Precio', 'Talla'],
    };

    this.listAttrs = { class: 'list' };
    this.tileViewAttrs = { class: 'tile' };

    this.formatCurrency = new Intl.NumberFormat(
      'en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
    ).format;
    

    this.componentDidMount = this.componentDidMount.bind(this)
    this.handleListSelectionChange = this.handleListSelectionChange.bind(this);
  }
   
  componentDidMount() {
    fetch('http://localhost:3000/product/getproducts')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.state.data = data;
        this.state.current = data[0];
        this.state.selectedItemKeys = [data[0].Id];
        this.dataSourceOptions= {
          store: new ArrayStore({
            data: this.state.data,
            key: 'Id',
          }),
          group: 'Categoria',
          searchExpr: ['Nombre', 'Categoria', 'Precio', 'Talla'],
        },
        this.setState({
          data: data,
          current: data[0],
          selectedItemKeys: [data[0].Id],
          dataSourceOptions: {
            store: new ArrayStore({
              data: data,
              key: 'Id',
            }),
            group: 'Categoria',
            searchExpr: ['Nombre', 'Categoria', 'Precio', 'Talla'],
          },
        });
      });
  }
  

  render() {
    const current = this.state.current;
    return (
      <React.Fragment>
        <div className="left">
          <List
            selectionMode="single"
            dataSource={this.dataSourceOptions}
            grouped={true}
            searchEnabled={true}
            selectedItemKeys={this.state.selectedItemKeys}
            onSelectionChanged={this.handleListSelectionChange}
            itemRender={renderListItem}
            groupRender={renderListGroup}
            elementAttr={this.listAttrs}
          >            
          <SearchEditorOptions
            placeholder="Buscar"
            width={300}
          />       
          </List>
        </div>
        <div className="right">
        <div className="header">
            <div className="name-container">
              <div className="nombre">{current.Nombre}</div>         
            </div>
          </div>
          <div className="tile-image">
            <img height="300px" width="300px" src={current.UrlImages}/>
          </div> 
        </div>       
      </React.Fragment>
    );
  }

  handleListSelectionChange(e) {
    const current = e.addedItems[0];
    this.setState({
      current,
      selectedItemKeys: [current.Id],
    });
  }
}

function renderListGroup(group) {
  return <div className="status">{group.key}</div>;
}

function renderListItem(item) {
  return (
    <div>
      <div className="product">
        <div className="nombre">{item.Nombre}</div>
        <div className="referencia">{item.Referencia}</div>
        <div className="talla">{item.Talla}</div>   
      </div>
      <div className="price-container">
        <div className="precio">{formatCurrency(item.Precio)}</div>
        <div className="color">{item.Color}</div>
      </div>
    </div>
  );
}

function renderTile(item) {
  console.log(item.UrlImages);
  /*return (

  );*/
}

export default App;


