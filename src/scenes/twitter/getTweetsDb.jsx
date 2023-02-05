import fetch from 'node-fetch';
export const getTweetsDb = async (q) => {
  try {
    // const result = await fetch(`http://localhost:5000/twitter/tweets?q=${q}`);
    const result = await fetch(`https://back-fqrl.onrender.com/twitter/tweets?q=${q}`);
    const jsonResult = await result.json();
    // setData(jsonResult.data);
    console.log(jsonResult);
    return jsonResult.data
  } catch (error) {
    console.log(error);
  }
}
export const getReferences = async () => {
  try {
    const result = await fetch(`https://back-fqrl.onrender.com/twitter/ref`);
    const jsonResult = await result.json();
    // setData(jsonResult.data);
    let refArr = []
    jsonResult.data.forEach((e)=>{
      refArr.push(e.username)
    })
    return refArr
  } catch (error) {
    console.log(error);
  }
}

