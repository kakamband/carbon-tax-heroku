import {refreshToken}  from './myJWT.js';
import {emissionSaveFormats} from './constants.js';

//----------------------------------------------------------------------------------------------------------------------------
/*
getAttribute(objectList, id, attribute)

convertCurrency({convertFrom, convertTo, amount, onSuccess, onFailure})

createObject({data, url, onSuccess, onFailure})
editObject({data, url, onSuccess, onFailure})
fetchObject({method, data, url, onSuccess, onFailure, noAuth})


*/
//----------------------------------------------------------------------------------------------------------------------------
export function decodeEmissionFormat(code){
  try{
    return(emissionSaveFormats[code])
  } catch{
    return null
  }
}

export function encodeEmissionFormat(name){
  for(let i in emissionSaveFormats){
    if(emissionSaveFormats[i]===name){
      return parseInt(i)
    }
  }
  return null
}


export function displayHrs(decimalHrs){
  let hours = Math.floor(decimalHrs)
  let returnString = `${hours}h`
  let minutes = Math.round((decimalHrs-hours)*60)
  if(minutes!==0){
    returnString += `${minutes}m`
  }
  return(returnString)
}

export function sleep(milliseconds){
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export function displayCurrency(value, profile){
  return `${profile.currency_symbol}${parseFloat(value*profile.conversion_factor).toFixed(2)}`
}

export function truncate(str, maxLen){
  if(str.length > maxLen){
    return str.substring(0,maxLen)
  } else {
    return str
  }
}

export function getObject(id, objectList){
  if(!id) return null
  for(let i in objectList){
    if(!objectList[i].id){return null}
    if(objectList[i].id===id){
      return objectList[i]
    }
  }
  console.log(`Unable to find id ${id} in list.`)
  return null
}

export function getAttribute(id, objectList, attribute){
  let object = getObject(id, objectList)
  if(object){
    try{ 
      return object[attribute]
    }
    catch{
      console.log(`Unable to find ${attribute} attribute for id ${id}.`)
      return null
    }
  }
  return null
}

export function getCurrencyFactor({currency,onSuccess}){
  convertCurrency({
    convertFrom:"AUD",
    convertTo:currency,
    amount:1,
    onSuccess:onSuccess,
  })
}

export function convertCurrency({convertFrom, convertTo, amount, onSuccess, onFailure}){
  const CURRENCY_API_KEY = process.env.REACT_APP_CURRENCY_API
  let url = `https://free.currconv.com/api/v7/convert?q=${convertFrom}_${convertTo}&compact=ultra&apiKey=${CURRENCY_API_KEY}`
  
  fetch(url)
  .then(res => {
      return res.json()
    })
    .then(json => {
      console.log(json)
      console.log(json[`${convertFrom}_${convertTo}`])
      onSuccess(json[`${convertFrom}_${convertTo}`])
    })
    .catch(e => {
      console.log(e.message)
      if(onFailure){
        onFailure(e.message)
      }
    });

}

export function createObject({data, url, onSuccess, onFailure}){
 
    console.log('Create new object:')
    console.log(data)
    
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer "+localStorage.getItem('access')
      },
      body: JSON.stringify(data)
    })
    .then(res => {
        if(res.ok){
          return res.json();
        } else {
          throw new Error(res.status)
        }
      })
      .then(json => {
        console.log(json)
        if(onSuccess){
          onSuccess()
        }
      })
      .catch(e => {
        console.log(e.message)
        if(e.message==='401'){
          refreshToken({
            onSuccess:createObject, 
            success_args:[{
              data:data, 
              url:url, 
              onSuccess:onSuccess,
              onFailure:onFailure,
            }]
          })
        } else if(onFailure){
          onFailure(e.message)
        }
      });
}

export function editObject({data, url, onSuccess, onFailure}){

  fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: "Bearer "+localStorage.getItem('access')
    },
    body: JSON.stringify(data)
  })
  .then(res => {
    if(res.ok){
      return res.json();
    } else {
      throw new Error(res.status)
    }
  })
  .then(json => {
    console.log(json)
    if(onSuccess){
      onSuccess()
    }
  })
  .catch(error => {
    console.log(error.message)
    if(error.message==='401'){
      refreshToken({
        onSuccess:editObject,
        success_args:[{
          data:data,
          url:url,
          onSuccess:onSuccess,
          onFailure:onFailure,
        }]
      })
    } else if(onFailure){
      onFailure(error.message)
    }
  });
}

export function fetchObject({method, data, url, onSuccess, onFailure, noAuth}){

  // SET HEADERS - No authorisation required for some APIs
  let headers 
  if(noAuth){
    headers = {
      'Content-Type': 'application/json',
    }
  } else {
    headers = {
      'Content-Type': 'application/json',
      Authorization: "Bearer "+localStorage.getItem('access'),
    }
  }

  if(!method){
    let method='GET'
  }

  // SET BODY - No body required for GET
  let fetchData
  if(data){
    fetchData = {
      method: method,
      headers: headers,
      body: JSON.stringify(data),
    }
  } else {
    fetchData = {
      method: method,
      headers: headers,
    }
  }


  fetch(url, fetchData)
  .then(res => {
    //console.log(res)
    if(res.ok){
      if(res.status===204){
        //console.log("204 no data")
        onSuccess(res)
        return;
      }
      return res.json();
    } else {
      throw new Error(res.status)
    }
  })
  .then(json => {
    //console.log(json)
    if(onSuccess){
      onSuccess(json)
    }
  })
  .catch(error => {
    console.log(error.message)
    if(error.message==='401'){
      refreshToken({
        onSuccess:fetchObject,
        success_args:[{
          method:method,
          data:data,
          url:url,
          onSuccess:onSuccess,
          onFailure:onFailure,
        }]
      })
    } else if(onFailure){
      onFailure(error)
    }
  });
}
