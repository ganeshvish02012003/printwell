import React from 'react';
import moment from "moment";

const PrintableJobView = ({ closeModal, card ,fetchAllJob }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white relative rounded-lg p-4 overflow-y-auto max-w-screen-md w-full h-screen">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2  hover:text-red-500 text-xl"
        >
          ✕
        </button>
        {/* Your printable content goes here */}
          <h2 className="text-xl text-center  rounded pt-2 font-bold">Goyal printing & converting industries</h2>
        <div className="  h-full p-4 pt-2">
          <h2 className="text-2xl text-center bg-gray-300 rounded pb-2 font-bold">Printing Job Card</h2>
          {/* job preview */}
          <div  >
            <div className='bg-slate-50 p-4 mt-2 py-2 border rounded'>
              <h1 className='text-center bg-slate-200 rounded  font-bold' >Genral Details</h1>
            <div className='flex pt-2'>
              <div className='w-7/12 '>
                <p className='text-[12px] '> CUSTOMER :- <span className='font-bold  underline'> {card.general?.Customer_name || "____________________________________________________________"} </span></p>
                <p className='text-[12px] '> CONTACT  :- <span className='font-bold underline'> {card.general?.Mobile_number || "______________________________________________________________"} </span></p>
              </div>
           
              <div className='w-5/12 '>
                <p className='text-[12px] '> jobCardId :- <span className='font-bold underline'> {card.job?.jobCardId || "__________"} </span></p>
                <p className='text-[12px] '> Created At :- <span className='font-bold underline'> 
                  {card.createdAt ? moment(card.createdAt).format("LLL"): "date of Order"} </span>
                </p>
              </div>
            </div>
                <p className='text-[12px] '> ADDRESS  :- <span className='font-bold underline'> {card.general?.address || "______________________________________________________________"} </span></p>
                <p className='text-[12px] '> DESCRIPTION :- <span className='font-bold underline'> {card.general?.genral_description || "__________________________________________________________"} </span></p>

            </div>
          
            <div className='bg-slate-50 p-4 mt-1 py-2 border rounded'>
              <h1 className='text-center bg-slate-200 rounded font-bold ' >Job Details</h1>
                <div class="flex">
                  <div class="w-4/12 ">
                      <p className='text-[12px] '> jobName :- <span className='font-bold underline'> {card.job?.jobName || "______________________________"} </span></p>
                      <p className='text-[12px] '> category :- <span className='font-bold underline'> {card.job?.category || "______________________________"} </span></p>
                      <p className='text-[12px] '> jobSize :- <span className='font-bold underline'> {card.job?.jobSize || "_______________________________"} </span></p>
                      <p className='text-[12px] '> color :- <span className='font-bold underline'> {card.job?.color || "__________________________________"} </span></p>
                      <p className='text-[12px] '> paperName :- <span className='font-bold underline'> {card.job?.paperName || "___________________________"} </span></p>
                      <p className='text-[12px] '> PrintingSide :- <span className='font-bold underline'> {card.job?.PrintingSide || "___________________________"} </span></p>
                    </div>
                  <div class="w-4/12 ">
                    <p className='text-[12px] '> Submited At :- 
                      <span className='font-bold underline'> {card.job?.When_to_give_goods? moment(card.job?.When_to_give_goods).format("LLL"): "___________________________"}</span>
                    </p>                 
                    <p className='text-[12px] '> quantity :- <span className='font-bold underline'> {card.job?.quantity || "______________________________"} </span></p>
                    <p className='text-[12px] '> pages :- <span className='font-bold underline'> {card.job?.pages || "__________________________________"} </span></p>
                    <p className='text-[12px] '> ink :- <span className='font-bold underline'> {card.job?.ink || "_____________________________________"} </span></p>
                    <p className='text-[12px] '> paperColor :- <span className='font-bold underline'> {card.job?.paperColor || "______________________________"} </span></p>
                  </div>
                  <div class="w-4/12  ">
                    <p className='text-[12px] '> sampleImage :- <span className='font-bold underline'> {card.job?.sampleImage || ""} </span></p>
                  </div>
                </div>
                      <p className='text-[12px] '> job_description :- <span className='font-bold underline'> {card.job?.job_description || "_______________________________________"} </span></p>

            </div>

            <div className='bg-slate-50 p-4 mt-1 py-2 border rounded'>
              <h1 className='text-center bg-slate-200 rounded  font-bold ' >Paper Details</h1>
             <div className='flex pt-2'>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Paper_name :- <span className='font-bold underline'> {card.paper?.Paper_name || "___________________________"} </span></p>
                <p className='text-[12px] '> paper_size :- <span className='font-bold underline'> {card.paper?.paper_size || "_____________________________"} </span></p>
                <p className='text-[12px] '> required_paper :- <span className='font-bold underline'> {card.paper?.required_paper || "________________________"} </span></p>

              </div>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Paper_color :- <span className='font-bold underline'> {card.paper?.Paper_color || "___________________________"} </span></p>
                <p className='text-[12px] '> paper_GSM :- <span className='font-bold underline'> {card.paper?.paper_GSM || "___________________________"} </span></p>
                <p className='text-[12px] '> Ordered_paper :- <span className='font-bold underline'> {card.paper?.Ordered_paper || "_______________________"} </span></p>
              </div>
              <div className='w-4/12 '>
                <p className='text-[12px] '> DM_Challan_no :- <span className='font-bold underline'> {card.paper?.DM_Challan_no || "________________________"} </span></p>
                <p className='text-[12px] '> DM_Challan_date :- <span className='font-bold underline'> {card.paper?.DM_Challan_date || "______________________"} </span></p>
              </div>
             </div>
                <p className='text-[12px] '> Paper_description :- <span className='font-bold underline'> {card.paper?.Paper_description || "_______________________________________"} </span></p>
            </div>

            <div className='bg-slate-50 p-4 mt-1 py-2 border rounded'>
              <h1 className='text-center bg-slate-200 rounded font-bold ' >Printing Details</h1>
             <div className='flex pt-2'>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Paper_name :- <span className='font-bold underline'> {card.printing?.Machine_name || "___________________________"} </span></p>
                <p className='text-[12px] '> Total_set_of_print :- <span className='font-bold underline'> {card.printing?.Total_set_of_print || "______________________"} </span></p>
   
              </div>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Operator_name :- <span className='font-bold underline'> {card.printing?.Operator_name || "_______________________"} </span></p>
                <p className='text-[12px] '> print_no_per_set :- <span className='font-bold underline'> {card.printing?.print_no_per_set || "______________________"} </span></p>
               
                
              </div>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Start_date_of_print :- <span className='font-bold underline'> {card.printing?.Start_date_of_print || "____________________"} </span></p>
                {/* <p className='text-[12px] '> Start_time_of_print :- <span className='font-bold underline'> {card.printing?.Start_time_of_print || "__________"} </span></p> */}
                <p className='text-[12px] '> End_date_of_print :- <span className='font-bold underline'> {card.printing?.End_date_of_print || "_____________________"} </span></p>
               
              </div>
             </div>
                <p className='text-[12px] '> printing_description :- <span className='font-bold underline'> {card.printing?.printing_description || "_______________________________________"} </span></p>

            </div>

            <div className='bg-slate-50 p-4 mt-1 py-2 border rounded'>
              <h1 className='text-center bg-slate-200 rounded font-bold ' >Binding Details</h1>
             <div className='flex pt-2'>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Numbering :- <span className='font-bold underline'> {card.binding?.Numbering || "___________________________"} </span></p>
                <p className='text-[12px] '> Perfiting :- <span className='font-bold underline'> {card.binding?.Perfiting || "______________________________"} </span></p>
                <p className='text-[12px] '> Binding :- <span className='font-bold underline'> {card.binding?.Binding || "_______________________________"} </span></p>
              </div>
              <div className='w-4/12 '>
                <p className='text-[12px] '> set_number :- <span className='font-bold underline'> {card.binding?.set_number || "___________________________"} </span></p>
                <p className='text-[12px] '> Half_cutting :- <span className='font-bold underline'> {card.binding?.Half_cutting || "___________________________"} </span></p>
                <p className='text-[12px] '> Spiral :- <span className='font-bold underline'> {card.binding?.Spiral || "__________________________________"} </span></p>
              </div>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Full_cutting :- <span className='font-bold underline'> {card.binding?.Full_cutting || "___________________________"} </span></p>
                <p className='text-[12px] '> Packing :- <span className='font-bold underline'> {card.binding?.Packing || "_______________________________"} </span></p>
              </div>
             </div>
                 <p className='text-[12px] '> Binding_description :- <span className='font-bold underline'> {card.binding?.Binding_description || "_______________________________________"} </span></p>

            </div>

            <div className='bg-slate-50 p-4 mt-1  py-2 border rounded'>
              <h1 className='text-center bg-slate-200 rounded font-bold' >Finished Details</h1>
             <div className='flex pt-2'>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Finished_goods_no :- <span className='font-bold underline'> {card.finished?.Finished_goods_no || "___________________"} </span></p>
                <p className='text-[12px] '> Previous_rate :- <span className='font-bold underline'> {card.finished?.Previous_rate || "_________________________"} </span></p>
                <p className='text-[12px] '> Challan_no  :- <span className='font-bold underline'> {card.finished?.Challan_no || "___________________________"} </span></p>
                <p className='text-[12px] '> Transmission :- <span className='font-bold underline'> {card.finished?.Transmission || "__________________________"} </span></p>
              
              </div>
              <div className='w-4/12 '>
                <p className='text-[12px] '> Finished_goods_pkt :- <span className='font-bold underline'> {card.finished?.Finished_goods_pkt || "___________________"} </span></p>
                <p className='text-[12px] '> Update_Rate :- <span className='font-bold underline'> {card.finished?.Update_Rate || "__________________________"} </span></p>
                <p className='text-[12px] '> Bill_no :- <span className='font-bold underline'> {card.finished?.Bill_no || "_________________________________"} </span></p>
                <p className='text-[12px] '> Transmission_date :- <span className='font-bold underline'> {card.finished?.Transmission_date || "_____________________"} </span></p>
              </div>
              <div className='w-4/12 '>
                <p className='text-[12px] '> HSN_Code :- <span className='font-bold underline'> {card.finished?.HSN_Code || "_____________________________"} </span></p>
                <p className='text-[12px] '> Tax_Rate :- <span className='font-bold underline'> {card.finished?.Tax_Rate || "_______________________________"} </span></p>
                
              </div>

             </div>
                <p className='text-[12px] '> finished_description :- <span className='font-bold underline'> {card.finished?.finished_description || "_______________________________________"} </span></p>

            </div>
            
            <div className='   py-4  '>
              <h1 className='text-[10px] text-center ' >For spacial instructions, look behind the card</h1>
         
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default PrintableJobView;
