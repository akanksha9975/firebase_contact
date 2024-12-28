import {useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { IoSearch } from "react-icons/io5";
import { FaCirclePlus } from "react-icons/fa6";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import {db } from "./config/firebase";
import Modal from "./components/Modal";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import useDisclosure from "./hooks/useDisclosure";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import NotFoundContact from "./components/NotFoundContact";
const App = () => {
  const [contacts,setContacts]=useState([]);
  
  const {isOpen,onClose ,onOpen}=useDisclosure();
  
   useEffect(()=>{
    const getConatacts=async()=>{
       try{

         const contactsRef=collection(db,"akanksha");
        

         onSnapshot(contactsRef,(snapshot)=>{

         const contactLists=snapshot.docs.map((doc)=>
        {
          return {
            id:doc.id,
            ...doc.data(),  //calling object
          };
        });
        
         setContacts(contactLists);
         return contactLists;
      });
       }
       catch(error){
        console.log(error);
       }
    };
    getConatacts();


   },[]);

   const filterContacts=(e)=>{
    const value=e.target.value;
    const contactsRef=collection(db,"akanksha");
        

    onSnapshot(contactsRef,(snapshot)=>{

    const contactLists=snapshot.docs.map((doc)=>
   {
     return {
       id:doc.id,
       ...doc.data(),  //calling object
     };
   });

   const filteredContacts=contactLists.filter((contact)=>
    contact.name.toLowerCase().includes(value.toLowerCase())

   );
   
    setContacts(filteredContacts);


    return filteredContacts;
 });

   };






  return (
    <>
    <div className="mx-auto max-w-[370px] px-4">
      <Navbar/>
      
      <div className="flex gap-2">
      <div className=" relative flex flex-grow items-center">
      <IoSearch className="absolute text-3xl text-white"/>

       <input 
       onChange={filterContacts} 
       type="text" className=" flex-grow h-10 rounded-md border border-white
        bg-transparent text-white pl-9"  />
      </div>
      <div>
      <FaCirclePlus onClick={onOpen} className="text-4xl cursor-pointer text-white" />
      </div>


    </div>
    <div className="mt-4 gap-3 flex flex-col">
      {
        contacts.length <=0 ?<NotFoundContact/>:contacts.map(contact=> (
        <ContactCard key={contact.id} contact={contact}/>
        
        ))}
      
    </div>
    </div>
    <AddAndUpdateContact onClose={onClose} isOpen={isOpen}/>
    <ToastContainer position="bottom-center"/>
    </>
  ); 
};

export default App;
