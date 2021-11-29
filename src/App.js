import React, {useState, useEffect} from 'react';
import Amplify, {API, graphqlOperation} from 'aws-amplify';
import awsExports from './aws-exports';
import {updatePVTech} from './graphql/mutations'
import {getPVTech} from './graphql/queries'

import './App.css';
Amplify.configure(awsExports);


function App() {

  const [PVTechcurrent, setPVTechcurrent] = useState(0);

async function fetchPVTechCurrent(){
  try{
    const PVTechcurrentdata = await API.graphql(graphqlOperation(getPVTech))
    const PVTechcurrent = PVTechcurrentdata.data.getPVTech.amount
    setPVTechcurrent(PVTechcurrent)
  } catch(err){
    console.log('error fetching currentamount')
    console.log(err)
  }
}


useEffect(() => {
  fetchPVTechCurrent()
}, [])

async function updatePVTechCurrent(){
 try{ 
  const PVTechcurrentdata = await API.graphql(graphqlOperation(getPVTech))
  const PVTechcurrent = PVTechcurrentdata.data.getPVTech.amount + 0.1

  const updatedPVTechCurrent = await API.graphql(graphqlOperation(updatePVTech, { input: PVTechcurrent}))
  setPVTechcurrent(updatedPVTechCurrent.data.updatePVTech.amount)
} catch (err){
  console.log('error updating PVTechcurrent')
  console.log(err)
}
}

  return (
    <div className="App">
      <header className="App-header">
   <h1>Interver 1 Group 1 Current</h1>
   <p> One click = 0.1 A</p>
   <h2>{PVTechcurrent.toFixed(2)} A </h2>
  <button onClick={updatePVTechCurrent}>Current</button>
  <img src ="https://iyzaf41pgsc2a79m71l49bip-wpengine.netdna-ssl.com/wp-content/uploads/2021/03/panels.jpg" width={896} height={504}alt="solar shingle array"></img>
      </header>
    </div>
  );
}

export default App;
