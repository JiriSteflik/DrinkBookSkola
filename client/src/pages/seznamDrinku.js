import React,{useState, useEffect} from 'react';
import Material from '../component/Material';



const Main = () => {
    const [materialy, setMaterialy] = useState([]);
    const [serverMessage, setServerMessage] = useState("");
    const [kliknutoUzivatelem, setkliknutoUzivatelem] = useState("");
    //Vola nam data z databaze automaticky
    useEffect(() => { 
       pridaniMaterialu();
        
    }, [])

    const pridaniMaterialu = async () => {
        setServerMessage('nacitam data');
        const data = await fetch("http://localhost:7000/get-materials");
        const finalData = await data.json();
        const {msg, documents} = finalData;
        setMaterialy(documents);
        setServerMessage(msg);
    }
    const kliknuto = (material) => {
        setkliknutoUzivatelem(material);
        
    }

    return (
        <div>
           
            {
                materialy.map((material,index) => {
                    return(
                        
                        <Material eventklik={kliknuto} key={index} name={material.name} cislovporadi={index} />
                        
                      
                    )
                })

            }
         
            <div className="msg">{serverMessage}</div>
            <div>
                
            </div>
            {kliknutoUzivatelem}
        </div>
    )
}

export default Main