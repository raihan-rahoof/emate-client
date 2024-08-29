import React,{useEffect, useState} from "react";
import NavbarComponet from "../../Components/NavbarComponent";
import TabComponent from "../../Components/TabComponent";// Import the new TableComponent
import axiosInstance from "../../utils/axiosInstance";
import toast from 'react-hot-toast'

function DashBoard() {

  const [data, setData] = useState([]);
  const [filterdSentData,setFilteredSentData]=useState([])
  const [filteredNotSentData, setFilteredNotSentData] = useState([]);
  const [loading, setLoading] = useState(false);

  
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("schedulers/handle-mail/");
        if (response.status === 200) {
          console.log(response);
          setData(response.data);
          const sentData = response.data.filter((item) => item.is_sent == true);
          const notSentData = response.data.filter(
            (item) => item.is_sent == false
          );
          setLoading(false);
          setFilteredSentData(sentData);
          setFilteredNotSentData(notSentData);
        } else {
          toast.error("Failed to get data,refresh your page once more");
          console.log(response);
          setLoading(false);
        }
      } catch (error) {
        toast.error("Failed to get data,refresh your page once more");
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  return (
    <>
      <NavbarComponet />
      <div className="flex justify-center  h-screen p-8 bg-black">
        < TabComponent scheduled={filteredNotSentData} sented={filterdSentData}/>
      </div>
    </>
  );
}

export default DashBoard;
