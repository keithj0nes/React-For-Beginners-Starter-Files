import React from 'react';
import Header from './Header';
import Order from './Order';
import Inventory from './Inventory';
import Fish from './Fish';

import sampleFishes from '../sample-fishes';
import base from '../base';

class App extends React.Component {

  constructor(){
    super();

    this.addFish = this.addFish.bind(this);
    this.loadSamples = this.loadSamples.bind(this);
    this.addToOrder = this.addToOrder.bind(this);
    this.updateFish = this.updateFish.bind(this);
    this.removeFish = this.removeFish.bind(this);
    this.removeFromOrder = this.removeFromOrder.bind(this);

    this.state = {
      fishes: {},
      order: {}
    }
  }

  componentWillMount(){
    // this runs right before app is renedered
    this.ref = base.syncState(`${this.props.params.storeId}/fishes`, {
      context: this,
      state: 'fishes'
    })

    //check if there is anyorder in localStorage

    const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`);

    if(localStorageRef){
      this.setState({
        order: JSON.parse(localStorageRef)
      })
    }
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  componentWillUpdate(nextProps, nextState){
    localStorage.setItem(`order-${this.props.params.storeId}`,
      JSON.stringify(nextState.order))
  }

  addFish(fish){
    //update state
    const fishes = {...this.state.fishes}
    //add in our new fish
    const timestamp = Date.now();
    fishes[`fish-${timestamp}`] = fish;
    //set state
    this.setState({fishes})
    console.log(fishes, 'fishy fishy fishy');
  }

  updateFish(key, updatedFish){
    const fishes = {...this.state.fishes};
    fishes[key] = updatedFish;
    this.setState({fishes})
  }

  removeFish(key){
    const fishes = {...this.state.fishes}
    fishes[key] = null;
    this.setState({fishes})
  }

  loadSamples(){
    this.setState({
      fishes: sampleFishes
    })
    console.log("LOADED");
  }

  addToOrder(key){
    //createcopy of state
    const order = {...this.state.order}
    //update or add the new number if fish ordered
    order[key] = order[key] + 1 || 1;
    //update setState
    this.setState({order});
  }

  removeFromOrder(key){
    console.log(key, "REMOVED FROM ORDER");
    const order = {...this.state.order};

    // order[key] = null;
    delete order[key]
    // localStorage.removeItem(`order-${this.props.params.storeId}`)
    // localStorage.setItem(`order-${this.props.params.storeId}`,
    //   JSON.stringify(order))
    //   console.log(order,'orer');


    this.setState({order})
  }

  render(){
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market"/>
          <ul className="list-of-fishes">
            {
              Object
              .keys(this.state.fishes)
              .map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder}/>)
            }
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          params={this.props.params}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          loadSamples={this.loadSamples}
          fishes={this.state.fishes}
          updateFish={this.updateFish}
          removeFish={this.removeFish}
          storeId={this.props.params.storeId}
        />
      </div>
    )
  }
}

App.propTypes = {
  params: React.PropTypes.object.isRequired,
}

export default App;
