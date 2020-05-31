import React from 'react';
import { createObject } from './helperFunctions.js';

const DEFAULT_VEHICLE_NAME = "My Vehicle"

export class VehicleSaveForm extends React.Component{
  /*
    Display a name input, save and cancel buttons.
    Save vehicle to a user's profile, then execute an onSuccess provided by parent. 
    If props.name is blank, default to My Vehicle
  */
  constructor(props){
    super(props)



    this.state = {
      vehicleName:""
    }
    this.handleChange=this.handleChange.bind(this)
    this.saveVehicle=this.saveVehicle.bind(this)
    this.onSaveSuccess=this.onSaveSuccess.bind(this)
  }

  componentDidMount(){
    this.setState({
      vehicleName:this.props.name
    })
  }

  handleChange(event){
    this.setState({[event.target.name]:event.target.value})
  }

  onSaveSuccess(){
    console.log("Vehicle saved successfully.")
    this.props.onSave()
  }

  saveVehicle(){
    let saveAs
    if(this.state.vehicleName){
      saveAs = this.state.vehicleName
    } else if(this.props.name){
      saveAs = this.props.name
    } else {
      saveAs = DEFAULT_VEHICLE_NAME
    }

    let vehicleData = {
      "name":saveAs,
      "economy":`${parseFloat(this.props.lPer100Km).toFixed(3)}`,
      "fuel":`/fuel/${this.props.fuelId}/`
    }

    console.log(vehicleData)

    createObject({
      data:vehicleData,
      url:"/my-vehicles/",
      onSuccess:this.onSaveSuccess,
    })
  }


  render(){
    let saveAs
    if(this.state.vehicleName){
      saveAs = this.state.vehicleName
    } else if(this.props.name){
      saveAs = this.props.name
    } else {
      saveAs = DEFAULT_VEHICLE_NAME
    }

    let display
    if(this.props.lPer100Km && this.props.fuelId){
      display = 
        <div>
          <input name="vehicleName" type="text" defaultValue={saveAs} onChange={this.handleChange}/>
          <button name="save" className="btn btn-outline-primary" onClick={this.saveVehicle}>Save</button>
          <button name="cancel" className="btn btn-outline-danger" onClick={this.props.cancel}>Cancel new vehicle</button>
        </div>
    } else {
      display = 
        <div>
          <button name="cancel" className="btn btn-outline-danger" onClick={this.props.cancel}>Cancel new vehicle</button>
        </div>
    }

    return display
  }
}
