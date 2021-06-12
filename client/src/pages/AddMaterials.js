import React, {useState} from 'react'


const AddMaterials = () => {
    const [vstupOdUzivatele, setvstupOdUzivatele] = useState("");
const vlozeniDoDb = () => {
    fetch("http://localhost:7000/save-material", {
        method:"post",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({name:vstupOdUzivatele})
    }).then((data) => {
        return data.json();
    }).then((finalData) => {
        console.log(finalData.msg)
        setvstupOdUzivatele("");
    })
    
}
    return (
        <div>
            <input type="text" value={vstupOdUzivatele} onInput={(e) => {
                setvstupOdUzivatele(e.target.value);
            }} />
            <div className='btn'onClick={vlozeniDoDb}>Vlozit material</div>
        </div>
    )
}

export default AddMaterials
