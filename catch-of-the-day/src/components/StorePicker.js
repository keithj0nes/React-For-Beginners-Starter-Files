import React from 'react';
import { getFunName } from '../helpers';

class StorePicker extends React.Component {

  constructor(){
    super();
    this.goToStore = this.goToStore.bind(this)
  }

  goToStore(e){
    e.preventDefault();
    //first grab text from box
    console.log(this.storeInput.value);
    //second transition from / to /store/id
    this.context.router.transitionTo(`/store/${this.storeInput.value}`)
  }

  render(){
    return (
      <form className="store-selector" onSubmit={this.goToStore}>
        <h2>Please Enter A Store</h2>
        <input ref={(input)=>{this.storeInput = input}} type="text" required placeholder="Store Name" defaultValue={getFunName()}/>
        <button type="submit">Visit Store</button>
      </form>
    )
  }
}

StorePicker.contextTypes = {
  router: React.PropTypes.object
}


export default StorePicker;
