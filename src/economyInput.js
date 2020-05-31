import React from 'react';
import {VehicleInput} from './vehicleInput.js';
import {refreshToken}  from './myJWT.js';
import * as units from './unitConversions';
import {VehicleSaveForm} from './vehicleSave.js';
import { VehicleTable } from './userTables.js';
import {OptionListInput} from './optionListInput.js';


export class EconomyInput extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      displayUserVehicles: false,
      lPer100Km: null,
      fuelId: null,
      name: "",
      vehicleWillSave: false,
    }
    this.showUserVehicles=this.showUserVehicles.bind(this)
    this.hideUserVehicles=this.hideUserVehicles.bind(this)

    this.saveVehicle=this.saveVehicle.bind(this)
    this.cancelSaveVehicle=this.cancelSaveVehicle.bind(this)
    this.handleSave=this.handleSave.bind(this)

    this.receiveEconomy=this.receiveEconomy.bind(this)
    this.submitEconomy=this.submitEconomy.bind(this)
  }

  showUserVehicles(){
    this.setState({
      displayUserVehicles:true,
    })
  }

  hideUserVehicles(){
    this.setState({
      displayUserVehicles:false,
    })
  }

  saveVehicle(){
    this.setState({
      vehicleWillSave:true
    })
  }

  cancelSaveVehicle(){
    this.setState({
      vehicleWillSave:false
    })
  }

  handleSave(){
    this.setState({
      vehicleDidSave:true
    })
  }

  receiveEconomy(lPer100Km, fuelId, name){
    this.setState({
      lPer100Km:lPer100Km,
      fuelId:fuelId,
      name:name,
    })
  }

  submitEconomy(){
    this.props.submitEconomy(this.state.lPer100Km, this.state.fuelId)
  }

  

  
  render(){

    let vehicleInput=
      <VehicleInput 
        displayUnits={this.props.displayUnits} 
        fuels={this.props.fuels}
        returnEconomy={this.receiveEconomy}
      />

    let saveDisplay
    let userVehicles
    let myVehiclesBtn

    if(this.props.loggedIn){
      
      userVehicles = 
      <VehicleTable
        displayUnits={this.props.displayUnits}
        vehicles={this.props.vehicles}
        fuels={this.props.fuels}
        submitEconomy={this.receiveEconomy}
        refresh={this.props.refresh}
      />

      myVehiclesBtn = <button className="btn btn-outline-primary" onClick={this.displayUserVehicles}>Use a saved vehicle</button>

      if(this.state.lPer100Km && this.state.fuelId){
        if(this.state.vehicleDidSave){
          saveDisplay = <p>Vehicle saved to profile.</p>
        } else if(this.state.vehicleWillSave){
          saveDisplay = 
            <VehicleSaveForm
              cancel={this.cancelSaveVehicle}
              name={this.state.name}
              lPer100Km={this.state.lPer100Km}
              fuelId={this.state.fuelId}
              onSave={this.handleSave}
            />
        } else {
          saveDisplay = <button className="btn btn-outline-primary" onClick={this.saveVehicle}>Save this vehicle</button>
        }
      }
    }

    let continueDisplay
    if(this.state.lPer100Km && this.state.fuelId){
      continueDisplay = <button className="btn btn-outline-success" onClick={this.submitEconomy}>Continue to carbon calculator</button>
    }

    let display
    if(this.state.displayUserVehicles){
      display = 
        <div>
          {userVehicles}
          <button className="btn btn-outline-danger" onClick={this.hideUserVehicles}>Return to input</button>
        </div>
    } else {
      display = 
        <div>
          {vehicleInput}
          {myVehiclesBtn}
          {saveDisplay}
        </div>
    }




    
   
    return(
      <div className='container bg-info py-2'>
        {display}
        {continueDisplay}
      </div>
    )
  }
}