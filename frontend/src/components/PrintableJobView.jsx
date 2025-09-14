import React from "react";
import moment from "moment";

const PrintableJobView = ({ closeModal, card, fetchAllJob }) => {

  // put this inside your component function (above return)
const isTrue = (v) =>
  v === true ||
  v === "true" ||
  v === 1 ||
  v === "1" ||
  v === "yes" ||
  v === "Yes";

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white relative rounded-lg   overflow-auto max-w-screen-md w-full h-screen">
        <button
          onClick={closeModal}
          className="fixed md:absolute top-2 right-2 hover:text-red-500 text-xl"
        >
          ✕
        </button>
        {/* Your printable content goes here */}
        <h2 className="text-xl text-center w-[750px]  rounded pt-4 font-bold uppercase">
          Goyal printing & converting industries
        </h2>
        <div className="  h-full w-[750px] p-4 pt-1">
          <h2 className="text-2xl text-center bg-gray-300 rounded pb-1 uppercase font-bold">
            Printing Job Card
          </h2>
          {/* job preview */}
          <div>
            {/* Genral Details */}
            <div className="bg-slate-50 p-4 mt-1 py-1 border rounded">
              <h1 className="text-center bg-slate-200 rounded  font-bold">
                Genral Details
              </h1>
              <div className="flex pt-2">
                <div className="w-9/12 ">
                  <p className="text-[12px] ">
                    {" "}
                    CUSTOMER :-{" "}
                    <span className="font-bold  underline">
                      {" "}
                      {card.general?.Customer_name ||
                        "________________________________________________________________________________"}{" "}
                    </span>
                  </p>
                  {/* <p className='text-[12px] '> CONTACT  :- <span className='font-bold underline'> {card.general?.Mobile_number || "__________________________________________________________________________________"} </span></p> */}
                  <p className="text-[12px] py-1 ">
                    {" "}
                    ADDRESS :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.general?.address ||
                        "__________________________________________________________________________________"}{" "}
                    </span>
                  </p>

                  <p className="text-[12px]  ">
                    {" "}
                    JOB NAME :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.jobName ||
                        "_________________________________________________________________________________"}{" "}
                    </span>
                  </p>
                </div>

                <div className="w-3/12 ">
                  <p className="text-[12px] ">
                    {" "}
                    job Id :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.jobCardId || "__________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] ">
                    {" "}
                    Date :-{" "}
                    <span className="font-bold underline">
                      {card.createdAt
                        ? moment(card.createdAt).format("DD/MM/YYYY ")
                        : "date of Order"}{" "}
                    </span>
                  </p>
                  <span className="text-[12px]  ">
                    {" "}
                    Submited At :-
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.When_to_give_goods
                        ? moment(card.job?.When_to_give_goods).format(
                            "DD/MM/YYYY "
                          )
                        : "_______________"}
                    </span>
                  </span>
                </div>
              </div>
            </div>

            {/* Job Details */}
            <div className="bg-slate-50 p-4 mt-1 py-1 border rounded">
              <h1 className="text-center bg-slate-200 rounded font-bold ">
                Job Details
              </h1>

              <div class="flex">
                <div class="w-4/12 ">
                  <p className="text-[12px] pt-1">
                    {" "}
                    category :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.category ||
                        "______________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    job Size :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.jobSize ||
                        "_______________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    color :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.color ||
                        "__________________________________"}{" "}
                    </span>
                  </p>

                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Printing Side :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.PrintingSide ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                </div>

                <div class="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    quantity :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.quantity ||
                        "_____________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    pages :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.pages ||
                        "________________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    ink :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.ink ||
                        "___________________________________"}{" "}
                    </span>
                  </p>
                </div>
                <div class="w-4/12  ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    sampleImage :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.sampleImage || ""}{" "}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-[12px] pt-1 ">
                {" "}
                job description :-{" "}
                <span className="font-bold underline">
                  {" "}
                  {card.job?.job_description ||
                    "_______________________________________"}{" "}
                </span>
              </p>
            </div>

            {/* Composing Details */}
            <div className="bg-slate-50 p-4 mt-2 py-2 border rounded">
              <h1 className="text-center bg-slate-200 rounded  font-bold">
                Composing Details
              </h1>
              <div className="flex pt-2">
                <div className="w-7/12 ">
                  <p className="text-[12px] ">
                    {" "}
                    Proof Check :-{" "}
                    {card.composing?.proofs?.some((p) => p.status)
                      ? (() => {
                          const latest = [...card.composing.proofs]
                            .filter((p) => p.status)
                            .pop();
                          return latest ? (
                            <strong>{`${latest.id} : ${latest.status}`}</strong>
                          ) : (
                            "No Proof Status"
                          );
                        })()
                      : "No Proof Status"}
                  </p>
                </div>

                <div className="w-5/12 ">
                  <p className="text-[12px] ">
                    Task :-{" "}
                    <span className="font-bold underline">
                      {card.composing?.proofChecklist
                        ? [
                            "design",
                            "setting",
                            "typing",
                            "PrintOut",
                            "pdf",
                            "master",
                            "butter",
                            "OldPlate",
                            "NewPlate",
                          ]
                            .filter((key) => card.composing.proofChecklist[key])
                            .map(
                              (key) =>
                                key.charAt(0).toUpperCase() + key.slice(1)
                            )
                            .join(", ")
                        : "______________________________________________"}
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-[12px] pt-1">
                {" "}
                File Path :-{" "}
                <span className="font-bold underline">
                  {" "}
                  {card.composing?.finalDesignPath || "__________"}{" "}
                </span>
              </p>
              <p className="text-[12px] pt-1 ">
                {" "}
                description :-{" "}
                <span className="font-bold underline">
                  {" "}
                  {card.composing?.description ||
                    "__________________________________________________________"}{" "}
                </span>
              </p>
            </div>

            <div className="bg-slate-50 p-4 mt-1 py-2 border rounded">
              <h1 className="text-center bg-slate-200 rounded  font-bold ">
                Paper Details
              </h1>
              <div className="flex pt-2">
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Paper name :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.paperName ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    paper size :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.paper?.paper_size ||
                        "_____________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    required paper :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.paper?.required_paper ||
                        "________________________"}{" "}
                    </span>
                  </p>
                </div>
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Paper color :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.paperColor ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    paper GSM :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {`${card.job.paper_GSM} GSM`||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Ordered_paper :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.paper?.Ordered_paper ||
                        "_______________________"}{" "}
                    </span>
                  </p>
                </div>
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    DM_Challan_no :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.paper?.DM_Challan_no ||
                        "________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    DM_Challan_date :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.paper?.DM_Challan_date ||
                        "______________________"}{" "}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-[12px] pt-1 ">
                {" "}
                Paper description :-{" "}
                <span className="font-bold underline">
                  {" "}
                  {card.paper?.Paper_description ||
                    "_______________________________________"}{" "}
                </span>
              </p>
            </div>

            <div className="bg-slate-50 p-4 mt-1 py-2 border rounded">
              <h1 className="text-center bg-slate-200 rounded font-bold ">
                Printing Details
              </h1>
              <div className="flex pt-2">
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Machine name :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.printing?.Machine_name ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Total_set_of_print :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.printing?.Total_set_of_print ||
                        "______________________"}{" "}
                    </span>
                  </p>
                </div>
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Operator_name :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.printing?.Operator_name ||
                        "_______________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    print_no_per_set :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.printing?.print_no_per_set ||
                        "______________________"}{" "}
                    </span>
                  </p>
                </div>
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Start_date_of_print :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.printing?.Start_date_of_print ||
                        "____________________"}{" "}
                    </span>
                  </p>
                  
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    End_date_of_print :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.printing?.End_date_of_print ||
                        "_____________________"}{" "}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-[12px] pt-1 ">
                {" "}
                printing_description :-{" "}
                <span className="font-bold underline">
                  {" "}
                  {card.printing?.printing_description ||
                    "_______________________________________"}{" "}
                </span>
              </p>
            </div>

            {/* <div className="bg-slate-50 p-4 mt-1 py-2 border rounded">
              <h1 className="text-center bg-slate-200 rounded font-bold ">
                Binding Details
              </h1>
              <div className="flex pt-2">
                <div className="w-4/12 ">
                
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Numbering :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.binding?.Numbering ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Perfiting :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.binding?.Perfiting ||
                        "______________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Binding :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.binding?.Binding ||
                        "_______________________________"}{" "}
                    </span>
                  </p>
                </div>
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    set number :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.binding?.set_number ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Half cutting :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.binding?.Half_cutting ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Binding Type :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.job?.binding_type ||
                        "__________________________________"}{" "}
                    </span>
                  </p>
                </div>
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Full cutting :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.binding?.Full_cutting ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Packing :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.binding?.Packing ||
                        "_______________________________"}{" "}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-[12px] pt-1 ">
                {" "}
                Binding description :-{" "}
                <span className="font-bold underline">
                  {" "}
                  {card.binding?.Binding_description ||
                    "_______________________________________"}{" "}
                </span>
              </p>
            </div> */}
            
<div className="bg-slate-50 p-4 mt-1 py-2 border rounded">
  <h1 className="text-center bg-slate-200 rounded font-bold ">
    Binding Details
  </h1>

  <div className="flex pt-2">
    <div className="w-4/12 ">
      <p className="text-[12px] pt-1 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isTrue(card?.binding?.Numbering)}
          disabled
          className="w-4 h-4"
          aria-label="Numbering"
        />
        Numbering
      </p>

      <p className="text-[12px] pt-1 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isTrue(card?.binding?.Perfiting)}
          disabled
          className="w-4 h-4"
          aria-label="Perfiting"
        />
        Perfiting
      </p>
      <p className="text-[12px] pt-1 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isTrue(card?.binding?.Binding )}
          disabled
          className="w-4 h-4"
          aria-label="Binding"
        />
        Binding
      </p>
    </div>

    <div className="w-4/12 ">
      <p className="text-[12px] pt-1">
        set number :-
        <span className="font-bold underline ml-1">
          {card.binding?.set_number || "___________________________"}
        </span>
      </p>

      <p className="text-[12px] pt-1 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isTrue(card?.binding?.Half_cutting)}
          disabled
          className="w-4 h-4"
          aria-label="Half cutting"
        />
        Half cutting
      </p>

      <p className="text-[12px] pt-1">
        Binding Type :-
        <span className="font-bold underline ml-1">
          {card.job?.binding_type || "__________________________________"}
        </span>
      </p>
    </div>

    <div className="w-4/12 ">
      <p className="text-[12px] pt-1 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isTrue(card?.binding?.Full_cutting)}
          disabled
          className="w-4 h-4"
          aria-label="Full cutting"
        />
        Full cutting
      </p>

      <p className="text-[12px] pt-1 flex items-center gap-2">
        <input
          type="checkbox"
          checked={isTrue(card?.binding?.Packing)}
          disabled
          className="w-4 h-4"
          aria-label="Packing"
        />
        Packing
      </p>
    </div>
  </div>

  <p className="text-[12px] pt-1">
    Binding description :-
    <span className="font-bold underline ml-1">
      {card.binding?.Binding_description || "_______________________________________"}
    </span>
  </p>
</div>


            <div className="bg-slate-50 p-4 mt-1  py-2 border rounded">
              <h1 className="text-center bg-slate-200 rounded font-bold">
                Finished Details
              </h1>
              <div className="flex pt-2">
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Finished_goods_no :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Finished_goods_no ||
                        "___________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Previous_rate :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Previous_rate ||
                        "_________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Challan_no :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Challan_no ||
                        "___________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Transmission :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Transmission ||
                        "__________________________"}{" "}
                    </span>
                  </p>
                </div>
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Finished_goods_pkt :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Finished_goods_pkt ||
                        "___________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Update_Rate :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Update_Rate ||
                        "__________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Bill_no :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Bill_no ||
                        "_________________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Transmission_date :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Transmission_date ||
                        "_____________________"}{" "}
                    </span>
                  </p>
                </div>
                <div className="w-4/12 ">
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    HSN_Code :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.HSN_Code ||
                        "_____________________________"}{" "}
                    </span>
                  </p>
                  <p className="text-[12px] pt-1 ">
                    {" "}
                    Tax_Rate :-{" "}
                    <span className="font-bold underline">
                      {" "}
                      {card.finished?.Tax_Rate ||
                        "_______________________________"}{" "}
                    </span>
                  </p>
                </div>
              </div>
              <p className="text-[12px] pt-1 ">
                {" "}
                finished_description :-{" "}
                <span className="font-bold underline">
                  {" "}
                  {card.finished?.finished_description ||
                    "_______________________________________"}{" "}
                </span>
              </p>
            </div>

            <div className="   py-4  ">
              <h1 className="text-[10px] text-center ">
                For spacial instructions, look behind the card
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintableJobView;
